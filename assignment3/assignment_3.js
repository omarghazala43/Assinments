const fs = require("fs");
const zlib = require("zlib");
const http = require("http");

// //Q1:

// const stream = fs.createReadStream("./big.txt", "utf8");
// stream.on("data", (chunk) => {
//   console.log(chunk);
// });

// stream.on("end", () => {
//   console.log("File reading finished");
// });

// //Q2:

// const readStream = fs.createReadStream("./source.txt");
// const writeStream = fs.createWriteStream("./dest.txt");

// readStream.pipe(writeStream);

// //Q3:

// const readStream = fs.createReadStream("./data.txt");
// const writeStream = fs.createWriteStream("./data.txt.gz");

// readStream.pipe(zlib.createGzip()).pipe(writeStream);

// //API  ########

// //Q1:

// const server = http.createServer((req, res) => {
//   const { method, url } = req;
//   if (method === "POST" && url === "/user") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk;
//     });
//     req.on("end", () => {
//       const newUser = JSON.parse(body);

//       const users = JSON.parse(
//         fs.readFileSync("./assignment3/users.json", "utf-8"),
//       );

//       if (!users.find((user) => user.email === newUser.email)) {
//         users.push(newUser);
//         console.log("User added successfully");
//         res.write("User added successfully");
//       } else {
//         console.log("Email already exists");
//         res.write("Email already exists");
//       }
//       fs.writeFileSync("./assignment3/users.json", JSON.stringify(users,null,2));
//       res.end();
//     });
//   }
// });

// server.listen("8000", () => {
//   console.log("server run on port 8000");
// });

// //Q2:

// const server = http.createServer((req, res) => {
//   const { method, url } = req;
//   if (method === "PATCH" && url.startsWith("/user")) {
//     const id = Number(url.split("/")[2]);

//     let body = "";

//     req.on("data", (chunk) => {
//       body += chunk;
//     });

//     req.on("end", () => {
//       const updatedData = JSON.parse(body);
//       const users = JSON.parse(
//         fs.readFileSync("./assignment3/users.json", "utf-8"),
//       );
//       const wantedUser = users.find((user) => (user.id === id));

//       if (!wantedUser) {
//         return res.end("User not found");
//       }

//       if (updatedData.name) wantedUser.name = updatedData.name;
//       if (updatedData.age) wantedUser.age = updatedData.age;
//       if (updatedData.email) wantedUser.email = updatedData.email;

//       fs.writeFileSync("./assignment3/users.json", JSON.stringify(users, null, 2));

//       res.end("User updated");
//     });
//   }
// });
// server.listen("8000", () => {
//   console.log("server run on port 8000");
// });

// //Q3:

// const server = http.createServer((req, res) => {
//   const { method, url } = req;

//   if (method === "DELETE" && url.startsWith("/user")) {
//     const id = Number(url.split("/")[2]);

//     const users = JSON.parse(
//       fs.readFileSync("./assignment3/users.json", "utf8"),
//     );

//     const newUsers = users.filter((user) => user.id !== id);

//     if (newUsers.length === users.length) {
//     return res.end("User not found");
//   }

//     fs.writeFileSync(
//       "./assignment3/users.json",
//       JSON.stringify(newUsers, null, 2),
//     );

//     res.end("User deleted");
//   }
// });

// server.listen("8000", () => {
//   console.log("server run on port 8000");
// });

// //Q4:

// const server = http.createServer((req, res) => {
//   const { method, url } = req;
//   if (method === "GET" && url === "/user") {
//     const users = JSON.parse(
//       fs.readFileSync("./assignment3/users.json", "utf-8"),
//     );
//     res.writeHead(200, { "content-type": "application/json" });

//     res.end(JSON.stringify(users));
//   }
// });

// server.listen("8000", () => {
//   console.log("server run on port 8000");
// });

// //Q5:

// const server = http.createServer((req, res) => {
//   const { method, url } = req;

//   if (method === "GET" && url.startsWith("/user")) {
//     const id = Number(url.split("/")[2]);
//     const users = JSON.parse(
//       fs.readFileSync("./assignment3/users.json", "utf-8"),
//     );
//     const wantedUser = users.find((user) => user.id === id);
//     if (!wantedUser) {
//       res.end("User ID not found");
//     } else {
//       res.writeHead(200, { "content-type": "application/json" });
//       res.end(JSON.stringify(wantedUser));
//     }
//   }
// });

// server.listen("8000", () => {
//   console.log("server run on port 8000");
// });

// #############################

// Essay:
//Q1:
// The Event Loop is the system that allows Node.js to handle many tasks at the same time using a single main thread,
//  It continuously checks for completed operations and runs their callbacks when the main thread is available

//Q2:
// Libuv is a C library used internally by Node.js. it provides the Event Loop, manages asynchronous operations,
//  and helps Node.js perform tasks such as file handling

//Q3:
// When an asynchronous operation is requested, Node.js passes it to Libuv and  While the operation is being processed
// Node.js continues executing other code and once the operation finishes its result is returned and processed by the Event Loop

//Q4:
// The call stack is where functions are executed. The Event Queue stores completed asynchronous tasks waiting to run.
//  The Event Loop continuously checks the call stack and moves tasks from the Event Queue to the call stack when it becomes available.

//Q5:
//The Thread Pool is a group of worker threads managed by Libuv to handle certain time consuming operations in the background.
//  By default, it contains four threads, and its size can be increased by setting the UV_THREADPOOL_SIZE  variable

//Q6:
// Blocking code makes Node.js wait until a task is finished before continuing
// Non blocking code allows Node.js to continue running other tasks while the operation is completed in the background
