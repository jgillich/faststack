package config

import (
	"bytes"
	"fmt"
	"io"
	"os"
	"path/filepath"

	multierror "github.com/hashicorp/go-multierror"
	"github.com/hashicorp/hcl"
	"github.com/hashicorp/hcl/hcl/ast"
	"github.com/mitchellh/mapstructure"
)

// ParseConfigFile parses the given path as a config file.
func ParseConfigFile(path string) (*Config, error) {
	path, err := filepath.Abs(path)
	if err != nil {
		return nil, err
	}

	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	config, err := ParseConfig(f)
	if err != nil {
		return nil, err
	}

	return config, nil
}

// ParseConfig parses the config from the given io.Reader.
//
// Due to current internal limitations, the entire contents of the
// io.Reader will be copied into memory first before parsing.
func ParseConfig(r io.Reader) (*Config, error) {
	// Copy the reader into an in-memory buffer first since HCL requires it.
	var buf bytes.Buffer
	if _, err := io.Copy(&buf, r); err != nil {
		return nil, err
	}

	// Parse the buffer
	root, err := hcl.Parse(buf.String())
	if err != nil {
		return nil, fmt.Errorf("error parsing: %s", err)
	}
	buf.Reset()

	// Top-level item should be a list
	list, ok := root.Node.(*ast.ObjectList)
	if !ok {
		return nil, fmt.Errorf("error parsing: root should be an object")
	}

	var config Config
	if err := parseConfig(&config, list); err != nil {
		return nil, fmt.Errorf("error parsing 'config': %v", err)
	}

	return &config, nil
}

func parseConfig(result *Config, list *ast.ObjectList) error {
	// Check for invalid keys
	valid := []string{
		"address",
		"log_level",
		"auth",
		"tls",
		"scheduler",
		"driver",
		"redis",
	}
	if err := checkHCLKeys(list, valid); err != nil {
		return multierror.Prefix(err, "config:")
	}

	// Decode the full thing into a map[string]interface for ease
	var m map[string]interface{}
	if err := hcl.DecodeObject(&m, list); err != nil {
		return err
	}
	delete(m, "tls")
	delete(m, "scheduler")
	delete(m, "driver")
	delete(m, "redis")
	delete(m, "auth")

	// Decode the rest
	if err := mapstructure.WeakDecode(m, result); err != nil {
		return err
	}

	// Parse the TLS config
	if o := list.Filter("tls"); len(o.Items) > 0 {
		if err := parseTLSConfig(&result.TLSConfig, o); err != nil {
			return multierror.Prefix(err, "tls ->")
		}
	}

	// Parse the scheduler config
	if o := list.Filter("scheduler"); len(o.Items) > 0 {
		if err := parseSchedulerConfig(&result.SchedulerConfig, o); err != nil {
			return multierror.Prefix(err, "scheduler ->")
		}
	}

	// Parse the cluster config
	if o := list.Filter("driver"); len(o.Items) > 0 {
		if err := parseDriverConfig(&result.DriverConfig, o); err != nil {
			return multierror.Prefix(err, "driver ->")
		}
	}

	// Parse the redis config
	if o := list.Filter("redis"); len(o.Items) > 0 {
		if err := parseRedisConfig(&result.RedisConfig, o); err != nil {
			return multierror.Prefix(err, "redis ->")
		}
	}

	// Parse the auth config
	if o := list.Filter("auth"); len(o.Items) > 0 {
		if err := parseAuthConfig(&result.AuthConfig, o); err != nil {
			return multierror.Prefix(err, "auth ->")
		}
	}

	return nil
}

