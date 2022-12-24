"""REST API module.

Implements a RESTful API server which exposes several endpoints that
handle client requests and perform image enhancement operations.
"""

from fastapi import FastAPI


API_VERSION = "0.1.0"
TITLE = "Super-Resolution API"
DESCRIPTION = """
**Super-Resolution API** allows you to enhance the quality of your images.

## Features

You can improve on several parameters:

- **Resolution**: (*not yet implemented*).
- **Light**: (*not yet implemented*).

Feel free to explore the interactive examples provided below.
"""

app = FastAPI(title=TITLE, description=DESCRIPTION, version=API_VERSION)


@app.get("/")
def root():
    return {"health_check": "OK", "version": API_VERSION}
