
// $(document).ready(function () {
//     var firstName = $('#addfirstname').text();
//     var lastName = $('#addlastname').text();
//     var intials = $('#addfirstname').text().charAt(0) + $('#addfirstname').text().charAt(0);
//     var profileImage = $('#imguploading').text(intials);
// });





// let list = [];
// let arraylength = 0
// let tablesize = 10;
// let startindex = 1;
// let endindex = 10;
// let maxindex = 4;
// let currentindex = 0;




// async function preloadcalculation() {
//     const res = await fetch("http://localhost:3000/employees")
//     list = await res.json();
//     arraylength = list.length;
//     maxindex = arraylength / tablesize


//     if ((arraylength % tablesize) > 0) {
//         maxindex++
//     }
// }



// function displayindexbtn() {
//     preloadcalculation()
//     $(".index_buttons button").remove();
//     $(".index_buttons").append(`<button>previous</button>`);
//     for (let i = 1; i < maxindex; i++) {
//         $(".index_buttons").append(` <button index=${i}>${i}</button>`)
//     }
//     $(".index_buttons").append(`<button>Next</button>`);

//     hightlightindexbtn()
// }



// function hightlightindexbtn() {
//     startindex = ((currentindex - 1) * tablesize) + 1;
//     endindex = (startindex + tablesize) - 1;
//     if (endindex > arraylength) {
//         endindex = arraylength;
//     }
//     $(".index_buttons button").removeClass("active");
//     $(`.index_buttons button[index='${currentindex}']`).addClass("active");


//     displaytablerows()
// }

// async function displaytablerows() {

//     const res = await fetch("http://localhost:3000/employees")
//     list = await res.json();

//     let tab_start = startindex - 1
//     let tab_end = endindex

//     let arrdata = Object.entries(list);
//     console.log(typeof (arrdata));
//     for (let i = tab_start; i < tab_end; i++) {

//         let tabledata = ""

//         let slNo = 0;



//         list.map((value) => {
//             tabledata += `<tr>
//           <th scope="row">#${++slNo}</th>
//           <td><img class="img_uploadings" src="http://localhost:3000/employees/${value.id}/avatar"> ${value.salutation}.${value.firstName} ${value.lastName}</td>
//           <td>${value.email}</td>
//           <td>${value.phone}</td>
//           <td>${value.gender}</td>
//           <td>${value.dob}</td>
//           <td>${value.country}</td>
//           <td><div class="dropdown">
//           <button class="btn drp  type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
//           <i class="fa-solid fa-ellipsis"></i>
//           </button>
//           <ul class="dropdown-menu drpmenutd" aria-labelledby="dropdownMenuButton1">
//             <li onclick="view_employee('${value.id}')"><a class="dropdown-item" href="view.html?id=${value.id}"><i class="ri-eye-line"></i></i>view details</a></li>
//             <li onclick="update_employee('${value.id}')"><a class="dropdown-item" href="#"><i class="ri-pencil-line"></i>Edit</a></li>
//             <li onclick="deleteemp('${value.id}')"><a class="dropdown-item" href="#"><i class="ri-delete-bin-6-line"></i>delete</a></li>
//           </ul>
//         </div></td>
//         </tr>`
//         });
//         document.getElementById("table_body").innerHTML = tabledata;







//         // $(".table table tbody").append(tabledata)
//     }

// }

// // getdata()

// displayindexbtn()




// IIFE
// (
//     function () {
//         let a = 10, b = 10;
//         let x = a + b;
//         console.log(x);
//     }
// )()




// (function display(name){
//     console.log(`${name}`);
// })
// ('vishnu')


//scope


// function display(){
//     let a=10;
// var c=30
//     function dispy(){
//         console.log(a);
//     }
//     dispy()
// }
// console.log(c);
// display()


// const x = 10;

// function display() {
//     const x = 19
//     if (x == 10) {
//         var c = 10;
//         const x = 18
//     }
//     console.log(x);
// }

