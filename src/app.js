import { inject, PLATFORM } from 'aurelia-framework';
import { Router, Redirect } from 'aurelia-router';

@inject(Router)
export class AppViewModel {
  configureRouter(config, router) {
    this.router = router;

    var step = new AuthorizeStep();
    config.addAuthorizeStep(step);

    config.map([
      { route: '', name: 'hello', moduleId: PLATFORM.moduleName('./views/hello/page-hello', 'hello') },
      { route: 'about', name: 'about', moduleId: PLATFORM.moduleName('./views/about/page-about', 'about'), settings: { auth: true } },
      { route: 'auth/*token', name: 'auth', moduleId: PLATFORM.moduleName('./views/auth/auth', 'auth') }
    ]);
  }
}

class AuthorizeStep {
  constructor(){
    this.clientId = encodeURIComponent('winmnnXnPnH6xxm5XZ6DREh5l3mEFAXs');
    this.redirectUri = encodeURIComponent('http://localhost:8080/#/auth/');
    this.scope = encodeURIComponent('basic stream write_post follow update_profile presence messages');
    this.responseType = encodeURIComponent('token');
  }

  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      var currentToken = localStorage.pnutToken;
      if (!currentToken) {
        var loginUrl = 'https://pnut.io/oauth/authenticate?'
        + 'client_id=' + this.clientId
        + '&redirect_uri=' + this.redirectUri
        + '&scope=' + this.scope
        + '&response_type=' + this.responseType;

        return next.cancel(new Redirect(loginUrl));
      }
    }

    return next();
  }
}