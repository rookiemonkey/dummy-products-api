const handleAsync = require('../utilities/toHandleAsync');
const Product = require('../models/Product');
const Departments = require('../models/_department');

/**
 * !PATH: /api/dummyproducts/departments
 * returns all the available product departments
 */
const getAllDepartments = handleAsync(async (req, res, next) => {
    const departmentArray = Departments.map(department => {
        const [id, key] = Object.keys(department);

        return {
            department_name: key,
            department_id: department[id]
        }
    })

    res.json({
        success: true,
        datatype: 'ALL DEPARTMENTS',
        data: departmentArray
    })
})

/**
 * !PATH: /api/dummyproducts/departments/:deptId
 * returns all the available products on a given department
 */
const getAllDepartmentProducts = handleAsync(async (req, res, next) => {
    const product_departmentId = req.params.deptId
    const departmentProductsArray = await Product.find({ product_departmentId })

    res.json({
        success: true,
        datatype: "ALL DEPARTMENT'S PRODUCTS",
        data: departmentProductsArray
    })
})

module.exports = {
    getAllDepartments,
    getAllDepartmentProducts
}