//https://data.opendatasoft.com/api/records/1.0/search/?dataset=mkt-titres-pointsvente-agences-td%40keolis-rennes&sort=nom&facet=nomcommune&facet=accepteespeces&facet=acceptecb&facet=estgestiontr&facet=estcreationkorrigo&facet=estventeabonnementsvls&facet=estventeabonnementstco&facet=estinformationvls&facet=codeinseecommune&facet=acceptecheques&facet=estinformationtco&facet=estsavkorrigo&facet=estventeticketstco
var request = require('request-promise');

class Test {
    constructor(){
    //   this.site_url = "";
    //   this.username = "";
    //   this.password = "";
    }

    _request(method, url, callback, errorCallback){
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
        .catch((err) => {
          errorCallback(err)
        })
    }

    getOpenningTimeOfficeInfo(callback, errorCallback){
        // this._request('get', this.site_url, (answer) => {
        this._request('get', "http://localhost:8080/api/getOpenningTimeOfficeInfo", (answer) => {
            const pkg = JSON.parse(answer);
            answer = pkg;
            callback(answer)
        }, (err) => {
          errorCallback(err)
        })
    }
}

module.exports = {
    Test
}
