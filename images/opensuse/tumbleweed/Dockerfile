FROM opensuse:tumbleweed

RUN zypper update -y && \
    zypper install -y --type pattern devel_basis && \
    zypper install -y \
      glibc-locale \
      tmux nano vim \
      iproute traceroute \
      git subversion \
      nodejs npm \
      ruby2.3 ruby2.3-rubygem-bundler \
      go \
      rust cargo \
      python3 python3-pip
