import httpContext from 'express-http-context';
import { StatusCodes } from 'http-status-codes';
import { CORRELATION_ID_CONTEXT_KEY } from '../constants/constants';

const { INTERNAL_SERVER_ERROR } = StatusCodes;

export const errorHandler = () => {
  return (err, req, res, next) => {
    // todo check the exception type and send the error
    console.log('🚀 ~ file: errorHandler.js ~ line 11 ~ return ~ err', err);
    return res.status(INTERNAL_SERVER_ERROR).send({
      error: `Internal server error. Please report incident id : ${httpContext.get(
        CORRELATION_ID_CONTEXT_KEY
      )}`,
    });
    // return next(err);
  };
};
