import { ImageForm } from "./components/image-form";
import { Navbar } from "./components/navigation/navbar";
import "./illumination-enhancer.scss";

const NoiseReductionForm = () => {
  return ImageForm({
    processingLink: "http://localhost:8000/enhance/noise",
    imageWidth: 256,
    imageHeight: 256,
    imageSize: 250_000,
  });
};

function NoiseReduction() {
  return (
    <div className="NoiseReduction">
      <link
        href="https://fonts.googleapis.com/css?family=Lexend"
        rel="stylesheet"
      />
      <Navbar />
      <NoiseReductionForm />
    </div>
  );
}

export default NoiseReduction;
