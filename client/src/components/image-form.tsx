import { ChangeEvent, useState } from "react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { LoadingCamera } from "./loading-camera";
import "./image-form.scss";

interface ImageDimensions {
  width: number;
  height: number;
}
export interface ImageFormProps {
  processingLink: string;
  minImageDimensions?: ImageDimensions;
  maxImageDimensions: ImageDimensions;
  imageSize: number;
  outputDimensions?: ImageDimensions;
}

export const ImageForm = (props: ImageFormProps) => {
  const [currentState, _setCurrentState] = useState<string>("initial");
  const [currentError, _setCurrentError] = useState<string>("none");
  let setCurrentError: Function, setCurrentState: Function;

  const [image, setImage] = useState<Blob>();
  const validateImage = (image: Blob) => {
    const img = new Image();
    img.src = URL.createObjectURL(image);
    return (img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      if (
        width > props.maxImageDimensions.width ||
        height > props.maxImageDimensions.height ||
        image.size > props.imageSize
      ) {
        setCurrentError("imageMaxSizeError");
        return false;
      }
      if (
        props.minImageDimensions &&
        (width < props.minImageDimensions.width ||
          height < props.minImageDimensions.height)
      ) {
        setCurrentError("imageMinSizeError");
        return false;
      }
      URL.revokeObjectURL(img.src);
      return true;
    });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentState("initial");
      if (validateImage(e.target.files[0])) {
        setCurrentState("ready");
        setImage(e.target.files[0]);
      }
    }
  };

  const [imageToShow, setImageToShow] = useState<string>("");
  const [enhancedImage, setEnhancedImage] = useState<string>("");
  const handleImageUpload = async () => {
    try {
      if (!image) return;
      setCurrentState("loading");
      const fd = new FormData();
      fd.append("image", image);
      const response = await fetch(props.processingLink, {
        method: "POST",
        body: fd,
      });
      if (!response.ok) {
        setCurrentState("initial");
        setCurrentError(
          response.status === 415 ? "imageFormatError" : "responseError"
        );
        return;
      }
      const data = await response.blob();
      setEnhancedImage(URL.createObjectURL(data));
      cropImage();
      setCurrentState("done");
    } catch (e) {
      setCurrentState("initial");
      setCurrentError("responseError");
    }
  };

  const handleImageDownload = () => {
    const a = document.createElement("a");
    a.href = enhancedImage;
    a.download = "enhanced-image.jpeg";
    a.click();
  };

  const cropImage = () => {
    if (props.outputDimensions === undefined) {
      setImageToShow(URL.createObjectURL(image as Blob));
      return;
    }
    // crop the center of the image with 256 x 256 size
    const inputImage = new Image();
    inputImage.src = URL.createObjectURL(image as Blob);
    new Promise((resolve) => {
      inputImage.onload = () => {
        // aquí hacemos el crop
        const canvas = document.createElement("canvas");
        canvas.width = props.outputDimensions.width;
        canvas.height = props.outputDimensions.height;
        const context = canvas.getContext("2d");
        if (context === null) throw new Error("context is null");
        context.drawImage(
          inputImage,
          (inputImage.width - props.outputDimensions.width) / 2,
          (inputImage.height - props.outputDimensions.height) / 2,
          props.outputDimensions.width,
          props.outputDimensions.height,
          0,
          0,
          props.outputDimensions.width,
          props.outputDimensions.height
        );
        resolve(true);
        setImageToShow(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  interface State {
    image: JSX.Element;
    download: JSX.Element;
    upload: JSX.Element;
  }
  const states: { [key: string]: State } = {
    initial: {
      image: <></>,
      download: <></>,
      upload: <></>,
    },
    ready: {
      image: <></>,
      download: <></>,
      upload: <button onClick={handleImageUpload}>Upload</button>,
    },
    loading: {
      image: <LoadingCamera />,
      download: <></>,
      upload: <></>,
    },
    done: {
      image: (
        <div className="before-after-slider">
          <ReactBeforeSliderComponent
            firstImage={{ imageUrl: enhancedImage }}
            secondImage={{ imageUrl: imageToShow }}
          />
        </div>
      ),
      download: (
        <button className="download-button" onClick={handleImageDownload}>
          Download
        </button>
      ),
      upload: <></>,
    },
  };
  const errors: { [key: string]: JSX.Element } = {
    none: <></>,
    imageMaxSizeError: (
      <p>
        Image is too big! Please upload an image with maximum{" "}
        {props.maxImageDimensions.width} x {props.maxImageDimensions.height} and
        maximum {props.imageSize / 1_000_000}MB
      </p>
    ),
    imageMinSizeError: (
      <p>
        Image is too small! Please upload an image with minimum{" "}
        {props.minImageDimensions?.width} x {props.minImageDimensions?.height}
      </p>
    ),
    imageFormatError: (
      <p>Image format is not supported! Please upload a JPEG or PNG image</p>
    ),
    responseError: <p>Something went wrong! Please try again later</p>,
  };
  const imageStateHandler = () => {
    return states[currentState].image;
  };
  const uploadStateHandler = () => {
    return states[currentState].upload;
  };
  const downloadStateHandler = () => {
    return states[currentState].download;
  };
  const errorStateHandler = () => {
    return errors[currentError];
  };

  setCurrentState = (state: string) => {
    if (Object.keys(states).includes(state)) _setCurrentState(state);
    else {
      _setCurrentState("initial");
      throw new Error("Invalid state");
    }
    setCurrentError("none");
  };
  setCurrentError = (error: string) => {
    if (Object.keys(errors).includes(error)) _setCurrentError(error);
    else {
      _setCurrentError("none");
      throw new Error("Invalid error");
    }
  };

  return (
    <div className="image-form">
      <input type="file" onChange={handleImageChange} />
      {errorStateHandler()}
      {uploadStateHandler()}
      <div className="before-after">{imageStateHandler()}</div>
      {downloadStateHandler()}
    </div>
  );
};
