'use strict';

var AndBang = require('andbang');
var moment = require('moment');
var getTemplate = require('../../lib/get_template');
var template = getTemplate('andbang');

// expects config:
//
//     since: '2014-01-01'
//     organizationName: 'hoodiehq'
//

// 1. create app https://accounts.andbang.com/
// 2. create token https://accounts.andbang.com/authorizations

function andbang(hoodie, config, callback) {
  var api = new AndBang();

  console.log('andbang\'n ... ');

  // then log in
  api.validateToken(hoodie.config.get('andbang.token'), function (error/*, yourUser*/) {
    if (error) {
      console.log(error);
      return callback(error);
    }
  });

  // 'ready' is triggered when you're successfully logged in
  api.on('ready', function () {
    // once 'ready' has been triggered
    // all your normal API functions are available
    // as function calls.

    console.log('ready! ... ');

    var hoodieTeamId = 169;
    api.getMembers(hoodieTeamId, function(error, members) {
      if (error) {
        console.log(error);
        return callback(error);
      }

      members = members.reduce(function(map, member) {
        map[member.id] = {
          lastLogin: moment(parseInt(member.lastLogin)).format('ddd, hA'),
          name: member.firstName,
          picUrl: 'https:' + member.smallPicUrl,
          shippedTasks: []
        };
        return map;
      }, {});

      api.getTeamActiveTasks(hoodieTeamId, function(error, activeTasks) {
        if (error) {
          console.log(error);
          return callback(error);
        }


        Object.keys(activeTasks).forEach(function(memberId) {
          members[memberId].activeTask = activeTasks[memberId].title;
        });
        api.getTeamShippedTasks(hoodieTeamId, function(error, shippedTasks) {
          if (error) {
            console.log(error);
            return callback(error);
          }

          shippedTasks.forEach(function(shippedTask) {

            var shippedAt = moment(parseInt(shippedTask.shippedAt)).format('YYYY-MM-DD');
            if (shippedAt < config.since) {
              return;
            }

            members[shippedTask.shippedBy].shippedTasks.push(shippedTask.title);
          });

          callback(null, {
            name: 'andbang',
            text: template({members: members}),
            data: members
          });
        });
      });
    });
  });
}

module.exports = andbang;
