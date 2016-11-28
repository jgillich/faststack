import React from 'react'
import Markdown from 'react-markdown'

let faq = `
  ### Who is Termbox for?

  People that need to quickly test something (feel free to run
  \`rm -rf --no-preserve-root /\` here), people that need a specific Linux
  distribution, or students that want to learn about Linux.

  ### What are the resource limits?

  Every container gets 256MB RAM, a single CPU core and up to 50mbit bandwith.

  ### Can I use this to run servers?

  At the moment no, but we plan to assign each container a single public port >1024.

  ### Aren't containers insecure?

  We use HyperContainer to securely isolate each container in a virtual machine,
  which gives us the best of both worlds: Low startup times and high security.

  ### Where can I report a bug or request a feature?

  Please create a issue on our [Github page](https://github.com/termbox/termbox).

  ### How can this be free?

  At our current capacity of 120 concurrent instances, a single launch costs us
  less than $0.0002, so we don't loose much by offering it for free. In the
  future, we want to show non-obtrusive ads to relevant services to finance
  hosting and development.
`

const Faq = () =>
  <section className="section">
    <div className="container">
      <Markdown source={faq}/>
    </div>
  </section>

export default Faq