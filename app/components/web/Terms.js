import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import Markdown from 'react-markdown'

const md = `
# Terms of Service

Termbox.io agrees to furnish services to the Subscriber, subject to the
following Terms of Service. Use of Termbox.io's service constitutes acceptance
and agreement to Termbox.io's Terms of Service.

Termbox.io reserves the right to modify the Terms of Service without notice.

To report violation of the Terms of Service, send an email to
[abuse@termbox.io](mailto:abuse@termbox.io).

#### Acceptable Conduct

You are responsible for the actions of all users of your Termbox and any data
that is created, stored, displayed by, or transmitted by your Termbox while
using Termbox.io. You will not engage in any activity that interferes with or
disrupts Termbox.io's services or networks connected to Termbox.io.

#### Prohibited Usage

You agree that any of the below activities are considered prohibited usage and
will result in immediate suspension or cancellation without a refund and the
possibility that Termbox.io will impose fees; and/or pursue civil remedies
without providing advance notice.

Misuse of System Resources: Intentional misuse of system resources, including
but not limited to employing programs that consume excessive network capacity,
CPU cycles, or disk IO.

Spam and Unsolicited Bulk Email (UBE): Termbox.io has a zero tolerance policy on
spam, Junk E-mail or UBE. Spam, Junk-mail and UBE are defined as: the sending of
the same, or substantially similar, unsolicited electronic mail messages,
whether commercial or not, to more than one recipient. A message is considered
unsolicited if it is posted in violation of a newsgroup charter or if it is sent
to a recipient who has not requested the message. UBE also includes e-mail with
forged headers, compromised mail server relays, and false contact information.
This prohibition extends to the sending of unsolicited mass mailings from
another service, which in any way implicates the use of Termbox.io whether or
not the message actually originated from our network.

Access to Other Computers or Networks without Authorization: Attempting
unauthorized and/or illegal access of computers, networks and/or accounts not
belonging to party seeking access. Any act which interferes with the services of
another user or network. Any act relating to the circumvention of security
measures.

Termbox.io and the services it provides may only be used for lawful purposes.
Transmission, distribution, or storage of any information, data or material in
violation of German law is prohibited. This includes, but is not limited to,
material protected by copyright, trademark, trade secret, or other intellectual
property rights. Termbox.io's services may not be used to facilitate
infringement of these laws in any way.

Other Activities viewed as Illegal or Harmful: Engaging in illegal activities or
engaging in activities harmful to the operations of Termbox.io or Termbox.io's
customers.

Providing False Data on any Contract or Application: including fraudulent use of
credit card numbers.

Any usage that prompts the receipt of abuse complaints pertaining to violation
of German and/or international copyright law must be promptly discontinued to
avoid service cancellation for violation of these terms.

#### Warranty Disclaimer

You agree that your use of Termbox.io shall be at your sole risk. All services
provided by Termbox.io are available as is, without warranty.

#### Disclosure to Law Enforcement

The Terms of Service specifically prohibits the use of our service for illegal
activities. Therefore, Subscriber agrees that Termbox.io may disclose any and
all subscriber information including assigned IP numbers, account history,
account use, etc. to any court who sends us a valid Court Order, without further
consent or notification to the Subscriber. In addition, Termbox.io shall have
the right to terminate all service set forth in this Agreement.
`

export default class Terms extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Terms of Service - FastStack</title>
        </Helmet>
        <Markdown className="container section content" source={md}/>
      </div>
    )
  }
}
