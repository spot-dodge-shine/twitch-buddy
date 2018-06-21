const router = require('express').Router()
const {Votechoice} = require('../db/models')
module.exports = router

// Create new votechoice
router.post('/', async (req, res, next) => {
  try {
    const { votecycleId } = req.body
    const votechoice = await Votechoice.create({votecycleId})
    res.json(votechoice)
  } catch (err) {
    next(err)
  }
})