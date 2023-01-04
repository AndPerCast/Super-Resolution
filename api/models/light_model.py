"""Implements a machine learning model for image light enhancement."""

import numpy as np
from PIL import Image
import tensorflow as tf
import tensorflow_hub as hub


class LightModel:
    """Machine learning model for image light enhancement."""

    _INPUT_SIZE = (256, 256)

    def __init__(self) -> None:
        inputs = tf.keras.Input((*self._INPUT_SIZE, 3))
        hub_module = hub.KerasLayer(
            "https://tfhub.dev/sayakpaul/maxim_s-2_enhancement_lol/1"
        )
        outputs = hub_module(inputs)

        self._model = tf.keras.Model(inputs, outputs)

    def enhance(self, image: Image.Image) -> Image.Image:
        """Performs light enhancement on given image.

        Args:
            image: Dark image.

        Returns:
            Bright image.
        """
        preprocessed_image = self._process_image(image, self._INPUT_SIZE[0])

        predictions = self._model.predict(preprocessed_image)
        if isinstance(predictions, list):
            predictions = predictions[-1]
            if isinstance(predictions, list):
                predictions = predictions[-1]

        predictions = np.array((np.clip(predictions, 0.0, 1.0)).astype(np.float32))

        predictions = tf.squeeze(predictions)
        predictions *= 255.0
        predictions = tf.cast(predictions, tf.uint8)

        return Image.fromarray(predictions.numpy())

    def _resize_image(self, image_arr: np.ndarray, target_dim: int) -> tf.Tensor:
        # Resize the image so that the shorter dimension becomes `target_dim`.
        shape = tf.cast(tf.shape(image_arr)[1:-1], tf.float32)
        short_dim = min(shape)
        scale = target_dim / short_dim
        new_shape = tf.cast(shape * scale, tf.int32)
        resized_image = tf.image.resize(image_arr, new_shape)

        # Central crop the image.
        resized_image = tf.image.resize_with_crop_or_pad(
            image_arr, target_dim, target_dim
        )

        return resized_image

    def _process_image(self, image: Image.Image, target_dim: int) -> tf.Tensor:
        input_arr = np.asarray(image, np.float32) / 255.0
        input_arr = tf.expand_dims(input_arr, axis=0)
        input_arr = self._resize_image(input_arr, target_dim)
        return input_arr
