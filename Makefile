HYPER_VERSION=0.7.0

BUILD_FLAGS=-ldflags "-X github.com/termbox/termbox/vendor/github.com/hyperhq/hyperd/utils.VERSION=$(HYPER_VERSION)"

build:
	go build ${BUILD_FLAGS}

production: build
	npm run bundle

run:
	go run ${BUILD_FLAGS} main.go
