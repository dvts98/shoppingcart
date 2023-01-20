var express = require('express');
const { response } = require('../app');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers');
var userHelpers = require('../helpers/user-helpers');
const verifyLogin=(req,res,next)=>{
if(req.session.loggedIn){
next();
}else
{
  res.redirect('/login')
}
}
/* GET home page. */
router.get('/', async function (req, res, next) {
  let user = req.session.user;
  let cartCount=null;
  if(user){
   cartCount= await userHelpers.getCartCount(req.session.user._id);
  }
  productHelpers.getAllProducts().then((products) => {
    res.render('user/view-products', { admin: false, products, user,cartCount });

  })


});
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {

    res.redirect('/')

  } else{
    res.render('user/login',{"loginErr":req.session.logginErr});
    req.session.logginErr=false;
  }
})
router.get('/sign-up', (req, res) => {
  res.render('user/sign-up');
})
router.post('/sign-up', (req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
  console.log(response);
  req.session.loggedIn=true;
  req.session.user=response;
  res.redirect('/')
  })
})
router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/')
    } else {
      req.session.logginErr="Invalid Email Or Password!!";
      res.redirect('/login')
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')

})
router.get('/cart',verifyLogin,async(req,res)=>{

let total=0
let product= await userHelpers.getCartProducts(req.session.user._id)
let cartCount=null;
  
   cartCount= await userHelpers.getCartCount(req.session.user._id);
  console.log(cartCount)
  if(cartCount){
total=await userHelpers.getTotalAmount(req.session.user._id);
  }
let user = req.session.user
res.render('user/cart',{product,user,total})
})

router.get('/add-to-cart/:id',verifyLogin,(req,res)=>{
userHelpers.addToCart(req.params.id,req.session.user._id).then(()=>{
  res.redirect('/')
})

})
router.post('/change-product-quantity',(req,res,next)=>{
 userHelpers.changeProductQuantity(req.body).then(async(response)=>{
  let cartCount=null;
  
   cartCount= await userHelpers.getCartCount(req.session.user._id);
  console.log(cartCount)
  if(cartCount){
  response.total=await userHelpers.getTotalAmount(req.body.user);
  }
    res.json(response)
  })
})
router.post('/remove-cart-item',(req,res,next)=>{
  console.log(req.body)
  userHelpers.deleteProductQuantity(req.body).then((response)=>{
    res.json(response)
  })
})
router.get('/place-order',verifyLogin, async(req,res,next)=>{
  let total=0;
  let cartCount=null;
  cartCount= await userHelpers.getCartCount(req.session.user._id);
  if(cartCount){
   total=await userHelpers.getTotalAmount(req.session.user._id);
  }
  let user = req.session.user
  res.render('user/place-order',{total,user})
})

router.post('/place-order',async(req,res,next)=>{
  let products= await userHelpers.getCartProductList(req.body.userId);
  let totalPrice=await userHelpers.getTotalAmount(req.body.userId);
  userHelpers.placeOrder(req.body,products,totalPrice).then((response)=>{
res.json({status:true})
  })
  
})

module.exports = router;
