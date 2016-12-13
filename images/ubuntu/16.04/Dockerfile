FROM ubuntu:16.04

RUN apt update && apt upgrade -y && \
    apt install -y \
      build-essential \
      tmux curl nano vim \
      git subversion \
      nodejs npm \
      ruby bundler \
      golang \
      rustc cargo \
      python python-pip

ADD https://raw.githubusercontent.com/termbox/termbox/master/dotfiles/tmux.conf /etc/tmux.conf
