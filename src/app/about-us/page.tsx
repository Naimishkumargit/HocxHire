// pages/about.js
import styles from "../about.module.css"; // renamed to module.css for Next.js

export default function AboutPage() {
  return (
    <>
      <main className={styles["about-page"]}>
        <div className={styles["about-container"]}>
          {/* About Section */}
          <section className={styles["about-intro"]}>
            <h1 className={styles["about-title"]}>About HocxHire</h1>
            <div className="divider"></div>

            <div className={styles["about-content"]}>
              <p className={styles["about-text"]}>
                HocxHire is more than just a job portal – it’s a career-building ecosystem. 
                We’re on a mission to connect <strong> talented professionals </strong> with 
                <strong> growing companies </strong> across the United States & India.
              </p>

              <p className={styles["about-text"]}>
                With a focus on <strong>IT, startups, and corporate careers</strong>, 
                HocxHire helps both <strong> job seekers </strong> and <strong> recruiters</strong> 
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
              We believe <strong> career opportunities should be accessible and future-ready </strong>. 
              Our vision is to become the most trusted USA & India-based hiring platform where 
              <strong> job seekers, recruiters, and startups </strong> can grow together. 
              From <strong> IT innovation </strong> to <strong> corporate leadership</strong>, 
              HocxHire empowers people to achieve more.
            </p>
          </section>

          {/* Mission Section */}
          <section className={styles["mission-section"]}>
            <h2 className={styles["section-heading"]}>Our Mission</h2>
            <div className="divider"></div>
            <p className={styles["mission-text"]}>
              Our mission is simple: <strong>connect talent with opportunity</strong>. 
              We aim to support <strong> job seekers</strong> in building their careers, 
              help <strong> companies </strong> find the best professionals, and provide 
              <strong> startups </strong> with access to the right talent for scaling.
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

export const metadata = {
  title: "About HocxHire — About Us",
  description:
    "Learn about HocxHire's mission and vision to connect talent with opportunity across the USA and India.",
  keywords: ["About HocxHire", "recruiting", "jobs platform", "career platform", "IT jobs"],
};
