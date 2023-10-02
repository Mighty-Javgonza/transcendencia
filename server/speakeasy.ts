import * as speakeasy from "speakeasy";

let secret:any = speakeasy.generateSecret();
console.log(secret.base32);

let token:string = speakeasy.totp({
	secret:secret.base32,
	encoding: 'base32',
	step:2,
});

console.log(token);

let tokenDelta:any = speakeasy.totp.verifyDelta({
	secret: secret.base32,
	encoding: 'base32',
	token: token,
	window: 2,
	step:2
});

console.log(tokenDelta);
