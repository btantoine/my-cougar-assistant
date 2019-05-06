var request = require('request-promise');

class Test {
    constructor(){
    //   this.site_url = "";
    //   this.username = "";
    //   this.password = "";
    }

    _request(method, url, callback){
        var options = {
            'method': method,
            'uri': url,
            // auth: {
            //     user: this.username,
            //     password: this.password
            // }
        }
        request(options)
        .then((answer) => {
          callback(answer)
        })
    }

    getOpenningTimeOfficeInfo(callback){
        // this._request('get', this.site_url, (answer) => {
        this._request('get', "http://localhost:8080/api/getOpenningTimeBuildingInfo/library", (answer) => {
            // const pkg = JSON.parse(answer);
            // answer = pkg;
            console.log(answer);
            callback(answer);
        })
    }
}

module.exports = {
    Test
}
