const express = require('express');
const { getAllProducts, getProductById, getProductsByFilter, getProductsBySort } = require('../controllers/public.controllers');


const publicRouter = express.Router();



// Get all products
publicRouter.get('/products', getAllProducts);

// Get product by ID
publicRouter.get('/products/:id', getProductById);

// Get products by filter ---> ?category=electronics&priceRange=100-500&search=phone
// publicRouter.get('/products/filter', getProductsByFilter);

// Get products by sort---> ?sortBy=price&order=asc
publicRouter.get('/products-sort', getProductsBySort);



module.exports = publicRouter;