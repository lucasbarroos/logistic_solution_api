const { Router } = require('express');

const router = Router();
const ClientController = require('../../controllers/Client/index');

router.post('/channel', ClientController.store);
router.put('/channel/:id', ClientController.update);
router.get('/channel/:id', ClientController.show);
router.get('/channels', ClientController.index);
router.delete('/channel/:id', ClientController.destroy);

module.exports = router;
