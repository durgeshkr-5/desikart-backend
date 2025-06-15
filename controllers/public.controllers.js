
const Product = require("../model/product.model");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server Error!!!!"});
    }
}

// get product details by  product id
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ msg: "Product not found!!!!" });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error!!!!" });
    }
}

// get products by search query
//products?category=electronics&priceRange=100-500&search=phone
const getProductsByFilter = async (req, res) => {
    try {
        const { category, priceRange, search } = req.query;
        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            filter.price = { $gte: minPrice, $lte: maxPrice };
        }

        if (search) {
            filter.name = { $regex: search, $options: 'i' }; // case-insensitive search
        }

        const products = await Product.find(filter);
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error!!!!" });
    }
};

// get products by sorting on price or ratings
// products/sort?sortBy=price&order=asc

const getProductsBySort = async (req, res) => {
    try {
        
        const { sortBy, order } = req.query;
        const validFields = ['price', 'ratings'];
        const validOrders = ['asc', 'desc'];

        if (!validFields.includes(sortBy)) {
            return res.status(400).json({ msg: "Invalid sortBy field" });
        }

        if (!validOrders.includes(order)) {
            return res.status(400).json({ msg: "Invalid order value" });
        }

        const sort = {
            [sortBy]: order === 'asc' ? 1 : -1,
        };
        const products = await Product.find().sort(sort);
        return res.status(200).json({msg:"Products sorted successfully ", products});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error!!!!" });
    }
};

module.exports = { getAllProducts, getProductById, getProductsByFilter, getProductsBySort }