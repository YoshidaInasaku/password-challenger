'use strict';
const length = 12;    // passwordの長さを指定
const charset =
'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + '0123456789';    // passwordで使用する文字の候補

/**
 * パスワードを生成する（長さ：12文字）
 */
function passwordGenerator() {
  let password = '';    // パスワードの変数を宣言
  // ループでランダムな文字列をつなげていく（出力は charset[index]）
  for(let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];    // Math.floor():引数として与えられた最大の数字を返却  Math.random():0-1の中でランダムに浮動小数点を返す    
  }

  // 正規表現を用いて「a-z / A-Z / 0-9」の文字列がパスワードして使用されているかをtest()関数を用いてチェックしている  test():与えられた文字列が部分一致しているかを返す（true / false）
  const includeAllTypes = 
  /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password);
  return includeAllTypes ? password : passwordGenerator();    // 三項演算子（ ? と : を用いて if else 文を短く書ける）　true なら passwordを返却　falseなら もう一度生成
}

console.log(passwordGenerator());