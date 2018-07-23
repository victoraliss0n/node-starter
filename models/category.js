
const CategoryModel = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: DataTypes.STRING
    })
    return Category
}

module.exports = CategoryModel;


