export interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
}

export const jobPostings: JobPosting[] = [
  {
    id: "eng-1",
    title: "Senior ML Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    description:
      "Design and implement scalable ML infrastructure and model training pipelines. Drive technical decisions and mentor junior engineers while working on cutting-edge AI technologies.",
  },
  {
    id: "eng-2",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "Build and maintain our customer-facing dashboard and developer tools. Work with modern technologies like React, TypeScript, and GraphQL to create intuitive interfaces.",
  },
  {
    id: "design-1",
    title: "Product Designer",
    department: "Design",
    location: "Remote (Global)",
    type: "Full-time",
    description:
      "Create intuitive and beautiful interfaces for our AI platform. Work closely with product and engineering teams to deliver exceptional user experiences.",
  },
  {
    id: "sales-1",
    title: "Enterprise Sales Manager",
    department: "Sales",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Drive enterprise adoption of our AI solutions. Build and maintain relationships with key accounts while working with technical teams to ensure customer success.",
  },
]

