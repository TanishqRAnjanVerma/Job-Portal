import path from "path";
import JobModel from "../models/job.model.js";
import { sendEmailNotification } from "../middlewares/email.middleware.js";

export default class JobController {
  // 1. Creating Job Operation
  showPostJobForm(req, res, next) {
    if (!req.session.user || req.session.user.role !== "recruiter") {
      return res.redirect("/login");
    }
    res.render("new-job", { user: req.session.user });
  }
  createJob(req, res, next) {
    if (!req.session.user || req.session.user.role !== "recruiter") {
      return res.redirect("/login");
    }
    const {
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
    } = req.body;

    const skillsArray = Array.isArray(skills_required) ? skills_required : [];

    if (!req.file) {
      console.warn("No file uploaded for job logo.");
    }
    console.log("Uploaded file:", req.file);
    const logo = req.file ? "images/" + req.file.filename : "images/logo.png";
    const jobs = JobModel.getAllJobs();
    const newId =
      jobs.length > 0 ? Math.max(...jobs.map((job) => job.id)) + 1 : 1;
    const recruiter_id = req.session.user ? req.session.user.id : null;
    const job_posted = new Date().toISOString().split("T")[0];
    const newJob = new JobModel(
      newId,
      job_category,
      job_designation,
      job_location,
      company_name,
      parseInt(company_founded),
      parseInt(employees),
      salary,
      experience,
      apply_by,
      skillsArray,
      parseInt(number_of_openings),
      job_posted,
      recruiter_id,
      [],
      logo
    );

    JobModel.addJob(newJob);
    const allJobs = JobModel.getAllJobs();
    console.log("All jobs after creation:", allJobs);
    res.redirect("/jobs");
  }

  // 2. Get All Jobs Operation
  getAllJobs(req, res, next) {
    const jobs = JobModel.getAllJobs();
    res.render("list-all-jobs", {
      jobs: jobs,
      title: "Job Listings",
      user: req.session.user,
    });
  }

  // 3. Get Job By Id Operation
  getJobById(req, res, next) {
    const id = parseInt(req.params.id);
    const job = JobModel.findJobById(id);
    const applied = req.query.applied === "true";

    if (job) {
      res.render("job-details", {
        data: job,
        title: job.job_designation,
        applied: applied,
        user: req.session.user,
      });
    } else {
      res.status(404).render("404", { title: "Job Not Found" });
    }
  }

  getUpdateJob(req, res, next) {
    if (!req.session.user || req.session.user.role !== "recruiter") {
      return res.redirect("/login");
    }
    const id = parseInt(req.params.id);
    const job = JobModel.findJobById(id);

    if (job) {
      res.render("update-job", {
        job: job,
        title: `Update ${job.job_designation}`,
        user: req.session.user,
      });
    } else {
      res.status(404).render("404", { title: "Job Not Found" });
    }
  }

  // 4. Update Job Operation
  updateJob(req, res, next) {
    if (!req.session.user || req.session.user.role !== "recruiter") {
      return res.redirect("/login");
    }
    const id = parseInt(req.params.id);
    const updatedJobData = req.body;
    if (
      updatedJobData.skills_required &&
      typeof updatedJobData.skills_required === "string"
    ) {
      updatedJobData.skills_required = updatedJobData.skills_required
        .split(",")
        .map((skill) => skill.trim());
    }

    if (req.file) {
      updatedJobData.logo = "images/" + req.file.filename;
    }

    const isUpdated = JobModel.updateJob(id, updatedJobData);

    if (isUpdated) {
      res.redirect(`/jobs/${id}`);
    } else {
      res.status(404).send("Job not found for update.");
    }
  }

  // 5. Delete Job Operation
  deleteJob(req, res, next) {
    if (!req.session.user || req.session.user.role !== "recruiter") {
      return res.redirect("/login");
    }
    const id = parseInt(req.params.id);

    const isDeleted = JobModel.deleteJob(id);

    if (isDeleted) {
      res.redirect("/jobs");
    } else {
      res.status(404).send("Job not found for deletion.");
    }
  }

  // 6. Add Applicant Operation
  addApplicant(req, res, next) {
    if (req.session.user.role !== "job_seeker") {
      return res.status(403).send("Only job seekers can apply for jobs.");
    }
    const jobId = parseInt(req.params.id);
    const { name, email, contact } = req.body;
    // Converting file path to a URL path
    const resumePath = req.file
      ? "/" + req.file.path.replace(/\\/g, "/").replace("public/", "")
      : null;

    const applicant = { name, email, contact, resumePath };

    const job = JobModel.findJobById(jobId);

    if (job) {
      JobModel.addApplicant(jobId, applicant);
      // Send confirmation email
      sendEmailNotification(
        email,
        name,
        `You have successfully applied for the ${job.job_designation} position.`
      );
      res.redirect(`/jobs/${jobId}?applied=true`);
    } else {
      res.status(404).send("Job not found for application.");
    }
  }

  // 7. Get Applicants Operation
  getApplicants(req, res, next) {
    if (!req.session.user || req.session.user.role !== "recruiter") {
      return res.redirect("/login");
    }
    const jobId = parseInt(req.params.id);

    const applicants = JobModel.getApplicants(jobId);
    const job = JobModel.findJobById(jobId);

    if (!job) {
      return res.status(404).send("Job not found.");
    }

    res.render("all-applicants", {
      jobId: jobId,
      jobDesignation: job.job_designation,
      allApplicants: applicants,
      title: `Applicants for ${job.job_designation}`,
      user: req.session.user,
    });
  }
}
