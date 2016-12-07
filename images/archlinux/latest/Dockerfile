FROM pritunl/archlinux

RUN pacman -Syu --noconfirm && \
    pacman -S --noconfirm \
      base-devel \
      tmux nano vim \
      git subversion \
      nodejs npm \
      ruby ruby-bundler \
      go \
      rust cargo \
      python python-pip && \
    pacman -Scc --noconfirm
