const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config(); // Environment variables

// Create server/app express
const app = express();

// DB connection
dbConnection();

// Public web / directory (middleware)
app.use(express.static('public'));

// Cors (middleware)
app.use(cors());

// Read and parse body (middleware) - access to request data in body
app.use(express.json());

// Routes (middleware)
app.use('/api/auth', require('./routes/auth'));

// Manage Angular App Routes
app.get( '*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html') );
});

// GET basic endpoint (DELETE THIS, is only for initial test)
// app.get('/', (request, response) => {
//     response.json({
//         ok: true,
//         msg: 'All ok',
//         uid: 1234
//     });
// });

app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});