// register.ts
import User from "./utils/classes.js";
let userArr = [];
// Function to initialize user data from a local JSON file
const initData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../build/data/users.json", true);
    xhr.onload = () => {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText).users;
            userArr = data.map((u) => new User(u.id, u.fname, u.lname, u.address.city, u.address.country, u.age, u.username, u.password));
            localStorage.setItem("userData", JSON.stringify(userArr));
        }
        else {
            console.error("Failed to load user data:", xhr.status, xhr.statusText);
        }
    };
    xhr.onerror = () => console.error("Network error occurred while fetching user data.");
    xhr.send();
};
// Registration handler
const rgst_handler = () => {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    const age = document.getElementById("age").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (!fname || !lname || !city || !country || !age || !username || !password) {
        alert("Missing data, Please Fill All Fields!");
        return;
    }
    const nextId = userArr.length > 0 ? Math.max(...userArr.map(u => u.id)) + 1 : 1;
    const newUser = new User(nextId, fname, lname, city, country, Number(age), username, password);
    userArr.push(newUser);
    localStorage.setItem("userData", JSON.stringify(userArr));
    console.log("User registered:", newUser);
    window.location.href = "../../pages/Login.html"; // Redirect to login page after registration
};
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b;
    (_a = document.getElementById("rgst")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", rgst_handler);
    (_b = document.getElementById("Login")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => window.location.href = "../../pages/Login.html");
    initData();
});
