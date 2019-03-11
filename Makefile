GIT_COMMIT:=$(shell git rev-parse --short HEAD)
BUILD_DATE:=$(shell date '+%Y%m%d-%H%M%S')
VERSION:=$(BUILD_DATE).$(GIT_COMMIT)

dockerize := 0
cwd := $(shell pwd)

node_modules:
ifeq ($(dockerize),0)
	yarn install
endif

build: node_modules
ifeq ($(dockerize),1)
	-@rm -rf build
	-@rm -rf node_modules
	$(eval CONTAINER_ID:=$(shell docker create -e "CI=true" -w /project node:10.15.2 /bin/sh -c "yarn install && yarn test --ci && yarn build"))
	docker cp $(cwd)/. $(CONTAINER_ID):/project
	docker start -a $(CONTAINER_ID)
	docker cp $(CONTAINER_ID):/project/build/ $(cwd)
	docker rm $(CONTAINER_ID)
else
	yarn test
	yarn build
endif

.PHONY: docker
docker: build
	docker build -t xebikart/dashboard:$(VERSION)  .

.PHONY: clean
clean:
	-@rm -rf build
	-@rm -rf node_modules


