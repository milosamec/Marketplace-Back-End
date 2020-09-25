const supertest = require('supertest')
const app = require('../server')
const request = supertest(app)

it('should post products', async () => {

    const response = await request.post('/api/v1/products')
        .send({
            title: "Soap",
            description: "Moisturizing soap",
            price: "$22",
            image: "n/a"
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



it('return products', async () => {
    const response = await request.get('/api/v1/products')
        .expect(200)
        .catch(err => console.log(err))
});

it("updates products", async () => {

    const response = await request.put('/api/v1/products:id')
        .send({
            userId: 4,
            title: "Soap",
            description: "Moisturizing soap",
            price: "$22",
            image: "n/a"
        })
        .expect(200)
        .catch(err => console.log(err))


});