# gamestatesinusbot

gamestatesinusbot is a node.js script which lets you control your sinusbot instance with the gamestate API of valves games. So you can play music on killsstreaks etc.

## Supported

Currently only Dota2 is supported. I will later add CS:GO to play a sound at round end.
For the dota gamestate engine see: https://github.com/xzion/dota2-gsi
For CS:GO I will be using: https://github.com/schroffl/cs-gamestate


## Installation


```
npm install
```

Change the 'default.sample.json' to 'default.json' and enter your credentials.

## Usage

```
node app.js
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
