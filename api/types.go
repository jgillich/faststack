package api

type Image struct {
	DisplayName string   `json:"displayName"`
	Name        string   `json:"name"`
	Image       string   `json:"image"`
	Command     string   `json:"command"`
	Versions    []string `json:"versions"`
}

type CreateBoxRequest struct {
	Image   string `json:"image"`
	Version string `json:"version"`
	Captcha string `json:"captcha"`
}
type CreateBoxResponse struct {
	PodID string `json:"podID"`
}

type CaptchaVerifyResponse struct {
	Success bool `json:"success"`
}

type ExecBoxMessage struct {
	Data   string `json:"data"`
	Width  int    `json:"width"`
	Height int    `json:"height"`
}
