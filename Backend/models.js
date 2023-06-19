const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    title: String,
    firstname: String,
    surname: String,
    mobile: String,
    email: String,
    billingAddressLine1: String,
    billingAddressLine2: String,
    billingTown: String,
    billingCounty: String,
    billingEircode: String,
    shippingAddressLine1: String,
    shippingAddressLine2: String,
    shippingTown: String,
    shippingCounty:String,
    shippingEircode: String
});

const phoneSchema = new mongoose.Schema({
    manufacturer: String,
    model: String, 
    price: String
});

const orderSchema = new mongoose.Schema({
    customer: String,
    phone: String,
    quantity: String
});

const Customer = mongoose.model("Customer", customerSchema);
const Phone = mongoose.model("Phone", phoneSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports ={
    Customer,
    Phone, 
    Order
};