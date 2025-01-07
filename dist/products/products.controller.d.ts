import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<import("./schemas/products.schema").Product>;
    findAll(): Promise<import("./schemas/products.schema").Product[]>;
    findOne(id: string): Promise<import("./schemas/products.schema").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./schemas/products.schema").Product>;
    remove(id: string): Promise<import("./schemas/products.schema").Product>;
}
