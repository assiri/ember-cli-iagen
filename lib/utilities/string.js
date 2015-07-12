'use strict';


var STRING_DASHERIZE_REGEXP = (/[ _]/g);
var STRING_DASHERIZE_CACHE = {};
var STRING_DECAMELIZE_REGEXP = (/([a-z\d])([A-Z])/g);
var STRING_CAMELIZE_REGEXP = (/(\-|_|\.|\s)+(.)?/g);
var STRING_UNDERSCORE_REGEXP_1 = (/([a-z\d])([A-Z]+)/g);
var STRING_UNDERSCORE_REGEXP_2 = (/\-|\s+/g);

module.exports = {
  decamelize: function(str) {
    return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
  },

  dasherize: function(str) {
    var cache = STRING_DASHERIZE_CACHE,
        hit   = cache.hasOwnProperty(str),
        ret;

    if (hit) {
      return cache[str];
    } else {
      ret = this.decamelize(str).replace(STRING_DASHERIZE_REGEXP,'-');
      cache[str] = ret;
    }

    return ret;
  },

  camelize: function(str) {
    return str.replace(STRING_CAMELIZE_REGEXP, function(match, separator, chr) {
      return chr ? chr.toUpperCase() : '';
    }).replace(/^([A-Z])/, function(match) {
      return match.toLowerCase();
    });
  },

  
  classify: function(str) {
    var parts = str.split('.'),
        out = [];

    for (var i=0, l=parts.length; i<l; i++) {
      var camelized = this.camelize(parts[i]);
      out.push(camelized.charAt(0).toUpperCase() + camelized.substr(1));
    }

    return out.join('.');
  },

  underscore: function(str) {
    return str.replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2').
      replace(STRING_UNDERSCORE_REGEXP_2, '_').toLowerCase();
  },

  capitalize: function(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  }
};

