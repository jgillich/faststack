FROM alpine:3.4

RUN apk add --no-cache \
      build-base \
      curl file sudo \
      git subversion \
      nodejs \
      ruby ruby-bundler \
      go \
      python3 py-pip && \
    curl -sSf https://static.rust-lang.org/rustup.sh | sh
