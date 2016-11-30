import React from 'react'
import Markdown from 'react-markdown'

let faq = `

  # FAQ

  #### Who is this for?

  People that need to quickly test something, people that need a specific Linux
  distribution, or students that want to learn about Linux without going through
  the hassle of setting up a virtual machine.

  #### What are the resource limits?

  Every box gets 256MB RAM, a single CPU core, 2GB disk and up to 50mbit bandwith.

  #### Can I use this to run servers?

  At the moment no, but we plan to assign each container a single public port >1024.

  #### Aren't containers insecure?

  We use [HyperContainer](https://hypercontainer.io/) to securely isolate each
  box in a virtual machine, which gives us the best of both worlds: Low startup
  times and high security.

  #### Can I delete a box?

  No, it will be automatically deleted after 6 hours. You can start as many
  boxes as you like, you don't have to worry about removing old ones.

  #### Can I access my box using SSH?

  At the moment, no. Automatically launching boxes via SSH is something we have
  planned for the future.

  #### Where can I report a bug or request a feature?

  Please create a issue on our [Github page](https://github.com/termbox/termbox).

  #### How can this be free?

  At our current capacity of 100 concurrent boxes, a single launch costs us
  around $0.0002, so we don't loose much by offering it for free. In the
  future, we want to show non-obtrusive ads to relevant services to finance
  hosting and development.
`

const Faq = () =>
  <section className="section">
    <div className="container content">
      <Markdown source={faq}/>
    </div>
  </section>

export default Faq