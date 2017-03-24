import { inject, PLATFORM } from 'aurelia-framework';
import { Router, Redirect } from 'aurelia-router';
import { CrvrConfig } from './crvrConfig';

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

  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      var currentToken = localStorage.pnutToken;
      if (!currentToken) {
        var loginUrl = 'https://pnut.io/oauth/authenticate?'
        + 'client_id=' + CrvrConfig.clientId
        + '&redirect_uri=' + CrvrConfig.redirectUri
        + '&scope=' + CrvrConfig.scope
        + '&response_type=' + CrvrConfig.responseType;

        return next.cancel(new Redirect(loginUrl));
      }
    }

    return next();
  }
}