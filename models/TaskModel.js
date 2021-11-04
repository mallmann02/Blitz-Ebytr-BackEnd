const mongoConnection = require('./connection');
const { ObjectId } = require('mongodb');

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

const edit = async ({ title, status, createdAt, id }) => {
  const tasksCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('tasks'));

  await tasksCollection
    .updateOne({ _id: id }, { $set: { status } });

  return {
    id,
    title,
    status,
    createdAt,
  };
};

module.exports = {
  create,
  edit,
};
