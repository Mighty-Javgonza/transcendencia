
import { getOAuthKey, getPersonalInfo } from "./getOAuthKey"
import * as jwt from "jsonwebtoken"
import { makeQuery } from "./database"

const redirect_user = async(res, next, personal_info, accessToken) => {
	//TODO: add expiration
	const user_in_db:any = await makeQuery("SELECT twofa_enabled FROM apiKeys WHERE login=$1", [personal_info.login]);
	let logToken = jwt.sign({login: personal_info.login, token42:accessToken}, 'TODO change2secret');
	if (user_in_db.rowCount == 0)
		res.redirect('http://localhost:4242/login_page?logToken=' + logToken);
	else if (user_in_db.rows[0].twofa_enabled == '0')
	{
		console.log("REDIRECTING TO login_page");
		res.redirect('http://localhost:4242/login_page?logToken=' + logToken);
	}
	else
	{
		console.log("STAYING FOR FA");
		res.cookie('logToken', logToken);
		next();
	}
}

export const inter_log_page_code = async(req, res, next) =>  {
	//TODO error status code
	console.log("INTER LOG");
	getOAuthKey(req, res).then((accessToken) => {
		console.log("TOKEN:" + accessToken);
		getPersonalInfo(accessToken).then((personal_info) => {
			redirect_user(res, next, personal_info, accessToken);
		}).catch((err) => {console.log(err.message); res.send('You are not good enough for the metaverse')});
	}).catch((err) => {console.log(err.message);res.send('You are not good enough for the metaverse')});
}
