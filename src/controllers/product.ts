import {getConnection} from "typeorm";

import ProductEntity from '../entity/product';

export default class ProductController {

  productRepository;

  constructor() {
    this.productRepository = getConnection().manager.getRepository(ProductEntity);
  };

  async product(productId: string) {
    return await this.productRepository.findOne({id: productId});
  }

 async allProducts(){
    return await this.productRepository.find();
  }

}
