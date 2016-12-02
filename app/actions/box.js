
export function createBox(box) {
  return function(dispatch) {
    fetch('/boxes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(box)
    }).then(res => {
      if(res.status != 200) {
        return dispatch({
          type: 'ADD_ERROR',
          error: new Error(res.statusText)
        })
      }

      dispatch({
        type: 'CREATE_BOX',
        box: Object.assign(box, res.json()),
      })
    })
  };
}