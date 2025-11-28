export default class UserModel {
  constructor(id, name, email, password, role = "job_seeker") {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  // Add user to the in-memory array
  static addUser(name, email, password, role = "job_seeker") {
    const newUser = new UserModel(
      users.length + 1,
      name,
      email,
      password,
      role
    );
    users.push(newUser);
  }

  // Find user by email
  static findUserByEmail(email) {
    return users.find((user) => user.email === email);
  }

  // Get all users
  static getAllUsers() {
    return users;
  }

  // Validate user login
  static validateLogin(email, password) {
    const result = users.find(
      (user) => user.email == email && user.password == password
    );
    return result;
  }
}

// In-memory array to store users
var users = [];
