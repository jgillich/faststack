#!/bin/sh

free=`free | grep Mem | awk '{print $3/$2 * 100.0}' | cut -d. -f1`

if [ $free -ge 98 ]; then
  exit 2 # critical
elif [ $free -ge 90 ]; then
  exit 1 # warning, no more provisions
fi

exit 0

