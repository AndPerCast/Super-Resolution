import { ImageForm } from "./components/image-form";
import { Navbar } from "./components/navigation/navbar";
import "./super-resolution.scss";

const SuperResolutionForm = () => {
  return ImageForm({
    processingLink: "http://localhost:8000/enhance/resolution",
    imageWidth: 1500,
    imageHeight: 600,
    imageSize: 1_000_000,
  });
};

function SuperResolution() {
  return (
    <div className="SuperResolution">
      <link
        href="https://fonts.googleapis.com/css?family=Lexend"
        rel="stylesheet"
      />
      <Navbar />
      <SuperResolutionForm />
    </div>
  );
}

export default SuperResolution;
