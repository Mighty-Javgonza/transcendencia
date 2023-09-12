import express from "express";
import { getOAuthKey } from './getOAuthKey';

const app = express();
const port = 4242;

app.use('/', express.static('assets/first_page'));
app.use('/avatar_images', express.static('assets/avatar_images'));

app.get('/welcome_page', (req, res, next) => {
	if (req.query.code != undefined)
	{
		getOAuthKey(req, res).then((accessToken) => {
			if (accessToken != undefined)
			{
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
