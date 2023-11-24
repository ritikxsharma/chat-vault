require('../alias')
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const errorHandler = require('@middlewares/errorHandling/errorHandler');
const mobileNumberValidator = require('@middlewares/validators/mobileNumberValidator');
const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
    origin: '*'
}))

app.use(express.json())
app.use(mobileNumberValidator)
app.use('/api/auth', require('@routers/authRouter'))
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})