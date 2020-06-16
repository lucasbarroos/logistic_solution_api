const { Router } = require('express');

const router = Router();
const EmployeeController = require('../../controllers/Employee/index');

router.post('/video', EmployeeController.store);
router.put('/video/:id', EmployeeController.update);
router.get('/video/:id', EmployeeController.show);
router.get('/videos', EmployeeController.index);
router.delete('/video/:id', EmployeeController.destroy);

module.exports = router;
