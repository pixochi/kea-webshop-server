import chai, { expect } from 'chai';


import UserController from '../src/controllers/user';
import UserEntity from '../src/entity/user';

import ProductController from '../src/controllers/product';
import ProductEntity from '../src/entity/product';

import ReviewController from '../src/controllers/review';
import ReviewEntity from '../src/entity/review';

import CategoryEntity from '../src/entity/category';

chai.use(require('chai-as-promised'));

describe('UserController', () => {
     describe('createUser', () => {
          it('should find an existing user with a provided email address', async () => {
     
               const USER_EMAIL_ADDRESS = 'user1@user.com';
               const userController = new UserController();
     
               // Delete a user
               await userController.deleteByProperties({ email: USER_EMAIL_ADDRESS });
     
               // Create a new user
               const user = new UserEntity();
               user.password = 'secret_password_929@';
               user.email = USER_EMAIL_ADDRESS;
     
               const createdUser = await userController.createUser(user);
     
               // Check if a user with the provided email address exists
               expect(createdUser).to.be.an('object');
          });
     
          it('should check if user email and password matches the inputed values', async () => {
     
               const USER_EMAIL_ADDRESS = 'user2@gmail.com';
               const userController = new UserController();
     
               // Delete a user
               await userController.deleteByProperties({ email: USER_EMAIL_ADDRESS });
     
               // Create a new user
               const user = new UserEntity();
               user.password = 'secret_password_929@';
               user.email = USER_EMAIL_ADDRESS;
     
               const createdUser = await userController.createUser(user);
               expect(createdUser.email).to.equal(USER_EMAIL_ADDRESS);
               expect(createdUser.password).to.be.equal(user.password);
          });
     
          it('should throw an error if user password is not provided', async () => {
     
               const USER_EMAIL_ADDRESS = 'user2@gmail.com';
               const userController = new UserController();
     
               // Delete a user
               await userController.deleteByProperties({ email: USER_EMAIL_ADDRESS });
     
               // Create a new user
               const user = new UserEntity();
               user.email = USER_EMAIL_ADDRESS;
     
               await expect(userController.createUser(user)).to.be.rejectedWith(`Error: Cannot insert the value NULL into column 'password', table 'schooldb.dbo.user'; column does not allow nulls. INSERT fails.`);
          });
     
          it('should throw an error if user email is not provided', async () => {
     
               const USER_EMAIL_ADDRESS = 'user2@gmail.com';
               const userController = new UserController();
     
               // Delete a user
               await userController.deleteByProperties({ email: USER_EMAIL_ADDRESS });
     
               // Create a new user
               const user = new UserEntity();
               user.password = 'secret_password_929@';
     
               await expect(userController.createUser(user)).to.be.rejectedWith(`Error: Cannot insert the value NULL into column 'email', table 'schooldb.dbo.user'; column does not allow nulls. INSERT fails.`);
          });
     
          it('should return a new user without firstName', async () => {
     
               const USER_EMAIL_ADDRESS = 'user3@gmail.com';
               const userController = new UserController();
     
               // Delete a user
               await userController.deleteByProperties({ email: USER_EMAIL_ADDRESS });
     
               // Create a new user
               const user = new UserEntity();
               user.password = 'secret_password_929@';
               user.email = USER_EMAIL_ADDRESS;
     
               const createdUser = await userController.createUser(user);
               expect(createdUser.firstName).to.be.null;
          });
     });
});

describe('ProductController', () => {
     describe('postProduct', () => {
     
          it('It should throw an error if product name is not defined', async () => {
     
               const productController = new ProductController();
     
               // Create category for the product
               const category = new CategoryEntity();
     
               category.id = '1';
     
               // Construct a product object to be posted to the database
               const product = new ProductEntity();
     
               //product.name = 'HP pavilion 15'; <---- Name is not defined
               product.price = 6000;
               product.description = 'This is a great laptopt. THE GREATESTESTESTEST';
               product.image = 'https://l.facebook.com/l.php?u=https%3A%2F%2Fi';
               product.rating = 10;
               product.category = category;
     
               // Post the product to the database
               await expect(productController.postProduct(product)).to.be.rejectedWith(`Error: Cannot insert the value NULL into column 'name', table 'schooldb.dbo.product'; column does not allow nulls. INSERT fails.`);
          });
     
          it('should throw an error if price is not defined', async () => {
     
               const productController = new ProductController();
     
               // Create category for the product
               const category = new CategoryEntity();
     
               category.id = '1';
     
               // Construct a product object to be posted to the database
               const product = new ProductEntity();
     
               product.name = 'HP pavilion 15';
               //product.price = 6000;  <---- Price is not defined
               product.description = 'This is a great laptopt. THE GREATESTESTESTEST';
               product.image = 'https://l.facebook.com/l.php?u=https%3A%2F%2Fi';
               product.rating = 10;
               product.category = category;
     
               // Post the product to the database
               await expect(productController.postProduct(product)).to.be.rejectedWith(`Error: Cannot insert the value NULL into column 'price', table 'schooldb.dbo.product'; column does not allow nulls. INSERT fails.`);
          });
     
          it('should return a product containing category id', async () => {
     
               const productController = new ProductController();
     
               // Create category for the product
               const category = new CategoryEntity();
     
               category.id = '1';
     
               // Construct a product object to be posted to the database
               const product = new ProductEntity();
     
               product.name = 'HP pavilion 15';
               product.price = 6000;
               product.description = 'This is a great laptopt. THE GREATESTESTESTEST';
               product.image = 'https://l.facebook.com/l.php?u=https%3A%2F%2Fi';
               product.rating = 10;
               product.category = category;
     
               const returnedProduct = await productController.postProduct(product);
               expect(returnedProduct.category.id).equals(category.id);
          });
     
          it('should return a product with rating less than 10.1', async () => {
     
               const productController = new ProductController();
     
               // Create category for the product
               const category = new CategoryEntity();
     
               category.id = '1';
     
               // Construct a product object to be posted to the database
               const product = new ProductEntity();
     
               product.name = 'HP pavilion 15';
               product.price = 6000;
               product.description = 'This is a great laptopt. THE GREATESTESTESTEST';
               product.image = 'https://l.facebook.com/l.php?u=https%3A%2F%2Fi';
               product.rating = 11;
               product.category = category;
     
               await expect(productController.postProduct(product)).to.be.rejectedWith(`Product rating must be between 1 and 10!`);
          });
     
          it('should check if price of a new product is correct', async () => {
     
               const productController = new ProductController();
     
               // Create category for the product
               const category = new CategoryEntity();
     
               category.id = '1';
     
               // Construct a product object to be posted to the database
               const product = new ProductEntity();
     
               product.name = 'HP pavilion 15';
               product.price = 6000;
               product.description = 'This is a great laptopt. THE GREATESTESTESTEST';
               product.image = 'https://l.facebook.com/l.php?u=https%3A%2F%2Fi';
               product.rating = 10;
               product.category = category;
     
               const returnedProduct = await productController.postProduct(product);
               expect(returnedProduct.price).to.equal(product.price);
          });
     });
});

