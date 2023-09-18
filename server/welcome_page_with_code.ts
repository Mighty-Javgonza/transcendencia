import { getOAuthKey } from './getOAuthKey'
import { registerUser } from './database'
import { makeQuery } from './database'

export const welcomePageWithCode = async(req:any, res:any, next:any, code:any) => {
	getOAuthKey(req, res).then((accessToken) => {
		if (accessToken != undefined)
		{
			res.cookie('42APIToken', accessToken);
			makeQuery('SELECT login,api_token FROM apiKeys WHERE api_token=($1);', [accessToken]).then((user_in_db:any) => {
				if (user_in_db.rowCount == 0)
				{
					registerUser(accessToken);
					console.log("Registering new user");
				}
				else
					console.log("CODE ACCESS: " + user_in_db.rows[0].login);
			});
		}
	}).catch((error) => {/*TODO*/}).finally(() => {next()});
}
