import { ChangeEvent, useState } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import './imageForm.scss';

export const ImageForm = () => {
  const [image, setImage] = useState<Blob>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const [enhancedImage, setEnhancedImage] = useState<string>('');
  const handleImageUpload = async () => {
    if (!image)
      return;

    /**
     * TODO
     * - Poner try-catch y mostrar error de forma visual.
     * - Botón de descarga.
     * - Indicar que imagen izquierda es original y derecha es mejorada.
     * - Seleccionar tipo de operación (luz, resolución, etc).
     */
    const fd = new FormData();
    fd.append('image', image);
    const response = await fetch('http://localhost:8000/enhance/resolution', {
      method: 'POST',
      body: fd,
    });
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }

    const data = await response.blob();
    setEnhancedImage(URL.createObjectURL(data));
  };

  return (
    <div className="image-form">
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload</button>
      <ReactBeforeSliderComponent firstImage={{ imageUrl: enhancedImage }} secondImage={{ imageUrl: image ? URL.createObjectURL(image) : '' }} />
    </div>
  );
};