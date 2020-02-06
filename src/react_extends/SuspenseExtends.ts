type PromiseFetchFN = () => Promise<any>;

let cached:any = {};
const createFetch = (featchFN) => {
  let ref = cached;
  return () => {
    const task = featchFN();
    task.then(res => { ref = res; });
    if (ref === cached) { throw task; }
    return ref;
  }
}

// eslint-disable-next-line jsx-control-statements/jsx-jcs-no-undef
export { createFetch, PromiseFetchFN }