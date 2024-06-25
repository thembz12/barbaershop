
const barbermodel = require ("../Model/userModel.js")
const validator = require ("@hapi/joi")


// create customer 
exports.createcustomer = async (req,res)=>{
    try {
        const schema = validator.object({
            Email:validator.string().email().min(7).required(),
            Name:validator.string().min(3).required().regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
            
            .trim()
            .message({
                "string.pattern.base":"name must only contain letters and spaces",
                "string.empty":"name cannot be empty",
            }),
            password:validator.string().pattern(new RegExp(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/)).required()
            .messages({
              'string.min': 'Password must be at least 10 characters long',
              'string.pattern': 'Password must contain a mix of uppercase, lowercase, special characters and numbers'
            }),
            FavouriteHairCut:validator.required().valid("obama", "lowcut", "skincut")

        })
        const {error} = schema.validate(req.body)
        if(error){
            return res.status(400).json(error.details[0].message)
        }
        const {Name, Email, password, FavouriteHairCut }=req.body
        const data ={
            Name,
            Email,
            password,
            FavouriteHairCut
        }
        const newdata = await barbermodel.create(data)
        res.status(201).json({message:"customer created successfully", newdata})
        
    } catch (error) {
        res.status(500).json(error.message)
        
    }
}
exports.getallcustomer = async (req,res)=>{
    try {
        const allCustomer = await barbermodel.find(req.body)
        res.status(200).json({message:`below are all customer`, allCustomer})
    } catch (error) {
        res.status(500).json(error.message)
        
    }
}
exports.getonecustomer = async (req,res)=>{
    try {
        let id = req.params.id
        const getonecustomer = await barbermodel.findById(id)
        res.status(200).json({message:`found one customer ${id}`, getonecustomer})
        
    } catch (error) {
        res.status(500).json(error.message)
         
    }
}
exports.login = async(req,res)=>{
    try {
    const {Email, password} = req.body
    const check = await barbermodel.findOne({Email})
 
    if(! check){
        return res.status(404).json(`Invalid email address`)
    }
    if(check.password!=password){
        return res.status(400).json(`Invalid password`)
    }else{
        res.status(200).json({message: `Login successful`, data:check})
    }
    } catch (error) {
        res.status(500).json(error.message)
    }
}
 