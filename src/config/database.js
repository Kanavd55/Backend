const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://kanavdahat55:Xo3QYx4diQotPfsT@namastenode.dg19q.mongodb.net/NodejsBasics")
}

module.exports = connectDB;

