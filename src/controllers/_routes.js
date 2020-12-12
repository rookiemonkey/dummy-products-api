const { Router } = require('express');
const router = Router({ mergeParams: true });
const DepartmentController = require("./department");

router.get('/departments', DepartmentController.getAllDepartments)
router.get('/departments/:deptId', DepartmentController.getAllDepartmentProducts)


module.exports = router;