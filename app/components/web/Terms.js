import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import html from '../../content/terms.md'

export default class Terms extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Terms of Service - FastStack</title>
        </Helmet>
        <div className="container section content" dangerouslySetInnerHTML={{__html: html}}/>
      </div>
    )
  }
}
