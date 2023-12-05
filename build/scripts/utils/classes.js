export default class User {
    constructor(id, fname, lname, city, country, age, username, password) {
        this.address = { city: "", country: "" };
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.address.city = city;
        this.address.country = country;
        this.age = age;
        this.username = username;
        this.password = password;
    }
}
