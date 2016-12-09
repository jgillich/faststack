import {route} from 'preact-router'

export function createBox(box) {
  return function(dispatch) {
    dispatch({
        type: 'CREATE_BOX',
        loading: true,
    })
    fetch('/boxes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(box),
    }).then((res) => {
      if(res.status != 200) {
        res.text().then((reason) => {
          dispatch({
            type: 'CREATE_BOX',
            error: new Error(reason),
          })
        })
        return Promise.reject()
      }
      return res.json()
    }).then((json) => {
      box = Object.assign(box, json)
      dispatch({
        type: 'CREATE_BOX',
        box: box,
      })
      route(`/term/${box.podID}`)
    }).catch((err) => {
      dispatch({
        type: 'CREATE_BOX',
        error: new Error(err),
      })
    })
  }
}
