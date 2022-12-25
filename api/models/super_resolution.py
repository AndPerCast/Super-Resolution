"""Implements several machine learning models for image processing."""

import numpy as np
from PIL import Image
import tensorflow as tf
import tensorflow_hub as hub

# TODO implement a generic model loader.
model = hub.load("https://tfhub.dev/captain-pool/esrgan-tf2/1")


def enhance(image: Image.Image) -> Image.Image:
    """Performs image resolution augmentation using a machine learning algorithm.

    Args:
        image: Low resolution image.

    Returns:
        High resolution image.
    """
    low_input = np.asarray(image)

    # If PNG, remove the alpha channel.
    # The model only supports images with 3 color channels.
    if low_input.shape[-1] == 4:
        low_input = low_input[..., :-1]
    input_size = (tf.convert_to_tensor(low_input.shape[:-1]) // 4) * 4
    low_input = tf.image.crop_to_bounding_box(
        low_input, 0, 0, input_size[0], input_size[1]
    )
    low_input = tf.cast(low_input, tf.float32)
    low_input = tf.expand_dims(low_input, 0)

    high_output = model(low_input)
    high_output = tf.squeeze(high_output)
    high_output = tf.clip_by_value(high_output, 0, 255)
    high_image = Image.fromarray(tf.cast(high_output, tf.uint8).numpy())
    return high_image
