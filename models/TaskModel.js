const mongoConnection = require('./connection');

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

module.exports = {
  create,
};
