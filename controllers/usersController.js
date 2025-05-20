import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'chave-logicat';

export const getUser = async (req, res) => {
  try {
    const idusers = req.params.id;

    if (!idusers) {
      return res.status(400).send({
        success: false,
        message: 'ID do usuário não fornecido',
      });
    }

    const [user] = await db.query("SELECT idusers, name, email FROM users WHERE idusers = ?", [idusers]);

    if (user.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    res.status(200).send({
      success: true,
      user: user[0],
    });
  } catch (error) {
    // Erro de servidor
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Erro ao buscar usuário',
      error: error.message,
    });
  }
};

  export const createUser = async (req, res) => {
  try {
    const { name, email, senha } = req.body;

    if (!name || !email || !senha) {
      return res.status(400).send({
        success: false,
        message: 'Por favor, preencha todos os campos',
      });
    }

    const [exist] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (exist.length > 0) {
      return res.status(409).send({
        success: false,
        message: 'Este e-mail já está em uso.',
      });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const [data] = await db.query(
      'INSERT INTO users (name, email, senha) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).send({
      success: true,
      message: 'Novo usuário cadastrado',
      userId: data.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Erro ao criar usuário',
      error: error.message,
    });
  }
};


export const updateUser = async (req, res) => {
  try {
    const idusers = parseInt(req.params.id);

    if (idusers !== req.usuario.id) {
      return res.status(403).send({
        success: false,
        message: 'Acesso negado',
      });
    }

    const { name, email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);

    const [data] = await db.query(
      'UPDATE users SET name = ?, email = ?, senha = ? WHERE idusers = ?',
      [name, email, hashedPassword, idusers]
    );

    if (data.affectedRows === 0) {
      return res.status(500).send({
        success: false,
        message: 'Erro ao atualizar usuário',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Usuário atualizado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Erro ao atualizar usuário',
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const idusers = req.params.id;
    if (!idusers) {
      return res.status(404).send({
        success: false,
        message: 'Coloque um ID válido',
      });
    }

    const [data] = await db.query("DELETE FROM users WHERE idusers = ?", [idusers]);

    if (data.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: 'Usuário não encontrado para deletar',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Usuário deletado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Erro ao deletar usuário',
      error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).send({
        success: false,
        message: "Email e senha são obrigatórios",
      });
    }

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).send({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Senha incorreta",
      });
    }

    // criar token JWT
    const token = jwt.sign({ id: user.idusers }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).send({
      success: true,
      message: "Login efetuado com sucesso",
      token,
      user: {
        id: user.idusers,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Erro no login",
      error,
    });
  }
};