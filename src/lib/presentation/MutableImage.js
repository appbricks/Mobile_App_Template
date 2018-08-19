/**
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 *
 * Image container class that can be modified 
 * and will also persist its state.
 */
export default class MutableImage {

  /**
   * @param {object} uri  The image uri.
   */
  constructor(uri, key, store) {
    this.uri = uri;
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
   * Sets the image source uri.
   * 
   * @param {object} uri 
   */
  setUri(uri) {
    if (this.store != null) {
      this.store.setItem(this.key, uri)
    } else {
      this.uri = uri;
    }
    this.updateCallbacks.forEach(cb => cb(uri));
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

    this.updateCallbacks.forEach(cb => cb(
      this.getUri(),
      {
        blurType: blurType,
        blurAmount: blurAmount
      }
    ));
  }

  /**
   * Invokes the callback indicating the component displaying 
   * the image needs to unblur it.
   */
  unblur() {

    this.updateCallbacks.forEach(cb => cb(
      this.getUri(),
      {
        blurType: null,
        blurAmount: null
      }
    ));
  }

  /**
   * Returns the image source uri.
   * 
   * @return {object}
   */
  getUri() {
    let uri = null;

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

    if (uri == null) {
      return this.uri;
    } else {
      return uri;
    }
  }
}
