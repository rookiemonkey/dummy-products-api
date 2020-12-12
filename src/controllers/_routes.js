const { Router } = require('express');
const router = Router({ mergeParams: true });
const DepartmentController = require("./department");
const ProductController = require("./product");

// DEPARTMENT Controllers
router.get('/departments', DepartmentController.getAllDepartments)
router.get('/departments/:deptId', DepartmentController.getAllDepartmentProducts)

// PRODUCT Controllers
router.get('/products', ProductController.getAllProducts)

module.exports = router;