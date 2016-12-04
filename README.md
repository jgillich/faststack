# Termbox

Termbox provides instant Linux terminal access via a web interface.

### Installation

First, install [HyperContainer](https://hypercontainer.io/).


Termbox is distributed as a Docker image:

```sh
docker run -v /var/run/hyper.sock:/var/run/hyper.sock -p 7842:7842 termbox/termbox
```

### Enable TLS

To enable TLS and HTTP 2.0, set the `TLS_CERT` and `TLS_KEY` environment
variables to your certficate and key. To generate a self-signed certificate,
run:

```sh
go run /usr/lib/golang/src/crypto/tls/generate_cert.go --host localhost
```