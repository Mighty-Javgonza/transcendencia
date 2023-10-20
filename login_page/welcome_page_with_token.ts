import { makeQuery } from './database'
import { pixelizePersonalImage } from './pixelizeProfileImage'
import * as jwt from 'jsonwebtoken'

const api42Url = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-b16e1d817c759a4768523eda7110974f45570d769c4180e352137a7aeb4a5ee7&redirect_uri=http%3A%2F%2Flocalhost%3A4242%2Fwelcome_page&response_type=code'

export const welcomePageWithToken = async(req:any, res:any, next:any, versoToken:any) => {
//	const user_in_db:any = await makeQuery('SELECT login,api_token,register_state FROM apiKeys WHERE api_token=($1);', [token42]);
//	if (user_in_db.rowCount == 0)
//		res.redirect(api42Url);
//	else
//	{
//		if (user_in_db.rows[0].register_state == 'imageFail')
//			pixelizePersonalImage(token42);
//		next();
//	}
}