// console.log(x);
// display()
// let hoist;

// console.log(hoist); // Output: undefined
// hoist = 'Hoisted'


// console.log(x);
// var x = 5;

// function display() {
//     let b = 10;
//     if (b == Number) {
//         console.log(b);
//     }
// }
// display()


// let now = 10;
// console.log(now);
// function geti() {
//     let now = 20;
//     console.log(now + 20);
// }
// geti();


// function nb() {
//     let v = 20;
//     function demo() {
//         console.log("hello",v);
//     }
//     demo()
// }
// nb()
// area();
// display();
// function display() {
//     console.log("hello js");
// }

// const area = () => {
//     console.log("namste");
// }


// object = {
//     name: "vishnu",
//     city: "tvm",
//     getin: function () {
//         console.log("hello", this.city, this.name);
//     }
// }

// object2 = {
//     name: "anoop"
// }

// console.log(object);


//callback 

// class person{
//     constructor(name,age){
//         this.name=name;
//         this.age=age
//     }
//     data(){
//         console.log(`${this.name} and ${this.age}`);
//     }
// }
// const newperson = new person('vishnu' ,23)
// console.log(newperson);
// newperson.data()
// arr.map((num) => {
//     console.log(num*num);
// })

// for(const array of arr){
//     if(array>0){
//  console.log(`add amount${array}`);
//     }else{
//         console.log(`ded amount${array}`);
//     }
// }

// arr.forEach((i, mov) => {
//     if (mov > 0) {
//         console.log(`add ${i + 1}:amount${mov}`);
//     } else {
//         console.log(`ded ${i + 1}:amount${mov}`);
//     }
// })

// const newarr = arr.filter((element => {
//     return element > 0

// }))
// console.log(newarr);
// let arr=[10,49,68,-89]
// let b = arr.map((item, i, arr) => 
//      item * 10

// )
// console.log(b);


// console.log(typeof (arr));
// let arr2 = [100, 208, -300, -440, 500, 690, -70, -90]


// arr2.map((e, i, ar) => {
//     ar[i] = e * 10
// })
// console.log(arr2);
// //arrow func simple
// const first = greet => make => view => console.log(`${greet}: ${make},${view}`);

// first("hi")("hwllo")("viw")
// // const greeter = first("hello")
// // greeter("vishnu")
// // greeter("anu")
// let arr3 = [100, 208, -300, -440, 500, 690, -70, -90]
// const care = ((e, i, arr) => {
//     arr[i] = e * 10;
// })

// arr3.forEach(care)
// console.log(arr3);
// console.log("/////////////////////////////");
// const uppercase = function (str) {
//     const [first, ...others] = str.split(' ')
//     return [first.toUpperCase(), ...others].join(' ')
// }

// const transform = function (str, fn) {
//     console.log(`original string:${str}`);
//     console.log(`transformed string:${fn(str)}`);
//     console.log(`original string:${fn.name}`);
// }

// transform('javascript is simple', uppercase);

// (
//     function () {
//         let a = 10, b = 10;
//         let x = a + b;
//         console.log(x);
//     }
// )()

//event loop

// let btn = document.getElementById('btn')
// btn.addEventListener('click', () => {
//     console.log("clicked");
// })
// console.log("running 1");
// setTimeout(() => {
//     console.log("running 2");
// }, 3000);
// console.log("running 3");

// console.log("start");
// function display(callbackfn) {
//     setTimeout(() => {
//         callbackfn("time out")
//     }, 2000);
// }
// display(value=>{
// console.log(value);
// })


// console.log("end");
//basic callback with array
// function allow(num){
//     return num*2
// }

// console.log(arr.map(allow));
// console.log("////////////////");
// function sw(name){
//     return function(greet){
//         console.log(`the name is:${greet} and ${name} `);
//     }
// }

// sw('anu')('vinu')

// const person={
//     name:'vishnu',
//     age:24,
//     address:"tvm",
//     fn: function (){
//         console.log(this);
//     }
// }
// person.fn()

