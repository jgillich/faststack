package config

// Config is what defines the behaviour of the api
type Config struct {

	// Address is the socket to bind to
	Address string

	LogLevel string

	// TLSConfig holds various TLS related configurations
	TLSConfig *TLSConfig

	AuthConfig *AuthConfig

	SchedulerConfig *SchedulerConfig

	DriverConfig *DriverConfig

	RedisConfig *RedisConfig
}

// TLSConfig holds various TLS related configurations
type TLSConfig struct {
	Enable bool
	Auto   bool
	Cert   string
	Key    string
}

type DriverConfig struct {
	// Enable specifies the name of drivers to enable
	Enable []string

	// Options provides arbitrary key-value configuration for internals,
	// like authentication and drivers. The format is:
	//
	//	namespace.option = value
	Options DriverOptions
}

type DriverOptions map[string]string

type SchedulerConfig struct {
	Name string
}

type RedisConfig struct {
	Address  string
	Password string
	Database int
}

type AuthConfig struct {
	Key string
}

// DefaultConfig returns the default configuration
func DefaultConfig() *Config {
	return &Config{
		Address:      ":7842",
		TLSConfig:    &TLSConfig{},
		DriverConfig: DefaultDriverConfig(),
		LogLevel:     "DEBUG",
	}
}

func DefaultDriverConfig() *DriverConfig {
	return &DriverConfig{
		Enable:  []string{},
		Options: map[string]string{},
	}
}

// Read returns the specified configuration value or "".
func (c *DriverConfig) Read(id string) string {
	return c.Options[id]
}
