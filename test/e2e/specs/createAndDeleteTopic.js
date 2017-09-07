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

const shortcuts = require("./shortcuts");

module.exports = {
  "Can create and delete a topic": function(browser) {
    const topicName = "_Test Topic " + Date.now();
    shortcuts(browser)
      .login()
      .goAndWaitH1("#navbar-primary__admin-users-link", "Users")
      .goAndWaitH1("#navbar-secondary__admin-topics-link", "Topics")
      .goAndWaitH1("#admin__create-topic-btn", "Create a new topic");

    browser
      .waitForElementVisible("#topicName")
      .setValue("#topicName", topicName)
      .click('select[id="productID"]')
      .waitForElementVisible("option[name='OpenStack']")
      .click("option[name='OpenStack']")
      .waitForElementVisible("#createButton")
      .click("#createButton")
      .useXpath()
      .waitForElementNotPresent(
        "//a[starts-with(normalize-space(.),'" + topicName + "')]"
      )
      .useCss()
      .waitForElementVisible(".btn-danger")
      .click(".btn-danger")
      .useXpath()
      .waitForElementVisible(
        "//button[starts-with(normalize-space(.),'Yes delete " +
          topicName +
          "')]"
      )
      .click(
        "//button[starts-with(normalize-space(.),'Yes delete " +
          topicName +
          "')]"
      )
      .waitForElementNotPresent(
        "//a[starts-with(normalize-space(.),'" + topicName + "')]"
      )
      .useCss();

    shortcuts(browser).logout().end();
  }
};