FROM alpine:3.5

ENV TERM=xterm-256color

RUN apk add --update \
      build-base \
      curl file nano vim \
      iproute2 iputils \
      git subversion \
      nodejs \
      ruby ruby-bundler \
      go \
      python3 py-pip && \
    curl http://www.brain-dump.org/projects/abduco/abduco-0.6.tar.gz | tar xfz - -C /tmp && \
    cd /tmp/abduco-0.6 && make && make install

CMD ["abduco", "-A", "termbox", "sh"]
