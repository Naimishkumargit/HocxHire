// pages/about.js
import Head from "next/head";
import styles from "../styles/About.module.css"; // renamed to module.css for Next.js

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
                HocxHire is a dynamic platform focused on connecting talented individuals with meaningful opportunities across esports, technology, and corporate domains.
              </p>

              <p className={styles["about-text"]}>
                We're building a space where growth-minded individuals – from job seekers to recruiters – can collaborate, upskill, and succeed.
              </p>

              <p className={styles["about-text"]}>
                Our unique background in BGMI and recruitment allows us to support both emerging gamers and corporate professionals in finding their next big break.
              </p>
            </div>
          </section>

          {/* Vision Section */}
          <section className={styles["vision-section"]}>
            <h2 className={styles["section-heading"]}>Our Vision</h2>
            <div className="divider"></div>
            <p className={styles["vision-text"]}>
              Our goal is to become India's most inclusive platform for career growth – whether you're playing BGMI or building the future of tech.
            </p>
          </section>
          <section className={styles["join-section"]}>
            <h2 className={styles["section-heading"]}>Join HocxHire</h2>
            <div className="divider"></div>
            <p className={styles["join-text"]}>
              Whether you're a skilled gamer, an aspiring recruiter, or a startup founder – HocxHire welcomes you. Let's grow together.
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
