const path = require("path");
const fs = require("fs");
const Event = require("events");
const event = new Event();
const os = require("os");

// // Q1:
// function currentPath() {
//   console.log({ File: __filename, Dir: __dirname });
// }
// currentPath();

// //Q2:
// function fileName(url) {
//   console.log(path.basename(url));
// }
// fileName("/user/files/report.pdf");

// //Q3:
// function pathFormat(obj) {
//   console.log(path.format(obj));
// }
// let obj = { dir: "/folder", name: "app", ext: ".js" };
// pathFormat(obj);

// //Q4:
// function fileExt(url) {
//     console.log(path.extname(url));
// }
// fileExt("/docs/readme.md")

// //Q5:
// function fileParse(url) {
// console.log({Name:path.parse(url).name,Ext:path.parse(url).ext});
// }
// fileParse("/home/app/main.js")

// //Q6:
// function absoluteTest(url) {
//     console.log(path.isAbsolute(url));
// }
// absoluteTest(__filename)

// //Q7:
// function join(...params){
//     console.log(path.join(...params));
// }
// join("src","component","App.js")

// //Q8:
// function absolutePath(url) {
//     console.log(path.resolve(url));
// }
// absolutePath("./task2.js")

// //Q9:
// function join(path1,path2){
//     console.log(path.join(path1,path2));
// }
// join("/folder1", "folder2/file.txt")

// //Q10:
// function deleteFile(url) {
//   fs.unlink(url, (err) => {
//     if (err) {
//       console.log({ err });
//       return;
//     }
//     console.log("The file is deleted");
//   });
// }
// deleteFile("/Users/moham/Desktop/Route/test.txt");

// //Q11:
// function createFolder(name) {
//   fs.mkdirSync(name);
//   console.log("Success");
// }
// createFolder("Test");

// //Q12:
// event.on("start",function () {
//     console.log("Welcome event triggered!");
// })
// event.emit("start")

// //Q13:
// event.on("login",function(name){
//     console.log(`User logged in:${name}`);
// })
// event.emit("login","Omar")

// //Q14:
// function readFile(url){
//     const data = fs.readFileSync(url,"utf-8")
//     console.log(`The file content=> ${data}`);
// }
// readFile("./test.txt")

// //Q15:
// function writeFile(url , content) {
//     fs.writeFile(url,content,"utf-8",(err)=>{
//         if(err){
//             console.log({err});
//         }
//     })
// }
// writeFile("./test.txt","Hello")

// //Q16:
// function folderExist(url) {
//   console.log(fs.existsSync(url));
// }
// folderExist("./Test")

// //Q17:
// function systemInfo() {
//   console.log({ Platform: os.platform(), Arch: os.arch() });
// }
// systemInfo();
