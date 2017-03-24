package config

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestParseConfig(t *testing.T) {
	_, err := ParseConfigFile("../config.example.hcl")

	assert.NoError(t, err)
}
