const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const coursesRoutes = require('./routes/courses');
const dataRoutes = require('./routes/data');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api', dataRoutes);

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'LMS backend running' });
});

app.listen(PORT, () => {
  console.log(`LMS backend listening on port ${PORT}`);
});
