import {getConnection, Repository} from 'typeorm';

import ProductEntity from '../entity/product';
import Category from 'src/entity/category';

export default class ProductController {

  productRepository: Repository<ProductEntity>;

  constructor() {
    this.productRepository = getConnection().manager.getRepository(ProductEntity);
  }

  async product(productId: string) {
    return await getConnection().manager.query(`EXECUTE getProductById ${productId};`);
  }

  async allProducts() {
    return await getConnection().manager.query(`EXECUTE getAllProducts;`);
  }

  async getProductReviews(productId: string) {
    return await this.productRepository.find({relations: ['reviews'], where: { id: productId }});
  }

  async postProduct(product: ProductEntity) {

    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // let's now open a new transaction
    await queryRunner.startTransaction();

    let newProduct;

    try {
      if (product.rating > 10 || product.rating < 1) {
        throw new Error('Product rating must be between 1 and 10!');
      }

      const productCategory = await queryRunner.manager.findOne(Category, {name: product.category.name});

      if (!productCategory) {
        const newProductCategory = new Category();
        newProductCategory.name = product.category.name;
        newProductCategory.products = [newProduct];
        // throw 'Uncomment this line with `throw` if you want to see that ROLLBACK works';
        await queryRunner.manager.save(newProductCategory);
      }

      newProduct = await queryRunner.manager.save(product);

      // commit transaction now
      await queryRunner.commitTransaction();
    } catch (error) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created
      await queryRunner.release();
      return newProduct;
    }
  }

}
