var _a, _b;
import User from "./utils/classes.js";
localStorage.clear();
let userArr = [];
const initData = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "../../../build/data/users.json", true);
    xhr.onload = function () {
        let response = JSON.parse(this.responseText);
        response = response.users;
        userArr.push(...response);
        localStorage.setItem("userData", JSON.stringify(response));
    };
    console.log(userArr);
    xhr.send();
};
initData();
const rgst_handler = () => {
    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    let city = document.getElementById("city");
    let country = document.getElementById("country");
    let age = document.getElementById("age");
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    if (fname.value == "" || lname.value == "" || city.value == "" || country.value == "" || age.value == ""
        || username.value == "" || password.value == "") {
        alert("Missing data ,Please Fill All Fields!");
    }
    else {
        const ids = userArr.map(u => {
            return u.id;
        });
        let nextId = Math.max(...ids) + 1;
        let user = new User(nextId, fname.value, lname.value, city.value, country.value, Number(age.value), username.value, password.value);
        console.log(user);
        console.log(nextId);
        userArr.push(user);
        localStorage.setItem("userData", JSON.stringify(userArr));
        fname.value = "";
        lname.value = "";
        city.value = "";
        country.value = "";
        age.value = "";
        username.value = "";
        password.value = "";
        //refreshData();
        console.log(userArr);
    }
};
const login_handler = () => {
    setTimeout(function () {
        window.location.href = "../../pages/Login.html";
    }, 3000);
};
(_a = document.getElementById("rgst")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", rgst_handler);
(_b = document.getElementById("Login")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", login_handler);
