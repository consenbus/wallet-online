import { extendObservable } from "mobx";
import rpc from "../utils/rpc";

class Block {
  constructor() {
    extendObservable(this, {
      blockCount: 0
    });
  }

  loadBlockCount() {
    rpc.post("/", { action: "block_count" }).then(res => {
      this.blockCount = res.data.count;
    });
  }
}

export default Block;
