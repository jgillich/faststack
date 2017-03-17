package scheduler

type Scheduler interface {
	Create(name, image, driverName string) error
	Delete(name string) error
}
