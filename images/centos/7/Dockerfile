FROM centos:7

# TODO golang
RUN yum update -y && \
    yum install -y \
      @development \
      subversion \
      nodejs npm \
      ruby rubygem-bundler \
      python3 python3-pip && \
    yum clean && \
    curl -sSf https://static.rust-lang.org/rustup.sh | sh