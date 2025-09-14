// pages/about.js
import Head from "next/head";
import styles from "../about.module.css"; // renamed to module.css for Next.js

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About HocxHire | USA Jobs & Career Recruitment Platform</title>
        <meta
          name="description"
          content="HocxHire is a USA-based recruitment platform connecting job seekers and companies across IT, startups, and corporate sectors. Build your career with opportunities in the United States."
        />
        <meta
          name="keywords"
          content="HocxHire, About HocxHire, Jobs in USA, Careers in United States, Tech Hiring USA, Recruitment Platform, IT Jobs USA, Startup Hiring, Professional Careers USA"
        />
        <meta name="author" content="HocxHire Team" />
        <meta property="og:title" content="About HocxHire | USA Careers & Hiring Platform" />
        <meta
          property="og:description"
          content="Learn about HocxHire – a USA-based job and recruitment platform helping job seekers and companies connect in IT, startups, and professional careers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hocxhire.com/about" />
        <meta property="og:site_name" content="HocxHire" />
        <meta property="og:image" content="https://hocxhire.com/og-image.jpg" />
        <link rel="canonical" href="https://hocxhire.com/about" />
      </Head>

      <main className={styles["about-page"]}>
        <div className={styles["about-container"]}>
          {/* About Section */}
          <section className={styles["about-intro"]}>
            <h1 className={styles["about-title"]}>About HocxHire</h1>
            <div className="divider"></div>

            <div className={styles["about-content"]}>
              <p className={styles["about-text"]}>
                HocxHire is more than just a job portal – it’s a career-building ecosystem. 
                We’re on a mission to connect <strong>talented professionals</strong> with 
                <strong> growing companies</strong> across the United States & India.
              </p>

              <p className={styles["about-text"]}>
                With a focus on <strong>IT, startups, and corporate careers</strong>, 
                HocxHire helps both <strong>job seekers</strong> and <strong>recruiters</strong> 
                achieve their goals. Whether you’re looking for your dream role or the perfect hire, 
                HocxHire makes the process faster and smarter.
              </p>

              <p className={styles["about-text"]}>
                Our platform combines technology with human-driven recruitment, giving professionals 
                the tools to succeed and helping companies find the right talent for long-term growth.
              </p>
            </div>
          </section>

          {/* Vision Section */}
          <section className={styles["vision-section"]}>
            <h2 className={styles["section-heading"]}>Our Vision</h2>
            <div className="divider"></div>
            <p className={styles["vision-text"]}>
              We believe <strong>career opportunities should be accessible and future-ready</strong>. 
              Our vision is to become the most trusted USA & India-based hiring platform where 
              <strong>job seekers, recruiters, and startups</strong> can grow together. 
              From <strong>IT innovation</strong> to <strong>corporate leadership</strong>, 
              HocxHire empowers people to achieve more.
            </p>
          </section>

          {/* Mission Section */}
          <section className={styles["mission-section"]}>
            <h2 className={styles["section-heading"]}>Our Mission</h2>
            <div className="divider"></div>
            <p className={styles["mission-text"]}>
              Our mission is simple: <strong>connect talent with opportunity</strong>. 
              We aim to support <strong>job seekers</strong> in building their careers, 
              help <strong>companies</strong> find the best professionals, and provide 
              <strong>startups</strong> with access to the right talent for scaling.
            </p>
          </section>

          {/* Join Section */}
          <section className={styles["join-section"]}>
            <h2 className={styles["section-heading"]}>Join HocxHire</h2>
            <div className="divider"></div>
            <p className={styles["join-text"]}>
              Whether you’re a <strong>skilled professional</strong>, an 
              <strong> ambitious recruiter</strong>, or a <strong>startup founder</strong>, 
              HocxHire welcomes you. Together, we’re shaping the future of 
              <strong>careers and recruitment</strong>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
