
const CategoryModel = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: DataTypes.STRING
    })
    Category.hasMany(Category, {onDelete: 'cascade', foreignKey: 'categories_pk'});
    Category.belongsTo(Category, {onDelete: 'cascade', foreignKey: 'categories_pk'});
    return Category
}

module.exports = CategoryModel;


