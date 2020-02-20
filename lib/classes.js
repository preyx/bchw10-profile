const Employee (name, id, title) => {
  name,
  id,
  title,
  getName () => { return this.name },
  getId () => { return this.id },
  getEmail () => { return '' },
  getRole () => { return 'Employee' }
}

const Manager (name, id, title, officeNumber) => {
  ...Employee(name, id, title),
  officeNumber,
  getRole () => { return 'Manager' }
}

const Engineer (name, id, title, github) => {
  ...Employee(),
  github,
  getGithub () => { return this.github },
  getRole () => { return 'Engineer' }
}

const Intern (name, id, title, school) => {
  ...Employee(),
  school,
  getSchool () => { return this.school },
  getRole () => { return 'Intern' }
}
