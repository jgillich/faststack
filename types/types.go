package types

type Image struct {
	DisplayName string   `json:"displayName"`
	Name        string   `json:"name"`
	Image       string   `json:"image"`
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

type GetBoxResponse struct {
	Id            string `json:"id"`
	Image         string `json:"image"`
	TimeRemaining int    `json:"timeRemaining"`
	Port          int    `json:"port"`
}
