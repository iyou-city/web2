# Variables
SERVICE=web
IMG_HUB?=docker.io/jmzwcn
# Version information
VERSION=1.0.0
REVISION=${shell git rev-parse --short HEAD}
RELEASE=production
BUILD_HASH=${shell git rev-parse HEAD}
BUILD_TIME=${shell date "+%Y-%m-%d@%H:%M:%SZ%z"}
LD_FLAGS:=-X main.Version=$(VERSION) -X main.Revision=$(REVISION) -X main.Release=$(RELEASE) -X main.BuildHash=$(BUILD_HASH) -X main.BuildTime=$(BUILD_TIME)
TAG?=${shell date "+%Y%m%d-%H%M"}

ifeq (${shell uname -s}, Darwin)
	SED=gsed
else
	SED=sed
endif

build:
	ng build

image:build
	docker build -t $(IMG_HUB)/$(SERVICE):$(TAG) .

push:image
	docker push $(IMG_HUB)/$(SERVICE):$(TAG)

run:image
	-docker service rm $(SERVICE) > /dev/null 2>&1  || true	
	@docker service create --name $(SERVICE) --network devel -p 80:80 --mount type=bind,source=/home/daniel/abc,destination=/usr/share/nginx/html/abc $(IMG_HUB)/$(SERVICE):$(TAG)

test:
	go test -cover ./...

# PHONY
.PHONY : test test-integration generate fmt
