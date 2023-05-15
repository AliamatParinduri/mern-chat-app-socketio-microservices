'use strict'

import { Model, UUIDV4 } from 'sequelize'

import { DefaultPicture } from '../../config'

interface UserAttributes {
  id: string
  name: string
  email: string
  password: string
  pic: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string
    name!: string
    email!: string
    password!: string
    pic!: string
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pic: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DefaultPicture
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
