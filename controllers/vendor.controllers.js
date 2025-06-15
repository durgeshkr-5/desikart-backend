const Product = require("../model/product.model");
const User = require("../model/user.model");


//vendor Dashboard
const vendorDashboard = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({msg:"Unauthorized"})
        }
        // vendor information (remove password and other sensitive data)
        const vendor = await User.findById(userId).select("-password");
        if (!vendor) {
            return res.status(404).json({msg:"Vendor not found"})
        }
        // products added by the vendor
        const products = await Product.find({ userId: userId });
        return res.status(200).json({msg:"Welcome to the Vendor Panel!!!!", vendor, products: products})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server Error!!!!"})
    }
}

// Get Product
const getProduct = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({msg:"Unauthorized"})
        }
        const products = await Product.find({ userId: userId });
        if (!products || products.length === 0) {
            return res.status(404).json({msg:"No Products Found"})
        }
        return res.status(200).json({msg:"get Product", products: products})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server Error!!!!"})
    }
} 


// Add Product
const addProduct = async (req, res) => {
    try {
        // Validate request body
        if (!req.body) {
            return res.status(400).json({msg:"Please fill all the fields"})
        }

        const userId = req.user._id; 
        if (!userId) {
            return res.status(401).json({msg:"Unauthorized"})
        }

        const { name, description, price, category, stock, images, rating, numReviews } = req.body;
        if (!name || !price || !category) {
            return res.status(400).json({msg:"Please fill all the fields"})
        }   
        const product = new Product({
            name,
            description : description || "",
            price,
            category,
            stock: stock || 0,
            images: images || [],
            userId: req.user._id, 
            ratings: rating || 0,
            numReviews: numReviews || 0
        });
        const data = await product.save();
        if (!data) {
            return res.status(400).json({msg:"Product not added"})
        }
        return res.status(200).json({msg:"Product Added Successfully", product:data})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server Error!!!!"})
    }
}


// update product
const updateProduct = async (req, res) => {
    try {
        // Validate request body
        if (!req.body) {
            return res.status(400).json({msg:"Please fill all the fields"})
        }
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({msg:"Unauthorized"})
        }
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({msg:"Product ID is required"})
        }
        const { name, description, price, category, stock, images, rating, numReviews } = req.body;
        if (!name || !price || !category) {
            return res.status(400).json({msg:"Please fill all the fields"})
        }
        const product = await Product.findByIdAndUpdate(productId, {
            name,
            description: description || "",
            price,
            category,
            stock: stock || 0,
            images: images || [],
            userId: req.user._id,
            ratings: rating || 0,
            numReviews: numReviews || 0
        }, { new: true });
        if (!product) {
            return res.status(400).json({msg:"Product not found"})
        }
        return res.status(200).json({msg:"Product updated successfully", product: product})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server Error!!!!"})
    }
}


// delete product
const deleteProduct = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({msg:"Unauthorized"})
        }
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({msg:"Product ID is required"})
        }
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(400).json({msg:"Product not found"})
        }
        return res.status(200).json({msg:"Product deleted successfully", product: product})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server Error!!!!"})
    }
}


module.exports = {vendorDashboard, getProduct, addProduct, updateProduct, deleteProduct}