const Footer = () => {
  return (
    <footer
      className="text-center py-4"
      style={{ backgroundColor: "var(--color-primary-dark)", color: "var(--color-text-light)" }}
    >
      <p>&copy; {new Date().getFullYear()} HocxHire. All rights reserved.</p>
      <a
        href="https://www.linkedin.com/in/naimish-kumar-21662030b/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "var(--color-accent-gold)" }}
      >
        LinkedIn
      </a>
    </footer>
  );
};

export default Footer;
