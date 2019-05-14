import { Router } from 'express';
import Controller from '../controllers/product';

const router = new Router();

router.get('/products', (req, res) => {
    return res.send(new Controller().allProducts());
});

router.post('/login', (req, res) => {

});

router.post('/signup', (req, res) => {
    return res.send('signup')
});

// Review the product
router.get('/product/:id', (req, res) => {
    return;
});

//Add to cart
router.post('/product/:id', (req, res) => {
    return;
});

// Purchase items
router.post('/checkout', (req, res) => {

});

// Post tracking info
router.post('/tracking', (req, res) => {

});

export default router;