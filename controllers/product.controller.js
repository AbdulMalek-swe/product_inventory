

const { getProductService, createProductService } = require('../services/product.service');
module.exports.getProduct =  async (req, res, next) => {
    try {
        const result = await getProductService();
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
}

 module.exports.createProduct =  async (req, res,next) => {
    try {
        if (req.body.quantity == 0) {
            req.body.status = "out-of-stock";
        }
        const result = await createProductService(req.body);
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
}