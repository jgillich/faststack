package types

type Config struct {
	Http   HttpConfig
	Auth   AuthConfig
	Driver DriverConfig
}

type HttpConfig struct {
	Address string
	Tls     HttpTlsConfig
}

type HttpTlsConfig struct {
	Enable bool
	Auto   bool
	Cert   string
	Key    bool
}

type AuthConfig struct {
	Jwt AuthJwtConfig
}

type AuthJwtConfig struct {
	Enable bool
	Key    string
}

type DriverConfig struct {
	Cluster DriverClusterConfig
	Lxd     DriverLxdConfig
}

type DriverClusterConfig struct {
	Enable bool
}

type DriverLxdConfig struct {
	Enable bool
	Remote string
}
