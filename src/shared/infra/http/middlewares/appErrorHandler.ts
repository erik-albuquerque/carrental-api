import { Request, Response /* NextFunction */ } from 'express'

import { AppError } from '@shared/errors/AppError'

const appErrorHandler = (
  error: Error,
  request: Request,
  response: Response,
  // next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status((error as AppError).statusCode).json({
      message: error.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${error.message}`,
  })
}

export { appErrorHandler }
