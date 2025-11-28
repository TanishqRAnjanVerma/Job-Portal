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
var users = [
  new UserModel(101, "John Doe", "john@example.com", "password", "recruiter"),
  new UserModel(102, "Jane Smith", "jane@example.com", "password", "recruiter"),
  new UserModel(103, "Bob Johnson", "bob@example.com", "password", "recruiter"),
  new UserModel(
    104,
    "Alice Brown",
    "alice@example.com",
    "password",
    "recruiter"
  ),
  new UserModel(
    105,
    "Charlie Wilson",
    "charlie@example.com",
    "password",
    "recruiter"
  ),
  new UserModel(
    106,
    "Diana Davis",
    "diana@example.com",
    "password",
    "recruiter"
  ),
  new UserModel(107, "Eve Miller", "eve@example.com", "password", "recruiter"),
  new UserModel(
    108,
    "Frank Garcia",
    "frank@example.com",
    "password",
    "recruiter"
  ),
  new UserModel(109, "Grace Lee", "grace@example.com", "password", "recruiter"),
  new UserModel(
    110,
    "Henry Taylor",
    "henry@example.com",
    "password",
    "recruiter"
  ),
];
