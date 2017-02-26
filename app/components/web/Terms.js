import React, {Component} from 'react'
import html from '../../content/terms.md'

export default class Tos extends Component {
  render() {
    return (
      <div class="container section content" dangerouslySetInnerHTML={{__html: html}}></div>
    )
  }
}
