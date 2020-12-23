const toMatchAll = text => text
    .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")

module.exports = toMatchAll;