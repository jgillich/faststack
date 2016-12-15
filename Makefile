HYPER_VERSION=0.7.0

BUILD_FLAGS=-ldflags "-X github.com/termbox/termbox/vendor/github.com/hyperhq/hyperd/utils.VERSION=$(HYPER_VERSION)"

build:
	go build termbox.go
	go build ${BUILD_FLAGS} termboxd.go

static-build:
	CGO_ENABLED=0 go build -a -ldflags '-s' termbox.go
	CGO_ENABLED=0 go build -a -ldflags '-s' ${BUILD_FLAGS} termboxd.go
	npm run bundle
	rice append -i github.com/termbox/termbox/api --exec termboxd

test:
	npm test

run:
	gin --buildArgs '${BUILD_FLAGS} termboxd.go'
