import { Aurelia, PLATFORM } from 'aurelia-framework';
import 'materialize-css';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();
  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}

//https://pnut.io/oauth/authenticate?client_id=winmnnXnPnH6xxm5XZ6DREh5l3mEFAXs&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F%23%2Fauth%2F&scope=basic%20stream%20write_post%20follow%20update_profile%20presence%20messages&response_type=token