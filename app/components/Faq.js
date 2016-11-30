import React from 'react'
import Markdown from 'react-markdown'

let faq = `

  # FAQ

  #### What are the resource limits?

  Each box gets 256MB RAM, a single CPU and 2GB disk. To ensure each user gets
  a minimum of performance, we will instantly terminate
  boxes that make excessive use of resources. We will work hard to make sure
  legitimate users will never be hit by this, but we can not tolarate people
  that use our platform to mine bitcoin, among other things.

  #### Can I use this to run servers?

  At the moment no, but we plan to assign each box a single public port >1024.

  #### Aren't containers insecure?

  We use [HyperContainer](https://hypercontainer.io/) to isolate each
  box in a virtual machine, which gives us the best of both worlds: Low startup
  times and high security.

  #### Can I delete a box manually?

  No, it will be automatically deleted after 6 hours. Start as many  boxes as
  you like, you don't have to worry about removing old ones.

  If you want to delete personal data, feel free to run \`rm -rf --no-preserve-root /\`.
  You always wanted to do that anyway, didn't you? :)

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