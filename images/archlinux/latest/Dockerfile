FROM pritunl/archlinux

RUN pacman -Syu --noconfirm && \
    pacman -S --noconfirm \
      base-devel \
      tmux \
      git subversion \
      nodejs npm \
      ruby ruby-bundler \
      go \
      rust cargo \
      python python-pip && \
    pacman -Scc --noconfirm
