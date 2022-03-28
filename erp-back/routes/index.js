const express = require('express')
const router = express.Router()
const prisma = require('../db')

router.get('/', function (req, res) {
	res.json({ title: 'Express' })
})

module.exports = router
