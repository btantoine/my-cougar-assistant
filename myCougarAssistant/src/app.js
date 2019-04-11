'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        return this.toIntent('HelloWorldIntent');
    },

    HelloWorldIntent() {
        this.ask('Hello World! What\'s your name?', 'Please tell me your name.'); // with "," the system choose between the first or the second sentence (random)
    },

    MyNameIsIntent() {
        // We have to save the name in db (this.$inputs.name.value)
        this.$speech.addText('Hey ' + this.$inputs.name.value + ', nice to meet you!')
            .addBreak('300ms')
            .addText('What do you want to know ?');

        this.ask(this.$speech);

    },

    OpenningTimeOffice() {
        this.tell('The ' + this.$inputs.office.value + ' will be open at 8am untill 8pm'); // tell -> end of the discussion
    },
});

module.exports.app = app;
