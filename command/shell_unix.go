// +build !windows

package command

import (
	"os"
	"os/signal"
	"strconv"
	"syscall"

	"github.com/lxc/lxd/shared/termios"

	"gitlab.com/faststack/machinestack/driver"
)

func controlHandler(c chan driver.ControlMessage) {
	ch := make(chan os.Signal, 10)
	signal.Notify(ch,
		syscall.SIGWINCH,
		syscall.SIGTERM,
		syscall.SIGHUP,
		syscall.SIGINT,
		syscall.SIGQUIT,
		syscall.SIGABRT,
		syscall.SIGTSTP,
		syscall.SIGTTIN,
		syscall.SIGTTOU,
		syscall.SIGUSR1,
		syscall.SIGUSR2,
		syscall.SIGSEGV,
		syscall.SIGCONT)

	for sig := range ch {
		switch sig {
		case syscall.SIGWINCH:
			width, height, err := termios.GetSize(int(syscall.Stdout))
			if err != nil {
				panic(err)
			}
			args := map[string]string{
				"width":  strconv.Itoa(width),
				"height": strconv.Itoa(height),
			}
			c <- driver.ControlMessage{Command: "window-resize", Args: args}
		case syscall.SIGTERM:
			c <- driver.ControlMessage{Command: "signal", Signal: int(syscall.SIGTERM)}
		case syscall.SIGHUP:
			c <- driver.ControlMessage{Command: "signal", Signal: int(syscall.SIGHUP)}
		case syscall.SIGINT:
			c <- driver.ControlMessage{Command: "signal", Signal: int(syscall.SIGINT)}
		case syscall.SIGQUIT:
			c <- driver.ControlMessage{Command: "signal", Signal: int(syscall.SIGQUIT)}
		case syscall.SIGABRT:
			c <- driver.ControlMessage{Command: "signal", Signal: int(syscall.SIGABRT)}
		case syscall.SIGTSTP:
			c <- driver.ControlMessage{Command: "signal", Signal: int(syscall.SIGTSTP)}
		case syscall.SIGTTIN:
			c <- driver.ControlMessage{Command: "signal", Signal: int(syscall.SIGTTIN)}
		case syscall.SIGTTOU:
			c <- driver.ControlMessage{Command: "signal", Signal: int(syscall.SIGTTOU)}
		case syscall.SIGUSR1:
			c <- driver.ControlMessage{Command: "signal", Signal: int(syscall.SIGUSR1)}
		case syscall.SIGUSR2:
			c <- driver.ControlMessage{Command: "signal", Signal: int(syscall.SIGUSR2)}
		case syscall.SIGSEGV:
			c <- driver.ControlMessage{Command: "signal", Signal: int(syscall.SIGSEGV)}
		case syscall.SIGCONT:
			c <- driver.ControlMessage{Command: "signal", Signal: int(syscall.SIGCONT)}
		default:
			break
		}
	}
}
