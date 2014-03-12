'use strict';

/* global Hoodie */

Hoodie.extend(function(hoodie) {
  hoodie.moinTasks = hoodie.task('mointask');
  hoodie.moinTasks.available = [
    'github-organization-issues',
    'cat',
    'gittip'
  ];
});
