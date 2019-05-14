import { Router } from 'express';
import productController from '../controllers/product';
import userController from '../controllers/user';
import userEntity from '../entity/user';
//import reviewController from '../controllers/review';

const router = new Router();

router.get('/products', async (req, res) => {
    return res.send(await new productController().allProducts());
});

// Review the product
router.get('/product/:id', async (req, res) => {

    const productId = req.params.id;
    return res.send(await new productController().product(productId));
});

router.post('/login', async (req, res) => {

    const controller = await new userController();
    const productControl = await new productController();
    const email = req.body.email;
    const password = req.body.password;

    let user = await controller.checkIfExists(email);

    if (user) {
        if (user.password == password) {
            return res.send({user: user, allProducts: await productControl.allProducts()});
        } else {
            return res.send('Incorrect credentials');
        }
    } else {
        return res.send('Such user doesnt exist!');
    }
});

router.post('/signup', async (req, res) => {

    const controller = await new userController();
    const email = req.body.email;
    const password = req.body.password;

    let user = await controller.checkIfExists(email);

    if (user) {
        return res.send('This email is already taken!')
    } else {
        const newUser = new userEntity();
        newUser.email = email;
        newUser.password = password;
        controller.postUser(newUser);
        return res.redirect('/mainpage');
    }
});

// Purchase items
router.post('/checkout', (req, res) => {

});

// Post tracking info
router.post('/tracking', (req, res) => {

});

// Post a review
router.post('/product/:id/review', (req, res) => {

});

// Get a review
router.get('/product/:id/review', async (req, res) => {

     const productId = req.params.id;
     const controller = await new productController();
    // const product = await controller.product(productId);

     const reviews = await controller.getProductReviews(productId);
     console.log(reviews);
     //console.log(product);
});

// Make an order
router.post('/order', (req, res) => {

});

// Get user data
router.post('/user/:id', (req, res) => {

});


export default router;