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

## License

Distributed under the [GNU Affero General Public License Version 3](https://www.gnu.org/licenses/agpl-3.0.en.html).

Copyright © 2021 Iacopo Carraro

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the [GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html) for more details.