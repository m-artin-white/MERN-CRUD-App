const mongoose = require('mongoose');

async function connect(){
    try{
    await mongoose.connect('mongodb+srv://root:root@onlinestore.2mmt83c.mongodb.net/?retryWrites=true&w=majority');
    console.log("Connected to database.");
    }catch(err){
        console.log(err);
    }
}

module.exports = connect;