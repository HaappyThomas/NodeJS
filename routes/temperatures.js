// import express
const express = require('express')
// import mongoose
const { default: mongoose } = require('mongoose')
// Router -- controller
const router = express.Router()
// import Models/Entity temperature
const Temperature = require('../models/temperature')
// import valitator
const temperaturesUnMois = require('../middleware/validation-middleware')

// get les deux premieres temperatures pour tester
router.get('/', async(req, res)=>{
    try {
        let temperatures = await Temperature.find().limit(2)

        // res.send("hello world")
        res.json(temperatures)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get temperature selon moi choisi
// sub sui '/:mois'
router.get('/:mois', async(req, res) => {
    try {
        // recuperer parametres du GET
        const mois = req.params.mois
        // valider mois
        // temperaturesUnMois(mois,res,next)
        // construire patt pour $regex
        const patt = "2022-" + mois + "-*"
        // requete temperature par mois choisi
        let temperatures = await Temperature.find({"DateDuJour":{$regex:patt}},{"_id":0, "MinTemp":0, "MaxTemp":0})

        // res.send("hello world")
        res.json(temperatures)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get temperature moyenne tous les mois
router.get('/tempMoyMois', async(req, res) => {
    try {
        let tempMoyMois = 
            await Temperature.aggregate([{$group:{_id:{$substr:["$DateDuJour",5,2]}, TemperatureMoyenne:{$avg:"$Temp"}}},{$sort:{_id:1}}])
        res.json(tempMoyMois)
        // res.send("hello world")
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router