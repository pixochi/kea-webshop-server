import {getConnection, Repository} from 'typeorm';

import ProductRegistryEntity from '../entity/product-registry';
import Product from 'src/entity/product';

export default class ProductRegistryController {

  productRegistryRepository: Repository<ProductRegistryEntity>;

  constructor() {
    this.productRegistryRepository = getConnection().manager.getRepository(ProductRegistryEntity);
  }

  async productRegistry(productRegistryId: string) {
    return await this.productRegistryRepository.findOne({id: productRegistryId});
  }

  async allProductRegistries() {
    return await this.productRegistryRepository.find();
  }

  async createProductRegistry(productRegistry: ProductRegistryEntity) {
    return await this.productRegistryRepository.insert(productRegistry);
  }

  async getOneByCountry(country: string) {
    return await this.productRegistryRepository.findOne({country});
  }

  async changeAmountInRegistryForProduct(productId: string, country: string, amount: number) {
    const product = new Product();
    product.id = productId;

    return await this.productRegistryRepository.increment({country, product}, 'amount', amount);
  }

}
