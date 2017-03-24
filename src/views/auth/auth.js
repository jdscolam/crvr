import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class AuthViewModel {
    constructor(Router){
        this.router = Router;
    }

    activate(params, routeConfig, navigationInstruction){
        if(!params || !params.token)
            this.router.navigateToRoute('hello');

        var parsedResponse = params.token.split('=');
        
        if(!parsedResponse || parsedResponse.length < 2 || parsedResponse[0] === '#error_message')
            this.router.navigateToRoute('hello');

        if(parsedResponse[0] === '#access_token'){
            localStorage.pnutToken = parsedResponse[1];
            this.router.navigateToRoute('about');
        }
    }
}