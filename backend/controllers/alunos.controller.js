const Aluno = require('../models/Aluno');

exports.getAll = async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
};

exports.create = async (req, res) => {
  const novoAluno = new Aluno(req.body);
  await novoAluno.save();
  res.status(201).json(novoAluno);
};

exports.update = async (req, res) => {
  const alunoAtualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(alunoAtualizado);
};

exports.delete = async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
