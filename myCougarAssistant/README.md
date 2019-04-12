# my cougar assistant

## How to install and use jovo framework

 - make sure to have npm and nodejs installed

install nodejs and npm
- sudo apt get install nodejs	npm

install n to update nodejs
- sudo npm install -g n

update nodejs
- sudo n 10.12.0 // update nodejs

update npm
- sudo npm install -g npm@latest

Install jovo framework
- npm install -g jovo-cli

Create new project
- jovo new <directory>

Or git clone the repository
- git clone https://gitlab.com/Boudet/my-cougar-assistant.git
- cd my-cougar-assistant/
- cd myCougarAssistant/
- npm install (to install all the dependencies)

## How to link the project to Amazon Alexa

- Create a Alexa Skill Kit account : https://developer.amazon.com/alexa-skills-kit
- Go to skill
- Create an account
- And create a new skill
- Copy the skill ID
- Paste the skill id in the file project.json

```
{
    alexaSkill: {
        nlu: {
            name: 'alexa',
        },
        skillId: '<your-skill-id>',
        askProfile: '<your-ask-cli-profile>' -> default
    },
}
```
https://www.jovo.tech/docs/project-js

Install ask-cli
- sudo npm install ask-cli
- doc here : https://developer.amazon.com/fr/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html

Init ask
- ask init (user -> default, and choose no credential, and no something (I don't remember))

Build the project
- cd <directory>
- jovo build

Deploy the project
- jovo deploy --platform alexaSkill

Run the project
- jovo run
- go to the alexa skill plateform
- go to test
- choose "developer" and not "off"
- enter "my cougar assistant" is the name of our application
- and well done you can communicate with the chatbot