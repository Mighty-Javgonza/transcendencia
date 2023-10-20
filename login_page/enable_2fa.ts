import { makeQuery } from "./database";
import { authenticator } from "otplib";
import * as qrcode from "qrcode";

export const enable2_fa = async(req, res) => {
	const login:string = req.query.login;
	const access_token:string = req.query.token42;
	const secret = authenticator.generateSecret();
	console.log("Activating 2FA for: " + login + " secret " + secret);

	const otp = authenticator.keyuri(login, 'PongVerso', secret);

	qrcode.toDataURL(otp, (err, imageUrl) => {
		if (err) {
			res.status = 500;
			res.send('Could not generate 2FA secret');
		}
		else
			registerInDbAndSendQr(secret, login, access_token, imageUrl, req, res);
				
	});

}

const registerInDbAndSendQr = async(secret:string, login:string, access_token: string, imageUrl, req, res) => {
	const user_in_db:any = await makeQuery('SELECT twofa_enabled FROM apiKeys WHERE login=($1) AND api_token=($2)', [login, access_token]);
	if (user_in_db.rowCount == 0)
	{
		res.status = 403;
		res.send('You cannot enable 2FA for another user');
	}
	else
	{
		if (user_in_db.rows[0].twofa_enabled == 1)
		{
			res.status = 403;
			res.send('2FA already enabled');
		}
		else
		{
			makeQuery('UPDATE apiKeys SET twofa_enabled=$1, twofa_secret=$2 WHERE login=($3) AND api_token=($4);', ['b1', secret, login, access_token]);
			res.send(imageUrl);
		}
	}
}
