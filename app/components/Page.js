import Preact from 'preact'
import Pages from '../pages/index'

const Page = ({name}) =>
  <section className="section">
    <div className="container content"dangerouslySetInnerHTML={
      {__html: Pages[name] ? Pages[name] : Pages['notfound']}
    }></div>
  </section>

export default Page
