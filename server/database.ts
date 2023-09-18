import {Client} from "pg";
import { getPersonalInfo } from "./getOAuthKey";
import axios from "axios";
import * as net from "net";
import * as fs from "fs";

const dbConfig = {
  user: 'postgres',
  password: '1234',
  host: 'postgres_db',
  port: 5432,
  database: 'userdatabase'
};


export const makeQuery = async(query:string, values:any) => {
	const client = new Client(dbConfig);
	return client.connect()
		.then(() => {
		  return client.query(query, values);
		})
		.then((q) => {
		  console.log('QUERY SUCCESS');
		  return q;
		})
		.catch(error => {
		  console.error('Error:', error);
		})
		.finally(() => {
		  client.end();
		});
}

export const test = async() => {
	const result:any = await makeQuery('SELECT api_token FROM apiKeys WHERE login=\'crisfern\';', []);

	console.log(result.rows[0].api_token);
}

export const registerUser = async(access_token) => {

//TODO ADD TRY CATCH HERE

	const personal_info = await getPersonalInfo(access_token);
	console.log("INSERTING USER");
	makeQuery('INSERT INTO apiKeys (login, api_token, register_state) VALUES ($1, $2, $3)', [personal_info.login, access_token, 'registering']);

	axios({
 		method: 'get',
 		url: personal_info.image.link,
 		responseType: 'arraybuffer'
	}).then((image_raw) => {
		console.log('GOT IMAGE FOR: ' + personal_info.login);
		pixelizeAndStoreProfileImage(personal_info, access_token, image_raw);
	});
};

export const pixelizeAndStoreProfileImage = async(login: string, access_token: string, image_raw:any) =>
{
	const host = 'c1r4s3.42madrid.com';
	const port = 8080;
	const pixelizer= net.createConnection({ host, port }, () => {
		console.log(`Connected to pixelizer server`);
		pixelizer.write(image_raw.data);
		pixelizer.end();
	});
	pixelizer.on('data', (data) => {
		fs.appendFile(__dirname +'/assets/avatar_images/' + login + '.jpg', data, (err) => {
			if (err) {
				console.error('Could not write file for user: ' + login);
			}
		});
	});
	pixelizer.on('end', () => {
		console.log('FINISHED IMAGE TRANSMISSION');
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
		makeQuery('UPDATE apiKeys SET register_state = ($1) WHERE login=($2) AND api_token=($3);', ['imageFail', login, access_token]);
}

export const awaitAvatarImage  = async(requested_login:string, res, imagePath:string) => {
		await new Promise(r => setTimeout(r, 1000));
		let user_in_db: any = await makeQuery('SELECT register_state FROM apiKeys WHERE login=($1)', [requested_login]);
		let left_attempts:number = 200;

		while (user_in_db.rows[0].register_state == 'registering' && left_attempts > 0)
		{
			await new Promise(r => setTimeout(r, 1000));
			user_in_db = await makeQuery('SELECT register_state FROM apiKeys WHERE login=($1)', [requested_login]);
			left_attempts--;
		}
		if (user_in_db.rows[0].register_state == 'registered')
			res.sendFile(imagePath);
		else
			res.status(404).send("Could not get image\n");
}

export const retrieveAvatarImage = async(req, res, imagePath) => {
	let requested_login: string = req.path.replace('.jpg', '').replace('/', '');
	const user_in_db:any = await makeQuery('SELECT * FROM apiKeys WHERE login=($1)', [requested_login]);
	if (user_in_db.rowCount == 0)
		res.status(404).send("Can't find user image.\n User is not registered\n");
	else {
		let state:string = user_in_db.rows[0].register_state;
		if (state == 'registering')
			awaitAvatarImage(requested_login, res, imagePath);
		if (state == 'imageFail')
		{
// TODO			pixelizeAndStoreProfileImage(user_in_db.rows[0].login, user_in_db.rows[0].access_token);
		}
	}
}
