export interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  experience: string;
  email: string;
  skills: string[];
  summary: string;
}

export const jobs: Job[] = [
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
      "Cloud-native application development",
    ],
    summary:
      "Seeking an experienced Java Developer with strong expertise in Core Java, Spring Boot, and Microservices. This is a 12-month W2 contract role based in NYC (Hybrid). Only W2 candidates are eligible.",
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
      "Cloud-native application development",
    ],
    summary:
      "Hiring a Java Developer with 5+ years of hands-on experience in Java, Spring Boot, and Microservices. Hybrid role in Phoenix, AZ. This is a W2 contract opportunity; C2C is not allowed.",
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
      "Strong communication and teamwork abilities",
    ],
    summary:
      "We are looking for a skilled Cloud DevOps Engineer with 7+ years of experience in cloud platforms, Linux administration, IaC tools, and automation. Onsite/Hybrid in Phoenix, AZ. Only W2 candidates can apply.",
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
      "Eligible to work in US without sponsorship",
    ],
    summary:
      "Looking for a .NET Full Stack Developer with 7+ years of experience in Angular, C#, ASP.NET Core, and SQL Server. Hybrid role in Parsippany, NJ. W2 full-time position only.",
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
      "Problem-solving in complex AI environments",
    ],
    summary:
      "Seeking a Senior AI Architect with over 10 years of experience in AI/ML and 3+ years in architecture roles. Expertise in GenAI, LLMs, and Python frameworks required. Hybrid role in NJ. Open to W2 and 1099 candidates.",
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
      "Excellent documentation skills",
    ],
    summary:
      "We are hiring a Senior SQL Server DBA with 10+ years of experience in SQL Server (2016–2022), performance tuning, HA/DR solutions, and security compliance. Onsite/Hybrid in NJ. Only W2 candidates are eligible.",
  },
];
