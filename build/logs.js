// Generated by CoffeeScript 1.12.4

/*
Copyright 2016 Resin.io

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
var Promise, errors, getLogs, logs;

Promise = require('bluebird');

logs = require('resin-device-logs');

errors = require('resin-errors');

getLogs = function(deps, opts) {
  var configModel, deviceModel, exports;
  configModel = require('./models/config')(deps, opts);
  deviceModel = require('./models/device')(deps, opts);
  exports = {};

  /**
  	 * @summary Subscribe to device logs
  	 * @name subscribe
  	 * @function
  	 * @public
  	 * @memberof resin.logs
  	 *
  	 * @description
  	 * The `logs` object yielded by this function emits the following events:
  	 *
  	 * - `line`: when a log line is received.
  	 * - `error`: when an error happens.
  	 *
  	 * @param {String|Number} uuidOrId - device uuid (string) or id (number)
  	 * @fulfil {EventEmitter} - logs
  	 * @returns {Promise}
  	 *
  	 * @todo
  	 * We should consider making this a readable stream.
  	 *
  	 * @example
  	 * resin.logs.subscribe('7cf02a6').then(function(logs) {
  	 * 	logs.on('line', function(line) {
  	 * 		console.log(line);
  	 * 	});
  	 * });
  	 *
  	 * @example
  	 * resin.logs.subscribe(123).then(function(logs) {
  	 * 	logs.on('line', function(line) {
  	 * 		console.log(line);
  	 * 	});
  	 * });
  	 *
  	 * @example
  	 * resin.logs.subscribe('7cf02a6', function(error, logs) {
  	 * 	if (error) throw error;
  	 *
  	 * 	logs.on('line', function(line) {
  	 * 		console.log(line);
  	 * 	});
  	 * });
   */
  exports.subscribe = function(uuidOrId, callback) {
    return Promise.props({
      device: deviceModel.get(uuidOrId),
      pubNubKeys: configModel.getPubNubKeys()
    }).then(function(arg) {
      var device, pubNubKeys;
      pubNubKeys = arg.pubNubKeys, device = arg.device;
      return logs.subscribe(pubNubKeys, device);
    }).asCallback(callback);
  };

  /**
  	 * @summary Get device logs history
  	 * @name history
  	 * @function
  	 * @public
  	 * @memberof resin.logs
  	 *
  	 * @param {String|Number} uuidOrId - device uuid (string) or id (number)
  	 * @fulfil {String[]} - history lines
  	 * @returns {Promise}
  	 *
  	 * @example
  	 * resin.logs.history('7cf02a6').then(function(lines) {
  	 * 	lines.forEach(function(line) {
  	 * 		console.log(line);
  	 * 	});
  	 * });
  	 *
  	 * @example
  	 * resin.logs.history(123).then(function(lines) {
  	 * 	lines.forEach(function(line) {
  	 * 		console.log(line);
  	 * 	});
  	 * });
  	 *
  	 * @example
  	 * resin.logs.history('7cf02a6', function(error, lines) {
  	 * 	if (error) throw error;
  	 *
  	 * 	lines.forEach(function(line) {
  	 * 		console.log(line);
  	 * 	});
  	 * });
   */
  exports.history = function(uuidOrId, callback) {
    return Promise.props({
      device: deviceModel.get(uuidOrId),
      pubNubKeys: configModel.getPubNubKeys()
    }).then(function(results) {
      return logs.history(results.pubNubKeys, results.device);
    }).asCallback(callback);
  };
  return exports;
};

module.exports = getLogs;
