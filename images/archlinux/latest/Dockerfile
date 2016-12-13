FROM pritunl/archlinux

RUN pacman -Syu --noconfirm && \
    pacman -S --noconfirm \
      base-devel \
      tmux nano vim \
      iproute traceroute \
      git subversion \
      nodejs npm \
      ruby ruby-bundler \
      go \
      rust cargo \
      python python-pip

ADD https://raw.githubusercontent.com/termbox/termbox/master/dotfiles/tmux.conf /etc/tmux.conf
