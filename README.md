# my cougar assistant

## How to install and use jovo framework

 - make sure to have npm and nodejs installed

Install
npm install -g jovo-cli

Create new project
jovo new <directory>

Build the project
cd <directory>
jovo build

Deploy the project
jovo deploy

Run the project
jovo run

## How to link the project to Amazon Alexa

- Create a Alexa Skill Kit account : https://developer.amazon.com/alexa-skills-kit
- Go to skill
- And create a new skill
- Copy the skill ID
-Paste the skill id in the file qpp.json

```
{
	"alexaSkill": {
		"nlu": {
			"name": "alexa"
		},
	    "skillId": "Votre skillId",
	    "askProfile": "default"
	}
}
```

On the Alexa plateform you can press the test button to test your project