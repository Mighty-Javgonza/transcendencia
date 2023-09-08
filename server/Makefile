start:
	docker run -it --rm -v "$(PWD):/usr/src/app" -w /usr/src/app node:12 npm run start

build:
	docker run -it --rm -v "$(PWD):/usr/src/app" -w /usr/src/app node:12 npm run build

exec_node:
	docker run -it --rm -v "$(PWD):/usr/src/app" -w /usr/src/app node:12 node log.js

exec_ts:
	docker run -it --rm -v "$(PWD):/usr/src/app" -w /usr/src/app node:12 npx tsc --esModuleInterop log.ts getOAuthKey.ts
	docker run --rm -v "$(PWD):/usr/src/app" -w /usr/src/app -p 4242:4242 node:12 node log.js

install_package:
	docker run -it --rm -v "$(PWD):/usr/src/app" -w /usr/src/app node:12 npm i axios
