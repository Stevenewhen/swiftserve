import './Logo.css';
import logoImage from "../../../src/images/SwiftServeLogo.png";

export default function Logo() {
  return (
    <div className="Logo">
      <img src={logoImage} alt="SwiftServe Logo" />
    </div>
  );
}
