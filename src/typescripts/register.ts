import User from "./utils/classes.js"

let userArr: User[] = [];

// Function to initialize user data from a local JSON file
const initData = (): void => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../../build/data/users.json", true);
    xhr.onload = function() {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText).users;
            userArr = response;
            localStorage.setItem("userData", JSON.stringify(response));
        } else {
            console.error("Failed to load user data: ", this.status, this.statusText);
        }
    };
    xhr.onerror = function() {
        console.error("Network error occurred while fetching user data.");
    };
    xhr.send();
}

initData();

// Registration handler
const rgst_handler = (): void => {
    const fname = document.getElementById("fname") as HTMLInputElement;
    const lname = document.getElementById("lname") as HTMLInputElement;
    const city = document.getElementById("city") as HTMLInputElement;
    const country = document.getElementById("country") as HTMLInputElement;
    const age = document.getElementById("age") as HTMLInputElement;
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    if (fname.value === "" || lname.value === "" || city.value === "" || country.value === "" || 
        age.value === "" || username.value === "" || password.value === "") {
        alert("Missing data, Please Fill All Fields!");
    } else {
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
}

// Handler for redirecting to the login page
const login_handler = (): void => {
    setTimeout(() => {
        window.location.href = "../../pages/Login.html";
    }, 3000);
}

document.getElementById("rgst")?.addEventListener("click", rgst_handler);
document.getElementById("Login")?.addEventListener("click", login_handler);
