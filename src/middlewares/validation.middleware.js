import { body, validationResult } from "express-validator";
import JobModel from "../models/job.model.js";

// Validation for User Registration
export const validateRegistrationRequest = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.render("landing-page", {
      registrationError: validationErrors.array()[0].msg,
      user: req.session.user,
    });
  }
  next();
};

// Validation for User Login
export const validateLoginRequest = async (req, res, next) => {
  const rules = [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.render("user-login", {
      error: validationErrors.array()[0].msg,
      selectedRole: req.body.role || "recruiter",
    });
  }
  next();
};

// Validation for New Job Posting
export const validateNewJobRequest = async (req, res, next) => {
  const rules = [
    body("job_category").notEmpty().withMessage("Job category is required"),
    body("job_designation")
      .notEmpty()
      .withMessage("Job designation is required"),
    body("job_location").notEmpty().withMessage("Job location is required"),
    body("company_name").notEmpty().withMessage("Company name is required"),
    body("salary").notEmpty().withMessage("Salary is required"),
    body("number_of_openings")
      .isInt({ min: 1 })
      .withMessage("Number of openings must be a positive integer"),
    body("skills_required")
      .notEmpty()
      .withMessage("At least one skill is required"),
    body("apply_by").isDate().withMessage("Apply by must be a valid date"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.render("new-job", {
      errorMessage: validationErrors.array()[0].msg,
      user: req.session.user,
    });
  }
  next();
};

// Validation for Update Job Posting
export const validateUpdateJobRequest = async (req, res, next) => {
  const rules = [
    body("job_category").notEmpty().withMessage("Job category is required"),
    body("job_designation")
      .notEmpty()
      .withMessage("Job designation is required"),
    body("job_location").notEmpty().withMessage("Job location is required"),
    body("company_name").notEmpty().withMessage("Company name is required"),
    body("salary").notEmpty().withMessage("Salary is required"),
    body("number_of_openings")
      .isInt({ min: 1 })
      .withMessage("Number of openings must be a positive integer"),
    body("skills_required")
      .notEmpty()
      .withMessage("At least one skill is required"),
    body("apply_by").isDate().withMessage("Apply by must be a valid date"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const id = parseInt(req.params.id);
    const job = JobModel.findJobById(id);
    return res.render("update-job", {
      errorMessage: validationErrors.array()[0].msg,
      job: job,
      user: req.session.user,
    });
  }
  next();
};
