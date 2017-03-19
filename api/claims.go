package main

import jwt "github.com/dgrijalva/jwt-go"

type JwtClaims struct {
	Email       string      `json:"email"`
	AppMetadata AppMetadata `json:"app_metadata"`
	jwt.StandardClaims
}

type AppMetadata struct {
	Quota Quota `json:"quota"`
}

type Quota struct {
	Instances int `json:"instances"`
	Cpus      int `json:"cpus"`
	Ram       int `json:"ram"`
}
