http {
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

}

auth  {
  jwt {
    enable = true
    key = "/jwt.key"
  }
}

cluster {
  enable = true
}



driver {
  cluster {
    enable = true
  }

  options = {
    "lxd.remote": "unix://"
  }
}
