/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_enhance_light_enhance_light_post } from '../models/Body_enhance_light_enhance_light_post';
import type { Body_enhance_resolution_enhance_resolution_post } from '../models/Body_enhance_resolution_enhance_resolution_post';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Root
     * General API information.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static rootGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }

    /**
     * Enhance Resolution
     * Produces x4 super-resolution image, given a 64x64 or greater input.
     * @param formData
     * @returns binary Enhanced image.
     * @throws ApiError
     */
    public static enhanceResolutionPost(
        formData: Body_enhance_resolution_enhance_resolution_post,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/enhance/resolution',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Enhance Light
     * TODO
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public static enhanceLightPost(
        formData: Body_enhance_light_enhance_light_post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/enhance/light',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
