
const all = async (Category) => {
    return await Category.findAll()
}
const create = async (Category, json) => {
    return await Category.create(json)
}
const deleteRecord = async (Category, id) => {
    const category = await Category.destroy({ 
        where: {
            id: id
         }
    })
   return category
}

module.exports = { all, create, deleteRecord}