// let arr = [100, 208, -300, -440, 500, 690, -70, -90]

// console.log(arr.at(3));
// let name = "vini"
// const person = {
//     name: 'vishnu',
//     age: 24,
//     address: "tvm",
//     fn: function () {
//         console.log(`the name is :${person.name}`);
//     },
//     menu: () => {
//         console.log(`the name is :${this.name}`);
//     }
// }
// let me= person;
// me.age=22;
// console.log(person);

// let aim= 'goal';
// let fastaim= aim;
// aim='job';
// console.log("aim",aim);
// console.log("fastaim",fastaim);

// function d(name,age,place,job){

// }

// let arr2 = arr.map((e, i, ar) => {
//     return e * 2

// });
// console.log("original", arr);
// console.log("duplicate", arr2);

//  arr.forEach(num=> 
// console.log(num)
//  )
// let num = [1, 2, 3, 4, 5, 6]
// function calc(e, i, ar) {
//     ar[i] = e * 3
// }
// num.forEach(calc);

// const [x, y, z] = arr;
// console.log(x, y, z);

//array destructuring
////////////////////////////////////////////////////////////////////////
let details = [10, 490, 89, 67, 45]

let newdata = details.filter(e => e != 10)
console.log(newdata);
// function myfilter(e){
// return e>0
// }
// let myapp= details.filter(myfilter)
// console.log(myapp);
// console.log(details.fill('70',2,4));
// console.log(details.filter(e=> e>0));
// let arr=details.slice(1,4);
// console.log(arr); 
// // let [a, b, ...others] = details
// console.log(a,b,others);
// console.log(400,...details,200);
// let [a,b,...c]= details;
// console.log(a,b,c);

//////////////////////////////promise///////////////////////////////////////////

// let promise = new Promise(function (resolve, reject) {
//     const x = 10;
//     const y = 40;
//     if (x == y) {
//         resolve();
//     } else {
//         reject();
//     }
// })


// class person{
//     constructor(name,age){
//         this.name=name;
//         this.age=age
//     }

// }

// let newperson = new person('vishnu',23)
// console.log(newperson.name);
// promise.then(function () {
//     console.log("well done");
// }).catch(() => {
//     console.log("error");
// })
// const person = {
//     name: 'vishnu',
//     age: 24,
//     address: "tvm",
//     fn: function () {
//         console.log(this);
//     }
// }
// console.log(person.__proto__);
// let {name,age}=person;
// console.log(name,age);

// let { name, age } = person
// console.log(name, age);
// let [a,b,,y]= details;
// console.log(a,b,y);
// console.log(a,b,y);
// let [a, ,b] = details
// let newar= details.slice(1,3)
// console.log(newar);

// const [starter, ender] = details.order(2, 0)
// console.log(starter, ender);

// let arr = [100, 208,[ 500, 690, -70, -90]]
// const [j,k,[ll,kk]]=arr;
// console.log(j,k,ll,kk);


// let obj = {
//     name: "vishnu"
// }

// let person = {
//     name: "anu",
//     age: 23,
//     place: 'tvm',
//     fn: function (age) {
//         console.log(`my name is ${this.name} and age is  ${age} `);
//     }

// }
// person.fn()

// person.fn.apply(obj, [20])
// console.log(result);
//object destructuring
////////////////////////////////////////////////////////////////////////
// const { data, menu } = details;
// console.log(data, menu);
// const {
//     name: first,
//     data: inform,
//     menu: item
// } = details
// console.log("destructuted data:", first, inform, item);



// ...spread operator
////////////////////////////////////////////////////////////////////////
// let details = {
//     name: 'vishnu',
//     data: ['anu', 'vinu', 'athul'],
//     menu: ['pizza', 'delight', 'burger'],
//     order: function (start, end) {
//         return [this.data[start], this.menu[end]]
//     },
//     time: {
//         mon:
//         {
//             open: 10,
//             close: 11,
//         },
//         tues:
//         {
//             open: 10,
//             close: 11,
//         },
//     }
// }




