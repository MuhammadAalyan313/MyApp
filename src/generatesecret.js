"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var secretKey = crypto.randomBytes(64).toString('hex');
console.log(secretKey);
