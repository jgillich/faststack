HYPER_VERSION=0.7.0

BUILD_FLAGS=-ldflags "-X github.com/termbox/termbox/vendor/github.com/hyperhq/hyperd/utils.VERSION=$(HYPER_VERSION)"

build:
	go build ${BUILD_FLAGS} -o bin/termbox github.com/termbox/termbox/cli
	go build ${BUILD_FLAGS} -o bin/termboxd github.com/termbox/termbox/daemon

static-build:
	CGO_ENABLED=0 go build -a -ldflags '-s' ${BUILD_FLAGS} -o bin/termbox github.com/termbox/termbox/cli
	CGO_ENABLED=0 go build -a -ldflags '-s' ${BUILD_FLAGS} -o bin/termboxd github.com/termbox/termbox/daemon
	npm run bundle
	rice append -i github.com/termbox/termbox/daemon --exec bin/termboxd

test:
	npm test

run:
	gin --buildArgs '${BUILD_FLAGS} github.com/termbox/termbox/daemon'
