import axios from "axios";
import qs from "qs";

let id: string = 'u-s4t2ud-b16e1d817c759a4768523eda7110974f45570d769c4180e352137a7aeb4a5ee7';
let secret: string = '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';
let tokenHost: string =  'https://api.intra.42.fr/oauth/token';

export const getOAuthKey = async(req:any, res:any) => {
		const accessToken = await axios.post(tokenHost, qs.stringify({
    		grant_type: 'authorization_code',
    		client_id: id,
    		client_secret: secret,
			code:req.query.code,
			redirect_uri: 'http://localhost:4242/welcome_page',
		})).then((res) => {
			return res.data.access_token;
		}
		).catch((error) => {
			console.log(error.message);
		});	
		return (accessToken);
}
