window.onload = function(){
  generateKeys();
  var message = document.getElementById("input").value;
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

  var fi = (p-1) * (q-1);
  console.log("fi:");
  console.log(fi);

  flag = true;

  while(flag){
    var e = Math.floor(Math.random() * 10000); //TODO: GCD function, bo to ma być względnie pierwsze z fi
    if(e < fi)
      if(gcd(e, fi) == 1){
        flag = false;
      }
  }

  var e_inv = findModInverse(e, fi);
  var d = e_inv % fi;

  pCell = document.getElementById("p");
  pCell.innerHTML += " = " + `${p}`;
  qCell = document.getElementById("q");
  qCell.innerHTML += " = " + `${q}`;
  pCell = document.getElementById("n");
  pCell.innerHTML += " = " + `${n}`;
  pCell = document.getElementById("e");
  pCell.innerHTML += " = " + `${e}`;
  pCell = document.getElementById("d");
  pCell.innerHTML += " = " + `${d}`;

  return n, e;

}

function encrypt(message, n, e){

  var newMessage = message**(e%n);

  messageDiv = document.getElementById("encrypted-message");
  messageDiv.innerHTML = newMessage;

  return newMessage;

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


  //var n, e = generateKeys();
  //encrypt(10, n, e);
