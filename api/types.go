package api

type Image struct {
	DisplayName string
	Name        string
	Image       string
	Command     string
	Versions    []string
}

type Images []Image
