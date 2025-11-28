import express from "express";
import path from "path";
import JobController from "./src/controllers/job.controller.js";
import UserController from "./src/controllers/user.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import { auth } from "./src/middlewares/auth.middleware.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";
import {
  validateLoginRequest,
  validateRegistrationRequest,
  validateNewJobRequest,
  validateUpdateJobRequest,
} from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";

const app = express();
app.use(express.static(path.join(path.resolve(), "public")));

// Global Middleware

// 1. Using express-ejs-layouts middleware first.
app.use(expressEjsLayouts);

// 2. Body Parser Middleware to parse data submitted via HTML forms
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// 3. Session Middleware
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
    },
  })
);

// 3. Setting up static file serving (for CSS, images, etc.)
app.use(express.static(path.join(path.resolve(), "src", "views")));

// EJS Configuration

app.set("view engine", "ejs");
// 4. Sets the views directory to 'src/views'.
app.set("views", path.join(path.resolve(), "src", "views"));

// Routing

const jobController = new JobController();
const userController = new UserController();
// Landing Page Route
app.get("/", (req, res) => {
  res.render("landing-page", { title: "Job Portal", user: req.session.user });
});

app.get("/login", userController.showLoginForm);
app.post("/login", validateLoginRequest, userController.login);
app.post("/register", validateRegistrationRequest, userController.register);
app.get("/logout", userController.logout);

// Displays all jobs
app.get("/jobs", setLastVisit, auth, jobController.getAllJobs);

// 1. Create Job Routes
app.post(
  "/job",
  auth,
  uploadFile.single("logo"),
  validateNewJobRequest,
  jobController.createJob
);

// 2. View Job Details Route
app.get("/jobs/:id", auth, jobController.getJobById);
app.get("/postjob", auth, jobController.showPostJobForm);

// 3. Update Job Routes
app.get("/job/update/:id", auth, jobController.getUpdateJob);
app.post(
  "/job/update/:id",
  auth,
  uploadFile.single("logo"),
  validateUpdateJobRequest,
  jobController.updateJob
);

// 4. Delete Job Route
app.post("/job/delete/:id", auth, jobController.deleteJob);

// 5. Applicant Routes
app.get("/job/applicants/:id", auth, jobController.getApplicants);
app.post(
  "/apply/:id",
  auth,
  uploadFile.single("resume"),
  jobController.addApplicant
);

// 404 Error Handler
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// Server Listener

app.listen(3200, () => {
  console.log("Server is running on port 3200");
});
