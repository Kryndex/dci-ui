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

'use strict';

require('app')
.controller('ListTopicsCtrl', [
  '$injector', '$scope', function($injector, $scope) {
    var $state = $injector.get('$state');
    var moment = $injector.get('moment');
    var api = $injector.get('api');
    var page = parseInt($state.params.page) || 1;

    api.topics.list(page)
      .then(function(data) {
        $scope.topics = data.topics;
        _.each(data.topics, function(topic) {
          topic.created_at_formatted = moment(topic.created_at)
            .local()
            .format();
          topic.updated_at_formatted = moment(topic.updated_at)
            .local()
            .format();
        });
        $scope.pagination = {
          total: data._meta.count,
          page: page,
          pageChanged: function() {
            $state.go('topics', $scope.pagination);
          }
        };
      });
  }
]);