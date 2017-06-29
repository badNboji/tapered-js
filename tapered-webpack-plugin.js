
function tapered() {}

tapered.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    function unComment() {
        const file = compilation.assets['INSERT TEST FILE LOCATION HERE'];
      if (file === undefined) {
        console.log('file is undefined')
        // Refactor with Promises?
          setTimeout(function(){unComment}, 1000);
      } else if (file) {
        console.log('file is defined')
        // if (file.source().includes('dabTape')) {
          compilation.assets['INSERT TEST FILE LOCATION HERE'] = {
            source: function() {
              // console.log(file.source());
              // remove BadNBojiTape if we move away from multiple file/framework feature
             return "const test = require('tape')" + "\n" + file.source().replace(/(\/\*\ ß∂dNß0j1Tape)|(\/\*\ ß∂dNß0j1)|(\*\/)/g,'');
            },
            size: function() {
              return file.source().length;
            }
          };
        // }
      }
    }
    callback();
    unComment();
  });
};

module.exports = tapered;
