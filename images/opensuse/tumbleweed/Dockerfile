FROM opensuse:tumbleweed

ENV TERM=xterm-256color

RUN zypper update -y && \
    zypper install -y --type pattern devel_basis && \
    zypper install -y \
      glibc-locale \
      curl nano vim \
      iproute traceroute \
      git subversion \
      nodejs npm \
      ruby2.3 ruby2.3-rubygem-bundler \
      go \
      rust cargo \
      python3 python3-pip && \
    curl http://www.brain-dump.org/projects/abduco/abduco-0.6.tar.gz | tar xfz - -C /tmp && \
    cd /tmp/abduco-0.6 && make && make install

CMD ["abduco", "-A", "termbox", "bash"]
