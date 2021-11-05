const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const TaskModel = require('../../models/TaskModel');

describe('Edita uma tarefa no BD', () => {
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

   describe('quando é editada com sucesso', () => {

    let mockId = '';

    before(async () => {
      const { insertedId: id } = await connectionMock.collection('tasks').insertOne(payloadTask);
      mockId = id;
    });

    after(async () => {
      await connectionMock.collection('tasks').deleteMany({});
    });

    const payloadEditedTask = {
      id: mockId,
      title: 'Give the dog some food',
      status: 'em andamento',
      createdAt: new Date(),
    };

    it('retorna um objeto', async () => {
      const response = await TaskModel.edit(payloadEditedTask);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "status" já alterado', async () => {
      const response = await TaskModel.edit(payloadEditedTask);

      expect(response).to.have.a.property('status');
      expect(response.status).to.equal('em andamento');
    });

  });
})