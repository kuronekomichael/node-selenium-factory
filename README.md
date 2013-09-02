node-selenium-factory
=====================

# What's this

WebDriverのテストを Node + wd-sync で書く際のinstance factoryです。
Serverの接続先やブラウザを、SauceLabs互換の環境変数もしくはコマンドライン引数から設定して切り替えできるようになります。

    WebDriverのテストの実行するのに、簡単にターゲットを切り替えたいと思いませんか？
    接続先をローカルのターゲット or 共有サーバ or SauceLabs と切り替えるのに
    テストコードを修正したくないですよねー。
    このfactoryを使って、接続先やターゲットブラウザ等をラップして、
    簡単に接続先を切り替えられるようにしましょうぜ！（●＾o＾●）

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
* [option] **SAUCE_USER_NAME**
    * SouceLabsに接続する場合のユーザ名
* [option] **SAUCE_API_KEY**
    * SouceLabsに接続する場合のAPIキー

#### example for local target

```
$ export SELENIUM_HOST="192.168.11.130"
$ export SELENIUM_PORT=8080
$ export SELENIUM_BROWSER="android"
$ export SELENIUM_PLATFORM="ANDROID"
$ export SELENIUM_VERSION="2.3"
$ export SELENIUM_COOKIE="uuid=kjfa09ir3uqrkrwjeaiofuewkl;keyword=tabasa;"
$ export SELENIUM_LOCAL_STORAGE="isTutorialCompleted=true"

$ node ./test/test-code.js
```

#### example for SauceLabs

```
$ export SELENIUM_HOST="ondemand.saucelabs.com"
$ export SELENIUM_PORT=80
$ export SELENIUM_BROWSER="android"
$ export SELENIUM_PLATFORM="Linux"
$ export SELENIUM_VERSION="4.0"
$ export SELENIUM_COOKIE="uuid=kjfa09ir3uqrkrwjeaiofuewkl;keyword=tabasa;"
$ export SELENIUM_LOCAL_STORAGE="isTutorialCompleted=true"

$ export SAUCE_USER_NAME="kuronekomichael"
$ export SAUCE_API_KEY="i4otkjf3-389r-8373-flk2-t8ioejkakgja"

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

	// 環境変数 or 実行時引数から設定を読み取ってブラウザを初期化
    browser.init(factory.defaultCapabilities());

	// CookieやLocalStorageを保存するため、いったんページを開く
    browser.get("http://example.com/");

	// テスト実行時に常時必要なCookieを設定
    factory.defaultCookieList().forEach(function(cookie) {
        browser.setCookie(cookie);
    });

	// テスト実行時に常時必要なLocalStorageを設定
    factory.defaultLocalStorageList().forEach(function(storage) {
        browser.setLocalStorage(storage);
    });

	// 改めてページを開く
    browser.get("http://example.com/");

	~~~テストコード~~~

    browser.quit();
});

```

