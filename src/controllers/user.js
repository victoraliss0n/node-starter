
const all = async ({User}, req, res) => {
    try {
        const categories = await User.findAll()
        res.send(categories)
    } catch(error) {
        res.send({success: false, errors: Object.keys(error.errors)})
    }
}

const destroyAll = async ({User}, req, res) => {
    try {
       await User.destroy({where: {}, truncate: true})
        res.send({})
    } catch(error) {
        res.send({success: false, errors: Object.keys(error.errors)})
    }
} 

const create = async ({User}, req, res) => {

    try {
        const category = await User.create(req.body)
        await User.create({name: req.body.subcategory, categories_pk: category.get('id')});
        const categories = await User.findAll()
        res.send(categories)
    } catch (error) {
         res.send({success: false, errors: Object.keys(error.errors)})
    }
}

const destroy = async ({User}, req, res) => {

    await User.destroy({ 
        where: {
            id: req.params.id
         }
    })
    const users = await User.findAll()
    res.send(users)
}

const update = async ({User}, req, res) => {
    const user = User.update({ name: req.body.name, subcategory: req.body.subcategory }, { where: {id: req.params.id} });
    res.json(user);
}

module.exports = { create, all, destroyAll, destroy, update }
