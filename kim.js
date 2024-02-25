//Act4 - ENV 
require('dotenv').config();
const express = require('express');
const hostname = process.env.HOST || 3500;
const port = process.env.PORT ||3500 ;
console.log(hostname);
console.log(port);
