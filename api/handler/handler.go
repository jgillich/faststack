package handler

import (
	"github.com/faststackco/faststack/api/scheduler"
	redis "gopkg.in/redis.v5"
)

type Handler struct {
	redis *redis.Client
	sched scheduler.Scheduler
}

func NewHandler(redis *redis.Client, sched scheduler.Scheduler) *Handler {
	return &Handler{redis, sched}
}
