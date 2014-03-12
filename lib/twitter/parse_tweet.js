'use strict';

// {
//   "metadata": {
//     "result_type": "recent",
//     "iso_language_code": "en"
//   },
//   "created_at": "Sat Jan 25 21:46:08 +0000 2014",
//   "id": 427195706936676350,
//   "id_str": "427195706936676352",
//   "text": "#offlinefirst is a great priority for many reasons, the biggest being a whole different notion of perf. Prefetch like crazy b/c 200ms==SLOW.",
//   "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
//   "truncated": false,
//   "in_reply_to_status_id": null,
//   "in_reply_to_status_id_str": null,
//   "in_reply_to_user_id": null,
//   "in_reply_to_user_id_str": null,
//   "in_reply_to_screen_name": null,
//   "user": {
//     "id": 7784242,
//     "id_str": "7784242",
//     "name": "Olov Lassus",
//     "screen_name": "olov",
//     "location": "Linköping, Sweden",
//     "description": "Passionate Programmer",
//     "url": "http://t.co/cyWJILuFmQ",
//     "entities": {
//       "url": {
//         "urls": [
//           {
//             "url": "http://t.co/cyWJILuFmQ",
//             "expanded_url": "http://lassus.se",
//             "display_url": "lassus.se",
//             "indices": [
//               0,
//               22
//             ]
//           }
//         ]
//       },
//       "description": {
//         "urls": []
//       }
//     },
//     "protected": false,
//     "followers_count": 491,
//     "friends_count": 150,
//     "listed_count": 33,
//     "created_at": "Sat Jul 28 13:49:13 +0000 2007",
//     "favourites_count": 125,
//     "utc_offset": 3600,
//     "time_zone": "Stockholm",
//     "geo_enabled": false,
//     "verified": false,
//     "statuses_count": 3282,
//     "lang": "en",
//     "contributors_enabled": false,
//     "is_translator": false,
//     "profile_background_color": "9AE4E8",
//     "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
//     "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
//     "profile_background_tile": false,
//     "profile_image_url": "http://pbs.twimg.com/profile_images/378800000669684644/425325010a3b4262ed657224eead5d56_normal.png",
//     "profile_image_url_https": "https://pbs.twimg.com/profile_images/378800000669684644/425325010a3b4262ed657224eead5d56_normal.png",
//     "profile_link_color": "0000FF",
//     "profile_sidebar_border_color": "87BC44",
//     "profile_sidebar_fill_color": "E0FF92",
//     "profile_text_color": "000000",
//     "profile_use_background_image": true,
//     "default_profile": false,
//     "default_profile_image": false,
//     "following": false,
//     "follow_request_sent": false,
//     "notifications": false
//   },
//   "geo": null,
//   "coordinates": null,
//   "place": null,
//   "contributors": null,
//   "retweet_count": 0,
//   "favorite_count": 0,
//   "entities": {
//     "hashtags": [
//       {
//         "text": "offlinefirst",
//         "indices": [
//           0,
//           13
//         ]
//       }
//     ],
//     "symbols": [],
//     "urls": [],
//     "user_mentions": []
//   },
//   "favorited": false,
//   "retweeted": false,
//   "lang": "en"
// }
function parseTweet (tweet) {
  return {
    text: tweet.text,
    user: {
      screen_name: tweet.user.screen_name,
      name: tweet.user.name,
      url: tweet.user.url,
      profile_image_url: tweet.user.profile_image_url,
      location: tweet.user.location,
      followers_count: tweet.user.followers_count
    }
  };
}

module.exports = parseTweet;