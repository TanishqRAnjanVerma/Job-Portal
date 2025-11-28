export const setLastVisit = (req, res, next) => {
  if (req.cookies.LastVisit) {
    res.locals.LastVisit = new Date(req.cookies.LastVisit).toLocaleString();
  }
  res.cookie("LastVisit", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  next();
};
