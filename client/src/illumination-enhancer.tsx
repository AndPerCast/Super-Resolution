import { ImageForm } from "./components/image-form";
import { Navbar } from "./components/navigation/navbar";
import "./illumination-enhancer.scss";

const IlluminationEnhancerForm = () => {
  return ImageForm({
    processingLink: "http://localhost:8000/enhance/light",
    minImageDimensions: {
      width: 256,
      height: 256,
    },
    maxImageDimensions: {
      width: 800,
      height: 600,
    },
    imageSize: 500_000,
    outputDimensions: {
      width: 256,
      height: 256,
    },
  });
};

function IlluminationEnhancer() {
  return (
    <div className="IlluminationEnhancer">
      <link
        href="https://fonts.googleapis.com/css?family=Lexend"
        rel="stylesheet"
      />
      <Navbar />
      <IlluminationEnhancerForm />
    </div>
  );
}

export default IlluminationEnhancer;
