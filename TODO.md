# TODO List for Job Portal Features

## 1. Job Search Functionality

- [ ] Modify `getAllJobs` in `job.controller.js` to accept `q` query parameter and filter jobs by designation, company name, location, and skills
- [ ] Update search form in `layout.ejs` to submit GET request to `/jobs` with search query

## 2. Display Last Visit Date/Time

- [ ] Modify `layout.ejs` to display last visit date/time from `res.locals.LastVisit` in navbar for logged-in users

## 3. Confirmation Dialogs

- [ ] Add JavaScript confirmation dialog in `list-all-jobs.ejs` for delete operations
- [ ] Add confirmation in `update-job.ejs` before submitting update form

## 4. Pagination

- [ ] Update `getAllJobs` in `job.controller.js` to support `page` and `limit` query parameters with pagination logic
- [ ] Update `getApplicants` in `job.controller.js` for pagination
- [ ] Modify `list-all-jobs.ejs` to generate dynamic pagination links
- [ ] Modify `all-applicants.ejs` to generate dynamic pagination links
