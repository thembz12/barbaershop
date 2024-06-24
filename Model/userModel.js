const mongoose = require ("mongoose")

const barberSchema = new mongoose.Schema({
    Name: {type:String, 
        require: [true, "kindly provide name"],
        require: true, uppercase: true
    },
    Email: {type:String,
         unique: true,
         require: [true, "kindly provide your email"]
    },
    Password:{type:String,
        require: [true, "kindly provide password to process"]
    },
    FavouriteHairCut: {type:String,
        require: [true, "kindly provide haircut"]
    }
},{timestamps:true})

const barbermodel = mongoose.model("barber records", barberSchema)

module.exports = barbermodel