const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


app.use(express.json());
app.use(cors());


// Schema design 
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
productSchema.pre('save', function (next) {
    console.log('code is pre define')
    // console.log(this)
    next();
});
productSchema.methods.logger = function () {
    console.log('my name is logger', this.name);
}
const Product = new mongoose.model("Product", productSchema);

app.get("/api/v1/product", async (req, res, next) => {
    try {
        const result = await Product.find({},'-name -status ');
        res.status(200).json(
            {
                status: "successfull",
                message: "data get successfully",
                data: result
            }
        );
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            message: "data find unsuccessfully",
            data: error.message
        });
    }
});
app.post("/api/v1/product", async (req, res) => {
    try {
        if (req.body.quantity == 0) {
            req.body.status = "out-of-stock";
        }
        const result = await Product(req.body).save();
        result.logger();
        res.status(200).json({
            status: "successfull",
            message: "data inserted successfully",
            data: result
        })
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            message: "data inserted unsuccessfully",
            data: error.message
        })
        // console.log(error.message);
    }
})


module.exports = app;