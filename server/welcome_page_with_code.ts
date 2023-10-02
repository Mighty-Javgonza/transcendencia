import { getOAuthKey, getPersonalInfo } from './getOAuthKey';
import { registerUser } from './database';
import { makeQuery } from './database';
import { pixelizePersonalImage } from './pixelizeProfileImage';
import * as jwt from 'jsonwebtoken';
import { totp } from "otplib";

function user_access(res, versoToken, accessToken, user_in_db) {
	res.cookie('versoToken', versoToken);
	res.cookie('42APIToken', accessToken);
	res.redirect("http://localhost:4242/welcome_page");
	console.log("ACCESS: " + user_in_db.rows[0].login);
	if (user_in_db.rows[0].register_state == 'imageFail')
		pixelizePersonalImage(accessToken);
}

export const loginWithCode = async(req:any, res:any, next:any) => {
	let payload = jwt.verify(req.query.logToken, 'TODO change2secret');
	console.log('deciphered token');
	console.log(payload);
	let login = payload.login
	let accessToken = payload.token42
	makeQuery('SELECT login,api_token,register_state,twofa_enabled,twofa_secret FROM apiKeys WHERE login=($1);', [login]).then((user_in_db:any) => {
		let versoToken = jwt.sign({login: login}, 'TODO change secret', {expiresIn: '1h'});
		if (user_in_db.rowCount == 0)
		{
			res.cookie('versoToken', versoToken);
			res.cookie('42APIToken', accessToken);
			res.redirect("http://localhost:4242/welcome_page");
			registerUser(accessToken);
			console.log("Registering new user");
		}
		else if (user_in_db.rows[0].twofa_enabled == '1')
		{
			if (req.query.totp == undefined)
			{
				res.status = 401;
				res.send('You need a 2FA key to enter');
			}
			else
			{
				const totp = req.query.totp;
				const secret = user_in_db[0].twofa_secret;
				const isValid = totp.verify({totp, secret});
				if (isValid)
				{
					user_access(res, versoToken, accessToken, user_in_db);
				}
				else
				{
					res.status = 401;
					res.send('Your 2FA key is invalid');
				}
			}
		}
		else
		{
			user_access(res, versoToken, accessToken, user_in_db);
		}
	});
}
