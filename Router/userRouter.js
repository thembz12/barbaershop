
const {createcustomer, getallcustomer, getonecustomer, login}= require ("../Controller/userController.js")
const router = require ("express").Router()


router.post("/createcustomer", createcustomer) 
router.get("/allcustomer", getallcustomer ) 
router.get("/getonecustomer/:id", getonecustomer )
router.post("/login", login)
module.exports = router
