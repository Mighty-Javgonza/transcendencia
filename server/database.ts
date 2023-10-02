import {Client} from "pg";
import { getPersonalInfo } from "./getOAuthKey";
import axios from "axios";
import * as net from "net";
import * as fs from "fs";
import { pixelizePersonalImageWithPersonalInfo, pixelizePersonalImage } from "./pixelizeProfileImage";

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

export const registerUser = async(access_token) => {
	try {
		const personal_info = await getPersonalInfo(access_token);
		console.log("INSERTING USER");
		makeQuery('INSERT INTO apiKeys (login, api_token, register_state, twofa_enabled) VALUES ($1, $2, $3, $4)', [personal_info.login, access_token, 'registering', 'b0']);
		pixelizePersonalImageWithPersonalInfo(personal_info, access_token);
	} catch (error) {
		console.log(error.message);
	}
};
