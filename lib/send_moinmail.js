'use strict';

var markdown = require('marked');

function sendMoinmail (hoodie, obj, callback) {
  var text = obj.results.map( function(result) { return result.text; });
  text = '# MOIN!\n\n' + text.join('\n\n');
  var email = {
    subject: 'MOIN!',
    to: hoodie.config.get('email_to'),
    from: hoodie.config.get('email_from'),
    replyTo: hoodie.config.get('email_reply_to'),
    text: text,
    html: markdown(text)
  };

  console.log('sending ...');
  hoodie.sendEmail(email, function(error) {
    if (error) {
      console.log('error sending moinmail');
      if( callback ) {
        callback(error);
      }
      return console.log(error);
    }

    console.log('email sent');
    if( callback ) {
      callback();
    }
  });
}

module.exports = sendMoinmail;
