const express = require('express')
const router = express.Router();
const Details = require('../models/ArimaDetails')


//  ROUTE 1 : POST /api/previousdata/fetchdata : To fetch details of previous year
router.post('/fetchdata', async (req, res) => {
    try {
        const { categ, s_date, e_date } = req.body;
        
        const details = await Details.find({ date: { $gt: s_date, $lt: e_date }, Category: categ }, function (err, det) {
            if (err) res.json("Error")
            res.status(200).json(det)
        }).clone()
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }

})


module.exports = router