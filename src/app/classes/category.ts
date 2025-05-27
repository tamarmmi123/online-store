import { Product } from "./product";

export class Category {
     constructor(
            public id : number,
            public prodName : string,
            public Products : Product[]
        ){ }
}
