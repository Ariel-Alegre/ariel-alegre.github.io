const { Router }= require('express')
const router = Router();
const {Payment} = require('../controllers/Payment');


router.post('/payment', Payment)
router.get('/success', (req, res) => res.send('pago exitoso'))
router.get('/error', (req, res) => res.send('Hubo un error'))


module.exports = router