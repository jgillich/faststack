import {hashHistory} from 'preact-router'

export function createBox(box) {
  return function(dispatch) {
    dispatch({
        type: 'CREATE_BOX',
        loading: true,
    })
    console.log(box)
    fetch('/boxes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(box)
    }).then(res => {
      if(res.status != 200) {
        return Promise.reject(res)
      }
      return res.json()
    }).then((json) => {
      box = Object.assign(box, json)
      dispatch({
        type: 'CREATE_BOX',
        box: box,
      })
      hashHistory.push(`/term/${box.podID}`)
    }).catch(res => {
      return res.text()
    }).then(reason => {
      dispatch({
        type: 'CREATE_BOX',
        error: new Error(reason),
      })
    })
  };
}
