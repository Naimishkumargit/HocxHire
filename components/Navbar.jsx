'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Close } from '@mui/icons-material';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <nav
        style={{
          backgroundColor: 'var(--color-primary-dark)',
          color: 'var(--color-text-light)',
          padding: '1rem 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold',}}>
            <Link href="/" className="nav-link">
              HocxHire
            </Link>
          </h1>

          <div className="desktop-menu">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </div>

          <div className="hamburger" onClick={toggleMenu}>
            {mobileOpen ? (
              <Close style={{ fontSize: 30, color: 'white' }} />
            ) : (
              <Menu style={{ fontSize: 30, color: 'white' }} />
            )}
          </div>
        </div>
      </nav>

      {/* Slide-in Mobile Menu */}
      <div
        className="mobile-menu"
        style={{
          left: mobileOpen ? 0 : '-100%',
        }}
      >
        <Link href="/" onClick={toggleMenu} className="nav-link">
          Home
        </Link>
        <Link href="/about" onClick={toggleMenu} className="nav-link">
          About
        </Link>
      </div>

      <style jsx>{`
        .nav-link {
          color: var(--color-text-light);
          text-decoration: none;
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
        }

        .desktop-menu {
          display: none;
          gap: 2rem;
        }

        .hamburger {
          cursor: pointer;
          z-index: 2000;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          width: 70%;
          height: 100vh;
          background-color: var(--color-secondary-dark);
          color: var(--color-text-light);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          transition: left 0.3s ease-in-out;
          z-index: 1500;
        }

        @media (min-width: 768px) {
          .desktop-menu {
            display: flex;
          }
          .hamburger {
            display: none;
          }
          .mobile-menu {
            display: none;
          }

          
        }
      `}</style>
    </>
  );
};

export default NavBar;
