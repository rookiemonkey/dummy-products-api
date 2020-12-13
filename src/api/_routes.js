const { Router } = require('express');
const router = Router({ mergeParams: true });
const ApiKeyController = require('./key');
const DepartmentController = require("./department");
const ProductController = require("./product");

// API KEY Controllers
router.post('/key', ApiKeyController.processAnApiKey)

// DEPARTMENT Controllers
router.get('/departments', DepartmentController.getAllDepartments)
router.get('/departments/:deptId', DepartmentController.getAllDepartmentProducts)
router.get('/departments/:deptId/toprated', DepartmentController.getAllTopRated)
router.get('/departments/:deptId/topsales', DepartmentController.getAllTopSales)

// PRODUCT Controllers
router.get('/products', ProductController.getAllProducts)
router.get('/products/toprated', ProductController.getAllTopRated)
router.get('/products/topsales', ProductController.getAllTopSales)
router.get('/products/:prodId', ProductController.getAProduct)

module.exports = router;