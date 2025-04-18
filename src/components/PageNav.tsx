import styles from './PageNav.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const PageNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(`/policies/${selectedValue}`);
      setIsOpen(false); 
    }
  };

  return (
    <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
      {/* Бургер-меню */}
      <div className={styles.burger} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Ссылки */}
      <ul className={`${styles.navLinks} ${isOpen ? styles.show : ''}`}>
        <li>
          <NavLink 
            to={'/'} 
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={'/product'} 
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Reservations
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={'/contact'} 
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Contacts
          </NavLink>
        </li>
        <li>
          <select defaultValue="" onChange={handleSelectChange}>
            <option value="" disabled>Policies</option>
            <option value="refund-policy">Refund policy</option>
            <option value="terms-and-conditions">Terms and conditions</option>
            <option value="privacy-policy">Privacy policy</option>
          </select>
        </li>
        {user?.role === "admin" && (
          <li>
            <NavLink 
              to={'/admin'} 
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Admin panel
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default PageNav;
