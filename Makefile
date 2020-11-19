install: install-deps

start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon bin/slack.js

start-frontend:
	npx webpack serve

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test -s

test-coverage:
	npm test -- --coverage

lint:
	npx eslint . --ext js,jsx

deploy:
	git push heroku

production-logs:
	heroku logs --tail

.PHONY: test
