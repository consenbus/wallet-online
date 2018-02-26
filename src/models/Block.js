import { extendObservable } from "mobx";
import { request } from "../utils/rpc";

class Block {
  constructor() {
    extendObservable(this, {
      blockCount: 0
    });
  }

  loadBlockCount() {
    request({ action: "block_count" }).then(res => {
      this.blockCount = res.data.count;
    });
  }
}

export default Block;
