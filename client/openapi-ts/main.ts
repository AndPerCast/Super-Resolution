/**
 * Example of using openapi client for a REST API.
 */

import { OpenAPI, DefaultService, ApiError } from './client'

OpenAPI.BASE = 'http://127.0.0.1:8000';

async function main() {
  try {
    const inputImage = new Blob();
    const outputImage = await DefaultService.enhanceResolutionPost({
      image: inputImage
    });
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(`API error ${error.status}: ${error.message}`);
    }
  }
}
