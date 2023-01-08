import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.scss";
import linksIndex from "../../main";

const navBarButton = (name: string, link: string) => {
  return (
    <li className="nav-item">
      <a className="nav-link" href={link}>
        {name}
      </a>
    </li>
  );
};

export const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="#">
          ISAS Project
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {Object.entries(linksIndex).map(([name, link]) => {
              return navBarButton(name, link.path);
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};
