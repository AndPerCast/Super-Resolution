import { ImageForm } from "./components/image-form";
import { Navbar } from "./components/navigation/navbar";
import "./Illumination-Enhancer.scss";

function IlluminationEnhancer() {
  return (
    <div className="IlluminationEnhancer">
      <link
        href="https://fonts.googleapis.com/css?family=Lexend"
        rel="stylesheet"
      />
      <Navbar />
      <ImageForm />
    </div>
  );
}

export default IlluminationEnhancer;
