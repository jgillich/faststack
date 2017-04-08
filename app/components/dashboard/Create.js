import React, {Component} from 'react'
import Haikunator from 'haikunator'

let haikunator = new Haikunator()

// TODO fetch from somewhere
let images = [
 {
   name: 'ubuntu',
   displayName: 'Ubuntu',
   versions: ['16.04'],
 },
  {
   name: 'fedora',
   displayName: 'Fedora',
   versions: ['25'],
 },
  {
   name: 'centos',
   displayName: 'CentOS',
   versions: ['7'],
 },
   {
   name: 'alpine',
   displayName: 'Alpine',
   versions: ['3.5'],
 },
]


export class Create extends Component {

  static contextTypes = {
    machines: React.PropTypes.object,
  }

  state = {
    name: haikunator.haikunate({tokenLength: 0}),
    imageTab: 'official',
    imageSelected: images[0],
    loading: false,
    error: null,
  }

  create() {
    this.setState({loading: true})
    this.context.machines.create(this.state.name, "ubuntu/xenial").then(() => {
      alert('success')
    }).catch(error => {
      this.setState({error: error.message, loading: false})
      console.log(error, this.state)
    })
  }

  render() {
    let {name, imageTab, imageSelected, loading} = this.state
    let imageTabContent

    if(imageTab == 'official') {
      imageTabContent = (
        <div className="columns">
          {images.map((image) =>
            <div className="column" key={image.name}>
              <a onClick={(e) => this.setState({imageSelected: image})}>
                <div className={'card' +
                  (image.name == imageSelected.name ? ' is-active' : '')}>
                  <div className="card-image has-text-centered" style={{'paddingTop': '10px'}}>
                    <span className="icon is-large" >
                      <i className={'fa fl-' + image.name}/>
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
      <div className="container columns">

        <div className="column is-10">

          <h1 className="title">Create Machine</h1>

          <form onSubmit={e => { e.preventDefault(); this.create()}}>

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

            <div className="field">
              <label className="label">Name</label>
              <p className="control">
                <input className="input" type="text" value={name}
                  onChange={(e) => this.name = e.target.value}/>
              </p>
            </div>

            <div className="field">
              <label className="label">Region</label>
              <p className="control">
                <span className="select">
                  <select>
                    <option>Europe</option>
                    <option>North America</option>
                  </select>
                </span>
              </p>
            </div>

            <div className="field">
              <p className="control">
                <button className={"button is-large is-fullwidth is-primary " + (loading ? "is-loading" : "")}>Create</button>
              </p>
            </div>
          </form>

          <br/>

          { !this.state.error ? null :
            <div className="notification is-danger">
              {this.state.error}
            </div> }

        </div>
      </div>
    )
  }
}

export default Create

