function send2FACode() {
	var val = document.getElementById('2fa_numbers').value;
	const logToken = document.cookie.split("; ").
		find((row) => row.startsWith())?.split('=')[1];
	const redirectURL = "https://localhost:4242/welcome_page?totp=" + val + "&logToken=" + logToken;
	if (val != "") {
		window.location.href = redirectURL;
	}
}
