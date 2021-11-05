const mongoConnection = require('./connection');
const { ObjectId } = require('mongodb');

const findAll = async () => {
  const tasksCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('tasks'));

  const tasks = await tasksCollection.find().toArray();

  return tasks;
};

const create = async ({ title, status, createdAt }) => {
  const tasksCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('tasks'));

  const { insertedId: id } = await tasksCollection
    .insertOne({ title, status, createdAt });

  return {
    id,
    title,
    status,
    createdAt,
  };
};

const edit = async ({ status, id }) => {
  const tasksCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('tasks'));

  await tasksCollection
    .updateOne({ _id: ObjectId(id) }, { $set: { status } });

  return {
    id,
    status,
  };
};

const remove = async (id) => {
  const tasksCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('tasks'));

  await tasksCollection.deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  edit,
  remove,
  findAll,
};
