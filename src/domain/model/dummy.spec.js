import {Dummy} from './dummy';

describe('the Dummy model', () => {
  var sut;

  beforeEach(() => {
    sut = new Dummy();
  });

  it('should be true', () => {
    expect(sut).toBeTruthy();
  });
});