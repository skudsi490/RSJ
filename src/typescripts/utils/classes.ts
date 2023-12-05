export default class User{
    public id:number;
    public fname:string;
    public lname:string;
    public address:{city:string ,country:string}={city:"",country:""};
    public age:number;
    public username:string;
    public password:string;    
    constructor(id:number,fname:string,lname:string,
                city:string,country:string,age:number,username:string,password:string){
        this.id=id;
        this.fname=fname;
        this.lname=lname;
        this.address.city=city;
        this.address.country=country;
        this.age=age;
        this.username=username;
        this.password=password;
    }

}