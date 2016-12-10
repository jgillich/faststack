##### Running servers

Termbox assigns a single public port to each box, listed at the botttom
of the terminal page. This port is mapped to `$PORT` on the box.

##### Starting system services

Boxes do not run systemd, which means you can not use `systemctl` to start
services. Instead, look for the service file in `/usr/lib/systemd/system/`
and execute the `ExecStart` command manually.
