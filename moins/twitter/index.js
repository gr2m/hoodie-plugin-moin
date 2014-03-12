'use strict';

var Twitter = require('twitter-1.1');
var moment = require('moment');

var parseTweet = require('../../lib/twitter/parse_tweet');
var getTemplate = require('../../lib/get_template');
var template = getTemplate('twitter');

// expects config:
//
//     since: '2014-01-01'
//     organizationName: 'hoodiehq'
//

function twitterMoin(hoodie, config, callback) {
  var day = config.since;
  var twit =  new Twitter({
    consumer_key: hoodie.config.get('twitter.consumer_key'),
    consumer_secret: hoodie.config.get('twitter.consumer_secret'),
    access_token_key: hoodie.config.get('twitter.access_token_key'),
    access_token_secret: hoodie.config.get('twitter.access_token_secret')
  });
  var keywords = (hoodie.config.get('twitter.keywords') || '').split(/\n/);
  var keywordsRegex = new RegExp('('+keywords.join('|').replace(/"/g, '').replace(/\./g, '\\.')+')', 'gi');

  console.log(JSON.stringify(keywords, '', '  '));
  console.log( hoodie.config.get('twitter.consumer_key') );

  twit.get('/search/tweets.json', {
    since:day,
    until: moment(day).add('days', 1).format('YYYY-MM-DD'),
    count: 100,
    q:keywords.join(' OR ')
  }, function(data) {
    var tweets = data.statuses.map( parseTweet );

    // search for hood.ie returns hood(ie) etc ...
    tweets = tweets.filter( function(tweet) {
      return keywordsRegex.test(tweet.text);
    });

    // highlight keywords
    tweets = tweets.map( function(tweet) {
      tweet.text = tweet.text.replace( keywordsRegex, '<strong>$1</strong>' );
      return tweet;
    });

    callback(null, {
      name: 'twitter',
      text: template(tweets),
      data: tweets
    });
  });
}

module.exports = twitterMoin;
