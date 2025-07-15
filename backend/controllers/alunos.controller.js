const Aluno = require('../models/Aluno');

// Listar todos os alunos
exports.getAll = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao obter alunos', erro });
  }
};

// Criar novo aluno
exports.create = async (req, res) => {
  try {
    const novoAluno = new Aluno(req.body);
    await novoAluno.save();
    res.status(201).json(novoAluno);
  } catch (erro) {
    res.status(400).json({ mensagem: 'Erro ao criar aluno', erro });
  }
};

// Atualizar aluno existente
exports.update = async (req, res) => {
  try {
    const alunoAtualizado = await Aluno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!alunoAtualizado) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado' });
    }

    res.json(alunoAtualizado);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar aluno', erro });
  }
};

// Apagar aluno
exports.delete = async (req, res) => {
  try {
    const alunoApagado = await Aluno.findByIdAndDelete(req.params.id);

    if (!alunoApagado) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado' });
    }

    res.json({ mensagem: 'Aluno apagado com sucesso' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao apagar aluno', erro });
  }
};
