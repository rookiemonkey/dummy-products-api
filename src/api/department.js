const handleAsync = require('../utilities/toHandleAsync');
const Product = require('../models/Product');
const Departments = require('../models/_department');

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

    const numOfDeptProducts = await Product
        .find({ product_departmentId: req.params.deptId })
        .count();

    const departmentProductsArray = await Product
        .find({ product_departmentId: req.params.deptId })
        .select('-product_reviews -product_description')
        .limit(req.searchLimit)
        .skip(req.searchSkip);

    const response = {
        success: true,
        datatype: "ALL DEPARTMENT'S PRODUCTS",
        numOfResults: departmentProductsArray.length,
        lastPage: Math.ceil(numOfDeptProducts / req.searchLimit),
        page: req.searchPage,
        data: departmentProductsArray
    }

    if (response.page > response.lastPage)
        throw new res.withError(`You've reached the last page, LAST PAGE: ${response.lastPage}`, 404)

    res.json(response)
})


/**
 * !PATH: /api/v1/departments/:deptId/toprated
 * returns all the available products on a given department with ratings more than 4
 */
const getAllTopRated = handleAsync(async (req, res, next) => {

    const numOfDeptProducts = await Product
        .find({
            product_departmentId: req.params.deptId,
            product_ratings: { $gte: 4, $lte: 5 }
        })
        .count();

    const departmentTopRated = await Product
        .find({
            product_departmentId: req.params.deptId,
            product_ratings: { $gte: 4, $lte: 5 }
        })
        .sort({ product_ratings: 'descending' })
        .select('-product_reviews -product_description')
        .limit(req.searchLimit)
        .skip(req.searchSkip);

    const response = {
        success: true,
        datatype: "ALL DEPARTMENT'S TOP RATED PRODUCTS. Starting from the highest rating",
        numOfResults: departmentTopRated.length,
        lastPage: Math.ceil(numOfDeptProducts / req.searchLimit),
        page: req.searchPage,
        data: departmentTopRated
    }

    if (response.page > response.lastPage)
        throw new res.withError(`You've reached the last page, LAST PAGE: ${response.lastPage}`, 404)

    res.json(response)
})


/**
 * !PATH: /api/v1/departments/:deptId/topsales
 * returns all the available products on a given department with sales more than 1000
 */
const getAllTopSales = handleAsync(async (req, res, next) => {

    const numOfDeptProducts = await Product
        .find({
            product_departmentId: req.params.deptId,
            product_sales: { $gte: 1000 }
        })
        .count();

    const departmentTopSales = await Product
        .find({
            product_departmentId: req.params.deptId,
            product_sales: { $gte: 1000 }
        })
        .sort({ product_sales: 'descending' })
        .select('-product_reviews -product_description')
        .limit(req.searchLimit)
        .skip(req.searchSkip);

    const response = {
        success: true,
        datatype: "ALL DEPARTMENT'S TOP SALES PRODUCTS. Starting from the highest sales",
        numOfResults: departmentTopSales.length,
        lastPage: Math.ceil(numOfDeptProducts / req.searchLimit),
        page: req.searchPage,
        data: departmentTopSales
    }

    if (response.page > response.lastPage)
        throw new res.withError(`You've reached the last page, LAST PAGE: ${response.lastPage}`, 404)

    res.json(response)
})


module.exports = {
    getAllDepartments,
    getAllDepartmentProducts,
    getAllTopRated,
    getAllTopSales
}