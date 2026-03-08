export interface Professional {
  id: number;
  fullName: string;
  jobTitle: string;
  experience: string;
  keySkills: string[];
  location: string;
  workAuthorization: string;
  expectedRate: string;
  availability: string;

  // Admin Only
  email: string;
  phone: string;
  linkedin: string;
}

export const professionals: Professional[] = [
  {
    id: 1,
    fullName: "Ranjith Reddy Nareddy",
    jobTitle: "QlikView Developer",
    experience: "8+ Years",
    keySkills: ["QlikView", "QMC", "SQL", "ETL"],
    location: "Denton, TX",
    workAuthorization: "H1B",
    expectedRate: "$45/hr C2C",
    availability: "Immediate",
    email: "ranjithrn6091@gmail.com",
    phone: "9723167415",
    linkedin: "https://www.linkedin.com/in/ranjith-n-01b000333/"
  },
];