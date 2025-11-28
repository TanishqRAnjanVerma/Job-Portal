export default class JobModel {
  constructor(
    id,
    job_category,
    job_designation,
    job_location,
    company_name,
    company_founded,
    employees,
    salary,
    experience,
    apply_by,
    skills_required,
    number_of_openings,
    job_posted,
    recruiter_id,
    applicants,
    logo
  ) {
    this.id = id;
    this.job_category = job_category;
    this.job_designation = job_designation;
    this.job_location = job_location;
    this.company_name = company_name;
    this.company_founded = company_founded;
    this.employees = employees;
    this.salary = salary;
    this.experience = experience;
    this.apply_by = apply_by;
    this.skills_required = skills_required;
    this.number_of_openings = number_of_openings;
    this.job_posted = job_posted;
    this.recruiter_id = recruiter_id;
    this.applicants = applicants;
    this.logo = logo;
  }

  // Static methods to manage jobs

  // Add a new job
  static addJob(job) {
    jobs.push(job);
  }

  // Get all jobs
  static getAllJobs() {
    return jobs;
  }

  // Find a job by ID
  static findJobById(id) {
    return jobs.find((job) => job.id === id);
  }

  // Update a job by ID
  static updateJob(id, updatedJob) {
    const index = jobs.findIndex((job) => job.id === id);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...updatedJob };
      return true;
    }
    return false;
  }

  // Delete a job by ID
  static deleteJob(id) {
    const index = jobs.findIndex((job) => job.id === id);
    if (index !== -1) {
      jobs.splice(index, 1);
      return true;
    }
    return false;
  }

  // Add applicant to a job
  static addApplicant(jobId, userId) {
    const job = this.findJobById(jobId);
    if (job) {
      job.applicants.push(userId);
    }
  }

  // Get applicants for a job
  static getApplicants(jobId) {
    const job = this.findJobById(jobId);
    return job ? job.applicants : [];
  }
}

// In-memory job storage
var jobs = [
  new JobModel(
    1,
    "IT",
    "Frontend Developer",
    "Remote",
    "Tech Corp",
    2000,
    500,
    "6-8 LPA",
    "2-5 years",
    "2024-07-31",
    ["HTML", "CSS", "JavaScript"],
    2,
    "2024-06-10",
    101,
    [],
    "images/adob.png"
  ),
  new JobModel(
    2,
    "Finance",
    "Accountant",
    "Delhi",
    "FinServe",
    1995,
    200,
    "4-5 LPA",
    "1-3 years",
    "2024-08-15",
    ["Tally", "Excel"],
    1,
    "2024-06-12",
    102,
    [],
    "images/amz.png"
  ),
  new JobModel(
    3,
    "HR",
    "HR Manager",
    "Mumbai",
    "PeopleFirst",
    2010,
    1000,
    "7-9 LPA",
    "5-10 years",
    "2024-07-20",
    ["Recruitment", "Communication"],
    1,
    "2024-06-15",
    103,
    [],
    "images/apple.png"
  ),
  new JobModel(
    4,
    "IT",
    "Backend Developer",
    "Bangalore",
    "CodeBase",
    2015,
    300,
    "8-10 LPA",
    "3-7 years",
    "2024-08-01",
    ["Node.js", "Express", "MongoDB"],
    3,
    "2024-06-18",
    104,
    [],
    "images/ibm.png"
  ),
  new JobModel(
    5,
    "Marketing",
    "Digital Marketer",
    "Remote",
    "MarketMinds",
    2018,
    150,
    "5-7 LPA",
    "2-4 years",
    "2024-07-25",
    ["SEO", "Google Ads"],
    2,
    "2024-06-20",
    105,
    [],
    "images/orc.png"
  ),
  new JobModel(
    6,
    "Design",
    "UI/UX Designer",
    "Pune",
    "DesignHub",
    2020,
    50,
    "6-8 LPA",
    "1-3 years",
    "2024-08-10",
    ["Figma", "Adobe XD"],
    1,
    "2024-06-22",
    106,
    [],
    "images/x.png"
  ),
  new JobModel(
    7,
    "IT",
    "Full Stack Developer",
    "Hyderabad",
    "StackWorks",
    2012,
    400,
    "10-12 LPA",
    "4-8 years",
    "2024-08-05",
    ["React", "Node.js", "MongoDB"],
    2,
    "2024-06-25",
    107,
    [],
    "images/google.png"
  ),
  new JobModel(
    8,
    "Sales",
    "Sales Executive",
    "Chennai",
    "SellWell",
    2005,
    250,
    "3-5 LPA",
    "1-2 years",
    "2024-07-30",
    ["Negotiation", "CRM"],
    4,
    "2024-06-28",
    108,
    [],
    "images/fac.png"
  ),
  new JobModel(
    9,
    "Support",
    "Customer Support",
    "Remote",
    "HelpDesk",
    2019,
    100,
    "2-4 LPA",
    "0-2 years",
    "2024-08-12",
    ["Communication", "Problem Solving"],
    5,
    "2024-07-01",
    109,
    [],
    "images/flip.png"
  ),
  new JobModel(
    10,
    "IT",
    "DevOps Engineer",
    "Gurgaon",
    "CloudOps",
    2016,
    200,
    "9-11 LPA",
    "3-6 years",
    "2024-08-20",
    ["AWS", "Docker", "CI/CD"],
    1,
    "2024-07-03",
    110,
    [],
    "images/ab.png"
  ),
];
