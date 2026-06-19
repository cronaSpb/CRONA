const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');

router.post('/register',
  [
    body('username').trim().isLength({ min: 3, max: 50 }).matches(/^[a-zA-Z0-9_]+$/),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('displayName').optional().trim().isLength({ max: 100 }),
    body('consentPersonalData').isBoolean().equals('true')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, displayName, consentPersonalData } = req.body;

    try {
      const existingUser = await db.query(
        'SELECT id FROM users WHERE username = $1 OR email = $2',
        [username, email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(409).json({ error: 'Пользователь уже существует' });
      }

      if (!consentPersonalData) {
        return res.status(400).json({ 
          error: 'Требуется согласие на обработку персональных данных (152-ФЗ)' 
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const result = await db.query(
        `INSERT INTO users (username, email, password_hash, display_name, consent_personal_data, consent_date)
         VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
         RETURNING id, username, email, display_name, created_at`,
        [username, email, passwordHash, displayName || username, consentPersonalData]
      );

      const user = result.rows[0];

      await db.query(
        'INSERT INTO audit_logs (user_id, action, ip_address) VALUES ($1, $2, $3)',
        [user.id, 'USER_REGISTERED', req.ip]
      );

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.status(201).json({
        message: 'Регистрация успешна',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          displayName: user.display_name
        }
      });
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      res.status(500).json({ error: 'Ошибка сервера при регистрации' });
    }
  }
);

router.post('/login',
  [
    body('username').trim().notEmpty(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const result = await db.query(
        'SELECT id, username, email, password_hash, display_name, avatar_url, is_active FROM users WHERE username = $1 OR email = $1',
        [username]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Неверные учетные данные' });
      }

      const user = result.rows[0];

      if (!user.is_active) {
        return res.status(403).json({ error: 'Аккаунт деактивирован' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Неверные учетные данные' });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      await db.query(
        'UPDATE users SET last_seen = CURRENT_TIMESTAMP WHERE id = $1',
        [user.id]
      );

      await db.query(
        'INSERT INTO audit_logs (user_id, action, ip_address) VALUES ($1, $2, $3)',
        [user.id, 'USER_LOGIN', req.ip]
      );

      res.json({
        message: 'Вход выполнен успешно',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          displayName: user.display_name,
          avatarUrl: user.avatar_url
        }
      });
    } catch (error) {
      console.error('Ошибка входа:', error);
      res.status(500).json({ error: 'Ошибка сервера при входе' });
    }
  }
);

router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      await db.query(
        'INSERT INTO audit_logs (user_id, action, ip_address) VALUES ($1, $2, $3)',
        [decoded.userId, 'USER_LOGOUT', req.ip]
      );
    }

    res.json({ message: 'Выход выполнен успешно' });
  } catch (error) {
    console.error('Ошибка выхода:', error);
    res.status(500).json({ error: 'Ошибка сервера при выходе' });
  }
});

module.exports = router;
