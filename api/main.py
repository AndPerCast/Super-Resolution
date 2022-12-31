"""REST API module.

Implements a RESTful API server which exposes several endpoints that
handle client requests and perform image enhancement operations.
"""

from fastapi import FastAPI, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image

from .models.model_factory import ModelKind, load_model


API_VERSION = "0.3.1"
TITLE = "Super-Resolution API"
DESCRIPTION = """
**Super-Resolution API** allows you to enhance the quality of your images.

## Features

You can improve on several parameters:

- **Resolution**: increase image base resolution, minimizing quality loss.
- **Light**: (*not yet implemented*).

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


@app.get("/")
def root():
    """General API information."""
    return {"health_check": "OK", "version": API_VERSION}


@app.post("/enhance/resolution")
def enhance_resolution(image: UploadFile):
    """Produces x4 super-resolution image, given a 64x64 or greater input."""
    low_image = Image.open(image.file)

    model = load_model(ModelKind.RESOLUTION)
    high_image = model.enhance(low_image)

    stream = BytesIO()
    high_image.save(stream, "JPEG")
    stream.seek(0)
    return StreamingResponse(stream, media_type="image/jpeg")


@app.post("/enhance/light")
def enhance_light(image: UploadFile):
    """TODO"""
    low_image = Image.open(image.file)

    model = load_model(ModelKind.LIGHT)
    high_image = model.enhance(low_image)

    stream = BytesIO()
    high_image.save(stream, "JPEG")
    stream.seek(0)
    return StreamingResponse(stream, media_type="image/jpeg")
