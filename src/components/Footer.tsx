import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} HocxHire. All rights reserved.</p>
      
      <Link
        href="https://www.linkedin.com/in/naimish-kumar-21662030b/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footerLink}
      >
        LinkedIn
      </Link>
      <span>|</span>
      
      <Link href="/privacy-policy" className={styles.footerLink}>
        Privacy Policy
      </Link>
      <span>|</span>
      
      <Link href="/terms-and-conditions" className={styles.footerLink}>
        Terms & Conditions
      </Link>
    </footer>
  );
};

export default Footer;
