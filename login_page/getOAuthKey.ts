import axios from "axios";
import qs from "qs";

let id: string = 'u-s4t2ud-b16e1d817c759a4768523eda7110974f45570d769c4180e352137a7aeb4a5ee7';
let secret: string = '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';
let tokenHost: string =  'https://api.intra.42.fr/oauth/token';

let apiEndpoint: string =  'https://api.intra.42.fr/v2/me';

export const getOAuthKey = async(req:any, res:any) => {
	console.log("QUEY CODE: " + req.query.code);
		const accessToken = await axios.post(tokenHost, qs.stringify({
    		grant_type: 'authorization_code',
    		client_id: id,
    		client_secret: secret,
			code:req.query.code,
			redirect_uri: 'http://localhost:4242/inter_log_page',
		})).then((res) => {
			return res.data.access_token;
		}
		).catch((error) => {
			console.log("FAILED TO GET ACCESS TOKEN");
			console.log(error.message);
		});	
		return (accessToken);
}

export const getPersonalInfo = async(token) => {
	let config = {
		headers: {
			Authorization: "Bearer " + token
		}
	};
	const data = await axios.get(apiEndpoint, config).then((res) => {
		return (res.data);
	}).catch ((error) => {
		console.log("ERRORRR: " + error);
	});
	return data;
};
