import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import './imageForm.scss';

export const ImageForm = () => {
  const [image, setImage] = useState<Blob>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const [enhancedImage, setEnhancedImage] = useState<string | ArrayBuffer | null>(null);
  const handleImageUpload = () => {
    console.log('response');
    if(!image)
      return;

    const fd = new FormData();
    fd.append("image", image);
    fetch('http://localhost:8000/enhance/resolution', {
      method: 'POST',
      body: fd,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
      return response.blob();
    })
    .then((myBlob) => {
      const objectURL = URL.createObjectURL(myBlob);
      // myImage.src = objectURL;
      console.log(myBlob)
    })
    // axios.post('http://localhost:8000').then(response => console.log(response));
    // return axios.post('http://localhost:8000/enhance/resolution', image, {
    //   headers : {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   responseType: 'blob',
    // })
    // .then(response => {
    //   console.log(response);
    //   setEnhancedImage(URL.createObjectURL(response.data));
    // })
    // .catch(error => {
    //   console.log(error);
    // });
    // return axios({
    //   method: 'post',
    //   url: 'http://localhost:8000/enhance/resolution',
    //   data: image,
    //   headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'multipart/form-data'
    //   },
    // })
    // .then(response => {
    //     console.log(response);
    // })
    // .catch(error => {
    //     console.error(error);
    // });
    
  };

  return (
    <div className="image-form">
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload</button>
      <img src={URL.createObjectURL(image as Blob)} alt="image" />
    </div>
  );
};