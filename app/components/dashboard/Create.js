import React, {Component} from 'react'
import images from '../../../images/images.json'
import Haikunator from 'haikunator'

let haikunator = new Haikunator()

export class Create extends Component {

  constructor(props) {
    super(props)

    this.state = {
        imageTab: 'official',
        imageSelected: images[0],
    }
  }

  render({}, {imageTab, imageSelected}) {

    let imageTabContent

    if(imageTab == 'official') {
      imageTabContent = (
        <div class="columns">
          {images.map((image) =>
            <div class="column">
              <a onClick={(e) => this.setState({imageSelected: image})}>
                <div class={'card' +
                  (image.name == imageSelected.name ? ' is-primary' : '')}>
                  <div class="card-image has-text-centered">
                    <span class="icon is-large" style={{'padding': '10px 0'}}>
                      <i class={'fl-' + image.name}/>
                    </span>
                  </div>

                  <div class="card-content has-text-centered" style={{whiteSpace: 'nowrap'}}>
                    {image.displayName}
                  </div>

                  <footer class="card-footer">
                    <p class="card-footer-item">{image.versions[0]}</p>
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
          <label class="label">Image</label>
          <p class="control">
            <input class="input" type="text" placeholder="user/name:tag"/>
            <span class="help">All public <a href="https://hub.docker.com/">Docker Hub</a> images are supported</span>
          </p>

          <label class="label">Custom command</label>
          <p class="control">
            <input class="input" type="text"/>
            <span class="help">If the image command is not a shell, you can overwrite it here</span>
          </p>
        </div>
      )
    }

    return (
      <div class="container">

        <h1 class="title">New Box</h1>

        <div class="tabs">
          <ul>
            <li class={imageTab == 'official' ? 'is-active' : ''}>
              <a onClick={() => this.setState({imageTab: 'official'})}>Official Images</a>
            </li>
            <li class={imageTab == 'custom' ? 'is-active' : ''}>
              <a onClick={() => this.setState({imageTab: 'custom'})}>Custom Image</a>
            </li>
          </ul>
        </div>

        {imageTabContent}

        <hr/>

        <label class="label">Name</label>
        <p class="control">
          <input class="input" type="text" value={haikunator.haikunate()}/>
        </p>

        <label class="label">Region</label>
        <p class="control">
          <span class="select">
            <select>
              <option>Europe</option>
              <option>United States</option>
            </select>
          </span>
        </p>

        <a class="button is-fullwidth is-primary">Launch</a>
      </div>
    )
  }
}

export default Create

