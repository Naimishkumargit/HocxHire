// components/Layout.jsx
import Head from "next/head";
import NavBar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>HocxHire</title>
        <meta name="description" content="Job portal" />
      </Head>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
