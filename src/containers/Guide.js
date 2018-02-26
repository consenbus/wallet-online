import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// guide
import Index from "./Guide/Index";
import Create from "./Guide/Create";
import Backup from "./Guide/Backup";
import BackupWarning from "./Guide/BackupWarning";
import NoScreenshot from "./Guide/NoScreenshot";
import WriteDown from "./Guide/WriteDown";
import Done from "./Guide/Done";

// other
import NotFound from "../components/NotFound";

class Guide extends Component {
  render() {
    return (
      <main className="main">
        <Switch>
          {/* guide */}
          <Route path="/guide" exact component={Index} />
          <Route path="/guide/create" component={Create} />
          <Route path="/guide/backup" component={Backup} />
          <Route path="/guide/backup-warning" component={BackupWarning} />
          <Route path="/guide/no-screenshot" component={NoScreenshot} />
          <Route path="/guide/write-down" component={WriteDown} />
          <Route path="/guide/done" component={Done} />

          {/* other */}
          <Route component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default Guide;
