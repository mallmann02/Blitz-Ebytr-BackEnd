const TaskModel = require('../models/TaskModel');
const { inputsVerification } = require('../utils/inputVerification');

const create = async ({ title, status }) => {
  const { message } = inputsVerification(title, status);

  if (message) {
    return { code: 400, message };
  }

  const task = await TaskModel.create({ title, status, createdAt: new Date() });

  return { task, code: 201 };
};

const edit = async ({ id, status }) => {
  const { message } = inputsVerification(title='Give the Dog Some Food', status);

  if (message) {
    return { code: 400, message };
  }

  const task = await TaskModel.edit({ id, status });

  return { task, code: 200 };
};

module.exports = {
  create,
  edit,
}
