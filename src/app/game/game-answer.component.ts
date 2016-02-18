import {Component, Input} from 'angular2/core';
import {Answer} from './services/answer.service'


@Component({
    selector: 'game-answer',
    template : `
        <li>
            Answer <strong>{{answer.n}}</strong> is
            <strong *ngIf="answer.isCorrect">correct 😃</strong>
            <strong *ngIf="!answer.isCorrect">wrong 😬</strong>

        </li>
    `
})
export class GameAnswerComponent {
    @Input() answer : Answer;
}
