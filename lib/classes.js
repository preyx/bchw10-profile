const Employee = (name, id, email) => {
  name,
  id,
  email,
  getName () => { return this.name },
  getId () => { return this.id },
  getEmail () => { return this.email },
  getRole () => { return 'Employee' }
}

const Manager = (name, id, email, officeNumber) => {
  ...Employee(name, id, email),
  officeNumber,
  getRole () => { return 'Manager' }
}

const Engineer = (name, id, email, github) => {
  ...Employee(name, id, email),
  github,
  getGithub () => { return this.github },
  getRole () => { return 'Engineer' }
}

const Intern = (name, id, email, school) => {
  ...Employee(name, id, email),
  school,
  getSchool () => { return this.school },
  getRole () => { return 'Intern' }
}

module.exports = {
  Employee:Employee,
  Manager:Manager,
  Engineer:Engineer,
  Intern:Intern
}
