
const throttle__ = (fn: Function, wait: number = 500) => {
  let time = 0;

  let cancel = () => {
    if (time > 0) clearTimeout(time);
    time = 0;
  }

  let theRun = (...args) => {
    fn && fn(...args);
    cancel();
  }

  let throttle: any = function (...args: any[]) {
    if (time > 0) return;
    cancel();
    time = Number(setTimeout(theRun, wait, ...args));
  }

  throttle.unthrottle = cancel;
  return throttle;
}

const debounce__ = (fn: Function, wait: number) => {
  let time = 0;
  let cancel = () => {
    if (time > 0) clearTimeout(time);
    time = 0;
  }

  let theRun = (...args) => {
    fn && fn(...args);
    cancel();
  }

  let debounce: any = function (...args) {
    if (time > 0) cancel();
    time = Number(setTimeout(theRun, wait, ...args));
  }

  debounce.undebounce = cancel;
  return debounce;
}

export { throttle__, debounce__ }