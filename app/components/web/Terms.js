import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import html from '../../content/terms.md'

export default class Tos extends Component {
  render() {
    return (
      <div className="container section content" dangerouslySetInnerHTML={{__html: html}}>
        <Helmet>
          <title>Terms of Service - FastStack</title>
        </Helmet>
      </div>
    )
  }
}
