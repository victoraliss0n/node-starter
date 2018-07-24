
const CategoryModel = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: DataTypes.STRING,
        subcategory: DataTypes.STRING
    })
    Category.hasMany(Category, {foreignKey: 'categories_pk'});
    Category.belongsTo(Category, {foreignKey: 'categories_pk'});
    return Category
}

module.exports = CategoryModel;


