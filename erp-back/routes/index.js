const express = require('express')
const router = express.Router()
const prisma = require('../db')

router.get('/', function (req, res) {
	res.json({ title: 'Express' })
})

// Create test data
router.get('/data', async function (req, res, next) {
	try {
		await prisma.userPost.createMany({
			data: [
				{ name: "frontend" },
				{ name: "backend" },
				{ name: "sysadmin" },
			]
		})

		await prisma.user.createMany({
			data: [
				{ firstName: "ayoub", lastName: "benabid", email: "ayoub@gmail.com", phone: "0629258232", avatar: "", postId: 1 },
				{ firstName: "nassim", lastName: "seffar", email: "nassim@gmail.com", phone: "0654369912", avatar: "", postId: 1 },
				{ firstName: "mohamed", lastName: "tbarka", email: "mohamed@gmail.com", phone: "0612654876", avatar: "", postId: 2 },
				{ firstName: "ismail", lastName: "idboulkacem", email: "ismail@gmail.com", phone: "0676339089", avatar: "", postId: 3 },
			]
		})

		await prisma.client.createMany({
			data: [
				{ name: "Zenata" },
				{ name: "Al Alia" },
				{ name: "Endesa" },
			]
		})

		await prisma.clientContact.createMany({
			data: [
				{ firstName: "Marouan", lastName: "Issami", email: "marouan@zenata.ma", phone: "0675436612", clientId: 1 },
				{ firstName: "Tarik", lastName: "Hmimiz", email: "tarik@zenata.ma", phone: "0612093422", clientId: 1 },
				{ firstName: "Wafae", lastName: "Radi", email: "wafae@alalia.ma", phone: "0643996500", clientId: 2 },
				{ firstName: "Ilias", lastName: "Bouksim", email: "ilias@endesa.ma", phone: "0665339080", clientId: 3 },
				{ firstName: "Sarah", lastName: "Zaki", email: "sarahlias@endesa.ma", phone: "0654116348", clientId: 3 },
			]
		})

		await prisma.project.createMany({
			data: [
				{ name: "Eco City Zenata", price: 60000, startDate: new Date().toISOString(), endDate: new Date().toISOString(), clientId: 1 },
				{ name: "Jnane Al alia", price: 70000, startDate: new Date().toISOString(), endDate: new Date().toISOString(), clientId: 2 },
				{ name: "Palms Avenue", price: 80000, startDate: new Date().toISOString(), endDate: new Date().toISOString(), clientId: 2 },
				{ name: "ERP Endesa", price: 300000, startDate: new Date().toISOString(), endDate: new Date().toISOString(), clientId: 3 },
			]
		})

		await prisma.timeSheet.createMany({
			data: [
				{ projectId: 1, userId: 1, date: new Date().toISOString(), time: 4, comment: "creation de la page home" },
				{ projectId: 1, userId: 2, date: new Date().toISOString(), time: 4, comment: "creation de la page a propos" },
				{ projectId: 2, userId: 1, date: new Date().toISOString(), time: 4, comment: "design responsive" },
				{ projectId: 2, userId: 2, date: new Date().toISOString(), time: 4, comment: "design responsive" },
				{ projectId: 3, userId: 4, date: new Date().toISOString(), time: 1, comment: "creation environment prod" },
				{ projectId: 4, userId: 3, date: new Date().toISOString(), time: 1, comment: "optimisation sql" },
			]
		})

		res.send({ output: "done" })
	} catch (error) {
		next(error)
	}
})

module.exports = router
