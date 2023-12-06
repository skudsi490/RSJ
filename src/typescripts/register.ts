
import User from "./utils/classes.js";

let userArr: User[] = [];


const initData = (): void => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../build/data/users.json", true); 

    xhr.onload = () => {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText).users;
            userArr = data.map((u: any) => new User(u.id, u.fname, u.lname, u.address.city, u.address.country, u.age, u.username, u.password));
            localStorage.setItem("userData", JSON.stringify(userArr));
        } else {
            console.error("Failed to load user data:", xhr.status, xhr.statusText);
        }
    };
    xhr.onerror = () => console.error("Network error occurred while fetching user data.");
    xhr.send();
};

// Registration handler
const rgst_handler = (): void => {
    const fname = (document.getElementById("fname") as HTMLInputElement).value;
    const lname = (document.getElementById("lname") as HTMLInputElement).value;
    const city = (document.getElementById("city") as HTMLInputElement).value;
    const country = (document.getElementById("country") as HTMLInputElement).value;
    const age = (document.getElementById("age") as HTMLInputElement).value;
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!fname || !lname || !city || !country || !age || !username || !password) {
        alert("Missing data, Please Fill All Fields!");
        return;
    }

    const nextId = userArr.length > 0 ? Math.max(...userArr.map(u => u.id)) + 1 : 1;
    const newUser = new User(nextId, fname, lname, city, country, Number(age), username, password);
    userArr.push(newUser);
    localStorage.setItem("userData", JSON.stringify(userArr));
    
    console.log("User registered:", newUser);
    window.location.href = "../../pages/Login.html"; 
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("rgst")?.addEventListener("click", rgst_handler);
    document.getElementById("Login")?.addEventListener("click", () => window.location.href = "../../pages/Login.html");
    initData();
});
