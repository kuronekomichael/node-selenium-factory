(function() {
'use strict';

var wdSync = require('wd-sync'),
    options = require('./cli').options,
    factory = {};

factory.createRemoteWebDriver = function(opt) {

    var client = wdSync.remote({
        hostname: options.server || process.env.SELENIUM_HOST,
        port: options.port || process.env.SELENIUM_PORT || 8080
    });

    if (opt && opt.verbose === true) {
        client.browser.on('status', function(info) {
          console.log(info);
        });
        client.browser.on('command', function(meth, path, data) {
            console.log(' >', meth, path, data || '');
        });
    }

    // AndroidDriverではwd.safeExecuteがJavaScript構文エラーと扱われてしまうため、
    // シンプルなスクリプトを実行するメソッドに置換
    client.browser.setLocalStorage = function(storage) {
        var browser = this;
        browser.execute('localStorage.setItem("' + storage.name + '", "' + storage.value + '");');
    };

    return client;
};

factory.defaultCookieList = function() {
    var list = [];

    var cookieString = options.cookie || process.env.SELENIUM_COOKIE || '';
    cookieString.split(/;/).forEach(function(cookie) {
        var data = cookie.split(/=/);
        if (data.length !== 2 || !data[0] || !data[1]) {
            return;
        }
        list.push({name: data[0], value: data[1]});
    });
    return list;
};

factory.defaultLocalStorageList = function() {
    var list = [];

    var localStorageString = options.localStorage || process.env.SELENIUM_LOCAL_STORAGE || '';
    localStorageString.split(/;/).forEach(function(storage) {
        var data = storage.split(/=/);
        if (data.length !== 2 || !data[0] || !data[1]) {
            return;
        }
        list.push({name: data[0], value:data[1]});
    });
    return list;
};

factory.defaultCapabilities = function() {

    var desiredCapabilities = {
        browserName: options.browserName || process.env.SELENIUM_BROWSER,
        platform: options.platform || process.env.SELENIUM_PLATFORM,
        version: options.version || process.env.SELENIUM_VERSION
/*
        platform: 'Linux',
        browserName: 'android',
        version: '4.0'
*/
    };
//    desiredCapabilities = { browserName: 'android' };
    return desiredCapabilities;
};

module.exports = factory;

})();