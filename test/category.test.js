const categoryController = require('../controllers/category')
const expect = require('chai').expect
const assert = require('chai').assert
const should = require('chai').should();
const sinon = require('sinon')
const sequelizeMock = require('./mock/category-mock')
const categoryService = require('../services/category')

const configureDatabaseTest = async () => {
    await sequelizeMock.sequelize.sync( {force:false} )
}

configureDatabaseTest()

describe('Test methods that serve as end points for service', async () => {

    it('Create Category', async () => {

        const record = await categoryService.create(sequelizeMock.CategoryMock, {'name': 'value'})
        should.exist(record)
    })

    it('Fails Delete Category', async () => {

        const record = await categoryService.deleteRecord(sequelizeMock.CategoryMock, '2000')
        expect(record).to.equal(0)
    })
})