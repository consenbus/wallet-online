import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// tabs
import HomeIndex from "./Home/Tab/Index";
import TabReceive from "./Home/Tab/Receive";
import TabScan from "./Home/Tab/Scan";
import TabSend from "./Home/Tab/Send";
import TabSetting from "./Home/Tab/Setting";

// account
import AccountShow from "./Home/Account/Show";
import AccountNew from "./Home/Account/New";
import AccountRestore from "./Home/Account/Restore";
import AccountEdit from "./Home/Account/Edit";

// other
// import Example from "./Home/Example";
import NotFound from "../components/NotFound";

class Home extends Component {
  render() {
    return (
      <main className="main">
        <Switch>
          <Route path="/" exact component={HomeIndex} />
          {/* tabs */}
          <Route path="/tab/receive" component={TabReceive} />
          <Route path="/tab/scan" component={TabScan} />
          <Route path="/tab/send" component={TabSend} />
          <Route path="/tab/setting" component={TabSetting} />

          {/* account */}
          <Route path="/account/new" component={AccountNew} />
          <Route path="/account/restore" component={AccountRestore} />
          <Route exact path="/accounts/:account" component={AccountShow} />
          <Route path="/accounts/:account/edit" component={AccountEdit} />

          {/* other */}
          {/*
          <Route path="/example" component={Example} />
          */}
          <Route component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default Home;
