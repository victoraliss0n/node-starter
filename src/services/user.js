
const all = async User => {
    return await User.findAll()
}
const create = async (User, json) => {
    return await User.create(json)
}
const deleteRecord = async (User, id) => {
    const User = await User.destroy({ 
        where: {
            id: id
         }
    })
   return User
}

module.exports = { all, create, deleteRecord}