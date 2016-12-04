# Termbox

Termbox provides instant Linux terminal access via a web interface.

### Installation

First, install [HyperContainer](https://hypercontainer.io/).


Termbox is distributed as a Docker image:

```sh
docker run -v /var/run/hyper.sock:/var/run/hyper.sock -p 7842:7842 termbox/termbox
```

### Development

Dependencies:

* Golang, glide
* Nodejs, npm

Get the code and its dependencies:

```sh
go get -d github.com/termbox/termbox
cd $GOPATH/github.com/termbox/termbox

glide install
npm install
```

Run the server:

```sh
make run
```

Now open `localhost:7842`.

### Enable TLS

To enable TLS and HTTP 2.0, set the `TLS_CERT` and `TLS_KEY` environment
variables to your certficate and key. To generate a self-signed certificate,
run:

```sh
go run /usr/lib/golang/src/crypto/tls/generate_cert.go --host localhost
```
