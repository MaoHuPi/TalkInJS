import {the, Something, Ordinal, State, Pronoun, Timeline, StateValuePair, thingsInit} from '../src/talkin.mjs';

/* Personal Pronoun */
// const I = new Pronoun(new Ordinal(1));

/* Indefinite Article */
// const I = new Pronoun(new Ordinal(1));
// let Dog = thingsInit(class Dog extends Something {});
// I.am(Dog);
// console.log("Am 'I' a 'Dog'?", I._am(Dog)); // true

/* Definite Article */
// const I = new Pronoun(new Ordinal(1));
// let Cat = thingsInit(class Cat extends Something {});
// let the_cat = the(Cat);
// console.log("Is 'the_cat' a 'Cat'?", the_cat._belongs(Cat)); // true
// I.am(the_cat);
// console.log("Am 'I' 'the_cat'?", I._am(the_cat)); // true
// console.log("Am 'I' a 'Cat'?", I._am(Cat)); // true
// console.log("Is 'the_cat' 'I'?", the_cat._belongs(I)); // true

/* Ordinal */
// const I = new Pronoun(new Ordinal(1));
// let first = new Ordinal(1);
// I.am(the(first)); // the(first) === first
// console.log("Am 'I' the 'first'?", I._am(first)); // true
// console.log("Is 'first' 'I'?", first._belongs(I)); // true
// let anotherFirst = new Ordinal(1);
// console.log("Is 'anotherFirst' 'I'?", anotherFirst._belongs(I)); // true
// console.log("Am 'I' 'Ordinal'?", I._am(Ordinal)); // true, but must be false

/* Feeling and State */
// const I = new Pronoun(new Ordinal(1));
// const hour = 1;
// function very(state){
//     return new StateValuePair(state, 1.2);
// }
// function quite(state){
//     return new StateValuePair(state, 0.1);
// }
// let world = new Timeline();
// let satiety = new State();
// let hungry = new State(function(deltaVelue){
//     this.set(satiety, this.get(satiety) - deltaVelue);
// });
// world.push(I);
// I.am(very(satiety));
// I.am(quite(hungry));
// console.log("Before '10 hour', 'satiety':", I.how(satiety)); // 1.2
// world.pass(10*hour, hour);
// console.log("After  '10 hour', 'satiety':", I.how(satiety)); // 1.20000000000000004
// console.log("Am 'I' 'hungry'?", I._am(hungry)); // true