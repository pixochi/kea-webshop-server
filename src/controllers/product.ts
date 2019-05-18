import {getConnection, Repository} from 'typeorm';

import ProductEntity from '../entity/product';

export default class ProductController {

  productRepository: Repository<ProductEntity>;

  constructor() {
    this.productRepository = getConnection().manager.getRepository(ProductEntity);
  };

  async product(productId: string) {
    return await getConnection().manager.query(`EXECUTE getProductById ${productId};`);
  }
  
  async allProducts(){
    return await getConnection().manager.query(`EXECUTE getAllProducts;`);
  }

  async getProductReviews(productId: string) {
    return await this.productRepository.find({relations: ['reviews'], where: { id: productId }});
  }

  async postProduct() {
    return await this.productRepository.save({});
  }

}
