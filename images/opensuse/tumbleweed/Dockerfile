FROM opensuse:tumbleweed

RUN zypper update -y && \
    zypper install --type pattern devel_basis && \
    zypper install -y \
      tmux nano vim \
      subversion \
      nodejs npm \
      ruby2.3 ruby2.3-rubygem-bundler \
      go \
      rust cargo \
      python3 python3-pip
