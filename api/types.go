package api

type Image struct {
	DisplayName string
	Name        string
	Image       string
	Command     string
	Versions    []string
}

type Images []Image

type CreateBoxRequest struct {
	Image   string `json:"image"`
	Version string `json:"version"`
	Captcha string `json:"captcha"`
}
type CreateBoxResponse struct {
	PodID string `json:"podID"`
}
