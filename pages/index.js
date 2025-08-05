// pages/vacancies.js
import Head from "next/head";
import styles from "../styles/vacancies.module.css";

const jobs = [
  {
    id: 1,
    title: "Java Developer",
    location: "New York City, NY (Hybrid)",
    type: "W2 - 12 Months Contract",
    experience: "7+ Years",
    email: "naimishkumar295@gmail.com",
    skills: [
      "Java/Core Java",
      "Spring Boot",
      "Microservices Architecture",
      "REST API Development & Integration",
      "Debugging & Problem Solving",
      "Strong collaboration & communication skills",
      "Experience with modern Java frameworks",
      "Cloud-native application development"
    ],
    note: "Only W2 candidates can apply."
  },
  {
    id: 6,
    title: "Java Developer",
    location: "Phoenix, AZ (Hybrid)",
    type: "W2 - 12 Months Contract",
    experience: "5+ Years",
    email: "naimishkumar295@gmail.com",
    skills: [
      "Java/Core Java",
      "Spring Boot",
      "Microservices Architecture",
      "REST API Development & Integration",
      "Debugging & Problem Solving",
      "Strong collaboration & communication skills",
      "Experience with modern Java frameworks",
      "Cloud-native application development"
    ],
    note: "Only W2 candidates can apply."
  },
  {
    id: 2,
    title: "Cloud DevOps Engineer",
    location: "Phoenix, AZ (Onsite/Hybrid)",
    type: "W2 - Full-Time",
    experience: "7+ Years",
    email: "naimishkumar295@gmail.com",
    skills: [
      "Bachelor's degree in Computer Science, IT or related field preferred",
      "Linux administration, automation, troubleshooting",
      "System/application logging and log forwarding",
      "PCRE (Perl Compatible Regular Expressions)",
      "Terraform, Ansible or similar IaC tools",
      "Programming in Bash, Perl, Python, Go, or C",
      "AWS, Azure, or Google Cloud",
      "Kafka, Elasticsearch, Microsoft SQL, PostgreSQL",
      "Experience with REST, gRPC, or GraphQL APIs",
      "Excellent problem-solving and analytical skills",
      "Strong communication and teamwork abilities"
    ],
    note: "Only W2 candidates can apply."
  },
  {
    id: 3,
    title: "Software Engineer (.NET Full Stack Developer)",
    location: "Parsippany, NJ (Hybrid)",
    type: "W2 - Full-Time",
    experience: "7+ Years",
    email: "naimishkumar295@gmail.com",
    skills: [
      "Angular, Microsoft .NET, Framework 4.0+",
      "C#, ASP.NET Core, ADO.NET, Web API, MS SQL",
      "Excellent written and verbal communication",
      "Ability to work independently and in teams",
      "Experience with Angular (v8+), RxJS",
      "Building RESTful APIs and microservices with .NET Core",
      "SQL Server database design and optimization",
      "PHI protection through encryption and secure access",
      "Ability to work in fast-paced environment",
      "Eligible to work in US without sponsorship"
    ],
    note: "Only W2 candidates can apply."
  },
  {
    id: 4,
    title: "Senior AI Architect",
    location: "Parsippany, NJ (Hybrid)",
    type: "W2/1099 - Full-Time",
    experience: "10+ Years",
    email: "naimishkumar295@gmail.com",
    skills: [
      "10+ years in AI/ML with 3+ in architecture roles",
      "Production experience with GenAI + traditional ML",
      "LLMs, Transformer models, Vector embeddings",
      "Python (TensorFlow, PyTorch, HuggingFace)",
      "SQL and cloud platforms experience",
      "AI system design and implementation",
      "Leadership in technical projects",
      "Problem-solving in complex AI environments"
    ],
    note: "Only W2, 1099 candidates can apply."
  },
  {
    id: 5,
    title: "Senior SQL Server DBA",
    location: "Parsippany, NJ (Onsite/Hybrid)",
    type: "W2 - Full-Time",
    experience: "10+ Years",
    email: "naimishkumar295@gmail.com",
    skills: [
      "10+ years as SQL Server DBA",
      "SQL Server 2016, 2019, and 2022",
      "Performance tuning, indexing, query optimization",
      "Always On Availability Groups, Failover Clustering",
      "Database security, auditing, and compliance",
      "SSIS, SSRS, and SQL Server Agent",
      "High Availability/Disaster Recovery solutions",
      "Excellent documentation skills"
    ],
    note: "Only W2 candidates can apply."
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Job Vacancies – HocxHire</title>
        <meta
          name="description"
          content="Explore open job positions at HocxHire including Cloud DevOps Engineer and Java Developer roles. Apply now via email."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" />
      </Head>

      <main className={styles.vacanciesPage}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Join Our Growing Team at HocxHire</h1>
            <p className={styles.subtitle}>
              We currently have {jobs.length} exciting opportunity
              {jobs.length !== 1 ? "ies" : ""} available. Find your perfect fit
              below.
            </p>
          </div>
          <div className="divider"></div>

          <div className={styles.jobsGrid}>
            {jobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobHeader}>
                  <h2>{job.title}</h2>
                  <div className={styles.jobMeta}>
                    <span className={styles.metaItem}>
                      <strong>Location:</strong> {job.location}
                    </span>
                    <span className={styles.metaItem}>
                      <strong>Experience:</strong> {job.experience}
                    </span>
                    <span className={styles.metaItem}>
                      <strong>Type:</strong> {job.type}
                    </span>
                  </div>
                </div>

                <div className={styles.jobDetails}>
                  <p className={styles.apply}>
                    <strong>Apply at:</strong>{" "}
                    <a href={`mailto:${job.email}`} className={styles.email}>
                      {job.email}
                    </a>
                  </p>
                  <p className={styles.note}>
                    <strong>Note:</strong> {job.note}
                  </p>

                  <div className={styles.skillsSection}>
                    <strong className={styles.skillsTitle}>
                      Required Skills:
                    </strong>
                    <ul className={styles.skillsList}>
                      {job.skills.map((skill, index) => (
                        <li key={index} className={styles.skillItem}>
                          <span className={styles.skillBullet}>•</span> {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
