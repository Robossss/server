const express = require('express')
const request = require('supertest')
const mongoose = require('mongoose')
require("dotenv").config();
const userRoute = require('../routes/UserRoutes')


const app = express()

app.use(express.json())
app.use('/api/v1/auth', userRoute)

const clearDatabase = async () => {
    await mongoose.connection.dropDatabase()
}


beforeAll(async () => {
    // jest.setTimeout(10000);
    await mongoose.connect(process.env.MONGO_URI);
}, 1000000);

afterAll(async () => {
    await clearDatabase()
    await mongoose.connection.close();
}, 1000000);
  


  describe('Testing the routes for registration', () => {
    describe('POST /api/v1/auth/register', () => {
      it('failure - There is no request body', async () => {
        try {
          const { body, statusCode } = await request(app)
            .post('/api/v1/auth/register')

            expect(statusCode).toBe(400)
        } catch (error) {
          expect(error).toEqual({
            error: true,
            message: 'Error. No request body',
            stack: config.NODE_ENV === 'production' ? null : error.stack
            
          })
        }
      })
      it('failure - Username already exists', async () => {
        try {
          const { statusCode, body } = await request(app)
            .post('/api/v1/auth/register')
            .send({
              username: 'Alhaji',
              password: 'Alhaji123',
              firstName: 'Alhaji',
              lastName: 'Alhaji',
              role: 'admin',
            })
        } catch (error) {
          expect(error).toEqual({
            error: true,
            message: error.message,
            stack: config.NODE_ENV === 'production' ? null : err.stack
          })
        }
      })
      
      it('failure - Role is not admin or student', async () => {
        try {
          const { statusCode, body } = await request(app)
            .post('/api/v1/auth/register')
            .send({
              username: 'Alhaji',
              password: 'Alhaji123',
              firstName: 'Alhaji',
              lastName: 'Alhaji',
              role: 'teacher',
            })
        } catch (error) {
          expect(error).toEqual({
            error: true,
            message: error.message,
            stack: config.NODE_ENV === 'production' ? null : err.stack
          })
        }
      })

      it('success - register user successfully', async () => {
          const { body, statusCode } = await request(app)
              .post('/api/v1/auth/register')
              .send({
                username: 'Alhajiq',
                password: 'Alhaji123',
                firstName: 'Alhaji',
                lastName: 'Alhaji',
                role: 'admin',
              });
          expect(statusCode).toBe(201);
          expect(body).toEqual({
            msg: `An account has been created for Alhajiq`,
          });
      });
    });
  });


describe('Testing authentication route', () => {
  describe('POST - /api/v1/auth/login', () => {
    it('failure - no username', async() => {
      try {
        const { body, statusCode } = await request(app)
        .post('/api/v1/auth/login')
        .send({
          username: '',
          password: 'password'
        })

        expect(statusCode).toBe(400)
      } catch (error) {
        expect(error).toEqual({
          error: true,
          msg: error.message,
          stack: config.NODE_ENV === 'production' ? null : err.stack
        })
      }
    })

    it('failure - no password', async() => {
      try {
        const { body, statusCode } = await request(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'username',
          password: ''
        })

        expect(statusCode).toBe(400)
      } catch (error) {
        expect(error).toEqual({
          error: true,
          msg: error.message,
          stack: config.NODE_ENV === 'production' ? null : err.stack
        })
      }
    })

    it('failure - User does not exist', async() => {
      try {
        const { body, statusCode } = await request(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'username',
          password: 'password'
        })
        
        expect(statusCode).toBe(404)
      } catch (error) {
        expect(error).toEqual({
          error: true,
          msg: error.message,
          stack: config.NODE_ENV === 'production' ? null : err.stack
        })
      }
    })

    it('success - User logs in', async() => {
      try {
        const { body, statusCode } = await request(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'Alhaji',
          password: 'Alhaji123'
        })
        
        expect(statusCode).toBe(200)
        expect(body).toEqual({
          msg: 'Successful Login',
          token: expect.any(String)
        })
      } catch (error) {
        expect(error).toEqual({
          error: true,
          msg: error.message,
          stack: config.NODE_ENV === 'production' ? null : err.stack
        })
      }
    })
  })
})