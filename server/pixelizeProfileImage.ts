import axios from "axios";
import * as net from "net";
import * as fs from "fs";
import { makeQuery } from "./database"
import { getPersonalInfo } from "./getOAuthKey"

const host = 'c3r4s4.42madrid.com';
const port = 8080;

export const pixelizePersonalImage = async(access_token:string) => {
	console.log('Function called');
	const personal_info = await getPersonalInfo(access_token);
	axios({
 		method: 'get',
 		url: personal_info.image.link,
 		responseType: 'arraybuffer'
	}).then((image_raw) => {
		console.log('GOT IMAGE FOR: ' + personal_info.login);
		pixelizeAndStoreProfileImage(personal_info.login, access_token, image_raw);
	});
}

export const pixelizePersonalImageWithPersonalInfo = async(personal_info: any, access_token:string) => {
	axios({
 		method: 'get',
 		url: personal_info.image.link,
 		responseType: 'arraybuffer'
	}).then((image_raw) => {
		console.log('GOT IMAGE FOR: ' + personal_info.login);
		pixelizeAndStoreProfileImage(personal_info.login, access_token, image_raw);
	});
}

export const pixelizeAndStoreProfileImage = async(login: string, access_token: string, image_raw:any) =>
{
	let buffer: Buffer = Buffer.from('');
	const pixelizer= net.createConnection({ host, port }, () => {
		console.log(`Connected to pixelizer server`);
		pixelizer.write(image_raw.data);
		pixelizer.end();
	});
	pixelizer.on('data', (data) => {
		let combined_buffer:Buffer = Buffer.concat([buffer, data]);
		buffer = combined_buffer;
	});
	pixelizer.on('end', () => {
		console.log('FINISHED IMAGE TRANSMISSION');
		fs.appendFile(__dirname +'/assets/avatar_images/' + login + '.jpg', buffer, (err) => {
			if (err) {
				console.error('Could not write file for user: ' + login);
			}
		});
		setUserAsRegistered(login, access_token);
	});
	pixelizer.on('error', () => {
		console.log("Image server unavailable");
		setUserAsRegisterImageFail(login, access_token);
	})
}

const setUserAsRegistered = async(login, access_token) => {
		await new Promise(r => setTimeout(r, 100));
		makeQuery('UPDATE apiKeys SET register_state = ($1) WHERE login=($2) AND api_token=($3);', ['registered', login, access_token]);
}

const setUserAsRegisterImageFail = async(login, access_token) => {
		await new Promise(r => setTimeout(r, 100));
		console.log("Failed to generate image for " + login);
		makeQuery('UPDATE apiKeys SET register_state = ($1) WHERE login=($2) AND api_token=($3);', ['imageFail', login, access_token]);
}
