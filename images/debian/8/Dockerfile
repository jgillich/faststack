FROM debian:8

RUN apt update && apt upgrade -y && \
    apt install -y \
      build-essential \
      curl nano vim \
      iproute traceroute \
      git subversion \
      nodejs npm \
      ruby bundler \
      golang \
      python python-pip && \
    curl -sSf https://static.rust-lang.org/rustup.sh | sh && \
    curl http://www.brain-dump.org/projects/abduco/abduco-0.6.tar.gz | tar xfz - -C /tmp && \
    cd /tmp/abduco-0.6 && make && make install
