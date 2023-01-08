"""REST API module.

Implements a RESTful API server which exposes several endpoints that
handle client requests and perform image enhancement operations.
"""

from fastapi import FastAPI, UploadFile, Request
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image, UnidentifiedImageError

from .models.model_factory import ModelKind, load_model


API_VERSION = "0.5.0"
TITLE = "Super-Resolution API"
DESCRIPTION = """
**Super-Resolution API** allows you to enhance the quality of your images.

## Features

You can improve on several parameters:

- **Resolution**: increase image base resolution, minimizing quality loss.
- **Light**: improve light quality of your image.
- **Noise**: reduces image noise.

Feel free to explore the interactive examples provided below.
"""

app = FastAPI(title=TITLE, description=DESCRIPTION, version=API_VERSION)

ORIGINS = ["http://localhost:5173", "http://localhost:8080"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

IMAGE_RESPONSES = {
    200: {
        "content": {"image/jpeg": {"schema": {"type": "string", "format": "binary"}}},
        "description": "Enhanced image.",
    }
}

VALID_IMAGE_FORMATS = ["JPEG", "PNG"]

@app.exception_handler(UnidentifiedImageError)
async def image_exception_handler(request: Request, exc: UnidentifiedImageError):
    return JSONResponse(
        status_code=415,
        content={"message": f"Input format must be one of: {', '.join(VALID_IMAGE_FORMATS)}"},
    )


@app.get("/")
def root():
    """General API information."""
    return {"health_check": "OK", "version": API_VERSION}


@app.post(
    "/enhance/resolution",
    response_class=StreamingResponse,
    responses=IMAGE_RESPONSES,
)
def enhance_resolution(image: UploadFile):
    """Produces x4 super-resolution image, given a 64x64 or greater input."""
    low_image = Image.open(image.file, formats=VALID_IMAGE_FORMATS)

    model = load_model(ModelKind.RESOLUTION)
    high_image = model.enhance(low_image)

    stream = BytesIO()
    high_image.save(stream, "JPEG")
    stream.seek(0)
    return StreamingResponse(stream, media_type="image/jpeg")


@app.post(
    "/enhance/light",
    response_class=StreamingResponse,
    responses=IMAGE_RESPONSES,
)
def enhance_light(image: UploadFile):
    """Produces a brighter image, given a 256x256 or lower input."""
    dark_image = Image.open(image.file, formats=VALID_IMAGE_FORMATS)

    model = load_model(ModelKind.LIGHT)
    bright_image = model.enhance(dark_image)

    stream = BytesIO()
    bright_image.save(stream, "JPEG")
    stream.seek(0)
    return StreamingResponse(stream, media_type="image/jpeg")

@app.post(
    "/enhance/noise",
    response_class=StreamingResponse,
    responses=IMAGE_RESPONSES,
)
def enhance_light(image: UploadFile):
    """Produces a less noisy image, given a 256x256 or lower input."""
    noisy_image = Image.open(image.file, formats=VALID_IMAGE_FORMATS)

    model = load_model(ModelKind.NOISE)
    clean_image = model.enhance(noisy_image)

    stream = BytesIO()
    clean_image.save(stream, "JPEG")
    stream.seek(0)
    return StreamingResponse(stream, media_type="image/jpeg")
