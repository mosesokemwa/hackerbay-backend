const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);


const app = require('../app')


describe('hacker-bay', () => {
    let token

    const loginCred = { username: 'nobody', password: 'anybody' }

    const invalidImageUrl = 'http://localhost:3000/images/orig/me4.'
    const imageUrl = 'http://localhost:3000/images/orig/me4.jpg'

    const jsonObject = '{ "user": { "firstName": "Moses", "lastName": "Okemwa" } }'
    const jsonPatchObject = '[{"op": "replace", "path": "/user/firstName", "value": "nobody"}, {"op": "replace", "path": "/user/lastName", "value": "anybody"}]'


    describe('Authentication testing', () => {
        it.only('create token from login credentials', (done) => {
            chai.request(app)
                .post('/api/auth/login/')
                .send(loginCred)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user').eql(loginCred.username);
                    res.body.should.have.property('token');
                    token = res.body.token
                    done();
                })
        })

        it.only('It should not log user in if username and password do not meet requirements', (done) => {
            chai.request(app)
                .post('/api/auth/login/')
                .send({ username: 'anyone', password: '' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('errors');
                    done()
                })
        })
        it.only('It should not log user in if username and password do not meet requirements', (done) => {
            chai.request(app)
                .post('/api/auth/login/')
                .send({ username: '', password: 'nobody' })
                .end((err, res) => {
                    res.should.have.status(400);
                    done()
                })
        })
    })

    describe('Patch object', () => {
        it.only('it should patch object A with object B', (done) => {
            chai.request(app)
                .patch('/api/apply-json-patch')
                .set('token', token)
                .send({ jsonObject, jsonPatchObject })
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })

        it.only('it should not patch if token is invalid', (done) => {
            chai.request(app)
                .patch('/api/apply-json-patch')
                .set('token', 'randomewwrongtoken')
                .send({ jsonObject, jsonPatchObject })
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property('authorized').eql(false);
                    done()
                })
        })
    })

    describe('Testing thumbnail creation', () => {
        it.only('it should accept a public image url and return a resized image', (done) => {
            chai.request(app)
                .post('/api/create-thumbnail')
                .set('token', token)
                .send({ imageUrl: imageUrl })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('thumbnail');
                    res.body.should.have.property("converted").eql(true);
                    res.body.should.have.property('user').eql(loginCred.username);
                    done()
                })
        })

        it.only('it should not process image if token is invalid', (done) => {
            chai.request(app)
                .post('/api/create-thumbnail')
                .set('token', 'randomewwrongtoken')
                .send({ imageUrl: imageUrl })
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.have.property("authorized").eql(false)
                })
            done()
        })

        it.only('it should not process image if url is invalid', (done) => {
            chai.request(app)
                .post('/api/create-thumbnail')
                .set('token', token)
                .send({ imageUrl: invalidImageUrl })
                .end((err, res) => {
                    res.should.have.status(400)
                    done()
                })
        })
    })
});