import { extendObservable } from "mobx";
import rpc from "../utils/rpc";
import store from "../utils/store";
import _isEmpty from "lodash/isEmpty";
import _merge from "lodash/merge";
import _find from "lodash/find";
import _map from "lodash/map";
import _filter from "lodash/filter";

class Account {
  constructor() {
    extendObservable(this, {
      loading: false,
      accounts: [],
      currentAccount: {},
      currentHistory: {},
      createLoading: false
    });
  }

  hasAccounts() {
    return !_isEmpty(this.accounts);
  }

  async createAccount(name) {
    this.createLoading = true;
    const walletResult = await rpc.post("/", { action: "wallet_create" });
    const seed = walletResult.data.wallet;
    const keys = await rpc.post("/", {
      action: "deterministic_key",
      seed,
      index: "0"
    });
    this.saveAccount(name, keys, seed);
  }

  async restoreAccount(name, seed) {
    this.createLoading = true;
    const keys = await rpc.post("/", {
      action: "deterministic_key",
      seed,
      index: "0"
    });
    this.saveAccount(name, keys, seed);
  }

  async saveAccount(name, keys, seed) {
    this.currentAccount = _merge(keys.data, { name, seed });
    this.accounts.push(this.currentAccount);
    const storeResult = await store.setItem("wallet-online", this.accounts);
    this.accounts = storeResult;
    this.createLoading = false;
    return storeResult;
  }

  async openAccount(account) {
    // Step 1. Retrieve hash of the send block that you sent from your wallet
    const pending = await rpc.post("/", {
      action: "accounts_pending",
      accounts: [account.account],
      count: 1
    });
    const sendBlockHash = pending.data.blocks[account.account][0];
    // TODO check sendBlockHash whether exists

    // Step 2. Generate Proof of Work from your account's public key
    const workResult = await rpc.post("/", {
      action: "work_generate",
      hash: account.public
    });

    // Step 3. Generate an open block for your new account using "block_create"
    const newBlock = await rpc.post("/", {
      action: "block_create",
      type: "open",
      previous: account.public,
      key: account.private,
      account: account.account,
      source: sendBlockHash,
      work: workResult.data.work,
      representative:
        "xrb_1hza3f7wiiqa7ig3jczyxj5yo86yegcmqk3criaz838j91sxcckpfhbhhra1"
    });

    // Step 4. Publish your open block to the network using "process"
    const processResult = await rpc.post("/", {
      action: "process",
      block: newBlock.data.block
    });
    console.log(
      "account:",
      account,
      "pending:",
      pending.data,
      "work:",
      workResult.data,
      "newBlock:",
      newBlock.data,
      "process:",
      processResult.data
    ); // The hash of your newly published open block

    return processResult;
  }

  async send(account, amount, toAccountAddress) {
    // Step 1. Convert amount to raw 128-bit stringified integer. Since converion
    // RPC methods don't support decimal amounts, we will multiply our amount
    // by 1000 and convert from krai to raw.
    const conversionResult = await rpc.post("/", {
      action: "krai_to_raw",
      amount: (amount * 1000).toString()
    });

    const rawAmount = conversionResult.data.amount;

    // Step 2. Retrieve your account info to get your latest block hash (frontier)
    // and balance
    const info = await rpc.post("/", {
      action: "account_info",
      account: account.account,
      count: 1
    });

    // Step 3. Generate Proof of Work from your account's frontier
    const workResult = await rpc.post("/", {
      action: "work_generate",
      hash: info.data.frontier
    });

    // Step 4. Generate a send block using "block_create"
    const newBlock = await rpc.post("/", {
      action: "block_create",
      type: "send",
      key: account.private,
      account: account.account,
      destination: toAccountAddress,
      balance: info.data.balance,
      amount: rawAmount,
      previous: info.data.frontier,
      work: workResult.data.work
    });

    // Step 5. Publish your send block to the network using "process"
    const processResult = await rpc.post("/", {
      action: "process",
      block: newBlock.data.block
    });
    console.log(processResult.data.hash); // The hash of your newly published send block
    return processResult;
  }

  getAccountBlocks(account) {
    return rpc.post("/", {
      action: "account_history",
      account,
      count: 1000
    });
  }

  // TODO
  checkReadyBlocks() {
    console.log("checkReadyBlocks111");
    window.setTimeout(this.checkReadyBlocks.bind(this), 1000);
  }

  async loadAccounts() {
    if (this.hasAccounts()) {
      this.currentAccount = this.accounts[0];
      return;
    }

    this.loading = true;
    return store.getItem("wallet-online").then(accounts => {
      this.accounts = accounts || [];
      this.currentAccount = this.accounts[0];
      this.loading = false;
    });
  }

  changeCurrentAccount(account) {
    this.currentAccount = _find(this.accounts, a => {
      return a.account === account;
    });
  }

  updateAccount(account, name) {
    if (this.currentAccount.account === account) {
      this.currentAccount = _merge({}, this.currentAccount, { name: name });
    }

    this.accounts = _map(this.accounts, a => {
      if (a.account === account) {
        a.name = name;
      }
      return a;
    });

    store.setItem("wallet-online", this.accounts);
  }

  deleteAccount(account) {
    this.accounts = _filter(this.accounts, a => {
      return a.account !== account;
    });

    store.setItem("wallet-online", this.accounts);
  }

  getAccountBalance(account) {
    rpc.post("/", { action: "account_balance", account }).then(res => {
      this.currentAccount = _merge({}, this.currentAccount, res.data);
    });
  }

  getAccountHistory(account) {
    this.currentHistory = {};
    rpc
      .post("/", { action: "account_history", account, count: 100 })
      .then(res => {
        this.currentHistory = res.data;
      });
  }
}

export default Account;
