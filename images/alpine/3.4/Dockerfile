FROM alpine:3.4

RUN apk add --no-cache \
      build-base bash \
      curl file \
      git subversion \
      nodejs \
      ruby ruby-bundler \
      go \
      python3 py-pip && \
    curl https://sh.rustup.rs -sSf | sh -s -- -y
