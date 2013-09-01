(function() {
'use strict';

var nopt = require('nopt');

// コマンドライン引数
var knownOpts = {
    "server": String,
    "port": Number,
    "browserName": String,
    "platform": String,
    "version": String,
    "cookie": String,
    "localStorage": String
};

Object.defineProperty(exports, 'options', {
    get: function() {
        return nopt(knownOpts);
    }
});

})();// end of outermost function