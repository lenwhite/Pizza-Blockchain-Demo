dev:
	docker-compose up truffle; docker-compose up -d
start:
	@echo "No production script defined"
	# Needs to migrate truffle scripts first then start
	# docker stack deploy pizza --compose-file docker-compose.yml
test: truffle-test api-test

api-test:
	docker-compose run --no-deps --rm api-test

truffle-test:
	docker-compose run --no-deps --rm truffle truffle test
