// Navbar.tsx
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h1>Turbo Typer v0.1</h1>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <NavLink to={'/home'}>
            <i className="fas fa-home"></i>
          </NavLink>
        </li>
        <li className="navbar-item">
          {' '}
          <NavLink to={'/options'}>Options</NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to={'/about'}>About</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
