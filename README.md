# Emoji Autocomplete

## Usage

```javascript
var emojiAutocomplete = require('emoji-autocomplete');

var element = document.querySelector(".emoji-autocomplete");
emojiAutocomplete(element);
```

## Development

Do your magic, modify the example to show your changes and then from terminal navigate to the main folder of this repo and run:

```shell
npm install
npm link
cd example/
npm install
npm link @bago2k4/emoji-autocomplete
npm run watch-build
```

Then in another shell, still in the repo folder, start the http development server:
```shell
cd example/
npm run http-server
```

Now you are ready to point your favorite browser to [localhost:8011](http://localhost:8011) and start testing/debugging.