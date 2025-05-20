import jwt from 'jsonwebtoken';

const JWT_SECRET = 'chave-logicat';

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send({ message: 'Token não fornecido' });

  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).send({ message: 'Token inválido' });
    req.usuario = usuario;
    next();
  });
};

export default verificarToken;
