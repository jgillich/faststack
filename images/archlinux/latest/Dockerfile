FROM pritunl/archlinux

ENV TERM=xterm-256color

RUN pacman -Syu --noconfirm && \
    pacman -S --noconfirm \
      base-devel \
      nano vim \
      iproute traceroute \
      git subversion \
      nodejs npm \
      ruby ruby-bundler \
      go \
      rust cargo \
      python python-pip && \
    curl http://www.brain-dump.org/projects/abduco/abduco-0.6.tar.gz | tar xfz - -C /tmp && \
    cd /tmp/abduco-0.6 && make && make install

CMD ["abduco", "-A", "termbox", "bash"]
