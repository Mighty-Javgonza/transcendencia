start:
	docker run -it --rm -v "$(PWD):/usr/src/app" -w /usr/src/app node:12 npm run start

build:
	docker run -it --rm -v "$(PWD):/usr/src/app" -w /usr/src/app node:12 npm run build

exec_node:
	docker run -it --rm -v "$(PWD):/usr/src/app" -w /usr/src/app node:12 node delete.js

exec_server:
	docker run -it --rm -v "$(PWD):/usr/src/app" -w /usr/src/app node:12 npx tsc --esModuleInterop log.ts
	docker run --rm -v "$(PWD):/usr/src/app" -w /usr/src/app -p 4242:4242 --network database node:12 node log.js
	
exec_experiment:
	docker run -it --rm -v "$(PWD):/usr/src/app" -w /usr/src/app node:12 npx tsc --esModuleInterop jwt.ts
	docker run --rm -v "$(PWD):/usr/src/app" -w /usr/src/app -p 4242:4242 node:12 node jwt.js

transpile_assets:
	docker run -it --rm -v "$(PWD):/usr/src/app" -w /usr/src/app node:12 npx tsc assets/welcome_page/trial.ts

install_package:
	docker run -it --rm -v "$(PWD):/usr/src/app" -w /usr/src/app node:12 npm install jsonwebtoken

start_postgres:
	docker run -e POSTGRES_PASSWORD=1234 -d -p 5432:5432 --network database --name postgres_db postgres:15.4-alpine

enter_postgres:
	docker exec -it postgres_db psql -U postgres
