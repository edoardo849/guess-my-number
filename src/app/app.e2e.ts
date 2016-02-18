 /*
  * TODO: ES5 for now until I make a webpack plugin for protractor
  */
describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Guess my number, by @edoardo849';
    expect(subject).toEqual(result);
  });

  it('should have <header>', () => {
    let subject = element(by.css('app header')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have <main>', () => {
    let subject = element(by.css('app main')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have <footer>', () => {
    let subject = element(by.css('app footer')).getText();
    let result  = 'Guess My Number by @edoardo849';
    expect(subject).toEqual(result);
  });

});
