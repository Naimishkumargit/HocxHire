"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, CircleUser, User, Settings, LogOut } from "lucide-react";
import styles from "./NavBar.module.css";
import { Session } from "next-auth";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession() as { data: Session | null };
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileProfileRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleMobileProfile = () => setMobileProfileOpen(!mobileProfileOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close desktop profile dropdown if clicking outside
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }

      // Close mobile menu if clicking outside
      if (
        mobileOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(`.${styles.hamburger}`)
      ) {
        setMobileOpen(false);
      }

      // Close mobile profile dropdown if clicking outside
      if (
        mobileProfileOpen &&
        mobileProfileRef.current &&
        !mobileProfileRef.current.contains(event.target as Node)
      ) {
        setMobileProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen, mobileProfileOpen]);

  return (
    <>
      <nav className={styles.navbar}>
        <div
          className={`${styles.nav_container} mx-auto max-w-6xl flex items-center justify-between`}
        >
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            HocxHire
          </Link>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
            <Link href="/find-jobs" className={styles.navLink}>
              Find Jobs
            </Link>
            <Link href="/create-jobs" className={styles.navLink}>
              Create Jobs
            </Link>
            <Link href="/about-us" className={styles.navLink}>
              About Us
            </Link>

            {/* Login / User Info */}
            {!session ? (
              <div className={styles.navLink}>
                <Link href="/login">
                  <CircleUser size={24} className="w-8 h-8 " />
                </Link>
              </div>
            ) : (
              <div className="relative" ref={profileRef}>
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={toggleProfile}
                >
                  {session.user?.image ? (
                    <img
                      src={session.user?.image ?? ""}
                      alt={session.user?.name || "Profile"}
                      className="w-9 h-9 rounded-full object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                      <CircleUser size={24} />
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-4 w-48 rounded-md shadow-lg py-1 z-50 shadow-dark  bg-[var(--color-secondary-dark)] ">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-semibold">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {session.user?.email}
                      </p>
                    </div>

                    <Link
                      href="#"
                      className="flex items-center px-4 py-2 text-sm"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Link>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        signOut();
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger for Mobile */}
          <div className={styles.hamburger} onClick={toggleMenu}>
            {mobileOpen ? <X /> : <Menu />}
          </div>
        </div>
      </nav>

      {/* Slide-in Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`${styles.mobileMenu} ${
          mobileOpen ? styles.mobileMenuOpen : ""
        } border flex flex-col justify-between`}
      >
        <div className="flex flex-col">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={styles.navLink}
          >
            Home
          </Link>
          <Link
            href="/find-jobs"
            onClick={() => setMobileOpen(false)}
            className={styles.navLink}
          >
            Find Jobs
          </Link>
          <Link
            href="/create-jobs"
            onClick={() => setMobileOpen(false)}
            className={styles.navLink}
          >
            Create Jobs
          </Link>
          <Link
            href="/about-us"
            onClick={() => setMobileOpen(false)}
            className={styles.navLink}
          >
            About Us
          </Link>
        </div>
        <div>
          {/* Mobile Login / User */}
          {!session ? (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className={styles.navLink}
            >
              <div className="flex">
                <CircleUser size={24} />
                <span className="ml-2">Login</span>
              </div>
            </Link>
          ) : (
            <div className="flex flex-col" ref={mobileProfileRef}>
              <div
                className="flex flex-col items-center gap-2 mb-2 cursor-pointer"
                onClick={toggleMobileProfile}
              >
                <div className="flex">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "Profile"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                      <CircleUser size={24} />
                    </div>
                  )}

                  <div className=" text-center ml-3 mt-3">
                    <p className="font-semibold">{session.user?.name}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm">{session.user?.email}</p>
                </div>
              </div>

              {/* Mobile Profile Dropdown */}
              {mobileProfileOpen && (
                <div className="flex flex-col gap-2 border-t pt-3 ml-3">
                  <Link
                    href="#"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileProfileOpen(false);
                    }}
                    className="text-left flex items-center gap-2"
                  >
                    <Settings size={16} />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileProfileOpen(false);
                      signOut();
                    }}
                    className="text-left flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
