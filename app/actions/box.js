import {hashHistory} from 'react-router'

export function createBox(box) {
  return function(dispatch) {
    dispatch({
        type: 'CREATE_BOX',
        loading: true,
    })

    fetch('/boxes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(box)
    }).then(res => {
      if(res.status != 200) {
        return dispatch({
          type: 'CREATE_BOX',
          error: new Error(res.statusText),
        })
      }

      return res.json()
    }).then((json) => {
      box = Object.assign(box, json)
      dispatch({
        type: 'CREATE_BOX',
        box: box,
      })
      hashHistory.push(`/term/${box.podID}`)
    })
  };
}