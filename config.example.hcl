address = ":7842"

log_level = "DEBUG"

tls {
  enable = true

  # automatically fetch certificate via letsencrypt
  auto = true

  # or manually set certificate
  cert_file = "/tls.crt"
  key_file = "/tls.key"
}

redis {
  address   = "localhost:6379"
  password  = ""
}


auth  {
   key = "foobar"
}

cluster {
  enable = true
}

driver {
  enable = ["lxd"]

  options {
    "lxd.remote" = "unix://"
  }
}
