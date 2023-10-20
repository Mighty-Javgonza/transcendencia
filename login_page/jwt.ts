import * as jwt from 'jsonwebtoken';

let token = jwt.sign({login: 'javgonza'}
	, 'My super secret', {expiresIn: '1h'});

let decoded = jwt.verify(token, 'My super secret');

console.log(decoded.login);
