function tapered() {}

tapered.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    function unComment() {
      const file = compilation.assets['INSERT TEST FILE LOCATION HERE'];
      if (file === undefined) {
        setTimeout(function() {
          unComment
        }, 1000);
      } else if (file) {
        compilation.assets['INSERT TEST FILE LOCATION HERE'] = {
          source: function() {
            return "const test = require('tape')" + "\n" + file.source().replace(/(\/\*\ ß∂dNß0j1Tape)|(\/\*\ ß∂dNß0j1)|(\*\/)/g, '');
          },
          size: function() {
            return file.source().length;
          },
        };
      }
    }
    callback();
    unComment();
  });
};

module.exports = tapered;
