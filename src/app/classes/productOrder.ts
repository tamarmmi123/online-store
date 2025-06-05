export class productOrder {
    constructor(
        public productId: number,
        public productName: string,
        public cost: number,
        public imgSource: string,
        public quantity: number
    ) { }
}
