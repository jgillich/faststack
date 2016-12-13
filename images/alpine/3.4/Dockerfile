FROM alpine:3.4

RUN apk add --update \
      build-base bash \
      tmux curl file nano vim \
      iproute2 iputils \
      git subversion \
      nodejs \
      ruby ruby-bundler \
      go \
      python3 py-pip

ADD https://raw.githubusercontent.com/termbox/termbox/master/dotfiles/tmux.conf /etc/tmux.conf
