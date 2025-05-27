import { User } from "./user"

export class Order {
    constructor(
        public id: number,
        public orderDate: Date,
        public userId: number,
        public user: User,
        public totalSum: number
    ) { }
}
