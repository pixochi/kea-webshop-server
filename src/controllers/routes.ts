import {app} from '../index';
import Controller from '../controllers/product';

app.get('/products', (req, res) => {
    const controller = new Controller();
});
  
app.post('/login', (req, res) => {
  
});
  
app.post('/signup', (req, res) => {
    return res.send('signup')
});
  
  // Review the product
  
app.get('/product/:id', (req, res) => {
    return;
});
  
  //Add to cart
  
app.post('/product/:id', (req, res) => {
    return;
});
  
  // Purchase items
  
app.post('/checkout', (req, res) => {
  
});
  
  // Post tracking info
  
app.post('/tracking', (req, res) => {
  
});