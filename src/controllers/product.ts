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

  async postProduct(product: ProductEntity) {
    if (product.rating > 10 || product.rating < 1) throw new Error('Product rating must be between 1 and 10!');
    return await this.productRepository.save(product);
  }

}
