var _a, _b;
import User from "./utils/classes.js";
let userArr = [];
// Function to initialize user data from a local JSON file
const initData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../../build/data/users.json", true);
    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText).users;
            userArr = response;
            localStorage.setItem("userData", JSON.stringify(response));
        }
        else {
            console.error("Failed to load user data: ", this.status, this.statusText);
        }
    };
    xhr.onerror = function () {
        console.error("Network error occurred while fetching user data.");
    };
    xhr.send();
};
initData();
// Registration handler
const rgst_handler = () => {
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const city = document.getElementById("city");
    const country = document.getElementById("country");
    const age = document.getElementById("age");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    if (fname.value === "" || lname.value === "" || city.value === "" || country.value === "" ||
        age.value === "" || username.value === "" || password.value === "") {
        alert("Missing data, Please Fill All Fields!");
    }
    else {
        // Generate a new user ID
        const nextId = userArr.length > 0 ? Math.max(...userArr.map(u => u.id)) + 1 : 1;
        let user = new User(nextId, fname.value, lname.value, city.value, country.value, Number(age.value), username.value, password.value);
        userArr.push(user);
        localStorage.setItem("userData", JSON.stringify(userArr));
        // Clear form fields after registration
        fname.value = "";
        lname.value = "";
        city.value = "";
        country.value = "";
        age.value = "";
        username.value = "";
        password.value = "";
        console.log("User registered:", user);
    }
};
// Handler for redirecting to the login page
const login_handler = () => {
    setTimeout(() => {
        window.location.href = "../../pages/Login.html";
    }, 3000);
};
(_a = document.getElementById("rgst")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", rgst_handler);
(_b = document.getElementById("Login")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", login_handler);