describe('ReviewController', () => {
     describe('postReview', () => {
     
          it('should return posted review as an object', async () => {
     
               // Create User and product entities for the review
     
               const user = new UserEntity();
               const reviewController = new ReviewController();
     
               user.id = '1';
     
               const product = new ProductEntity();
               product.id = '1';
     
               // Create a new review
               const review = new ReviewEntity();
               review.body = 'This product is great';
               review.rating = 10;
               review.user = user;
               review.product = product;
     
               const returnedReview = await reviewController.postReview(review);
               expect(returnedReview).to.be.a('object');
          });
     
          it('should throw an error if rating is not defined', async () => {
     
               // Create User and product entities for the review
     
               const user = new UserEntity();
               const reviewController = new ReviewController();
     
               user.id = '1';
     
               const product = new ProductEntity();
               product.id = '1';
     
               // Create a new review
               const review = new ReviewEntity();
               review.body = 'This product is great';
               //review.rating = 10;
               review.user = user;
               review.product = product;
     
               // Post the review to the database
               await expect(reviewController.postReview(review)).to.be.rejectedWith(`Error: Cannot insert the value NULL into column 'rating', table 'schooldb.dbo.review'; column does not allow nulls. INSERT fails.`);
          });
     
          it('should throw an error if description for review doesnt exist', async () => {
     
               // Create User and product entities for the review
     
               const user = new UserEntity();
               const reviewController = new ReviewController();
     
               user.id = '1';
     
               const product = new ProductEntity();
               product.id = '1';
     
               // Create a new review
               const review = new ReviewEntity();
               review.rating = 10;
               review.user = user;
               review.product = product;
     
               // Post the review to the database
               await expect(reviewController.postReview(review)).to.be.rejectedWith(`Error: Cannot insert the value NULL into column 'body', table 'schooldb.dbo.review'; column does not allow nulls. INSERT fails.`);
          });
     
          it('should check if review rating is a negative value (below 0)', async () => {
     
               // Create User and product entities for the review
     
               const user = new UserEntity();
               const reviewController = new ReviewController();
     
               user.id = '1';
     
               const product = new ProductEntity();
               product.id = '1';
     
               // Create a new review
               const review = new ReviewEntity();
               review.rating = 0.5;
               review.body = 'Chine delivers!';
               review.user = user;
               review.product = product;
     
               // Post the review to the database
               await expect(reviewController.postReview(review)).to.be.rejectedWith(`Review rating must be between 1 and 10!`);
          });
     
          it('should check if review is not assigned to a product', async () => {
     
               // Create User and product entities for the review
     
               const user = new UserEntity();
               const reviewController = new ReviewController();
     
               user.id = '1';
     
               const product = new ProductEntity();
               product.id = '1';
     
               // Create a new review
               const review = new ReviewEntity();
               review.rating = 10;
               review.body = 'Chine delivers!';
               review.user = user;
     
               // Post the review to the database
               const returnedReview = await reviewController.postReview(review);
               expect(returnedReview.product).to.be.undefined;
          });
          
          it('should check if review is assigned to a product', async () => {
     
               // Create User and product entities for the review
     
               const user = new UserEntity();
               const reviewController = new ReviewController();
     
               user.id = '1';
     
               const product = new ProductEntity();
               product.id = '1';
     
               // Create a new review
               const review = new ReviewEntity();
               review.rating = 10;
               review.body = 'Chine delivers!';
               review.user = user;
               review.product = product;
     
               // Post the review to the database
               const returnedReview = await reviewController.postReview(review);
               expect(returnedReview.product).to.be.not.undefined;
          });
     });
});
