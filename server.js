'use strict';

require('dotenv').config();
const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const PORT = process.env.PORT;
const app = express();

app.use(sslRedirect());
app.use(express.static('./public'));
app.use((req, res) => res.sendFile('404.html', {root: './public'}));
app.listen(PORT, () => console.log('Listening on PORT', PORT));
