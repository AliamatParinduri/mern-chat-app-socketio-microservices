import Joi from 'joi'

import { UnprocessableEntityError } from '.'

export const validate = (payload: object, validateSchema: Joi.ObjectSchema<any>) => {
  const schema = validateSchema
  const { error } = schema.validate(payload)
  if (error) {
    throw new UnprocessableEntityError(error.details[0].message)
  }
}
