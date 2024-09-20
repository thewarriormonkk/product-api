const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const productModel = require('./Models/productModel');


const app = express();

// middleware
app.use(express.json());

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connected to db & listening on port ${process.env.PORT}`);
        });
    })
    .catch(error => {
        console.log(error.message);
    });

app.get('/', (req, res) => {
    res.redirect('/products');
});


// get all products
app.get('/products', async (req, res) => {
    const products = await productModel.find({});

    try {
        res.status(200).send(products);
    } catch (error) {
        res.status(404).send(error);
    }
});

// get single product item
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;


    try {
        const productItem = await productModel.findById(id);
        if (!productItem) {
            res.status(404).send('product not found');
        }
        res.send(productItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// create product
app.post('/products', async (req, res) => {
    const myproduct = new productModel(req.body);

    try {
        await myproduct.save();
        res.status(201).send(myproduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// update product
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            success: true,
            updatedProduct
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
});

// delete product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const productItem = await productModel.findByIdAndDelete(id);

        if (!productItem) {
            res.status(404).send("no item found");
        }
        res.status(204).json({
            success: true,
            productItem
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
});


