FROM debian:8

RUN apt update && apt upgrade -y && \
    apt install -y \
      build-essential \
      tmux curl nano vim \
      iproute traceroute \
      git subversion \
      nodejs npm \
      ruby bundler \
      golang \
      python python-pip && \
    curl -sSf https://static.rust-lang.org/rustup.sh | sh


