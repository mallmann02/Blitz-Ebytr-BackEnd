const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const TaskModel = require('../../models/TaskModel');

describe('Insere um novo filme no BD', () => {
   let connectionMock;
   const payloadTask = {
      title: 'Give the dog some food',
      status: 'pendente',
      createdAt: new Date(),
   };

    let DBServer = new MongoMemoryServer();
    before(async () => {
      const URLMock = await DBServer.getUri();

      connectionMock = await MongoClient
        .connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then((conn) => conn.db('blitzChallenge'));

      
      sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
    });

   after(async () => {
      await mongoConnection.getConnection.restore();
   });    

   describe('quando é inserido com sucesso', () => {

     it('retorna um objeto', async () => {
       const response = await TaskModel.create(payloadTask);

       expect(response).to.be.a('object');
     });

     it('tal objeto possui o "id" da nova tarefa inserida', async () => {
       const response = await TaskModel.create(payloadTask);

       expect(response).to.have.a.property('id');
     });

     it('deve existir um filme com o título cadastrado!', async () => {
      await TaskModel.create(payloadTask);
      const movieCreated = await connectionMock.collection('tasks').findOne({ title: payloadTask.title });
      expect(movieCreated).to.be.not.null;
		});

   });

});