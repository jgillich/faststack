import React, {Component} from 'react'
import Haikunator from 'haikunator'

let haikunator = new Haikunator()

export class Create extends Component {

  constructor(props) {
    super(props)

    this.state = {
        name: haikunator.haikunate(),
        imageTab: 'official',
        imageSelected: null,
    }
  }

  render() {
    let {name, imageTab, imageSelected} = this.state
    let imageTabContent

    if(imageTab == 'official') {
      imageTabContent = (
        <div className="columns">
          {[].map((image) =>
            <div className="column">
              <a onClick={(e) => this.setState({imageSelected: image})}>
                <div className={'card' +
                  (image.name == imageSelected.name ? ' is-active' : '')}>
                  <div className="card-image has-text-centered">
                    <span className="icon is-large" style={{'padding': '10px 0'}}>
                      <i className={'fl-' + image.name}/>
                    </span>
                  </div>

                  <div className="card-content has-text-centered" style={{whiteSpace: 'nowrap'}}>
                    {image.displayName}
                  </div>

                  <footer className="card-footer">
                    <p className="card-footer-item">{image.versions[0]}</p>
                  </footer>
                </div>
              </a>
            </div>
          )}
        </div>
      )
    } else if(imageTab == 'custom') {
      imageTabContent = (
        <div>
        </div>
      )
    }

    return (
      <div className="container">

        <h1 className="title">New Box</h1>

        <div className="tabs">
          <ul>
            <li className={imageTab == 'official' ? 'is-active' : ''}>
              <a onClick={() => this.setState({imageTab: 'official'})}>Official Images</a>
            </li>
            {/* <li className={imageTab == 'custom' ? 'is-active' : ''}>
              <a onClick={() => this.setState({imageTab: 'custom'})}>Custom Image</a>
            </li>*/}
          </ul>
        </div>

        {imageTabContent}

        <hr/>

        <label className="label">Name</label>
        <p className="control">
          <input className="input" type="text" value={name}/>
        </p>

        <label className="label">Region</label>
        <p className="control">
          <span className="select">
            <select>
              <option>Europe</option>
              <option>United States</option>
            </select>
          </span>
        </p>

        <a className="button is-fullwidth is-primary">Launch</a>
      </div>
    )
  }
}

export default Create

