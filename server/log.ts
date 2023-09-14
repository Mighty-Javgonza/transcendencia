import express from "express";
import { getOAuthKey, getPersonalInfo } from './getOAuthKey';
import * as fs from "fs";
//import { sendImageForPixelation } from './sendImageForPixelation';
import { makeQuery, registerUser, awaitAvatarImage} from './database';

const app = express();
const port = 4242;

app.use('/', express.static('assets/first_page'));
app.use('/avatar_images', (req, res, next) => {
	const imagePath = __dirname + '/assets/avatar_images' + req.path;
//	if (fs.existsSync(imagePath))
//		res.sendFile(imagePath);
//	else
		awaitAvatarImage(req, res, imagePath);
});

app.get('/welcome_page', (req, res, next) => {
	if (req.query.code != undefined)
	{
		getOAuthKey(req, res).then((accessToken) => {
			if (accessToken != undefined)
			{
				registerUser(accessToken);
				res.cookie('42APIToken', accessToken);
				console.log('token: ' + accessToken);
			}
		}).catch().finally(() => {next()});
	}
}, express.static('assets/welcome_page'));

app.use('/welcome_page', express.static('assets/welcome_page'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
