import { Router } from 'express';
import uuidv4 from 'uuid/v4';

import UserEntity from './entity/user';
import ReviewEntity from './entity/review';
import OrderEntity from './entity/order';
import OrderItemEntity from './entity/order-item';

import ProductController from './controllers/product';
import UserController from './controllers/user';
import ReviewController from './controllers/review';
import OrderController from './controllers/order';
import OrderItemController from './controllers/order-item';
import User from './entity/user';
import Product from './entity/product';

const router = new Router();

router.get('/products', async (req, res) => {
    return res.send(await new ProductController().allProducts());
});

// Review the product
router.get('/product/:id', async (req, res) => {

    const productId = req.params.id;
    return res.send(await new ProductController().product(productId));
});

router.post('/login', async (req, res) => {

    const controller = await new UserController();
    const productControl = await new ProductController();
    const email = req.body.email;
    const password = req.body.password;

    let user = await controller.checkIfExists(email);

    if (user) {
        if (user.password === password) {
            return res.send({user: user, allProducts: await productControl.allProducts()});
        } else {
            return res.send('Incorrect credentials');
        }
    } else {
        return res.send('Such user doesnt exist!');
    }
});

router.post('/signup', async (req, res) => {

    const controller = await new UserController();
    const email = req.body.email;
    const password = req.body.password;

    let user = await controller.checkIfExists(email);

    if (user) {
        return res.send('This email is already taken!')
    } else {
        const newUser = new UserEntity();
        newUser.email = email;
        newUser.password = password;
        controller.createUser(newUser);
        return res.send(newUser);
    }
});

router.put('/user/change-password', async (req, res) => {
    const userController = await new UserController();
    const {userId, password} = req.body;

    const updateResult = await userController.changePassword(userId, password);

    return res.send(updateResult);
});

// Post tracking info
router.post('/tracking', (req, res) => {

});

// Post a review
router.post('/product/:id/review', async (req, res) => {

    const productId = req.params.id;

    const newReview = new ReviewEntity();
    newReview.body = req.body.body;
    newReview.rating = req.body.rating;
    newReview.user = req.body.userId;
    newReview.product = productId;
    const controller = await new ReviewController();
    controller.postReview(newReview);
});

// Get a review
router.get('/product/:id/review', async (req, res) => {

     const productId = req.params.id;
     const controller = await new ProductController();
     const products = await controller.getProductReviews(productId);
     return res.send(products[0].reviews);
});

// Place an order
// TODO: potential transaction
router.post('/order', async (req, res) => {
    const {
        items,
        userId,
        country,
    } = req.body;

    const orderController = await new OrderController();
    const orderItemController = await new OrderItemController();

    const newOrder = new OrderEntity();
    const orderId = uuidv4();
    newOrder.id = orderId;

    const orderItems = items && items.map(item => {
        const {
            price,
            id,
            amount,
        } = item;

        const product = new Product();
        product.id = id;

        const itemEntity = new OrderItemEntity();
        itemEntity.price = price;
        itemEntity.amount = amount;
        itemEntity.order = newOrder;
        itemEntity.product = product;

        return itemEntity;
    });

    const user = new User();
    user.id = userId;
    user.country = country;

    newOrder.items = orderItems;
    newOrder.user = user;

    const savedOrder = await orderController.createOrder(newOrder);

    const orderItemsPromises = orderItems.map(item => {
        return new Promise(async (resolve) => {
            const savedItem = await orderItemController.createOrderItem(item);
            resolve(savedItem);
        });
    });

    await Promise.all<OrderItemEntity>(orderItemsPromises);

    return res.send(savedOrder);
});

// Get user data
router.get('/user/:id', (req, res) => {

});

// Update user data on order
router.put('/user/:id', async (req, res) => {
    
});



export default router;