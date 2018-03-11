import { extendObservable } from 'mobx';
import { BigNumber } from 'bignumber.js';
import _isEmpty from 'lodash/isEmpty';
import _merge from 'lodash/merge';
import _find from 'lodash/find';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import rpc from '../utils/rpc';
import store from '../utils/store';

const units = {
  GBUS: BigNumber('1e36'),
  MBUS: BigNumber('1e33'),
  kBUS: BigNumber('1e30'),
  BUS: BigNumber('1e27'),
  mBUS: BigNumber('1e24'),
  uBUS: BigNumber('1e21'),
  nBUS: BigNumber('1e18'),
};

class Account {
  constructor() {
    extendObservable(this, {
      loading: false,
      accounts: [],
      currentAccount: {},
      currentHistory: {},
      createLoading: false,
    });
  }

  hasAccounts() {
    return !_isEmpty(this.accounts);
  }

  async createAccount(name) {
    this.createLoading = true;
    const walletResult = await rpc.post('/', { action: 'wallet_create' });
    const seed = walletResult.data.wallet;
    const keys = await rpc.post('/', {
      action: 'deterministic_key',
      seed,
      index: '0',
    });
    this.saveAccount(name, keys, seed);
  }

  async restoreAccount(name, seed) {
    this.createLoading = true;
    const keys = await rpc.post('/', {
      action: 'deterministic_key',
      seed,
      index: '0',
    });
    this.saveAccount(name, keys, seed);
  }

  async saveAccount(name, keys, seed) {
    this.currentAccount = _merge(keys.data, { name, seed });
    this.accounts.push(this.currentAccount);
    const storeResult = await store.setItem('wallet-online', this.accounts);
    this.accounts = storeResult;
    this.createLoading = false;
    return storeResult;
  }

  static amountConvert(amount, unit) {
    const times = units[unit];
    if (!times) throw Error(`Non-exists unit: ${unit}`);
    return times.multipliedBy(amount).toString(10);
  }

  async send(amount, unit, toAccountAddress) {
    const account = this.currentAccount;

    // Step 1. Convert amount to raw 128-bit stringified integer. Since converion
    const rawAmount = Account.amountConvert(amount, unit);

    // Step 2. Retrieve your account info to get your latest block hash (frontier)
    // and balance
    const info = await rpc.post('/', {
      action: 'account_info',
      account: this.currentAccount.account,
      count: 1,
    });

    // Step 3. Generate Proof of Work from your account's frontier
    const workResult = await rpc.post('/', {
      action: 'work_generate',
      hash: info.data.frontier,
    });

    // Step 4. Generate a send block using "block_create"
    const newBlock = await rpc.post('/', {
      action: 'block_create',
      type: 'send',
      key: account.private,
      account: account.account,
      destination: toAccountAddress,
      balance: info.data.balance,
      amount: rawAmount,
      previous: info.data.frontier,
      work: workResult.data.work,
    });

    // Step 5. Publish your send block to the network using "process"
    const processResult = await rpc.post('/', {
      action: 'process',
      block: newBlock.data.block,
    });

    return processResult;
  }

  static async getAccountBlocks(account) {
    const blocks = rpc.post('/', {
      action: 'account_history',
      account,
      count: 1000,
    });

    return blocks;
  }

  static async getOnePendingBlocks(address) {
    const { data } = await rpc.post('/', {
      action: 'accounts_pending',
      accounts: [address],
      count: 1,
    });

    if (!data.blocks) return false;

    const blocks = data.blocks[address];

    if (Array.isArray(blocks) && blocks.length > 0) return blocks[0];

    return false;
  }

  static async receive(account, sendBlockHash) {
    // Step 1. Retrieve your account info to get your latest block hash (frontier)
    const info = await rpc.post('/', {
      action: 'account_info',
      account: account.account,
      count: 1,
    });

    const previous = info.data.frontier || account.public;

    // Step 2. Generate Proof of Work from your account's frontier
    const workResult = await rpc.post('/', {
      action: 'work_generate',
      hash: previous,
    });

    // Step 3. Generate a open/receive block using "block_create"
    const newBlock = await rpc.post('/', {
      action: 'block_create',
      type: previous === account.public ? 'open' : 'receive',
      key: account.private,
      account: account.account,
      source: sendBlockHash,
      work: workResult.data.work,
      previous,
      representative:
        'xrb_1hza3f7wiiqa7ig3jczyxj5yo86yegcmqk3criaz838j91sxcckpfhbhhra1',
    });

    // Step 4. Publish your open block to the network using "process"
    const processResult = await rpc.post('/', {
      action: 'process',
      block: newBlock.data.block,
    });
    console.log(
      'account:',
      account,
      'pending:',
      sendBlockHash,
      'work:',
      workResult.data,
      'newBlock:',
      newBlock.data,
      'process:',
      processResult.data,
    ); // The hash of your newly published open block

    return processResult;
  }

  static async checkReadyBlocksByAccount(account) {
    const pending = await this.getOnePendingBlocks(account.account);
    console.log('Pending block', pending);

    if (pending) await Account.receive(account, pending);

    window.setTimeout(() => {
      this.checkReadyBlocksByAccount(account);
    }, 10 * 1000);
  }

  // TODO
  async checkReadyBlocks() {
    console.log('checkReadyBlocks111');
    this.accounts.forEach((account) => {
      Account.checkReadyBlocksByAccount(account);
    });
  }

  async loadAccounts() {
    if (this.hasAccounts()) {
      this.currentAccount = this.accounts[0];
      return null;
    }

    this.loading = true;
    return store.getItem('wallet-online').then((accounts) => {
      this.accounts = accounts || [];
      this.currentAccount = this.accounts[0];
      this.loading = false;
    });
  }

  changeCurrentAccount(account) {
    this.currentAccount = _find(this.accounts, a => a.account === account);
  }

  updateAccount(account, name) {
    if (this.currentAccount.account === account) {
      this.currentAccount = _merge({}, this.currentAccount, { name });
    }

    this.accounts = _map(this.accounts, (a) => {
      if (a.account === account) {
        a.name = name;
      }
      return a;
    });

    store.setItem('wallet-online', this.accounts);
  }

  deleteAccount(account) {
    this.accounts = _filter(this.accounts, a => a.account !== account);

    store.setItem('wallet-online', this.accounts);
  }

  getAccountBalance(account) {
    rpc.post('/', { action: 'account_balance', account }).then((res) => {
      this.currentAccount = _merge({}, this.currentAccount, res.data);
    });
  }

  getAccountHistory(account) {
    this.currentHistory = {};
    rpc
      .post('/', { action: 'account_history', account, count: 100 })
      .then((res) => {
        this.currentHistory = res.data;
      });
  }
}

export default Account;
