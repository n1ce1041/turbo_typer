// Navbar.tsx
import './Navbar.css'
import '@fortawesome/fontawesome-free/css/all.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h1>Turbo Typer v0.1</h1>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <i className="fas fa-home"></i>
        </li>
        <li className="navbar-item">Options</li>
        <li className="navbar-item">About</li>
      </ul>
    </nav>
  )
}

export default Navbar