// let arr = [100, 30, 50, 60, 70, 50];
// let newarr = [1, 2, arr[0], arr[1]]
// console.log("normal", newarr);

// let spreadarr = [1, 2, ...arr]
// console.log("after", spreadarr);
// console.log(...newarr);

// let add = [...details.menu, 'apricot']
// console.log(add);

// ...shallow copy
////////////////////////////////////////////////////////////////////////
// let employee = {
//     eid: "E102",
//     ename: "Jack",
//     eaddress: "New York",
//     salary: 50000
// }
// const varia=()=>{
//     console.log("fkff");
// }
// varia()


function main() {
    var log = 'vishnu';
    console.log(log);
}
main()
// let newemployee = employee
// let newemployee= JSON.parse(JSON.stringify(employee));// deep copy
// employee.ename = 'vishnu'
// console.log("oldone", employee);
// console.log("oldone", newemployee);

// const mainmenu = [...details.data, ...details.menu]
// console.log("adding 2 array", mainmenu);

// const [a, b, ...others] = arr;
// console.log(a, b, others);

// let calcarr=arr.pop(80);
// console.log(calcarr);

// function func(...n){
//     let sum=0;
//     for(let i of n){
//         sum+=i
//     }
//     return sum
// }

// console.log(func(1,2,3));
// console.log(func(1,2,3,4));



// const [a,b,c,...other]=arr
// console.log(a,b,c,other);

// const menu1 = [...details.data, ...details.menu]
// console.log("added", menu1);
// for (const i of menu1) {
//     console.log(i);
// }

// function firstdata() {
//     let b = 1;
//     function inner() {
//         return b
//     }
//     return inner;
// }
// let getthis = firstdata();
// console.log(getthis());
// console.log(Array);




// function display(a) {

// }
// me = 10;
// console.log(me);


//      filter
///////////////////////////////////////////////////////////////////////////
// let arrwrk = [100, 30, 50, -60, -70, -50];
// function arfunc(e) {
//     return e
// }
// let one = arrwrk.filter(arfunc)
// console.log(one);


// const i=20;
// console.log(i);
// i=90;
// console.log(i);
// function dis(){
//     let a=10;
// }
// console.log(a);
// dis()
//    call method
///////////////////////////////////////////////////////////////////////////
// const newperson = {
//     firstname: 'vishnu',
//     lastname: 'v',
//     age: 24,
//     fullname: function () {
//         return this.firstname + " " + this.lastname
//     }
// }
// console.log(newperson.fullname());


// let sum = 0;
// const numbers = [65, 44, 12, 4];
// numbers.forEach(myFunction);


// function myFunction(item) {
//   sum += item;
// }
// console.log(sum);

// let b= [1,3,4,5,6,7,8];
// let bar=[100,...b,59];
// console.log("sptred",bar);

// let [a,m,...others]=b;
// console.log(a,m,others);

// let arrwrk3 = [100, 30, 50, -60, -70, -50];
// for(let i of arrwrk3){
//     if(i<50){
//  console.log(i);
//     }
// }

// console.log("////////////////////////");



/////find index

// function findindex(e){
//     return e>=30
// }
// let v=arrwrk.findIndex(findindex)
// console.log(v);

// function findarr(e) {
//     return e > 30
// }
// let n = arrwrk.find(findarr)
// console.log(n);



//promise
////////////////////

// let mypromise= new Promise((resolve,reject)=>{
//     let success= false
//     if(success){
//         resolve('successfully')
//     }
//     else{
//         reject('failed')
//     }
// })
// console.log(mypromise);

// let api = 'http://localhost:3000/employees';
// let userdata = fetch(api)
// console.log(userdata);

// let arrwrk = [30, 50, -60, -70, -50];

// function dis(e){
//     e>20
// }
// let v=arrwrk.findLast(dis);
// console.log(v);


