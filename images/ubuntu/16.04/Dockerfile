FROM ubuntu:16.04

ENV TERM=xterm-256color

RUN apt update && apt upgrade -y && \
    apt install -y \
      build-essential \
      abduco curl nano vim \
      git subversion \
      nodejs npm \
      ruby bundler \
      golang \
      rustc cargo \
      python python-pip

CMD ["abduco", "-A", "termbox", "bash"]
