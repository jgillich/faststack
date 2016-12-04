FROM alpine:edge

RUN apk add --no-cache go glide nodejs

ADD . /termbox

WORKDIR /termbox

RUN glide install && go build && npm install && jspm install

CMD /termbox/termbox