func parseTLSConfig(result **TLSConfig, list *ast.ObjectList) error {
	list = list.Elem()
	if len(list.Items) > 1 {
		return fmt.Errorf("only one 'tls' block allowed")
	}

	listVal := list.Items[0].Val

	valid := []string{
		"enable",
		"auto",
		"cert_file",
		"key_file",
	}

	if err := checkHCLKeys(listVal, valid); err != nil {
		return err
	}

	var m map[string]interface{}
	if err := hcl.DecodeObject(&m, listVal); err != nil {
		return err
	}

	var tlsConfig TLSConfig
	if err := mapstructure.WeakDecode(m, &tlsConfig); err != nil {
		return err
	}
	*result = &tlsConfig
	return nil
}

func parseSchedulerConfig(result **SchedulerConfig, list *ast.ObjectList) error {
	list = list.Elem()
	if len(list.Items) > 1 {
		return fmt.Errorf("only one 'scheduler' block allowed")
	}

	listVal := list.Items[0].Val

	valid := []string{
		"name",
	}

	if err := checkHCLKeys(listVal, valid); err != nil {
		return err
	}

	var m map[string]interface{}
	if err := hcl.DecodeObject(&m, listVal); err != nil {
		return err
	}

	var schedulerConfig SchedulerConfig
	if err := mapstructure.WeakDecode(m, &schedulerConfig); err != nil {
		return err
	}
	*result = &schedulerConfig
	return nil
}

func parseDriverConfig(result **DriverConfig, list *ast.ObjectList) error {
	list = list.Elem()
	if len(list.Items) > 1 {
		return fmt.Errorf("only one 'cluster' block allowed")
	}

	listVal := list.Items[0].Val

	valid := []string{
		"enable",
		"options",
	}

	if err := checkHCLKeys(listVal, valid); err != nil {
		return err
	}

	var m map[string]interface{}
	if err := hcl.DecodeObject(&m, listVal); err != nil {
		return err
	}

	var driverConfig DriverConfig
	if err := mapstructure.WeakDecode(m, &driverConfig); err != nil {
		return err
	}
	*result = &driverConfig
	return nil
}

func parseRedisConfig(result **RedisConfig, list *ast.ObjectList) error {
	list = list.Elem()
	if len(list.Items) > 1 {
		return fmt.Errorf("only one 'redis' block allowed")
	}

	listVal := list.Items[0].Val

	valid := []string{
		"address",
		"password",
		"database",
	}

	if err := checkHCLKeys(listVal, valid); err != nil {
		return err
	}

	var m map[string]interface{}
	if err := hcl.DecodeObject(&m, listVal); err != nil {
		return err
	}

	var redisConfig RedisConfig
	if err := mapstructure.WeakDecode(m, &redisConfig); err != nil {
		return err
	}
	*result = &redisConfig
	return nil
}

func parseAuthConfig(result **AuthConfig, list *ast.ObjectList) error {
	list = list.Elem()
	if len(list.Items) > 1 {
		return fmt.Errorf("only one 'auth' block allowed")
	}

	listVal := list.Items[0].Val

	valid := []string{
		"key",
	}

	if err := checkHCLKeys(listVal, valid); err != nil {
		return err
	}

	var m map[string]interface{}
	if err := hcl.DecodeObject(&m, listVal); err != nil {
		return err
	}

	var authConfig AuthConfig
	if err := mapstructure.WeakDecode(m, &authConfig); err != nil {
		return err
	}
	*result = &authConfig
	return nil
}

func checkHCLKeys(node ast.Node, valid []string) error {
	var list *ast.ObjectList
	switch n := node.(type) {
	case *ast.ObjectList:
		list = n
	case *ast.ObjectType:
		list = n.List
	default:
		return fmt.Errorf("cannot check HCL keys of type %T", n)
	}

	validMap := make(map[string]struct{}, len(valid))
	for _, v := range valid {
		validMap[v] = struct{}{}
	}

	var result error
	for _, item := range list.Items {
		key := item.Keys[0].Token.Value().(string)
		if _, ok := validMap[key]; !ok {
			result = multierror.Append(result, fmt.Errorf(
				"invalid key: %s", key))
		}
	}

	return result
}
