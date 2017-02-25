import React from 'react'
import images from '../../images/images.json'

const BoxItem = () =>
  <section class="section">
    <div class="columns is-multiline">
      {images.map((image) =>
        <div class="column is-centered is-2">
          <a onClick={(e) => this.setState({selectedImage: image})}>
            <div class={'card' +
              (image.name == selectedImage.name ? ' is-primary' : '')}>
              <div class="card-image has-text-centered">
                <span class="icon is-huge" style={{'padding': '10px 0'}}>
                  <i class={'fl-' + image.name}/>
                </span>
              </div>

              <div class="card-content has-text-centered">
                <p class="title is-4">{image.displayName}</p>
              </div>

              <footer class="card-footer">
                <p class="card-footer-item">{image.versions[0]}</p>
              </footer>
            </div>
          </a>
        </div>
      )}
    </div>
  </section>

export default BoxItem

