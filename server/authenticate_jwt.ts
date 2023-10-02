import * as jwt from 'jsonwebtoken'

const api42Url = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-b16e1d817c759a4768523eda7110974f45570d769c4180e352137a7aeb4a5ee7&redirect_uri=http%3A%2F%2Flocalhost%3A4242%2Finter_log_page&response_type=code'

export const authenticateJWT = async(req: any, res: any, next: any) => {
	const versoToken = req.headers.cookie.split("; ").find((row) => row.startsWith('versoToken'))?.split("=")[1];
	console.log(versoToken);
	jwt.verify(versoToken, 'TODO change secret', (err, payload) => {
		if (err)
		{
			console.log(err.message);
			res.redirect(api42Url);
		}
		else
			next();
	});
}
