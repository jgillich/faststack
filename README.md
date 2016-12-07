# Termbox

Termbox provides instant Linux terminal access via a web interface.

Note: this is not [Termbox the user interface library](https://github.com/nsf/termbox).

[![wercker status](https://app.wercker.com/status/1933a6fcec97deb2a05d0e9e45c3fd79/s/master "wercker status")](https://app.wercker.com/project/byKey/1933a6fcec97deb2a05d0e9e45c3fd79)

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
jspm install
```

Run the server:

```sh
make run
```

Now open `localhost:7842`.

### Configuration

Termbox is configured via environment variabes, although a `.env` file is
supported as well.

* `TERMBOX_ADDR`: Address and port to listen on. Defaults to `:7842`.
* `TERMBOX_ENV`: When set to `production`, enables various optimizations and loads the script bundle. Defaults to `development`.
* `TERMBOX_RCSITEKEY` and `TERMBOX_RCSECRET`: Recaptcha site key and secret. No captcha checks are performed if not set.
* `TERMBOX_AUTOTLS`: If set to `true`, enables TLS and automatically obtains a certificate from Let's Encrypt.
* `TERMBOX_TLSCERT` and `TERMBOX_TLSKEY`: Path to the TLS cert and key. TLS is disabled if not set.

To generate a self signed cert for development, run:

```sh
go run /usr/lib/golang/src/crypto/tls/generate_cert.go --host localhost
```
