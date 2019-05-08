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

const Api = require('./data-connector');
const dataConnector = new Api.Test();

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
        return this.toIntent('OpeningIntent');
    },

    HelloWorldIntent() {
        this.ask('Hello ! What\'s your name?', 'Please tell me your name.'); // with "," the system choose between the first or the second sentence (random)
    },

    MyNameIsIntent() {
        // We have to save the name in db (this.$inputs.name.value)
        this.$speech.addText('Hey ' + this.$inputs.name.value + ', nice to meet you!')
            .addBreak('300ms')
            .addText('How are you today ?');

        this.ask(this.$speech);

    },

    GetDateIntent(){
        var currentDate = new Date();

        var date = currentDate.getDate();
        var month = currentDate.getMonth(); //Careful Jan starts at 0 and not 1.
        var year  = currentDate.getFullYear();

        var dateString = (month + 1) + "-" + date + "-" + year;

        this.tell(dateString);
    },

    GetWeatherIntent(){
        const appKey = "a4481b8d25aaf3570eac6cd29b8fd5e7";
        var cityName = "San Marcos";
        var temperature = 0;

        //var searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid="+appKey;
        let jsonObject = JSON.parse("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid="+appKey);
        //let jsonObject = JSON.parse(searchLink);
        temperature = parseInt(jsonObject.main.temp - 273);

        this.tell(temperature);

    },

    OpenningTimeOfficeIntent() {
        dataConnector.getOpenningTimeOfficeInfo(this.$inputs.office.value, (hours) => {
            // this.ask('The ' + this.$inputs.office.value + ' will be open at 8am untill 8pm');
            this.tell('The ' + this.$inputs.office.value + ' will be open at ' + JSON.stringify(hours));
        })

    },

    LocationsOfficeIntent() {
        dataConnector.getLocationOfficeInfo(this.$inputs.buildingOrRoom.value, (LocationBuilding) => {
            console.log(LocationBuilding);
            if (this.$inputs.buildingOrRoom.value.toUpperCase() == "USU".toUpperCase())
                this.tell('The ' + this.$inputs.buildingOrRoom.value + ' ' + JSON.stringify(LocationBuilding));
            // this.ask('The ' + this.$inputs.buildingOrRoom.value + ' is the building next to the library');
            else
                this.tell('The ' + this.$inputs.buildingOrRoom.value + ' ' + JSON.stringify(LocationBuilding));
            // this.ask('The ' + this.$inputs.buildingOrRoom.value + ' is in the fourth floor of the library');
        })
    },

    NextEventsIntent() {
        dataConnector.getNextEventInfo((DesciptionEvent) => {
            // use nameVariableReturn;
                this.tell('The next event is ' + DesciptionEvent);
        })
    },

    WhatDayIntent(){
        var todaysDate = new Date();
        switch(todaysDate.getDay())
        {
            case 0:
                this.tell("Today's date is Sunday");
                break;
            case 1:
                this.tell("Today's date is Monday");
                break;
            case 2:
                this.tell("Today's date is Tuesday");
                break;
            case 3:
                this.tell("Today's date is Wednesday");
                break;
            case 4:
                this.tell("Today's date is Thursday");
                break;
            case 5:
                this.tell("Today's date is Friday");
                break;
            case 6:
                this.tell("Today's date is Saturday");
                break;
        }
    },

    WhatClassIntent(){
        dataConnector.getClassInfo(this.$inputs.day.value, (Classes) => {
            console.log(Classes);
            this.tell("Here is the list of classes that you have on " + this.$inputs.day.value + " they are " + 
            JSON.stringify(Classes));
        })
        
        // this.tell(this.$inputs.day.value);
    },

    TodaysClassIntent(){
        var todaysDate = new Date();
        switch(todaysDate.getDay())
        {
            case 1:
                dataConnector.getClassInfo("Monday", (Classes) => {
                    console.log(Classes);
                    this.tell("Here are the list of classes that you have today, they are " + 
                    JSON.stringify(Classes));
                })
                break;
            case 2:
                dataConnector.getClassInfo("Tuesday", (Classes) => {
                    console.log(Classes);
                    this.tell("Here are the list of classes that you have today, they are " + 
                    JSON.stringify(Classes));
                })
                break;
            case 3:
                dataConnector.getClassInfo("Wednesday", (Classes) => {
                    console.log(Classes);
                    this.tell("Here are the list of classes that you have today, they are " + 
                    JSON.stringify(Classes));
                })
                break;
            case 4:
                dataConnector.getClassInfo("Thursday", (Classes) => {
                    console.log(Classes);
                    this.tell("Here are the list of classes that you have today, they are " + 
                    JSON.stringify(Classes));
                })
                break;
            case 5:
                dataConnector.getClassInfo("Friday", (Classes) => {
                    console.log(Classes);
                    this.tell("Here are the list of classes that you have today, they are " + 
                    JSON.stringify(Classes));
                })
                break;
            default:
                this.tell("You do not have any classes on the weekend");
        }
    },

    TomorrowsClassIntent(){
        var todaysDate = new Date();
        switch(todaysDate.getDay() + 1)
        {
            case 1:
                dataConnector.getClassInfo("Monday", (Classes) => {
                    console.log(Classes);
                    this.tell("Here are the list of classes that you have tomorrow, they are " + 
                    JSON.stringify(Classes));
                })
                break;
            case 2:
                dataConnector.getClassInfo("Tuesday", (Classes) => {
                    console.log(Classes);
                    this.tell("Here are the list of classes that you have tomorrow, they are " + 
                    JSON.stringify(Classes));
                })
                break;
            case 3:
                dataConnector.getClassInfo("Wednesday", (Classes) => {
                    console.log(Classes);
                    this.tell("Here are the list of classes that you have tomorrow, they are " + 
                    JSON.stringify(Classes));
                })
                break;
            case 4:
                dataConnector.getClassInfo("Thursday", (Classes) => {
                    console.log(Classes);
                    this.tell("Here are the list of classes that you have tomorrow, they are " + 
                    JSON.stringify(Classes));
                })
                break;
            case 5:
                dataConnector.getClassInfo("Friday", (Classes) => {
                    console.log(Classes);
                    this.tell("Here are the list of classes that you have tomorrow, they are " + 
                    JSON.stringify(Classes));
                })
                break;
            default:
                this.tell("You do not have any classes on the weekend");
        }
    },

    HowAreYouIntent() {
        this.$speech.addText('Hey yes, I have a good time today, I am learning a lot of thing about CSUSM')
            .addBreak('300ms')
            .addText('And you, how are you ?');

        this.ask(this.$speech);
    },
    
    HowAreYouResponseIntent() {
        this.$speech.addText('Oh it\'s great, I am happy for you.')
            .addBreak('300ms')
            .addText('And, what do you want to know ?');

        this.ask(this.$speech);
    },

    OpeningIntent()
    {
        this.$speech.addText('Hi! How may I help you today?');
        this.ask(this.$speech);
    },
    
    ThankYouIntent() {
        this.tell('I am glad to help you, have a good day'); // tell -> end of the discussion
    },
});

module.exports.app = app;
