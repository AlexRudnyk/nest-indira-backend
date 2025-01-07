declare class ProductDto {
    title: string;
    price: number;
    quantity: number;
}
export declare class CreateOrderDto {
    name: string;
    phone: string;
    email: string;
    products: ProductDto[];
    totalSum: number;
}
export {};
