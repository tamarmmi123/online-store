export class Product {
  constructor(
    public id: number,
    public productName: string,
    public categoryId: number,
    public description: string,
    public cost: number,
    public qtyInStock: number,
    public imgSource: string
  ) {}
}
