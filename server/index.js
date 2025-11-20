require('dotenv').config();
const express = require('express');
const cors = require('cors');
const clientsRouter = require('./src/routes/clients');

const app = express();
app.use(cors());
app.use(express.json());

// rutas básicas
app.use('/api/clients', clientsRouter);

// error handler simple
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});