# Termbox

### Enable TLS

To enable TLS and HTTP 2.0, set the `TLS_CERT` and `TLS_KEY` environment
variables to your certficate and key. To generate a self-signed certificate,
run:

```
go run /usr/lib/golang/src/crypto/tls/generate_cert.go --host localhost
```