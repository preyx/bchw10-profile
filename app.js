const fs = require('fs')
const prompt = require('inquirer').createPromptModule()

const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

const init = async _ => {
  let more = false
  const eInput = {}
  const ePrompt = {
    Manager: 'Office Number:',
    Engineer: 'GitHub Username:',
    Intern: 'School:'
  }
  const eList = []
  // const n = Date.now()
  do {
    try {
      const { ans } = await prompt(
        {
          type: 'list',
          name: 'eType',
          message: 'Employee type:',
          choices: ['Manager', 'Engineer', 'Intern']
        })
      eInput.type = ans.eType
    } catch (e) { console.error(e) }
    try {
      const { ans } = await prompt([
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
          type: 'number',
          name: 'email',
          message: 'Employee Email:'
        },
        {
          type: 'input',
          name: 'extra',
          message: ePrompt.eType
        }])
      eInput.name = ans.name
      eInput.id = ans.id
      eInput.email = ans.email
    } catch (e) { console.error(e) }
    if (eInput.type !== 'Employee') {
      try {
        const { ans } = await prompt(
          {
            type: 'input',
            name: 'extra',
            message: ePrompt.eType
          })
        eInput.extra = ans.extra
      } catch (e) { console.error(e) }
    }
    switch (eInput.type) {
      case 'Manager':
        eList.push(Manager(eInput.name, eInput.id, eInput.email, eInput.extra))
        break
      case 'Engineer':
        eList.push(Engineer(eInput.name, eInput.id, eInput.email, eInput.extra))
        break
      case 'Intern':
        eList.push(Intern(eInput.name, eInput.id, eInput.email, eInput.extra))
        break
    }
    console.log('Employee successfully added!')
    try {
      const { ans } = await prompt(
        {
          type: 'confirm',
          name: 'more',
          message: 'Any more employees?'
        })
      more = ans.more
    } catch (e) { console.error(e) }
  } while (more)
  eList.forEach(elem => {
    switch (elem.getRole()) {
      case 'Manager':
        break
      case 'Engineer':
        break
      case 'Intern':
        break
    }
  })
}

init()
