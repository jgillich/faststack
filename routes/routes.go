package routes

import "termbox/hyper"

type Routes struct {
	Hyper *hyper.Hyper
}

func New() *Routes {
	return &Routes{
		Hyper: hyper.New(),
	}
}
