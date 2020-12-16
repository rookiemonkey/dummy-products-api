const handleAsync = require('../utilities/toHandleAsync');
const Product = require('../models/Product');
const Departments = require('../models/_department');
const DepartmentIds = new Array();

// helper variable: available department ids 
for (let i = 0; i !== Departments.length; i++) {
    const department = Departments[i];
    const [id, key] = Object.keys(department);
    DepartmentIds.push(department[id]);
}

/**
 * !PATH: /api/v1/departments
 * returns all the available product departments
 */
const getAllDepartments = handleAsync(async (req, res, next) => {
    const departmentArray = new Array();

    for (let i = 0; i !== Departments.length; i++) {
        const department = Departments[i];
        const [id, key] = Object.keys(department);
        const departmentId = department[id];
        const departmentProductsNum = await Product
            .find({ product_departmentId: departmentId })
            .count()

        departmentArray.push({
            department_name: key,
            department_id: departmentId,
            department_numProducts: departmentProductsNum
        })
    }

    res.json({
        success: true,
        datatype: 'ALL DEPARTMENTS',
        numOfResults: departmentArray.length,
        data: departmentArray
    })
})

/**
 * !PATH: /api/v1/departments/:deptId
 * returns all the available products on a given department
 */
const getAllDepartmentProducts = handleAsync(async (req, res, next) => {
    const product_departmentId = req.params.deptId

    const isDepartmentExisting = DepartmentIds
        .some(departmentId => departmentId == product_departmentId)

    if (!isDepartmentExisting) throw new res.withError('Department not found', 404)

    const departmentProductsArray = await Product
        .find({ product_departmentId })
        .select('-product_reviews -product_description')

    res.json({
        success: true,
        datatype: "ALL DEPARTMENT'S PRODUCTS",
        numOfResults: departmentProductsArray.length,
        data: departmentProductsArray
    })
})


/**
 * !PATH: /api/v1/departments/:deptId/toprated
 * returns all the available products on a given department with ratings more than 4
 */
const getAllTopRated = handleAsync(async (req, res, next) => {
    const product_departmentId = req.params.deptId

    const isDepartmentExisting = DepartmentIds
        .some(departmentId => departmentId == product_departmentId)

    if (!isDepartmentExisting) throw new res.withError('Department not found', 404)

    const departmentTopRated = await Product
        .find({ product_departmentId, product_ratings: { $gte: 4, $lte: 5 } })
        .sort({ product_ratings: 'descending' })
        .select('-product_reviews -product_description')
        .limit(10);

    res.json({
        success: true,
        datatype: "ALL DEPARTMENT'S TOP RATED PRODUCTS. Starting from the highest rating",
        numOfResults: departmentTopRated.length,
        data: departmentTopRated
    })
})


/**
 * !PATH: /api/v1/departments/:deptId/topsales
 * returns all the available products on a given department with sales more than 1000
 */
const getAllTopSales = handleAsync(async (req, res, next) => {
    const product_departmentId = req.params.deptId

    const isDepartmentExisting = DepartmentIds
        .some(departmentId => departmentId == product_departmentId)

    if (!isDepartmentExisting) throw new res.withError('Department not found', 404)

    const departmentTopSales = await Product
        .find({ product_departmentId, product_sales: { $gte: 1000 } })
        .sort({ product_sales: 'descending' })
        .select('-product_reviews -product_description')
        .limit(10);

    res.json({
        success: true,
        datatype: "ALL DEPARTMENT'S TOP SALES PRODUCTS. Starting from the highest sales",
        numOfResults: departmentTopSales.length,
        data: departmentTopSales
    })
})


module.exports = {
    getAllDepartments,
    getAllDepartmentProducts,
    getAllTopRated,
    getAllTopSales
}