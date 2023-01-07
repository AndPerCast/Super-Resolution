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
              <div className="contact_item_label">Support</div>
              <div className="contact_item_big">help@coolors.co</div>
              <div className="contact_item_p">
                You can also have a look at our{" "}
                <a
                  href="https://help.coolors.co"
                  target="_blank"
                  className="link link--primary link--hover-underlined"
                >
                  Help Center
                </a>
                .
              </div>
            </div>
          </div>
          <div className="contact_item_wrapper">
            <div className="contact_item">
              <div className="contact_item_label">Info</div>
              <div className="contact_item_big">info@coolors.co</div>
              <div className="contact_item_p">
                Drop us a line if you have suggestions.
              </div>
            </div>
          </div>
          <div className="contact_item_wrapper">
            <div className="contact_item">
              <div className="contact_item_label">About</div>
              <div className="contact_item_big">Made by Fabrizio Bianchi</div>
              {/* <div className="contact_item_p">Created during a weekend as <a href="/old/index.html" className="link link--primary link--hover-underlined">personal project</a>,<br>it's now the essential tool for millions of amazing creatives.</div> */}
            </div>
          </div>
          <div className="contact_item_wrapper">
            <div className="contact_item">
              <div className="contact_item_label">Company</div>
              <div className="contact_item_big">Coolors srl</div>
              <div className="contact_item_p">
                Piazza R. Gaucci, 23, 00034, Colleferro, Rome, Italy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
