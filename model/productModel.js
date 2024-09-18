const mongoose =require('mongoose')
const ProductSchema=mongoose.Schema({

    name:{
        type:String,
        required:[true,'please enter a product name']
    },
    price:{
        type:Number,
        required:[true,'please a a price']
    },
    description:{
        type:String,
        required:[true, 'please add a description to each product created.']
    },
    quantity:{
        type:Number,
        required:[true,'please add a quantity.'],
        default:0
    }
},
{
    timestamp:true
}

)
// module.exports=mongoose.model('product',productSchema)
const product = mongoose.model('product',ProductSchema)
module.exports=product;