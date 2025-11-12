const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoute = require('./routes/auth');
const coursesRoute = require('./routes/courses');
const dataRoute = require('./routes/data');
const materialsRoute = require('./routes/materials');
const assignmentsRoute = require('./routes/assignments');



// Gunakan route
app.use('/api/auth', authRoute);
app.use('/api/courses', coursesRoute);
app.use('/api/data', dataRoute);
app.use('/api/materials', materialsRoute);
app.use('/api/assignments', assignmentsRoute);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 LMS backend listening on http://localhost:${PORT}`);
});
