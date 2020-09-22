const supertest = require('supertest')
const app = require('../server')
const request = supertest(app)
app.listen(3200)

it('should post products', async () => {

    const response = await request.post('/api/v1/products')
        .send({
            title: "",
            description: "",
            price: "",
            image: ""
        })
        .expect(201)
        .catch(err => console.log(err))
})


it('should delete products', async () => {

    const response = await request.delete('/api/v1/products:id')
        .send({
            userId: 5
        })
        .expect(200)
        .catch(err => console.log(err))
})
