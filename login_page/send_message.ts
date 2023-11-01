import { makeQuery } from './database'

export const sendMessage = async (req, res) => {
	const sender_login:string = req.query.sender;
	const recipient_login:string = req.query.target;
	const text:string = req.query.text;

	console.log(sender_login + ' sent a message ');
	makeQuery('INSERT INTO messages (sender, recipient, message) VALUES ($1, $2, $3)', [sender_login, recipient_login, text]);
	res.header("Access-Control-Allow-Origin", '*');
	res.send("OK");
}
