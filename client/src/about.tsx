import { Navbar } from "./components/navigation/navbar";
import "./about.scss";

export default function About() {
  return (
    <div className="AboutWrapper">
      <link
        href="https://fonts.googleapis.com/css?family=Lexend"
        rel="stylesheet"
      />
      <Navbar />
      <div className="About">
        <div className="page-title">
          <h1>Get in touch</h1>
          <h2>We love to talk with you!</h2>
        </div>
        <div className="Contact">
          <div className="contact_item_wrapper">
            <div className="contact_item">
              <div className="contact_item_label">Daniel García Hernández</div>
              <div className="contact_item_big">danielgarciaher2@gmail.com</div>
              <div className="contact_item_p">
                <a
                  href="https://github.com/Hummus-1"
                  target="_blank"
                  className="link link--primary link--hover-underlined"
                >
                  Github
                </a>
              </div>
            </div>
          </div>
          <div className="contact_item_wrapper">
            <div className="contact_item">
              <div className="contact_item_label">Diego Pérez García</div>
              <div className="contact_item_big">
                diego.perez.garcia.31@ull.edu.es
              </div>
              <div className="contact_item_p">
                <a
                  href="https://github.com/DiegoPerezGarcia"
                  target="_blank"
                  className="link link--primary link--hover-underlined"
                >
                  Github
                </a>
              </div>
            </div>
          </div>
          <div className="contact_item_wrapper">
            <div className="contact_item">
              <div className="contact_item_label">Andrés Pérez Castellano</div>
              <div className="contact_item_big">andres.perez.11@ull.edu.es</div>
              <div className="contact_item_p">
                <a
                  href="https://github.com/AndPerCast"
                  target="_blank"
                  className="link link--primary link--hover-underlined"
                >
                  Github
                </a>
              </div>
            </div>
          </div>
          <div className="contact_item_wrapper">
            <div className="contact_item">
              <div className="contact_item_label">
                ISAS Project Information Links
              </div>
              <div className="contact_item_p">
                <a
                  href="https://github.com/AndPerCast/Super-Resolution"
                  target="_blank"
                  className="link link--primary link--hover-underlined"
                >
                  Github
                </a>
              </div>
              <div className="contact_item_p">
                <a
                  href="http://localhost:8000/docs"
                  target="_blank"
                  className="link link--primary link--hover-underlined"
                >
                  Documentation
                </a>
              </div>
              <div className="contact_item_p">
                <a
                  href="https://docs.google.com/presentation/d/1iuh485jhGpY3RU70Li5k4uHNBh6R92S2Sl1GCvbN6iI/edit?usp=sharing"
                  target="_blank"
                  className="link link--primary link--hover-underlined"
                >
                  Slides
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
