const { Router } = require('express');
const router = Router({ mergeParams: true });
const DepartmentController = require("./department");
const ProductController = require("./product");
const checkDept = require('../middlewares/checkDepartment');
const checkQuery = require('../middlewares/checkQuery');



// DEPARTMENT Controllers
router.route('/departments')
    .get(DepartmentController.getAllDepartments)

router.route('/departments/:deptId')
    .get(checkDept, checkQuery,
        DepartmentController.getAllDepartmentProducts)

router.route('/departments/:deptId/toprated')
    .get(checkDept, checkQuery,
        DepartmentController.getAllTopRated)

router.route('/departments/:deptId/topsales')
    .get(checkDept, checkQuery,
        DepartmentController.getAllTopSales)



// PRODUCT Controllers
router.route('/products')
    .get(checkQuery,
        ProductController.getAllProducts)

router.route('/products/toprated')
    .get(checkQuery,
        ProductController.getAllTopRated)

router.route('/products/topsales')
    .get(checkQuery,
        ProductController.getAllTopSales)

router.route('/products/search')
    .get(checkQuery,
        ProductController.searchProducts)

router.route('/products/:prodId')
    .get(checkQuery,
        ProductController.getAProduct)



module.exports = router;