const TaskService = require('../services/TaskService');
const TaskModel = require('../models/TaskModel');

const create = async (req, res) => {
  const { title, status } = req.body;

  const { message, code, task } = await TaskService.create({ title, status });

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).json({
    task
  });
};

const findAll = async (_req, res) => {
  const tasks = await TaskModel.findAll();

  return res.status(200).json({
    tasks
  });
};

const edit = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const { message, code, task } = await TaskService.edit({ id, status });

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).json({
    task
  });
}

const remove = async (req, res) => {
  const { id } = req.params;

  await TaskModel.remove(id);
  
  return res.status(200).json({
    message: "Task was succesfully deleted"
  });
}

module.exports = {
  create,
  findAll,
  edit,
  remove,
};