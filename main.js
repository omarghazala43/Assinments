// //Q1:
// let num = "123";
// // Two methods:
// console.log(+num + 7);
// console.log(Number(num)+7);

// //Q2:
// let input = 0;
// let falsy = [false, "", null, undefined, NaN, 0];
// for (let x of falsy) {
//   if (x == input) {
//     console.log("Invalid");
//     break;
//   }
// }

// //Q3:
// for (let i = 0; i <= 10; i++) {
//   if (i % 2 == 0) {
//     continue;
//   } else {
//     console.log(i);
//   }
// }

// //Q4:
// let arr = [1, 2, 3, 4, 5];
// let result = arr.filter((n, index, arr) => n % 2 == 0);
// console.log(result);

// //Q5:
// let arr1 = [1, 2, 3];
// let arr2 = [4, 5, 6];
// let result = [...arr1, ...arr2];
// console.log(result);

// //Q6:
// let day = 2;
// switch (day) {
//   case 1:
//     console.log("Sunday");
//     break;
//   case 2:
//     console.log("Monday");
//     break;
//   case 3:
//     console.log("Tuesday");
//     break;
//   case 4:
//     console.log("wednesday");
//     break;
//   case 5:
//     console.log("Thursday");
//     break;
//   case 6:
//     console.log("Saturday");
//     break;
//   case 7:
//     console.log("Friday");
//     break;
//   default:
//     console.log("Invalid");
// }

// //Q7:
// let arr = ["a", "ab", "abc"];
// let result = arr.map((value, index, arr) => value.length);
// console.log(result);

// //Q8:
// let num = 15;
// if (num % 3 == 0 && num % 5 == 0) {
//   console.log("Divisible by both");
// } else {
//   console.log("Not Divisible by both");
// }

// //Q9:
// let num = 5;
// let result = (num) => num * num;
// console.log(result(num));

// //Q10:
// const person = { name: "John", age: 25 };
// function data(person) {
//   let { name, age } = person;
//   console.log(`${name} is ${age} years old`);
// }
// data(person);

// //Q11:
// function sum(...nums) {
//   let sum = 0;
//   for (let i of nums) {
//     sum += i;
//   }
//   console.log(sum);
// }
// sum(1,2,3,4,5)

// //Q12:
// function promise() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Success");
//     }, 3000);
//   });
// }

// promise().then((result) => {
//   console.log(result);
// });

// //Q13:
// let arr = [1, 3, 7, 2, 4];
// let max = arr[0];
// for (let i of arr) {
//   if (i > max) {
//     max = i;
//   }
// }
// console.log(max);

// //Q14:
// let obj = { name: "John", age: 30 };
// function keys(obj) {
//   console.log(Object.keys(obj));
// }
// keys(obj);

// //Q15:
// let str = "The quick brown fox";
// function splitter(str) {
//   console.log(str.split(" "));
// }
// splitter(str);

// Part2:
//Q1: forEach is a method for arrays that runs a function for each element but doesnt have return
//   and you cannot use break or continue inside it (use it when you want to run a function on every element)
//    for...of is a loop that iterates over the array and gives you the values and you can use break and continue.
//    (use it when you need to use continue and break)

//Q2: Hoisting: variables are moved to the top of their scope before execution
//Example:
// console.log(x);
// var x = 5;
// TDZ: happens with let and const
//Example:
// console.log(x);
// let x = 5;

//Q3: == compares values only
// === compares value and type

//Q4: The code inside try is executed normally and if error happens JS go to catch to handle it
// in async operations it is important because things like API requests can fail and try-catch helps manage these errors instead of stopping the program

//Q5:Type conversion is when we manually change data type
// Example : let num = Number("20");
//Type coercion is when JS automatically changes the type
// Example : console.log("5" - 1); // 4
