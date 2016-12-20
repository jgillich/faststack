FROM centos:7

ENV TERM=xterm-256color

RUN yum update -y && \
    yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm && \
    yum install -y \
      @development \
      abduco nano vim \
      iproute traceroute \
      subversion \
      nodejs npm \
      ruby rubygem-bundler \
      golang \
      python3 python3-pip && \
    curl https://sh.rustup.rs -sSf | sh -s -- -y

CMD ["abduco", "-A", "termbox", "bash"]
