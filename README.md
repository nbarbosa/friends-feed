# friends-feed

A project with AngularJS + Node.js + MongoDB + Karma that mimics a friendship-based news feed (i.e. friends can see their friends' posts and their own).

## Install dependencies

### Client side

Run `npm install` followed by `bower install`.

### Server side

Run `npm install`.

## Build & development

### Client side

Make sure to properly set the constants that will point to the server side app in `app.js`:

* AppConfig.api_url
* AppConfig.image_server_url

Run `grunt` for building and `grunt serve` for preview.

### Server side

Make sure to properly set the MongoDB connection URI `MONGO_URI` as an environment variable. The dotenv plug-in allowes settings this through the `.env` file.

Make sure to run the seed script `seed.js` by running `node seed.js`. This will create 3 users with the following relationships:

* John is friends with Jessica and Peter
* Jessica is friends with John
* Peter is friends with John
* Note that Jessica is not friends with Peter

Run `npm start`

If environment variable `PORT` is not set, it will run at port 3000.

## Distribute (client side only)

### Client side

Run `grunt build` and grab a distribution-ready version from the `dist` folder.

## Testing (client side only)

Running `grunt test` will run the unit tests with karma.

## License
Copyright 2015 Natã Barbosa.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.