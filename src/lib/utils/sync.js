/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

/**
 * A synchronization gate
 */
export class Gate {

  constructor(closed = true) {
    this.sync = new Int32Array(new SharedArrayBuffer(1));
    Atomics.store(sync, 0, closed ? 0 : 1);
  }

  wait() {
    check = isClosed(this);
    while (check.next().value) { };
  }

  open() {
    Atomics.store(sync, 0, 1);
    Atomics.wake(sync, 0, 1);
  }

  isOpen() {
    return this.sync[0] == 1;
  }

  close() {
    Atomics.store(sync, 0, 0)
  }

  isClosed() {
    return this.sync[0] == 0;
  }
}
