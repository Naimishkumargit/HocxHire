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
];
