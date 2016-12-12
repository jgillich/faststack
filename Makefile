HYPER_VERSION=0.7.0

BUILD_FLAGS=-ldflags "-X github.com/termbox/termbox/vendor/github.com/hyperhq/hyperd/utils.VERSION=$(HYPER_VERSION)"

test:
	npm test

build:
	go build ${BUILD_FLAGS}

static-build:
	CGO_ENABLED=0 go build -a -ldflags '-s' ${BUILD_FLAGS}
	npm run bundle
	rice append -i github.com/termbox/termbox/api --exec termbox

run:
	gin --buildArgs '${BUILD_FLAGS}'
