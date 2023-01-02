/**
 * Example of using openapi client for a REST API.
 */

import { DefaultService, ApiError } from './client'

async function main() {
  try {
    const inputImage: Blob = new Blob();
    const outputImage: Blob = await DefaultService.enhanceResolutionPost({
      image: inputImage
    });
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(`API error ${error.status}: ${error.message}`);
    }
  }
}
