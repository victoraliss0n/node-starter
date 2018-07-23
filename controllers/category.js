
const all = async ({Category}, req, res) => {
    const categories = await Category.findAll()
    res.send({categories})
}

const deleteAll = async ({Category}, req, res) => {
    await Category.destroy({where: {}, truncate: true})
    res.redirect('/')  
}

const create = async ({Category}, req, res) => {
    const category = await Category.create(req.body)
    res.send(category)
}

const destroyOne = async ({Category}, req, res) => {

    const category = await Category.destroy({ 
        where: {
            id: req.params.id
         }
    })
    res.send( { category } )
}

const editForm = async ({Category}, req, res) => {
    const category = await Category.findById(req.params.id)
    res.send({category})
}

const editOne = async ({Category}, req, res) => {
    console.log(req.body)
    console.log(req.params)

    const category = Category.update({ name: req.body.name }, { where: {id: req.params.id} });
    res.send( { category } )
}

module.exports = { create, all, deleteAll, destroyOne, editOne, editForm }
