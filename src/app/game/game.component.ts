import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {
FORM_DIRECTIVES,
FormBuilder,
ControlGroup,
Validators,
AbstractControl
} from 'angular2/common';

import {Title} from './services/title';
import {GameAnswerComponent} from './game-answer.component'
import {Answer} from './services/answer.service'

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'game',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    ...FORM_DIRECTIVES,
    GameAnswerComponent
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./game.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
  <div>
    <h3>Enter a number between {{ range.join(" and ") }}</h3>
    <br/>

    <form
        *ngIf="formActive"
        [ngFormModel]="gameForm"
        (ngSubmit)="gameForm.valid && onSubmit(gameForm.value)"
        class="ui form">

      <div class="field">
        <label for="answerInput">Your Answer:</label>
        <input type="number"
                min="{{range[0]}}"
                max="{{range[1]}}"
               id="answerInput"
               placeholder="number"
               [ngFormControl]="gameForm.controls['answer']">
               <span>({{attemptsLeft}} attempts left)</span>
       <div *ngIf="!answer.valid && answer.touched"
          class="ui error message">Must be a number between {{ range.join(" and ") }} </div>
      </div>
      <button type="submit" class="ui button">Submit </button>
    </form>

    <h3>Your Answers</h3>
    <ol>
        <game-answer
            *ngFor="#answer of answers;"
            [answer]="answer">
        </game-answer>
    </ol>
    <pre>correct answer: {{ challenge }}</pre>
  </div>

  `
})
export class GameComponent {
  // Set our default values
  gameForm: ControlGroup;
  formActive: boolean = true;

  // set the number of attempts
  MAX_ATTEMPTS: number = 3;

  answers: Array<Answer> = [];
  answer: AbstractControl;

  attemptsLeft: number;
  range: Array<number> = [1, 42];
  challenge: number;

  hasAnswered: boolean;

  // TypeScript public modifiers
  constructor(
    public title: Title,
    private _fb: FormBuilder,
    private _http: Http
    ) {
    this.gameForm = _fb.group({
      'answer': ['', Validators.required]
    });

    this.answer = this.gameForm.controls['answer'];

    this._beginOrResetGame();
    this._beginOrResetAnswer();

  }

  onSubmit(val: any): void {

    // Converts our value as an integer
    let num = parseInt(val.answer), isCorrect = false;
    if (isNaN(num)) {
      return;
    }

    // If the number entered is equal to the challenge,
    // the user has won the game, notify with an alert
    if (num === this.challenge) {
      isCorrect = true;
      alert("You have won the game!");

      this._beginOrResetAnswer();
      this._beginOrResetGame();

    }
    //If the number entered is not equal to the challenge
    //we will decrease the count of left attempts
    else {

      this.attemptsLeft--;
    }

    let answer: Answer = {
      isCorrect: isCorrect,
      n: num
    };
    // Push immeditaly to notify the user withouth breaking the UX
    this.answers.push(answer);
    this._syncWithRemote(answer);

    // If the user has no attempts left,
    // notify with an alert and reset the game
    if (this.attemptsLeft === 0) {
      alert("You have lost the game!");
      this._beginOrResetGame();
    }

    // Reset the form
    this.formActive = false;
    setTimeout(() => this.formActive = true, 0);

    return;
  }

  _beginOrResetAnswer() {
    this.hasAnswered = false;
    this.challenge = this._generateRandomNumber();
  }

  _beginOrResetGame() {
    this.attemptsLeft = this.MAX_ATTEMPTS;
  }

  _generateRandomNumber(): number {
    let min = this.range[0], max = this.range[1];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _syncWithRemote(answer : Answer): void {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let payload = JSON.stringify(answer);
    this._http.post('http://localhost:3001/api/answer',payload,{
        headers: headers
    })
      .map(res => res.text())
      .subscribe(
      data => console.log(data),
      err => console.error(err),
      () => console.log('Sync complete')
      );
  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}
