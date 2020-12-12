const { Router } = require('express');
const router = Router({ mergeParams: true });
const DepartmentController = require("./department");

router.get('/departments', DepartmentController.getAllDepartments)


module.exports = router;