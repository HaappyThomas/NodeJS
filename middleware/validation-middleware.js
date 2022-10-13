const validator = require('../helpers/validate')

const temperaturesUnMois = (req, res, next) =>{
    const validationRule = {
        "mois": "required|string|length:2"
    }
    validator(req, validationRule, {}, (err, status) =>{
        if(!status){
            res.status(412)
                .send({
                    success:false,
                    message:'Validation failed',
                    data:err
                })
        }else{
            next();
        }
    }).catch( err => console.log)
}

module.exports = { temperaturesUnMois }