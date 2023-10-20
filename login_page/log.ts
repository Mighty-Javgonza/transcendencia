import express from "express";
import * as fs from "fs";
//import { sendImageForPixelation } from './sendImageForPixelation';
import { makeQuery, registerUser} from './database';
import { loginWithCode } from './welcome_page_with_code'
import { welcomePageWithToken } from './welcome_page_with_token'
import { welcomePageWithNothing } from './welcome_page_with_nothing'
import { inter_log_page_code } from "./inter_log_page_code"
import { enable2_fa } from './enable_2fa'
import { authenticateJWT } from './authenticate_jwt'

const app = express();
const port = 4242;

app.use('/', express.static('assets/first_page'));
app.use('/avatar_images', express.static('assets/avatar_images'));

app.use('/inter_log_page', express.static('assets/inter_log_page'));

app.get('/inter_log_page', (req, res, next) => {
//	//TODO maybe we can let them pass if they do not have a code?
	if (req.query.code != undefined)
		inter_log_page_code(req, res, next);
}, /*express.static('assets/inter_log_page')*/);


app.get('/login_page', (req, res, next) => {
	loginWithCode(req, res, next);
});

//TODO middleware check
app.get('/welcome_page', (req, res, next) => {
	next();
}, express.static('assets/welcome_page'));

app.use('/welcome_page', express.static('assets/welcome_page'));

app.use('/enable_2fa', authenticateJWT);
app.get('/enable_2fa', (req, res) => {enable2_fa(req, res)});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
