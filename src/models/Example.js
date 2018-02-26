import { extendObservable } from "mobx";

class Example {
  constructor() {
    extendObservable(this, {
      timer: 0
    });
  }

  startTimer() {
    this.t = window.setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  clearTimer() {
    window.clearInterval(this.t);
  }

  resetTimer() {
    this.timer = 0;
  }
}

export default Example;
