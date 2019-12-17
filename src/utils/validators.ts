import * as joi from 'joi'
import * as express from 'express'
import { HTTP400Error } from './httpErrors'


export interface ValidationResponse {
    error?: any
}

export interface RequestSchema {
    body?: any
    headers?: any
    params?: any
    queryParams?: any
}

export const validate = (schema: RequestSchema, request: express.Request): ValidationResponse => {
    const joiOptions = { abortEarly: false }
    if (schema.params) {
        const { error } = joi.validate(request.params, schema.params, joiOptions)
        if (error) {
            return { error: new HTTP400Error(error.message) }
        }
    }
    if (schema.queryParams) {
        const { error } = joi.validate(request.query, schema.queryParams, joiOptions)
        if (error) {
            return { error: new HTTP400Error(error.message) }
        }
    }

    if (schema.headers) {
        const { error } = joi.validate(request.headers, schema.headers, { allowUnknown: true, abortEarly: false })
        if (error) {
            return { error: new HTTP400Error(error.message) }
        }
    }

    if (schema.body) {
        if (Object.keys(request.body).length === 0 && request.body.constructor === Object) {
            return { error: new HTTP400Error('bad request in body') }
        }
        const { error } = joi.validate(request.body, schema.body, joiOptions)
        if (error)  return { error: new HTTP400Error(error.message) }
    }
    return { error: undefined }
}
