'use strict';

function parseLabels (labels) {
  return labels.map( function(label) {
    return label.name;
  });
}

module.exports = parseLabels;
