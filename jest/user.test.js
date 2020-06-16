/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../index.js');

describe('Starting the User CRUD', () => {
  it('User CRUD Tests', async () => {
    const responseToCreate = await request(app)
      .post('/user')
      .send({
        name: 'User Test',
        age: 25,
        document: '0987323',
        birthdate: '1994-11-05T06:00:00.000Z',
        address: {
          street: 'Rua dos passaros',
          number: '2A',
          zone: 'Dom Avelar',
          city: 'Petrolina, PE',
        },
      });

    expect(responseToCreate.statusCode).toEqual(200);

    expect(responseToCreate.body.name).toEqual('User Test');
    expect(responseToCreate.body.age).toEqual(25);
    expect(responseToCreate.body.document).toEqual('0987323');
    expect(responseToCreate.body.birthdate).toEqual('1994-11-05T06:00:00.000Z');
    expect(responseToCreate.body.address).toEqual({
      street: 'Rua dos passaros',
      number: '2A',
      zone: 'Dom Avelar',
      city: 'Petrolina, PE',
    });

    const responseToUpdate = await request(app)
      .put(`/user/${responseToCreate.body._id}`)
      .send({
        name: 'User Test Updated',
        age: 26,
        document: '7126786',
        birthdate: '1994-10-05T06:00:00.000Z',
        address: {
          street: 'Rua dos Corvos',
          number: '3A',
          zone: 'Lot Pd Cicero',
          city: 'Petrolina, PE',
        },
      });

    expect(responseToUpdate.statusCode).toEqual(200);

    expect(responseToUpdate.body.name).toEqual('User Test Updated');
    expect(responseToUpdate.body.age).toEqual(26);
    expect(responseToUpdate.body.document).toEqual('7126786');
    expect(responseToUpdate.body.birthdate).toEqual('1994-10-05T06:00:00.000Z');
    expect(responseToUpdate.body.address).toEqual({
      street: 'Rua dos Corvos',
      number: '3A',
      zone: 'Lot Pd Cicero',
      city: 'Petrolina, PE',
    });

    const responseToGet = await request(app).get(`/user/${responseToCreate.body._id}`);

    expect(responseToGet.body.name).toEqual('User Test Updated');
    expect(responseToUpdate.body.age).toEqual(26);
    expect(responseToGet.body.document).toEqual('7126786');
    expect(responseToGet.body.birthdate).toEqual('1994-10-05T06:00:00.000Z');
    expect(responseToGet.body.address).toEqual({
      street: 'Rua dos Corvos',
      number: '3A',
      zone: 'Lot Pd Cicero',
      city: 'Petrolina, PE',
    });

    const responseToList = await request(app).get('/users');
    expect(responseToList.body).toEqual(expect.arrayContaining([responseToGet.body]));

    const responseToDelete = await request(app).delete(`/user/${responseToCreate.body._id}`);
    expect(responseToDelete.status).toEqual(200);
  });
});
