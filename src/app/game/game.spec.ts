import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';


// Load the implementations that should be tested
import {GameComponent} from './game.component';
import {Title} from './services/title';

describe('GameComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    Title,
    GameComponent
  ]);

  it('should have default range', inject([ GameComponent ], (home) => {
    expect(home.range[0]).toEqual(1);
    expect(home.range[1]).toEqual(42);
  }));

  it('should have default attempts', inject([ GameComponent ], (home) => {
    expect(home.MAX_ATTEMPTS).toEqual(3);
  }));

  it('should have empty answers', inject([ GameComponent ], (home) => {
    expect(home.answers).toEqual([]);
  }));

  it('should have the for activated by default', inject([ GameComponent ], (home) => {
    expect(home.formActive).toEqual(true);
  }));

  it('should have a title', inject([ GameComponent ], (home) => {
    expect(!!home.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ GameComponent ], (home) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
