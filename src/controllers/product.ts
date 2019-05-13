import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import ProductEntity from '../entity/product';

export default class ProductController {

  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async product(productId: string) {
    return await this.productRepository.findOne({id: productId});
  }

  async allProducts(){
    return await this.productRepository.find();
  }

}
