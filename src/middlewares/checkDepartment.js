const Departments = require('../models/_department');
const toHandleAsync = require('../utilities/toHandleAsync');
const DepartmentIds = new Array();

// helper variable: available department ids 
for (let i = 0; i !== Departments.length; i++) {
    const department = Departments[i];
    const [id, key] = Object.keys(department);
    DepartmentIds.push(department[id]);
}

const isDepartmentExisting = toHandleAsync(async (req, res, next) => {

    const isDepartmentExisting = DepartmentIds
        .some(departmentId => departmentId == req.params.deptId)


    if (!isDepartmentExisting)
        throw new res.withError('Department not found', 404)

    next();
})

module.exports = isDepartmentExisting;