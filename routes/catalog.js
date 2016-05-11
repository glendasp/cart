// TODO your product search pages here

// One route for the search page. this page will have a form on it - user can search for "hat"
// Perhaps this can be your home page?


// One route for list of search results  - show all of the hats in the list of items for sale

// another route for product detail page. Use parameters to display one particular product - details for one hat.
// like in the flowers app.
// this page will have an 'Add to Cart button'


var express = require('express');
var router = express.Router();
var passport = require('passport');


var Product = require('../models/Product');


// all links in this file are relavtive to /catalog/


// so abolute path of this is catalog/productlist/hat (for example)

router.get('/productlist/:cat', function(req, res, next){
  //Show list of ProductSchema

  console.log('get list of this product category ' + req.params.cat);
  //res.send('cat')
  Product.find({'category' : req.params.cat }, function(err, products) {

    console.log('product db callback')
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log('have results from DB')
    res.send(products);

    //todo : res.render(productdetail, {productlist : items})
    // in jade, build the productlist, build a link to each productdetail pages which include the ID of the product.
    // the links can be in the form /catalog/productdetail/123456765434
    // the

  })

})


// details of one item - e.g. one specific scarf.
router.get('/productDetail/:product', function(req, res, next) {

  res.send(req.param.product); //todo!  req.param.product will be an id.

  // todo replace with a call to db - get product info from the db., res.render a jade template for this product.

})


//user clicks add to cart button on product detail page
router.post('/addToCart', function(req, res, next){

  //figure out what products was added/
  // each productdetail.jade is going to have the product ID as a hidden name-value pair in a form
  // so you can read it from req.body.

  // Use req.session to store the Product object.
  // suggestion - create an array called req.session.cart (if it doesn't exist)
  // Do a DB query to get a Product Object
  // in callback, add the Product to req.session.cart
  // in callback you can either res.redirect to product page with success message OR res.redirect to cart.

  res.send('to do - add to cart.'); //todo replace this.

})





/// todo later....

router.get("/search", function(req, res, next){
//display search form here
    res.send('search form here');
});



router.get("/search", function(req, res, next) {

//display search form here
    var searchTerm = req.body.search;
    req.models.Product.find({name: searchTerm}, function (err, results) {
        //check for errors
        //if none render results page

        if (req.query.q) {
            Product.search({
                query_string: {query: req.query.q}
            }, function (err, results) {
                results:
                    if (err) return next(err);
                var data = results.hits.hits.map(function (hit) {
                    return hit;
                });
                res.render('main/search-result', {
                    query: req.query.q,
                    data: data
                });
                //searchResults template lists items found
                // searchResults should create URLS in the form
                //    /search/123456789  where 123456789 is the _id from the database.
            })
        }
    })
});

router.get("/search/:item_id", function(req, res) {
    Product.findById({ _id : req.params.id}, function(err, product) {
      if (err) return next(err);
      res.render('productdetail', { product : product });
    })
});

//
// //routes - this is for the home page
router.get('/', function(req, res) {

    console.log('route to / ')

    // Make query for unique colors, to populate the dropdown box
    db.collection('products').distinct('color', function (err, colorDocs) {
        if (err) {
            return res.sendStatus(500);
        }

        //If selecting a color and clicked the colorButton, this has a value
        if (req.query.colorButton) {
            var color = req.query.colorDropDown;    //What color was selected?
            //Get all of the flowers of the desired color.
            db.collection('products').find({'color': color}).toArray(function (err, flowerDocs) {
                if (err) {
                    return res.sendStatus(500);
                }
                //Optional - turn 'red' into 'Red' for display
                var displayColor = color.slice(0, 1).toUpperCase() + color.slice(1, color.length);
                //return res.render statement inside a callback to prevent further processing of response

                console.log(err);
                //console.log('count?' + count);

                //return res.render('productdetail',
                //    {'flowers': flowerDocs, 'currentColor': displayColor, 'flowerColors': colorDocs});
            });
        }
    });
});


module.exports = router;
