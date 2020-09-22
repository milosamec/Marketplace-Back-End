const supertest = require('supertest')
const app = require('../server')
const request = supertest(app)
app.listen(3100)

it('should sign up for a user', async () => {
    const response = await request.post('/register')
        .send({
            username: "john@gmail.com",
            password: "123456"
        })
        .expect(201)
        .catch(err => console.log(err))
})

let token;
it('should login user', async () => {
    const response = await request.post('/login')
        .send({
            username: "john@gmail.com",
            password: "123456"
        })
        .end((err, response) => {
            token = response.body.token; // save the token!
            done();
        });
})





