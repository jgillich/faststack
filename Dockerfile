FROM fedora:25

ENV GOPATH=/go

RUN dnf install -y make golang glide nodejs npm git && dnf clean all && \
    go get -d github.com/termbox/termbox

WORKDIR /go/src/github.com/termbox/termbox

RUN glide install && make && npm install

ENTRYPOINT /go/src/github.com/termbox/termbox/termbox
