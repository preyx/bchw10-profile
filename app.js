const fs = require('fs')
const { JSDOM } = require('jsdom')
const prompt = require('inquirer').createPromptModule()

const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

const init = async _ => {
  let eInput = {}
  let output = ''
  let ans = ''
  let eList = []
  const ePrompt = {
    Manager: 'Office Number:',
    Engineer: 'GitHub Username:',
    Intern: 'School:'
  }
  // const n = Date.now()
  do {
    ans = await prompt(
      {
        type: 'list',
        name: 'type',
        message: 'Employee type:',
        choices: ['Manager', 'Engineer', 'Intern']
      })
    eInput.type = ans.type
    ans = await prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Employee name:'
      },
      {
        type: 'number',
        name: 'id',
        message: 'Employee ID:'
      },
      {
        type: 'input',
        name: 'email',
        message: 'Employee Email:'
      },
      {
        type: 'input',
        name: 'extra',
        message: ePrompt[eInput.type]
      }])
    eInput.name = ans.name
    eInput.id = ans.id
    eInput.email = ans.email
    eInput.extra = ans.extra
    switch (eInput.type) {
      case 'Manager':
        eList.push(new Manager(eInput.name, eInput.id, eInput.email, eInput.extra))
        break
      case 'Engineer':
        eList.push(new Engineer(eInput.name, eInput.id, eInput.email, eInput.extra))
        break
      case 'Intern':
        eList.push(new Intern(eInput.name, eInput.id, eInput.email, eInput.extra))
        break
    }
    console.log('Employee successfully added!')
    ans = await prompt(
      {
        type: 'confirm',
        name: 'more',
        message: 'Any more employees?'
      })
  } while (ans.more)
  await eList.forEach(elem => {
    fs.readFile(`./templates/${elem.getRole()}.html`, 'utf8', (e, data) => {
      if (e) { console.log(e) }
      const { document } = (new JSDOM(data)).window
      document.getElementById('eName').textContent = elem.getName()
      document.getElementById('eId').textContent = elem.getId()
      document.getElementById('eEmail').innerHTML = `<a href="mailto:${elem.getEmail()}">${elem.getEmail()}</a>`
      switch (elem.getRole()) {
        case 'Manager':
          document.getElementById('eExtra').textContent = elem.getOfficeNumber()
          break
        case 'Engineer':
          document.getElementById('eExtra').innerHTML = `<a href="https://github.com/${elem.getGithub()}">${elem.getGithub()}</a>`
          break
        case 'Student':
          document.getElementById('eExtra').textContent = elem.getSchool()
          break
      }
      output += document.documentElement.outerHTML
    })
  })
  fs.readFile('./templates/main.html', 'utf8', async (e, data) => {
    if (e) { console.log(e) }
    const { document } = (new JSDOM(data)).window
    document.getElementById('eMain').innerHTML = output
    fs.writeFile('./output/team.html', document.documentElement.outerHTML, e => {
      if (e) { console.log(e) }
    })
  })
}

init()
