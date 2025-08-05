// pages/about.js
import Head from "next/head";
import styles from "../styles/about.module.css"; // renamed to module.css for Next.js

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About HocxHire</title>
        <meta name="description" content="Learn about HocxHire – a growing platform for job seekers and companies to connect in tech, esports, and beyond." />
        <meta name="keywords" content="HocxHire, About, Jobs, Esports, Career, Recruitment, BGMI, Hiring Platform" />
        <meta name="author" content="HocxHire Team" />
        <meta property="og:title" content="About HocxHire" />
        <meta property="og:description" content="Discover the vision behind HocxHire and how we're building opportunities for talent." />
        <meta property="og:type" content="website" />
      </Head>

      <main className={styles["about-page"]}>
        <div className={styles["about-container"]}>
          {/* About Section */}
          <section className={styles["about-intro"]}>
            <h1 className={styles["about-title"]}>About HocxHire</h1>
            <div className="divider"></div>

            <div className={styles["about-content"]}>
              <p className={styles["about-text"]}>
           HocxHire is a dynamic recruitment platform committed to connecting top talent with leading opportunities across the United States. With a strong foundation in tech hiring, we specialize in placing skilled professionals in C2C, W2, and 1099 roles across various domains — including IT, cloud, AI, data, and enterprise systems.
              </p>

              <p className={styles["about-text"]}>
          Our mission is simple:
To empower candidates and companies alike through transparent, fast, and reliable hiring solutions.

At HocxHire, we’re not just filling roles — we’re building careers.
              </p>
            </div>
          </section>

          {/* Vision Section */}
          <section className={styles["vision-section"]}>
            <h2 className={styles["section-heading"]}>Our Vision at HocxHire</h2>
            <div className="divider"></div>
            <p className={styles["vision-text"]}>
              To become USA most inclusive and trusted hiring platform — connecting skilled talent with top opportunities across the USA tech industry.
            </p>
          </section>
          <section className={styles["join-section"]}>
            <h2 className={styles["section-heading"]}>Join HocxHire</h2>
            <div className="divider"></div>
            <p className={styles["join-text"]}>
           At HocxHire, we provide daily job opportunities across the U.S., including C2C, W2, and 1099 roles — tailored to match your skills and career goals.
            </p>
            <p className={styles["join-text"]}>
              Want to get in touch? We’d love to hear from you.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
