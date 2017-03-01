import authentication from './authentication'
import user from './user'
import Sequelize from 'sequelize'

export default function() {
  const app = this

  const sequelize = new Sequelize(app.get('postgres'), {
    dialect: 'postgres',
    logging: false,
  })
  app.set('sequelize', sequelize)

  app.configure(authentication)
  app.configure(user)
}
