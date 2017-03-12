http {
  address = ":7842"

  tls {
    enable = true

    # automatically fetch certificate via letsencrypt
    auto = true

    # or manually set certificate
    cert = "/tls.crt"
    key = "/tls.key"
  }

}

auth  {
  jwt {
    enable = true
    key = "/jwt.key"
  }
}

driver {
  cluster {
    enable = true
  }

  lxd {
    enable = true

    # the address of the lxd server, ignored in cluster mode
    remote = "unix://"
  }
}
