import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isTransparent, setIsTransparent] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false);
      } else {
        setIsVisible(true);
      }

      if (currentScrollY > 50) {
        setIsTransparent(true);
      } else {
        setIsTransparent(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const headerClass = `fixed top-0 left-0 w-full z-50 transition-all duration-300 transform 
    ${isVisible ? 'translate-y-0' : '-translate-y-full'}
    ${isTransparent ? 'bg-orange-500/90 backdrop-blur-md shadow-md' : 'bg-orange-500'}
  `;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const linkClass = ({ isActive }) =>
    `text-white transition-colors duration-200 border-b-2 hover:border-white px-1 inline-block py-2 md:py-0 ${isActive ? 'border-white font-bold' : 'border-transparent font-normal'
    }`;

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-6 md:px-10 py-4 flex justify-between items-center relative">
        <div className="z-50">
          <NavLink to="/">
            <img className="w-24 md:w-32 brightness-0 invert transition-all duration-300" src="/src/assets/logos.png" alt="Suitmedia" />
          </NavLink>
        </div>

        <button
          className="md:hidden text-white z-50 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav
          className={`
            absolute top-full left-0 w-full bg-orange-500 md:static md:bg-transparent md:w-auto
            flex flex-col md:flex-row items-center justify-center md:justify-end space-y-4 md:space-y-0 md:space-x-8 py-6 md:py-0
            shadow-xl md:shadow-none transition-all duration-300 ease-in-out z-40 origin-top
            ${isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 md:opacity-100 md:scale-y-100 pointer-events-none md:pointer-events-auto'}
          `}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-center w-full md:w-auto">
            <li><NavLink to="/work" className={linkClass}>Work</NavLink></li>
            <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
            <li><NavLink to="/services" className={linkClass}>Services</NavLink></li>
            <li><NavLink to="/" className={linkClass} end>Ideas</NavLink></li>
            <li><NavLink to="/careers" className={linkClass}>Careers</NavLink></li>
            <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
