node-selenium-factory
=====================

# What's this

WebDriverのテストを Node + wd-sync で書く際のinstance factoryです。
Serverの接続先やブラウザをSauceLabs互換の環境変数、もしくはコマンドライン引数から設定して切り替えられるようにするモジュールです。

WebDriverのテストをLAN内のターゲットで実行するか、SauceLabsに接続して実行するかを切り替える際にコードを修正したくないですよね。
このfactoryを使って、接続先やターゲットブラウザ等をラップして切り替えられるようにしましょうぜ。

# How to use

### (a) 環境変数で指定する場合

* **SELENIUM_HOST**
    * Remote WebDriver ServerのIPアドレス
* **SELENIUM_PORT**
    * Remote WebDriver Serverのポート番号
* **SELENIUM_BROWSER**
    * ターゲットのブラウザ名
* **SELENIUM_PLATFORM**
    * ターゲットのプラットフォーム
* **SELENIUM_VERSION**
    * ターゲットのプラットフォームのバージョン番号
* [option] **SELENIUM_COOKIE**
    * デフォルトで設定するCookie。name=valueをセミコロン(;)で区切った文字列
* [option] **SELENIUM_LOCAL_STORAGE**
    * デフォルトで設定するlocalStorage。name=valueをセミコロン(;)で区切った文字列

#### example

```
$ export SELENIUM_HOST="192.168.11.130"
$ export SELENIUM_PORT=8080
$ export SELENIUM_BROWSER="android"
$ export SELENIUM_PLATFORM="ANDROID"
$ export SELENIUM_VERSION="2.3"
$ export SELENIUM_COOKIE="uuid=kjfa09ir3uqrkrwjeaiofuewkl;keyword=tabasa;"
$ export SELENIUM_LOCAL_STORAGE="androidDownloadJudge=true"

$ node ./test/test-code.js
```

----


### (b) コマンドライン引数で指定する場合

* **--server**
  * Remote WebDriver ServerのIPアドレス
* **--port**
  * Remote WebDriver Serverのポート番号
* **--browserName**
  * ターゲットのブラウザ名
* **--platform**
  * ターゲットのプラットフォーム
* **--version**
  * ターゲットのプラットフォームのバージョン番号
* [option] **--cookie**
  * デフォルトで設定するCookie。name=valueをセミコロン(;)で区切った文字列
* [option] **--localStorage**
  * デフォルトで設定するlocalStorage。name=valueをセミコロン(;)で区切った文字列

#### example

```
$ node ./test/test-code.js\
    --server 192.168.11.130\
    --port 8080\
    --browserName android\
    --platform "ANDROID"\
    --version "2.3"\
    --cookie "uuid=kjfa09ir3uqrkrwjeaiofuewkl;keyword=tabasa;"\
    --localStorage "isTutorialCompleted=true"\
```
----

# sample

```
var factory = require('selenium-factory');

var client  = factory.createRemoteWebDriver(),
    browser = client.browser,
    sync    = client.sync;

sync(function() {

    browser.init(factory.defaultCapabilities());

    browser.get("http://example.com/");

    factory.defaultCookieList().forEach(function(cookie) {
        browser.setCookie(cookie);
    });

    factory.defaultLocalStorageList().forEach(function(storage) {
        browser.setLocalStorage(storage);
    });

    browser.get("http://example.com/");

    browser.quit();
});

```