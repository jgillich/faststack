FROM fedora:25

RUN dnf update -y && \
    dnf install -y \
      @development-tools \
      tmux nano vim procps-ng \
      iproute traceroute \
      git subversion \
      nodejs npm \
      ruby rubygem-bundler \
      golang \
      rust cargo \
      python3 python3-pip

ADD https://raw.githubusercontent.com/termbox/termbox/master/dotfiles/tmux.conf /etc/tmux.conf
