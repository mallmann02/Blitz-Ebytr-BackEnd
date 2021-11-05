const TaskModel = require('../models/TaskModel');
const { inputsVerification } = require('../utils/inputVerification');

const create = async ({ title, status }) => {
  const { message } = inputsVerification(title, status);

  if (message) {
    return { code: 400, message };
  }

  const task = await TaskModel.create({ title, status, createdAt: new Date() });

  return { task, code: 200 };
};

const findAll = async () => {
  
};

module.exports = {
  create,
}
