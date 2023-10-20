import { authenticator } from "otplib";
import * as qrcode from "qrcode";

const generateNewSecret = async() => {
	const secret = authenticator.generateSecret();
	console.log(secret);
	const otp = authenticator.keyuri('javgonza', 'ft_transcendence', secret);

	console.log(otp);
	qrcode.toDataURL(otp, (err, imageUrl) => {
		if (err)
		{
		} else {
			console.log(imageUrl);
		}
	});
}

const checkOTP = async(token:string, secret: string) => {
	const check = authenticator.check(token, secret);
	const timeR = authenticator.timeRemaining();
	const timeU = authenticator.timeUsed();
	console.log(check);
}

const token =  '429347';
const secret = 'HJTUIHY7GNLTSOCC';

checkOTP(token, secret);
//generateNewSecret();
