const api42Url = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-b16e1d817c759a4768523eda7110974f45570d769c4180e352137a7aeb4a5ee7&redirect_uri=http%3A%2F%2Flocalhost%3A4242%2Finter_log_page&response_type=code'

export const welcomePageWithNothing = async(req:any, res:any, next:any) => {
	res.redirect(api42Url);
}
