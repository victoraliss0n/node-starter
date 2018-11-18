const all = async User => {
    return await User.findAll()
}
const create = async (User, json) => {
    return await User.create(json)
}
const destroy = async (User, id) => {
    const User = await User.destroy({ 
        where: {
            id: id
         }
    })
   return User
}

export default { all, create, destroy }