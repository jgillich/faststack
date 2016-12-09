import {h} from 'preact'
import Pages from '../pages/index'


const Page = ({name}) =>
  <section class="section">
    <div class="container content" dangerouslySetInnerHTML={{__html: Pages[name] ? Pages[name] : Pages['notfound']}}></div>
  </section>

export default Page
