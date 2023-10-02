async function enable2FA() {
	token42 = getCookieToken();
	fetch("https://api.intra.42.fr/v2/me", {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token42
		}
	}).then((res) => { res.json().then((json_values) => {
		const login = json_values.login;
		fetch('../enable_2fa?login=' + login + "&token42=" + token42).then((res) => {
			if (res.status == 200)
			{
				res.text().then((qrCode) => {
					code_image = document.getElementById('qr_code');
					code_image.src = qrCode;
				});
			}
		});
	})});
}
