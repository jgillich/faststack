import errors from 'feathers-errors'

export default () => (req, res, next) => {
  next(new errors.NotFound('Page not found'))
}
