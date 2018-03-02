import { extendObservable } from "mobx";
import rpc from "../utils/rpc";
import store from "../utils/store";
import _isEmpty from "lodash/isEmpty";
import _merge from "lodash/merge";
import _find from "lodash/find";

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

  createAccount(name) {
    this.createLoading = true;
    let seed = "";
    return rpc
      .post("/", {
        action: "wallet_create"
      })
      .then(res => {
        seed = res.data.wallet;
        return rpc.post("/", {
          action: "deterministic_key",
          seed: seed,
          index: "0"
        });
      })
      .then(res => {
        // {account: "", private: "", public: "", name: ""}
        this.currentAccount = _merge(res.data, { name, seed });
        this.accounts.push(this.currentAccount);
        return store.setItem("wallet-online", this.accounts);
      })
      .then(accounts => {
        this.accounts = accounts;
        this.createLoading = false;
      });
  }

  restoreAccount(name, seed) {
    this.createLoading = true;
    return rpc
      .post("/", {
        action: "deterministic_key",
        seed: seed,
        index: "0"
      })
      .then(res => {
        // {account: "", private: "", public: "", name: ""}
        this.currentAccount = _merge(res.data, { name, seed });
        this.accounts.push(this.currentAccount);
        return store.setItem("wallet-online", this.accounts);
      })
      .then(accounts => {
        this.accounts = accounts;
        this.createLoading = false;
      });
  }

  getAccountBlocks(account) {
    return rpc.post("/", {
      action: "account_history",
      account,
      count: 1000
    });
  }

  sendAccountBlocks(account, amount) {
    return rpc
      .post("/", {
        action: "account_info",
        account: account,
        count: 1
      })
      .then(info => {
        console.log(info);
      });
  }

  loadAccounts() {
    if (this.hasAccounts()) {
      this.currentAccount = this.accounts[0];
      return;
    }

    this.loading = true;
    store.getItem("wallet-online").then(accounts => {
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
