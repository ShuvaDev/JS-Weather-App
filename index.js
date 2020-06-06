const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

let app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))

app.use('/api/history', require('./api/routes'))

const PORT = process.env.PORT || 8585
mongoose.connect('mongodb+srv://shuva:12345@cluster0-s9k9m.mongodb.net/js_weather_app', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`)
        })
    })
    .catch(e => {
        console.log(e)
        res.json({
            message: 'Database Connection Failed'
        })
    })