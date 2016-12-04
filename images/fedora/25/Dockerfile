FROM fedora:25

RUN dnf update -y && \
    dnf install -y \
      @development-tools \
      tmux \
      subversion \
      nodejs npm \
      ruby rubygem-bundler \
      golang \
      rust cargo \
      python3 python3-pip && \
    dnf clean all