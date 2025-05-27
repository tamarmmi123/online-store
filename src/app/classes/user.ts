import { Order } from "./order";

export class User {
    constructor(
        public id : number,
        public userName : string,
        public password : string,
        public firstName : string,
        public lastName : string,
        public phoneNumber : string,
        public address : string,
        public email : string,
        public orders : Order[],
        public role : string
    ){ }

}
