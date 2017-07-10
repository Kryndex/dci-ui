// Copyright 2015 Red Hat, Inc.
//
// Licensed under the Apache License, Version 2.0 (the 'License'); you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

"use strict";

require("app")
  .filter("limit", function() {
    return function(input, size, term) {
      if (size && input.length > size) {
        input = input.slice(0, size) + (term ? term : "");
      }
      return input;
    };
  })
  .filter("dciDate", [
    "moment",
    "user",
    function(moment, user) {
      return function(value) {
        return moment.utc(value).tz(user.timezone).format("LLL");
      };
    }
  ])
  .filter("dciFromNow", [
    "moment",
    "user",
    function(moment, user) {
      return function(value) {
        return moment.utc(value).tz(user.timezone).fromNow();
      };
    }
  ])
  .filter("dciDateDiffInMin", [
    "moment",
    function(moment) {
      return function(value1, value2) {
        return moment.utc(value1).diff(moment.utc(value2), "minutes");
      };
    }
  ])
  .filter("msToSec", [
    "$filter",
    function() {
      return function(value) {
        return Math.round(value / 1000);
      };
    }
  ]);
