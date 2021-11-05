const TaskService = require('../services/TaskService');
const TaskModel = require('../models/TaskModel');

const create = async (req, res) => {
  const { title, status } = req.body;

  const task = await TaskService.create({ title, status });

  return res.status(200).json({
    task
  });
};

const findAll = async (_req, res) => {
  const tasks = await TaskModel.findAll();

  return res.status(200).json({
    tasks
  });
};

module.exports = {
  create,
  findAll
};