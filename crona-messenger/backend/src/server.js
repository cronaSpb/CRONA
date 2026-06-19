require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const socketHandler = require('./socket/socketHandler');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Слишком много запросов с этого IP, попробуйте позже'
});

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Crona Messenger API работает',
    timestamp: new Date().toISOString()
  });
});

socketHandler(io);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Crona Backend запущен на порту ${PORT}`);
  console.log(`📡 WebSocket сервер готов`);
  console.log(`🔒 Режим: ${process.env.NODE_ENV}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM получен, корректное завершение...');
  server.close(() => {
    console.log('Сервер остановлен');
    process.exit(0);
  });
});
