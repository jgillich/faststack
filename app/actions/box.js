
export function createBox(box) {
  return function(dispatch) {
    fetch('/boxes', {
      method: 'POST',
      body: JSON.stringify(box)
    }).then(res => {
      if(res.status != 200) {
        return dispatch({
          type: 'ADD_ERROR',
          text: res.statusText
        })
      }

      dispatch({
        type: 'CREATE_BOX',
        box: Object.assign(box, res.json()),
      })
    })
  };
}