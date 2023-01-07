import { ImageForm } from "./components/image-form";
import { Navbar } from "./components/navigation/navbar";
import "./super-resolution.scss";

function SuperResolution() {
  return (
    <div className="SuperResolution">
      <link
        href="https://fonts.googleapis.com/css?family=Lexend"
        rel="stylesheet"
      />
      <Navbar />
      <ImageForm />
    </div>
  );
}

export default SuperResolution;
