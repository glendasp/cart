//Directory /models will store all the database schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// I am trying this library to use elastic search to replicate the data from mongodb to elastic search
var mongoosastic = require('mongoosastic');
//var random = require('mongoose-random');

var ProductSchema = new Schema({
        category: String,
        name : String,
        color: String,
        price : Number
        //qtd: Number
});

ProductSchema.plugin(mongoosastic, {
        hosts: [
                'localhost:9200'
        ]
});

module.exports = mongoose.model('Product', ProductSchema);
