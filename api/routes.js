const History = require('./History')
const router = require('express').Router()

router.get('/', (req, res) => {
    History.find()
        .then(history => {
            res.status(200).send(history)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured'
            })
        })
})

router.post('/', (req, res) => {
    const history = new History(req.body)
    history.save()
        .then(() => History.find())  
        .then(history => {
            res.status(201).json(history)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured'
            })
        })
})

module.exports = router