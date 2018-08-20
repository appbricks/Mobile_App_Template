/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { AsyncStorage } from 'react-native';

import Logger from "../utils/Logger";

export const secure = "KEY_CHAIN";

let queue = Promise.resolve();

/**
 * Saves map of key/values to application's persisted store.
 * 
 * @param {string} k 
 * @param {object} v 
 */
const queueSetItem = async (k, v) => {
  await queue;

  value = JSON.stringify(v);
  queue = AsyncStorage.setItem(k, value,
    e => e && console.warn('QUEUE', e));

  Logger.trace("LocalStorage", "key '" + k + "' saved: ", value);
};

/**
 * In-Memory storage backed up by React Native's AsyncStorage. 
 */
export default class LocalStorage {

  /**
   * Creates and instance of the store
   *
   * @param {string} id  A unique ID that identifies property map 
   *                     persisted by this storage instance.
   */
  constructor(id) {
    if (id == null) {
      console.error("Store ID cannot be null.");
    }

    this.logger = new Logger("LocalStorage");

    this.id = id;
    this.initialized = false;
    this.obj = {};

    this.notificationCallbacks = {}

    this.initPromise = null;
  }

  /**
   * Synchronizes this LocalStorage with React Native's AsyncStorage
   */
  async init() {

    if (!this.initialized) {

      if (this.initPromise == null) {

        this.initPromise = new Promise((resolve, reject) => {
          AsyncStorage.getItem(this.id, (e, r) => {

            if (e) {
              reject(e);
            } else {
              this.obj = r ? JSON.parse(r) : this.obj;

              this.logger.info("Initialized store '" + this.id + "'");
              this.logger.trace("key '" + this.id + "' loaded: ", this.obj);

              this.initialized = true;
              resolve(this.obj);
            }
          });
        });
      }

      await this.initPromise
    }
  }

  /**
   * @returns {boolean}  Returns if the store has been loaded 
   *                     from the persitance layer.
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * @param {string}    key       The key to notify on. If the key is '*' or null then
   *                              the callback will be called for any key value change.
   * @param {function}  callback  The callback function to register for notifications
   *                              when an item has been added, deleted or changed. It 
   *                              should be declared as 'function(key, value, action)'
   *                              where will be one of 0 (ADDED), 1 (DELETED), or 
   *                              2 (CHANGED).
   */
  registerNotificationHandler(key, callback) {
    callbackList = this.notificationCallbacks[key];
    if (!callbackList) {
      callbackList = [];
    }
    callbackList.push(callback);
    this.notificationCallbacks[key] = callbackList;
  }

  /**
   * @param {string} key 
   * @param {string} value 
   * @param {number} action 
   */
  async _sendNotifications(key, value, action) {

    wildcardCallbacks = this.notificationCallbacks["*"]
    if (wildcardCallbacks) {
      wildcardCallbacks.forEach((cb) => (cb(key, value, action)));
    }

    callbacks = this.notificationCallbacks[key]
    if (callbacks) {
      callbacks.forEach((cb) => (cb(key, value, action)));
    }
  }

  /**
   * Stores an item in the local storage
   *
   * @param {string} key 
   * @param {string} value 
   * @returns {string}
   */
  setItem(key, value) {
    oldValue = this.obj[key]
    if (oldValue && oldValue != value) {
      this._sendNotifications(key, value, 2);
    } else {
      this._sendNotifications(key, value, 0);
    }

    this.obj[key] = value;
    queueSetItem(this.id, this.obj);
    return this.obj[key];
  }

  /**
   * Retrieves an item from the local storage
   *
   * @param {string} key 
   * @returns {string}
   */
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.obj, key) ? this.obj[key] : undefined;
  }

  /**
   * Removes an item from local storage
   *
   * @param {string} key 
   */
  removeItem(key) {

    let value = undefined;

    if (Object.prototype.hasOwnProperty.call(this.obj, key)) {

      this._sendNotifications(key, value, 1);

      value = this.obj[key];
      delete this.obj[key];
      queueSetItem(this.id, this.obj);
    }
    return value;
  }

  /**
   * Clears the app local storage
   */
  clear() {
    AsyncStorage.clear(this.id, console.log);
    this.obj = {};
  }
}

