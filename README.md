# Termbox

Termbox provides instant Linux terminal access via a web interface.

Note: this is not [Termbox the user interface library](https://github.com/nsf/termbox).

[![wercker status](https://app.wercker.com/status/1933a6fcec97deb2a05d0e9e45c3fd79/s/master "wercker status")](https://app.wercker.com/project/byKey/1933a6fcec97deb2a05d0e9e45c3fd79)

### Installation

First, install [HyperContainer](https://hypercontainer.io/).

Right now, you have to `chmod 777 /var/run/hyper.sock` before running Termbox. We
will be supporting HTTP authentication soon.

Termbox is distributed as a Docker image:

```sh
docker run -v /var/run/hyper.sock:/var/run/hyper.sock -p 7842:7842 termbox/termbox
```

Now open `localhost:7842` and you should see the app loading up.

### Development

Install  the following first:

* Golang, [glide](https://glide.sh/), [gin](github.com/codegangsta/gin)
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
* `TERMBOX_TLSCERT` and `TERMBOX_TLSKEY`: Enables TLS using the specificed certificate and key.
* `TERMBOX_BOXMEMORY`: RAM assigned to boxes in megabytes. Defaults to `256`.
* `TERMBOX_BOXCPUS`: CPUs assigned to boxes. Defaults to `1`.
* `TERMBOX_BOXDURATION`: Time in hours after which boxes are deleted. Defaults to `3`.

To generate a self signed cert for development, run:

```sh
go run /usr/lib/golang/src/crypto/tls/generate_cert.go --host localhost
```
