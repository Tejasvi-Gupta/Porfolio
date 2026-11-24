export const projects = [
  {
    id: "netra",
    name: "NETRA",
    category: "AI / Intelligence",
    tag: "01",
    cover: "netra",
    image: "/images/netra.webp",
    summary:
      "See beyond the data. AI-powered network analysis using FIRs and police reports.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "NLP",
      "Neo4j",
      "MongoDB",
      "Docker",
    ],
    repo: "https://github.com/Tejasvi-Gupta/NETRA",
    problem:
      "Unstructured investigative documents make relationships difficult to explore.",
    approach:
      "The project aims to extract relationships from reports and present them through an intelligence interface. The repository confirms Next.js, TypeScript and Docker; the remaining stack is project-reported.",
    notes:
      "Use synthetic or anonymized data in demonstrations. Backend integration and individual contributions require further verification.",
  },
  {
    id: "provisioning",
    name: "Environment Provisioning Platform",
    category: "Cloud / DevOps",
    tag: "02",
    cover: "cloud",
    summary:
      "Approval-driven setup of student development environments with a Windows agent.",
    stack: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Terraform",
      "AWS",
    ],
    repo: "https://github.com/Tejasvi-Gupta/Devops_Mid",
    demo: "https://epp-app.onrender.com",
    problem:
      "Manual setup creates inconsistent development environments for students.",
    approach:
      "Instructors publish course environments; students pair an agent, approve an installation plan, and verify readiness. The agent uses catalog-matched packages and outbound HTTPS.",
    notes:
      "README documents a Render deployment, CI tests and AWS/Terraform scaffolding. AWS resources were not created; live app availability has not been checked.",
  },
  {
    id: "attendance",
    name: "Attendance Management System",
    category: "Full stack",
    tag: "03",
    cover: "attendance",
    summary:
      "Role-based attendance tracking with student and administrator dashboards.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Docker",
      "Nginx",
      "JWT",
    ],
    repo: "https://github.com/Tejasvi-Gupta/Attendance_system",
    problem:
      "Manual attendance tracking is cumbersome and difficult to review.",
    approach:
      "MERN application with JWT authentication, separate role-based dashboards, bulk attendance marking, REST APIs and containerized services.",
    notes:
      "March–April 2026. Docker Compose and Nginx configuration are documented in the repository.",
  },
  {
    id: "navrakshak",
    name: "NavRakshak",
    category: "Collaborative / Safety",
    tag: "04",
    cover: "map",
    summary:
      "Tourist safety platform concept with geolocation and emergency response interfaces.",
    stack: ["FastAPI", "Supabase", "OpenStreetMap"],
    repo: "https://github.com/Subrat-Dwivedi-22/NavRakshak",
    problem: "Tourists need accessible location and incident reporting tools.",
    approach:
      "My contribution focused on responsive frontend interfaces, geolocation integration, alerts and incident reporting. The broader team concept includes AI, blockchain and offline safety.",
    notes:
      "September–November 2025. Roadmap features are not presented as completed functionality.",
  },
];