//polyfill
//////////////////////////////////////////////////////
let arrwrk = [100, 30, 50, -60, -70, -50];
// Array.prototype.mymap = function (e) {
//     let temp = []
//     for (let i = 0; i < this.length; i++) {
//         temp.push(e(this[i]))
//     }
//     return temp;
// }
// polyfill example 2
//---------------------------------------------------//
// Array.prototype.person=function(e){
//     let temp=[];
//     for(let i=0;i<this.length;i++){
//         temp.push(e(this[i]))
//     }
//     return temp
// }
// let newar= arrwrk.person(e=>e*2)
// console.log(newar);
// let custommap = arrwrk.mymap(e => e + 2)
// console.log(custommap);
// console.log(custommap.__proto__);

// ///
// let obj= new Object()
// obj.name="'vishnu"
// console.log(obj);
// function person(name, age, place) {
//     this.name = name;
//     this.age = age;
//     this.place = place

// }
// let newperson = new person('vishnu',24, 'tvm')
// person.prototype.country = 'indian'
// console.log(`the country of the person is :${newperson.country}`);

// let custom_reduce = arrwrk.mymap((acc,i) =>acc+i)


// console.log(custom_reduce);

// const person = {
//     sayhello: function () {
//         console.log("hello");

//     },
//     name: 'vish'
// }

// let me = {
//     name: 'john'
// }

// john.__proto__ = person
// console.log(john.name);

// let obj = {};
// let obj2 = {
//     name: 'vishnu',
//     age: 24
// }
// obj.__proto__ = obj2
// console.log(obj.name);

// let animal= Object.create(obj2)
// console.log(animal.name);

// let num1 = 89;
// let num2 = false;

// console.log(num1 + num2);


//lexical
// function viewone() {
//     let x = 10;
//     function viewtwo() {
//         console.log("the data is", x);
//     }
//     viewtwo()
// }
// viewone()


// let vehicle = {
//     name: 'bmw',
//     color: 'red',

// }

// let model = {

//     type:{
//         value:'diesel'
//     } ,
//     year:{
//         value: 2018
//     }

// }

// let obj = Object.create(vehicle,model)
// console.log(obj);

// let person1 = {
//     firstName: 'vishnu',
//     lastName: 'v',
//     fullName:function(){
//         console.log(`${this.firstName} ${this.lastName}`);
//     }

// }
// let person2 = {
//     firstName: 'anandhu',
//     lastName: 'v'

// }

// function invite(greet, greet2) {
//     console.log(`${greet}, ${this.firstName} ${this.lastName},${greet2}`);
// }

// invite.call(person1, ['hello', "how are you"])
// invite.call(person2, ['hello', "how are you"])

// //invite.apply(person1,["hello","how are you"])
// let fullname= person1.fullName.bind(person2)
// console.log(fullname);


// checking two objcts are same
////////////////////////////
// const person = {
//     firstname: 'anand',
//     lastname: 'v',
//     age: 24,
//     place: 'tvm',
//     job: 'developer'
// }

// const newperson = {
//     firstname: 'anand',
//     lastname: 'v',
//     age: 20,
//     place: 'tvm',
//     job: 'developer'
// }


// function objectcheck(obj1, obj2) {

//     for (let key in obj1) {
//         if (obj1[key] !== obj2[key]) {
//             return false
//         }
//     }

//     for (let key in obj2) {
//         if (!(key in obj1)) {
//             return false
//         }
//     }

//     return true
// }

// console.log(objectcheck(person, newperson));
//  function dis(){
//     let x=10;
//     let y=20
//     if(true){
//         var z=30
//         console.log(x);
//         console.log(y);

//         console.log(z);


//     }
//     console.log(x);
//     console.log(y);

//     console.log(z);
// }
//  dis()


// function outer(){


//     let x=10;

//     function inner(){
//         console.log(x);
//     }
//    return inner()
// }
// outer()

