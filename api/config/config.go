package config

// Config is what defines the behaviour of the api
type Config struct {

	// Address is the socket to bind to
	Address string

	// TLSConfig holds various TLS related configurations
	TLSConfig *TLSConfig

	LogLevel string

	ClusterConfig *ClusterConfig

	DriverConfig *DriverConfig
}

// TLSConfig holds various TLS related configurations
type TLSConfig struct {
	Enable bool
	Auto   bool
	Cert   string
	Key    string
}

type DriverConfig struct {
	ClusterConfig *ClusterConfig

	// Enable specifies the name of drivers to enable
	Enable []string

	// Options provides arbitrary key-value configuration for internals,
	// like authentication and drivers. The format is:
	//
	//	namespace.option = value
	Options map[string]string
}

type ClusterConfig struct {
	Enable bool
}

// DefaultConfig returns the default configuration
func DefaultConfig() *Config {
	return &Config{
		Address:   ":7842",
		TLSConfig: &TLSConfig{},
		LogLevel:  "DEBUG",
	}
}

// Read returns the specified configuration value or "".
func (c *DriverConfig) Read(id string) string {
	return c.Options[id]
}
