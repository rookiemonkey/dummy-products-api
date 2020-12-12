const handleAsync = require('../utilities/toHandleAsync');
const Departments = require('../models/_department')

/**
 * !PATH: /api/dummyproducts/departments
 * returns all the available product departments
 */
const getAllDepartments = handleAsync((req, res, next) => {
    const departmentArray = Departments.map(department => {
        const [_, key] = Object.keys(department);
        return key
    })

    res.json({
        success: true,
        datatype: 'ALL DEPARTMENTS',
        data: departmentArray
    })
})

/**
 * !PATH: /api/dummyproducts/departments/:deptId/products
 * returns all the available products on a given department
 */

module.exports = {
    getAllDepartments
}