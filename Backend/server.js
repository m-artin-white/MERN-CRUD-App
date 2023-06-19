const express = require('express');
const app = express();
const Models = require('./models');
const cors = require("cors");

const connect = require('./connection');
connect();

app.use(express.json());
app.use(cors());

app.post('/customers', async (req, res) => {
    const title = req.body.title;
    const firstname = req.body.firstname;
    const surname = req.body.surname;
    const mobile = req.body.mobile;
    const email = req.body. email;
    const billingAddressLine1 = req.body.billingAddressLine1;
    const billingAddressLine2 = req.body.billingAddressLine2;
    const billingTown = req.body.billingTown;
    const billingCounty = req.body.billingCounty;
    const billingEircode = req.body.billingEircode;
    const shippingAddressLine1 = req.body.shippingAddressLine1;
    const shippingAddressLine2 = req.body.shippingAddressLine2;
    const shippingTown = req.body.shippingTown;
    const shippingCounty = req.body.shippingCounty;
    const shippingEircode = req.body.shippingEircode;
    
    const customer = await Models.Customer.create({
        title : title,
        firstname: firstname,
        surname : surname,  
        mobile: mobile, 
        email: email, 
        billingAddressLine1 : billingAddressLine1,
        billingAddressLine2: billingAddressLine2, 
        billingTown: billingTown,
        billingCounty: billingCounty, 
        billingEircode: billingEircode,
        shippingAddressLine1: shippingAddressLine1,
        shippingAddressLine2: shippingAddressLine2,
        shippingTown: shippingTown,
        shippingCounty: shippingCounty,
        shippingEircode: shippingEircode
    });

    res.json({customer: customer})
});

app.post('/phones', async (req, res) => {
    const manufacturer = req.body.manufacturer;
    const model = req.body.model;
    const price = req.body.price;
    
    const phone = await Models.Phone.create({
        manufacturer : manufacturer,
        model: model,
        price : price,  
    });

    res.json({phone: phone})
});

app.post('/orders', async (req, res) => {
    const customer = req.body.customer;
    const phone = req.body.phone;
    const quantity = req.body.quantity;
    
    const order = await Models.Order.create({
        customer: customer,
        phone: phone,
        quantity : quantity,  
    });

    res.json({order: order})
});


app.get("/customers", async (req, res)=>{
    const customers = await Models.Customer.find();
    res.json({customers: customers});
});

app.get("/phones", async (req, res)=>{
    const phones = await Models.Phone.find();
    res.json({phones: phones});
});

app.get("/orders", async (req, res)=>{
    const orders = await Models.Order.find();
    res.json({orders: orders});
});

app.put("/customers/:id", async (req, res)=>{
    const customerID = req.params.id;

    const title = req.body.title;
    const firstname = req.body.firstname;
    const surname = req.body.surname;
    const mobile = req.body.mobile;
    const email = req.body. email;
    const billingAddressLine1 = req.body.billingAddressLine1;
    const billingAddressLine2 = req.body.billingAddressLine2;
    const billingTown = req.body.billingTown;
    const billingCounty = req.body.billingCounty;
    const billingEircode = req.body.billingEircode;
    const shippingAddressLine1 = req.body.shippingAddressLine1;
    const shippingAddressLine2 = req.body.shippingAddressLine2;
    const shippingTown = req.body.shippingTown;
    const shippingCounty = req.body.shippingCounty;
    const shippingEircode = req.body.shippingEircode;

    await Models.Customer.findByIdAndUpdate(customerID, {
        title : title,
        firstname: firstname,
        surname : surname,  
        mobile: mobile, 
        email: email, 
        billingAddressLine1 : billingAddressLine1,
        billingAddressLine2: billingAddressLine2, 
        billingTown: billingTown,
        billingCounty: billingCounty, 
        billingEircode: billingEircode,
        shippingAddressLine1: shippingAddressLine1,
        shippingAddressLine2: shippingAddressLine2,
        shippingTown: shippingTown,
        shippingCounty: shippingCounty,
        shippingEircode: shippingEircode
    });

    const customer = await Models.Customer.findById(customerID);


    res.json({customer: customer});

});

app.put("/phones/:id", async (req, res)=>{
    const phoneID = req.params.id;

    const manufacturer = req.body.manufacturer;
    const model = req.body.model;
    const price = req.body.price;
    
    await Models.Phone.findByIdAndUpdate(phoneID, {
        manufacturer : manufacturer,
        model: model,
        price : price,  
    });

    const phone = await Models.Phone.findById(phoneID);


    res.json({phone: phone});

});

app.put("/orders/:id", async (req, res)=>{
    const orderID = req.params.id;

    const customer = req.body.customer;
    const phone = req.body.phone;
    const quantity = req.body.quantity;
    
    await Models.Order.findByIdAndUpdate(orderID, {
        customer: customer,
        phone: phone,
        quantity : quantity,  
    });

    const order = await Models.Order.findById(orderID);


    res.json({order: order});

});

app.delete("/customers/:id", async (req, res)=>{
    const customerID = req.params.id;

    await Models.Customer.findByIdAndDelete(customerID);

    res.json({success : "Record Deleted"});
});

app.delete("/phones/:id", async (req, res)=>{
    const phoneID = req.params.id;

    await Models.Phone.findByIdAndDelete(phoneID);

    res.json({success : "Record Deleted"});
});

app.delete("/orders/:id", async (req, res)=>{
    const orderID = req.params.id;

    await Models.Order.findByIdAndDelete(orderID);

    res.json({success : "Record Deleted"});
});

app.listen(3000);