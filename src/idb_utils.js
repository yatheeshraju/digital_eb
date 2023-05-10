import { openDB } from 'idb/with-async-ittr';

const DB_NAME='dwalldb'
const STORE_NAME='testwall'
const dbPromise = openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME,{
        keyPath:'id',
        autoIncrement:true
      });
    },
  });


  export async function get(key) {
    return (await dbPromise).get(STORE_NAME, key);
  }
  export async function getAll() {
    return (await dbPromise).getAll(STORE_NAME);
  }
  export async function set(val) {
    return (await dbPromise).put(STORE_NAME, val);
  }
  export async function del(key) {
    return (await dbPromise).delete(STORE_NAME, key);
  }
  export async function clear() {
    return (await dbPromise).clear(STORE_NAME);
  }
  export async function keys() {
    return (await dbPromise).getAllKeys(STORE_NAME);
  }
  