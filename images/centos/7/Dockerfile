FROM centos:7

# TODO golang
RUN yum update -y && \
    yum install -y \
      @development sudo \
      subversion \
      nodejs npm \
      ruby rubygem-bundler \
      python3 python3-pip && \
    yum clean all && \
    curl -sSf https://static.rust-lang.org/rustup.sh | sh