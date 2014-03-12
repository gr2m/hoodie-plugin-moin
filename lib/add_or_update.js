'use strict';

function addOrUpdate(db, type, id, object, callback) {
  db.update(type, id, object, function(error) {

    if(error && error.error === 'not_found') {
      object.id = id;
      return db.add(type, object, callback);
    }

    if (error) {
      return callback(error);
    }

    callback(null);
  });
}

module.exports = addOrUpdate;