import express from "express";
import * as fs from "fs";
//import { sendImageForPixelation } from './sendImageForPixelation';
import { makeQuery, registerUser, awaitAvatarImage, retrieveAvatarImage} from './database';
import { welcomePageWithCode } from './welcome_page_with_code'
import { welcomePageWithToken } from './welcome_page_with_token'
import { welcomePageWithNothing } from './welcome_page_with_nothing'

const app = express();
const port = 4242;

app.use('/', express.static('assets/first_page'));
app.use('/avatar_images', express.static('assets/avatar_images')/*(req, res, next) => {
//	const imagePath = __dirname + '/assets/avatar_images' + req.path;
//TODO	awaitAvatarImage(req, res, imagePath);
}*/);

app.get('/welcome_page', (req, res, next) => {
	if (req.query.code != undefined)
		welcomePageWithCode(req, res, next, req.query.code);
	else if (req.query.token42 != undefined)
		welcomePageWithToken(req, res, next, req.query.token42);
	else
		welcomePageWithNothing(req, res, next);
}, express.static('assets/welcome_page'));

app.use('/welcome_page', express.static('assets/welcome_page'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
