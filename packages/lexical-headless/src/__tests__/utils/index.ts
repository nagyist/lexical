/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export function isEmptyNavigator() {
  return (
    typeof navigator === 'object' &&
    Object.prototype.toString.call(navigator) === '[object Object]' &&
    Object.keys(navigator).length === 0
  );
}
