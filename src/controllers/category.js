
const all = async ({Category}, req, res) => {
    try {
        const categories = await Category.findAll()
        res.send(categories)
    } catch(error) {
        res.send({success: false, errors: Object.keys(error.errors)})
    }
}

const deleteAll = async ({Category}, req, res) => {
    try {
        const category = await Category.destroy({where: {}, truncate: true})
        res.send({category})
    } catch(error) {
        res.send({success: false, errors: Object.keys(error.errors)})
    }
}

const create = async ({Category}, req, res) => {

    try {
        const category = await Category.create(req.body)
        await Category.create({name: req.body.subcategory, categories_pk: category.get('id')});
        const categories = await Category.findAll()
        res.send(categories)
    } catch (error) {
        res.send({success: false, errors: Object.keys(error.errors)})
    }
}

const destroyOne = async ({Category}, req, res) => {

    const category = await Category.destroy({ 
        where: {
            id: req.params.id
         }
    })
    const categories = await Category.findAll()
    res.send(categories)
}

const editForm = async ({Category}, req, res) => {
    const category = await Category.findById(req.params.id)
    res.send({category})
}

const editOne = async ({Category}, req, res) => {
    const category = Category.update({ name: req.body.name, subcategory: req.body.subcategory }, { where: {id: req.params.id} });
    res.send( { category } )
}

module.exports = { create, all, deleteAll, destroyOne, editOne, editForm }
