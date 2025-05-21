require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./controllers/routes')
app.use(express.json());

app.use('/api', routes)

app.get('/error', (req, res) => {
  throw new Error('Test error!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));