enum status {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnprocessableEntity = 422,
  InternalServer = 500
}

export class BaseError extends Error {
  statusCode: number
  message: string
  description: string

  constructor(message: string, statusCode: number, description: string) {
    super(description)
    Object.setPrototypeOf(this, BaseError.prototype)
    this.statusCode = statusCode
    this.message = message
    this.description = description

    Error.captureStackTrace(this)
  }
}

// 404 Bad Request Error
export class BadRequestError extends BaseError {
  constructor(description: string) {
    super('Bad Request', status.BadRequest, description)
  }
}

// 401 Unauthorized Error
export class UnauthorizedError extends BaseError {
  constructor(description: string) {
    super('Unauthorized', status.Unauthorized, description)
  }
}

// 403 Forbidden Error
export class ForbiddenError extends BaseError {
  constructor(description: string) {
    super('Unauthorized', status.Forbidden, description)
  }
}

// 404 Not Found Error
export class NotFoundError extends BaseError {
  constructor(description: string) {
    super('Not Found', status.NotFound, description)
  }
}

// 422 Unprocessable Entity  Error
export class UnprocessableEntityError extends BaseError {
  constructor(description: string) {
    super('Unprocessable Entity', status.UnprocessableEntity, description)
  }
}

// 500 Internal Server Error
export class InternalServerError extends BaseError {
  constructor(description: string) {
    super('Internal Server', status.InternalServer, description)
  }
}
