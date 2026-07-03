export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#" className="logo">
          <span className="am">A M</span>
          ENERGY
          <span className="by-malik">By Malik</span>
        </a>

        <nav className="nav-links">
          <a href="#flavors">Flavors</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
