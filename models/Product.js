const  mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide name"],
        trim: true,
        unique: [true, "name must be unique"],
        minLength: [5, "name must be 5 character"],
        maxLength: [100, "name is too large"]
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [1, "price can be not allow"]
    },
    unit: {
        type: String,
        required: true,
        enum: {

            values: ['kg', 'litre', 'pcs'],
            message: "unit value must be {VALUE} psc/litre/kg"
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "quantity can be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        message: "quantity must be an integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['in-stock', 'out-of-stock', 'discontinued'],
            message: "status can't be {VALUE}"
        }
    },

    // createAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // }
    // supplier:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"spplier"
    // },
    // categories:[
    //     {
    //         name:{
    //             type:String,
    //             required:true
    //         },
    //         _id:mongoose.Schema.Types.ObjectId
    //     }
    // ]

}, {
    timestamps: true
});
// productSchema.pre('save', function (next) {
//     console.log('code is pre define')
//     // console.log(this)
//     next();
// });
productSchema.methods.logger = function () {
    console.log('my name is logger', this.name);
}
const Product = new mongoose.model("Product", productSchema);

module.exports = Product;