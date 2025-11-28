// JOB Application Portal

A full-featured job application portal built with Node.js, Express, and EJS. This platform allows recruiters to post job opportunities and job seekers to browse and apply for positions. The application includes user authentication, job management, file uploads, email notifications, and a responsive UI.

## Features

### For Job Seekers

- Browse available job listings
- View detailed job information
- Apply for jobs with resume upload
- User registration and login
- Receive email confirmation upon application

### For Recruiters

- Post new job opportunities
- Manage job listings (view, update, delete)
- View applicants for each job
- Upload company logos
- User registration and login

### General Features

- Secure user authentication with sessions
- Role-based access control (Recruiter vs Job Seeker)
- Form validation with error handling
- File upload support (resumes and logos)
- Email notifications
- Responsive design with Bootstrap
- Landing page with company showcases and testimonials

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript Templates), Express-EJS-Layouts, Bootstrap 5
- **Database**: In-memory storage (no external database required)
- **Authentication**: Express-Session, Cookie-Parser, Bcrypt
- **File Upload**: Multer
- **Email**: Nodemailer
- **Validation**: Express-Validator
- **Other**: Body-Parser, Dotenv

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd job-application
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   SESSION_SECRET=your-session-secret-key
   ```

4. Start the server:

   ```bash
   npm start
   ```

   Or for development:

   ```bash
   node index.js
   ```

5. Open your browser and navigate to `http://localhost:3200`

## Usage

### Landing Page

- Visit the home page to see featured companies and job categories
- Register as a Job Seeker or Recruiter
- Login with existing credentials

### Job Seekers

1. Register/Login as a Job Seeker
2. Browse job listings
3. View job details
4. Apply for jobs by uploading your resume

### Recruiters

1. Register/Login as a Recruiter
2. Post new jobs with company details and requirements
3. View and manage your posted jobs
4. Review applicants for each job

## Project Structure

```
job-application/
├── index.js                    # Main application entry point
├── package.json                # Dependencies and scripts
├── package-lock.json           # Lock file for dependencies
├── TODO.md                     # Development tasks
├── public/                     # Static files
│   └── images/                 # Uploaded images (resumes, logos)
├── src/
│   ├── controllers/            # Route handlers
│   │   ├── job.controller.js   # Job-related operations
│   │   └── user.controller.js  # User authentication
│   ├── middlewares/            # Custom middleware
│   │   ├── auth.middleware.js          # Authentication check
│   │   ├── email.middleware.js         # Email sending
│   │   ├── file-upload.middleware.js   # File upload handling
│   │   ├── lastVisit.middleware.js     # Last visit tracking
│   │   └── validation.middleware.js    # Form validation
│   ├── models/                 # Data models
│   │   ├── job.model.js        # Job data structure
│   │   └── user.models.js      # User data structure
│   └── views/                  # EJS templates
│       ├── layout.ejs          # Main layout
│       ├── landing-page.ejs    # Home page
│       ├── user-login.ejs      # Login page
│       ├── new-job.ejs         # Job posting form
│       ├── list-all-jobs.ejs   # Job listings
│       ├── job-details.ejs     # Job detail view
│       ├── update-job.ejs      # Job update form
│       ├── all-applicants.ejs  # Applicant list
│       ├── 404.ejs             # Error page
│       ├── css/                # Stylesheets
│       ├── html/               # HTML templates
│       └── images/             # Static images
```

## API Endpoints

### Authentication

- `GET /` - Landing page
- `GET /login` - Show login form
- `POST /login` - Process login
- `POST /register` - Process registration
- `POST /logout` - Logout user

### Jobs

- `GET /jobs` - List all jobs (authenticated users)
- `GET /jobs/:id` - View job details
- `GET /postjob` - Show job posting form (recruiters only)
- `POST /job` - Create new job (recruiters only)
- `GET /job/update/:id` - Show job update form (recruiters only)
- `POST /job/update/:id` - Update job (recruiters only)
- `POST /job/delete/:id` - Delete job (recruiters only)

### Applications

- `GET /job/applicants/:id` - View applicants for a job (recruiters only)
- `POST /apply/:id` - Apply for a job (job seekers only)

### Error Handling

- `GET /*` - 404 error page for undefined routes

## Data Models

### User Model

- id: Unique identifier
- name: User's full name
- email: User's email address
- password: Hashed password
- role: "recruiter" or "job_seeker"

### Job Model

- id: Unique identifier
- job_category: Job category
- job_designation: Job title
- job_location: Job location
- company_name: Company name
- company_founded: Year founded
- employees: Number of employees
- salary: Salary information
- experience: Required experience
- apply_by: Application deadline
- skills_required: Array of required skills
- number_of_openings: Number of positions
- job_posted: Posting date
- recruiter_id: ID of posting recruiter
- applicants: Array of applicant objects
- logo: Path to company logo

### Applicant Model

- name: Applicant's name
- email: Applicant's email
- contact: Contact information
- resumePath: Path to uploaded resume

## Validation

The application includes comprehensive form validation:

- **Registration**: Name, email, password (min 6 chars)
- **Login**: Email and password
- **Job Posting**: All fields required, valid date for deadline, positive integer for openings
- **Job Update**: Same as posting validation

Validation errors are displayed in modals or on forms with user-friendly messages.

## File Upload

- **Resumes**: PDF files uploaded by job seekers during application
- **Logos**: Image files uploaded by recruiters when posting jobs
- Files are stored in the `public/images/` directory

## Email Notifications

- Confirmation emails sent to applicants upon successful job application
- Uses Nodemailer with Gmail SMTP (configure in .env)

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- Role-based access control
- Input validation and sanitization
- Secure cookie settings

## Development Notes

### Current TODO Items

- Fix validation error display for registration and login forms
- Ensure errors render correctly in modals on the landing page
- Add JavaScript to automatically open registration modal on validation errors

### Known Limitations

- Uses in-memory storage (data resets on server restart)
- No database integration
- Basic email configuration (may need adjustments for production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on the GitHub repository.
