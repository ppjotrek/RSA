// JavaScript file with character encoding declaration
// encoding: utf-8

window.onload = function(){

  console.log("It's alive!");

}

function keys(){

  var keys = generateKeys();
  pDiv=document.getElementById("p-and-q");
  pDiv.innerHTML = "Liczby pierwsze P i Q:  " + keys[0] + ", " + keys[1];
  nDiv=document.getElementById("n");
  nDiv.innerHTML = "n = p&timesq" + " = " + keys[2];
  fiDiv=document.getElementById("fi");
  fiDiv.innerHTML = "&#966; = (p-1)&times(q-1)" + " = " + keys[3];
  eDiv=document.getElementById("e");
  eDiv.innerHTML = "e = " + keys[4];
  pubKeyDiv=document.getElementById("pubkey");
  pubKeyDiv.innerHTML = "n, e = " + keys[2] + ", " + keys[4];

}

function submit(){ //TODO: osobny przycisk "generate-keys" i osobny "encrypt-button"
  var keys = generateKeys();
  var n = keys[0];
  console.log(n);
  var e = keys[1];
  console.log(e);
  var d = keys[2];
  console.log(d);
  var message = document.getElementById("input").value;
  messageDiv = document.getElementById("encoded-message");
  ascii = encodeToAscii(message, "arr");
  asciiStr = encodeToAscii(message, "string");
  messageDiv.innerHTML = asciiStr;
  console.log(ascii);
  encryptedAscii = encrypt(ascii, n, e);
  decrypted = decrypt(encryptedAscii, n, d);
  console.log(decrypted);
  decryptedString = decodeFromAscii(decrypted);
  console.log(decryptedString);
  showDecrypted(decryptedString);
}

function generatePrime(){

  flag = true;
  while(flag){
    var prime = Math.floor(Math.random() * 1000);
    if(isPrime(prime)){
      flag = false;
    }
  }
  return prime;

}

function gcd(a, b) {
  while (b !== 0) {
      let t = b;
      b = a % b;
      a = t;
  }
  return a;
}

function isPrime(x){

  isprime = true

  if(x == 1){

    isprime = false;

  }
  else if (x > 1){

    for(let i = 2; i < x; i++){

      if(x % i == 0){
        isprime = false;
        break;
      }

    }

  } else { isprime = false; }

  return isprime;

}

function generateKeys(){

  var keysArr = [];

  flag = true;
  while(flag){
    p = generatePrime();
    q = generatePrime();
    if(p != q){
      flag = false;
    }
  }

  console.log(p);
  console.log(q);
  keysArr.push(p);
  keysArr.push(q);

  var n = p*q;

  keysArr.push(n);

  var fi = (p-1) * (q-1);
  console.log("fi:");
  console.log(fi);
  keysArr.push(fi);

  flag = true;

  while(flag){
    var e = Math.floor(Math.random() * 10000);
    if(e < fi)
      if(gcd(e, fi) == 1){
        flag = false;
      }
  }

  keysArr.push(e);

  var e_inv = findModInverse(e, fi);
  var d = e_inv % fi;

  keysArr.push(d);

  return keysArr; //[p, q, n, fi, e, d]

}

function encodeToAscii(message, mode="arr"){

  var charCodeArr = [];
  var str = "ASCII of your message is: ";

  for(let i = 0; i < message.length; i++){
    let code = message.charCodeAt(i);
    charCodeArr.push(code);
    str += message.charCodeAt(i);
    str+= " ";
  }
  if(mode == "arr"){
    return charCodeArr;
  } else if(mode == "string") {
    return str;
  }
  
}

function decodeFromAscii(asciiArray) {
  var string = "";

  for (var i = 0; i < asciiArray.length; i++) {
    var asciiCode = asciiArray[i];
    var char = String.fromCharCode(asciiCode);
    string += char;
  }

  return string;
}


function encrypt(message, n, e) {
  var result = [];

  encryptedDiv = document.getElementById("encrypted-message");
  encryptedDiv.innerHTML = "";

  for (var i = 0; i < message.length; i++) {
    var m = message[i];
    var encryptedValue = calculateEncryptedValue(m, n, e);
    result.push(encryptedValue);
    encryptedDiv.innerHTML += " " + `${encryptedValue}`
  }

  return result;
}

function decrypt(message, n, d){

  var result = [];

  

  for (var i = 0; i < message.length; i++) {
    var m = message[i];
    var decryptedValue = calculateEncryptedValue(m, n, d);
    result.push(decryptedValue);
  }

  return result;

}

function showDecrypted(message) {

  decryptedDiv = document.getElementById("decrypted-message");
  decryptedDiv.innerHTML = "";
  for(let i = 0; i < message.length; i++){

    decryptedDiv.innerHTML += `${message[i]}`;

  }

}

function calculateEncryptedValue(message, n, e) {
  var result = 1;

  while (e > 0) {
    if (e % 2 === 1) {
      result = (result * message) % n;
    }
    message = (message * message) % n;
    e = Math.floor(e / 2);
  }

  return result;
}

function findModInverse(e, phi) {
  let [x1, y1, x2, y2] = [1, 0, 0, 1];
  let a = e, b = phi;
  while (b !== 0) {
      let quotient = Math.floor(a / b);
      [x1, y1, x2, y2] = [x2, y2, x1 - quotient * x2, y1 - quotient * y2];
      [a, b] = [b, a % b];
  }
  let gcd = a;
  let modInverse = x1 % phi;
  if (modInverse < 0) {
      modInverse += phi;
  }
  return modInverse;
}