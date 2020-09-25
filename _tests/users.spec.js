const supertest = require('supertest')
const app = require('../server')
const request = supertest(app)

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

var auth = {};

it('should respond with JSON array', async () => {
    const response = await request.get('/api/v1/users')
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200)
        .expect('Content-Type', /json/)
        .catch(err => console.log(err))

});









