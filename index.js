'use strict';
const axios = require('axios');    // HTTPクライアントを扱うためのモジュール
const fs = require('fs');    // ファイルを扱うためのモジュール
const readline = require('readline');    // ファイルを一行ずつ読み込むためのモジュール

const rs = fs.ReadStream('password');    // passwordファイルを読み込む（fs.ReadStream('読み込むファイル名')）
const rl = readline.createInterface({    // 読み込んだ passwordファイルに書かれてある値を一行ずつ読み込むオブジェクトを作成（readline.createInterface(option)）
  input: rs, output:{}    // 読み込む際の設定（input: 入力されるデータを記述  output: {空でよい}）
});

// lineStreamが on になったら無名関数を実行（引数はline）
rl.on('line', line => {
  // 不正アクセス禁止法に抵触しないよう、自分の開発アプリケーションの検証用途に用いる
  // axios.get('URI') でBasic認証を通してURLログインする記法
  axios
  .get(`http://admin:${line}@localhost:8000/posts`)    // scheme://userName:password@hostName:portNumber/path というURI規則に従う
  .then(response => {    // 上記URIからrequestを受け取ったら実行
    if(response.status === 200) {    // statusコードを成功を表す200番で返しているなら下記を実行
      console.log(`Password is "${line}"`);
      process.exit();    // プログラムのプロセス自体を終了（process.exit()）
    }
  })
  .catch(error => {});
});

// closeイベントを受け取ったらコンソール上に処理終了のログを表示
rl.on('close', () => {
  console.log('Password File was closed');
});



