'use strict';

function parseUser (user) {
  if (! user) {
    return user;
  }
  return {
    login: user.login,
    gravatar_id: user.gravatar_id,
    site_admin: user.site_admin
  };
}

module.exports = parseUser;
