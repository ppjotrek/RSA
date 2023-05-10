/*window.onload = function(){
  generateKeys();
}*/

function submit(){ //TODO: osobny przycisk "generate-keys" i osobny "encrypt-button"
  var keys = generateKeys();
  var n = keys[0];
  console.log(n);
  var e = keys[1];
  console.log(e);
  var message = document.getElementById("input").value;
  messageDiv = document.getElementById("encoded-message");
  ascii = encodeToAscii(message, "arr");
  asciiStr = encodeToAscii(message, "string");
  messageDiv.innerHTML = asciiStr;
  console.log(ascii);
  encrypt(ascii, n, e);
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

  var n = p*q;

  keysArr.push(n);

  var fi = (p-1) * (q-1);
  console.log("fi:");
  console.log(fi);

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

  pCell = document.getElementById("p");
  pCell.innerHTML = "p = " + `${p}`;
  qCell = document.getElementById("q");
  qCell.innerHTML = "q = " + `${q}`;
  pCell = document.getElementById("n");
  pCell.innerHTML = "n = " + `${n}`;
  pCell = document.getElementById("e");
  pCell.innerHTML = "Public key: e = " + `${e}`;
  pCell = document.getElementById("d");
  pCell.innerHTML = "Private key: d = " + `${d}`;

  return keysArr; //[n, e, d]

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