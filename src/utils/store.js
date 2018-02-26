import localforage from "localforage";

// This will force localStorage as the storage
// driver even if another is available. You can
// use this instead of `setDriver()`.
localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: "consenbus"
});

export default localforage;
