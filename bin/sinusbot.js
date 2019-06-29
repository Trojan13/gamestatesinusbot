const fetch = require('node-fetch');
const config = require('config');
const Bottleneck = require('bottleneck');
var limiter = new Bottleneck({
    minTime: 333
});
const { URLSearchParams } = require('url');


var bot_ip = config.get("conf.ip");
var bot_uname = config.get("conf.uname");
var bot_pw = config.get("conf.pw");
var bot_id = config.get("conf.id");
var bot_uid = config.get("conf.uid");

var token = false;

let apiRequest = async (f, m, b) => {
    let err, data;
    try {
        let body = await fetch(bot_ip + '/api/v1/bot/' + f, {
            method: m,
            body: JSON.stringify(b),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            },
        }).catch(err => this.err = err);
        if (body.status != 200) {
            err = '\x1b[31m API-Error: ' + body.statusText + ' Code: ' + body.status + '\x1b[0m';
        }
        data = await body.json().catch(err => this.err = err);

    } catch (e) {
        err = e;
    }
    return new Promise((resolve, reject) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    })
}

let login = async () => {
    if (!token) {
        let t = await limiter.schedule(apiRequest, 'login', 'POST', { username: bot_uname, password: bot_pw, botId: bot_id }).catch(err => {
            return err;
        });
        if (t.success == true) {
            console.log(t);
            token = t.token;
            return t;
        }
    } else {
        return {
            token: token,
            botId: bot_id,
            success: true
        }
    }
}

let listFiles = () => {
    return limiter.schedule(apiRequest, 'files', 'GET');
}
            
let playFile = (id) => {
    return limiter.schedule(apiRequest, 'i/'+bot_uid+'/play/byId/'+id, 'POST');
}

let stopPlayback = () => {
    return limiter.schedule(apiRequest, 'i/'+bot_uid+'/stop', 'POST');
}

let getInstances = () => {
    return limiter.schedule(apiRequest, 'instances', 'GET');
}
    
module.exports.login = login;
module.exports.listFiles = listFiles;
module.exports.stopPlayback = stopPlayback;
module.exports.getInstances = getInstances;
module.exports.playFile = playFile;