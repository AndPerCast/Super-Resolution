"""Implements several machine learning models for image processing."""

from PIL import Image
from typing import Protocol
from enum import Enum
from functools import lru_cache

from .resolution_model import ResolutionModel
from .light_model import LightModel


class ImageEnhancer(Protocol):
    """Generic image quality enhancer."""

    def enhance(self, image: Image.Image) -> Image.Image:
        ...


class ModelKind(Enum):
    """Represents a model that is capable of solving a
    certain image processing task.
    """

    RESOLUTION = "resolution"
    LIGHT = "light"


_KIND_TO_MODEL: dict[ModelKind, type[ImageEnhancer]] = {
    ModelKind.RESOLUTION: ResolutionModel,
    ModelKind.LIGHT: LightModel,
}


@lru_cache
def load_model(kind: ModelKind) -> ImageEnhancer:
    """Loads a model that fulfills given task.

    This function implements a caching policy, so that repetitive calls
    for a single task will not imply object reloading, more than once.

    Args:
        kind: Desired image processing task.

    Returns:
        Image processing model.
    """
    return _KIND_TO_MODEL[kind]()
