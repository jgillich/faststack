import {h} from 'preact'
import Docs from '../docs/index'

const Doc = ({name}) =>
  <section class="section">
    <div class="container content" dangerouslySetInnerHTML={{__html: Docs[name] ? Docs[name] : "Page not found"}}></div>
  </section>

export default Doc
