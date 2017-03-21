import {AppViewModel} from './app';

class RouterStub {
  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var sut;
  var mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new AppViewModel();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('should be true', () => {
    var yup = true;
    expect(yup).toEqual(true);
  });
});