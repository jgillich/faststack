FROM fedora:25

ENV GOPATH=/go

RUN dnf install -y make golang glide nodejs npm git && dnf clean all && \
    go get -d github.com/termbox/termbox && \
    adduser termbox && chown -R termbox /go && \
    curl -fsSLR -o /usr/bin/su-exec https://github.com/javabean/su-exec/releases/download/v0.2/su-exec.amd64

WORKDIR /go/src/github.com/termbox/termbox

USER termbox

RUN glide install && npm install && make production

USER root

CMD make docker-run
