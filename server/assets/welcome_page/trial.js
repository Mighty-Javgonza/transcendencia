function getCookieToken() {
	const token42 = document.cookie.split("; ")
 	.find((row) => row.startsWith("42APIToken="))
	?.split("=")[1];

	return token42;
}

async function modifyPageWithLogin(login) {
	document.getElementById('login_name').innerHTML = login;
	avatar = document.getElementById("avatar_image");
	avatar_url = "../avatar_images/" + login + ".jpg";
	try {
		var fetched = await fetch(avatar_url, {method: "GET"});
		const image = await fetched.blob();
		var image_url = URL.createObjectURL(image);
		avatar.src = image_url;
	} catch (err) {
		console.log('Could not retrieve avatar image');
	}
}

window.addEventListener('DOMContentLoaded', function() {
	token42 = getCookieToken();
	fetch("https://api.intra.42.fr/v2/me", {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token42
		}
	}).then((res) => {res.json().then((json_values) =>{
		const login = json_values.login;
		modifyPageWithLogin(login);
	})});
});
