import React from 'react';
import {connect} from 'react-redux'

export const Error = ({removeError, errors}) =>
  <div>
    {errors.map((error, i) =>
      <div className="notification is-danger" key={i}>
        <button className="delete" onClick={e => removeError(error)}></button>
        <div className="container">
          <h4 className="title is-4">{error.message}</h4>
        </div>
      </div>
    )}
  </div>

export const ErrorContainer = connect(
  state => ({errors: state.errors}),
  dispatch => ({removeError: (error) => dispatch({type: 'REMOVE_ERROR', error: error})})
)(Error)