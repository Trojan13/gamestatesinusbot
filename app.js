'use strict'
const sinusbot = require('./bin/sinusbot');
const d2gsi = require('dota2-gsi');

var list;
var server = new d2gsi({
  port: 8885,
  ip: "localhost",
  tokens:"hello1234"
});

server.events.on('newclient', function(client) {
  console.log("New client connection, IP address: " + client.ip);
  if (client.auth && client.auth.token) {
      console.log("Auth token: " + client.auth.token);
  } else {
      console.log("No Auth token");
  }
  client.on('player:activity', function(activity) {
      if (activity == 'playing') console.log("Game started!");
  });
  client.on('player:kill_streak', function(ks) {
    if (ks > 2) {
      let rnd = Math.round((Math.random() * ((list.length - 20) + 1)) + 20);
      sinusbot.playFile(list[rnd].uuid);
    }
});
});




(async () => {
  try {
    await sinusbot.login();
    list = await sinusbot.listFiles();
    let rnd = Math.round((Math.random() * ((list.length - 20) + 1)) + 20);
  } catch (err) {
    console.log(err);
  }
})();