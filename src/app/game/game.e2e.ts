 /*
  * TODO: ES5 for now until I make a webpack plugin for protractor
  */
describe('AppComponent', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/game');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Guess my number, by @edoardo849';
    expect(subject).toEqual(result);
  });



});
