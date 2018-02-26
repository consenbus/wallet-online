import { extendObservable } from "mobx";
import { request } from "../utils/rpc";
import store from "../utils/store";
import _isEmpty from "lodash/isEmpty";

class Account {
  constructor() {
    extendObservable(this, {
      loading: false,
      accounts: [],
      currentAccount: {}
    });
  }

  hasAccounts() {
    return !_isEmpty(this.accounts);
  }

  createAccount(name, password) {
    this.loading = true;
    // TODO
    this.accounts.push({ name, password });

    return store.setItem("accounts", this.accounts).then(accounts => {
      this.accounts = accounts;
      this.loading = false;
    });
  }

  loadAccounts() {
    if (this.hasAccounts()) {
      return;
    }

    this.loading = true;
    store.getItem("accounts").then(accounts => {
      this.accounts = accounts || [];
      this.loading = false;
    });
  }

  /*
  blockCount() {
    request({ action: "block_count" }).then(res => {
      this.blockCount = res.data.count;
    });
  }
  */
}

export default Account;
