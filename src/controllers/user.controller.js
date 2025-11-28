import path from "path";
import UserModel from "../models/user.models.js";

export default class UserController {
  // Render login form
  showLoginForm(req, res, next) {
    const selectedRole = req.query.role || "recruiter";
    res.render("user-login", { selectedRole });
  }

  // Registration method
  register(req, res, next) {
    const { name, email, password, role } = req.body;
    UserModel.addUser(name, email, password, role);
    res.redirect("/login");
  }

  // Login method
  login(req, res, next) {
    const { email, password, role } = req.body;
    const _user = UserModel.validateLogin(email, password);

    if (!_user) {
      return res.status(401).render("user-login", {
        error: "Invalid credentials",
        selectedRole: role,
      });
    }

    if (_user.role !== role && _user) {
      return res.render("user-login", {
        error: "Role mismatch. Please select the correct role.",
        selectedRole: role,
      });
    }

    req.session.user = {
      email: email,
      id: _user.id,
      name: _user.name,
      role: _user.role,
    };

    req.session.save((err) => {
      if (err) {
        console.log("Session save error:", err);
        return res.status(500).send("Login failed");
      }
      res.redirect("/jobs");
    });
  }

  // Logout method
  logout(req, res, next) {
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session:", err);
        return res.status(500).send("Could not log out.");
      }
      res.clearCookie("connect.sid");
      res.clearCookie("LastVisit");
      return res.redirect("/login");
    });
  }

  // List all users
  getAllUsers(req, res, next) {
    const users = UserModel.getAllUsers();
    res.render("list-all-users", { users: users, title: "User Listings" });
  }
}
