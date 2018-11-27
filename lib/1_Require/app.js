/* First way */
/****************************************************/

// sayHelloInEnglish = function() {
//   return "HELLO";
// },
     
// sayHelloInSpanish = function() {
//   return "Hola";
// }

// module.exports.sayHelloInEnglish = sayHelloInEnglish;
// module.exports.sayHelloInSpanish = sayHelloInSpanish;


/* 2nd way */
/****************************************************/

// module.exports.sayHelloInEnglish = function() {
//   return "HELLO";
// },
     
// module.exports.sayHelloInSpanish = function() {
//   return "Hola";
// }

/* 3rd way */
/****************************************************/

sayHelloInEnglish = function() {
  return "HELLO";
},
     
sayHelloInSpanish = function() {
  return "Hola";
}

module.exports ={sayHelloInEnglish, sayHelloInSpanish}



