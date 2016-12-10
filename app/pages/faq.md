# FAQ

#### What are the resource limits?

Every box gets 512MB RAM, a single CPU and 10GB disk.

#### Can I use this to run servers?

Yes! Check `$PORT` for the local port.

#### How is this implemented?

We use [HyperContainer](https://hypercontainer.io/) to isolate each
box in a virtual machine, which gives us the best of both vm's and containers:
High security and low startup times.

#### Can I delete a box manually?

No, it will be automatically deleted after 3 hours.

#### Can I access my box using SSH?

No, but we will allow you to launch boxes via SSH in the future.

#### Where can I report a bug or request a feature?

Please create a issue on our [Github page](https://github.com/termbox/termbox).

#### How can this be free?

At our current capacity, a single launch costs us around $0.0002, so we don't
lose much by offering it for free. We are experimenting with non-obtrusive ads
in order to increase server resources and to finance further development.
