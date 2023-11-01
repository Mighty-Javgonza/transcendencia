import { makeQuery } from './database'

export const receiveMessages = async (req, res) => {
	const recipient:string = req.query.recipient;
	const messages:any = await makeQuery("SELECT sender, recipient, message FROM messages WHERE recipient=($1)", [recipient]);
//	res.send(messages.rows);
	res.header("Access-Control-Allow-Origin", '*');
	console.log(JSON.stringify(messages.rows));
	res.send(JSON.stringify(messages.rows));
	console.log('SENDING MESSAGES');
}
