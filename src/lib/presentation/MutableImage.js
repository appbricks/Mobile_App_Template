/**
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 *
 * Image container class that can be modified 
 * and will also persist its state.
 */
export default class MutableImage {

  /**
   * Constructs a mutable image instance
   * 
   * @param {*} uri     The image uri
   * @param {*} title   The image title
   * @param {*} key     The key within a local store to persist the uri
   * @param {*} store   The store instance where the uri will be persisted 
   */
  constructor(uri, title?, key?, store?) {
    this.uri = uri;
    this.title = title;
    this.updateCallbacks = [];
  }

  /**
   * Set the persistance store to persist
   * uri changes to the image container.
   * 
   * @param {string} key          The key to identify the persisted image uri by
   * @param {LocalStorage} store  The store to persist the image uri
   */
  setPersistanceTarget(key, store) {
    this.key = key;
    this.store = store;
  }

  /**
   * @param {functoin} cb  Callback functon to call when an image is updated.
   *                       This function takes the image uri as an argument.
   */
  addUpdateCallback(cb) {
    this.updateCallbacks.push(cb);
  }

  /**
   * @param {functoin} cb  Callback functon to remove.
   */
  removeUpdateCallback(cb) {
    this.updateCallbacks = this.updateCallbacks.filter(callback => (callback !== cb));
  }

  /**
   * @param {*} options 
   */
  triggerCallbacks(options?) {
    this.updateCallbacks.forEach(cb => cb(this.getUri(), options));
  }

  /**
   * Sets the image source uri.
   * 
   * @param {object} uri 
   * @param {object} title 
   */
  setUri(uri, title?) {
    if (this.store != null) {
      this.store.setItem(this.key, {
        uri: uri,
        title: titile
      });
    } else {
      this.uri = uri;
      this.title = title;
    }
    this.updateCallbacks.forEach(cb => cb({ uri, title }));
  }

  /**
   * Blurs the image. This will invoke callback with the 
   * required blur parameters and the component containing
   * the image needs to apply the blur effect.
   * 
   * @param {*} blurType 
   * @param {*} blurAmount 
   */
  blur(blurType, blurAmount) {

    this.triggerCallbacks(
      {
        blurType: blurType,
        blurAmount: blurAmount
      }
    );
  }

  /**
   * Invokes the callback indicating the component displaying 
   * the image needs to unblur it.
   */
  unblur() {

    this.triggerCallbacks(
      {
        blurType: null,
        blurAmount: null
      }
    );
  }

  /**
   * Returns the image source uri.
   * 
   * @return {object}
   */
  getUri() {
    let uri = {};

    if (this.store != null) {
      if (this.store.isInitialized()) {
        uri = this.store.getItem(this.key);
      } else {
        // If the persistance target has been
        // set then return null until it has
        // been initialized.
        return null;
      }
    }

    if (uri.length) {
      return uri;
    } else {
      return {
        uri: this.uri,
        title: this.title
      };
    }
  }
}
