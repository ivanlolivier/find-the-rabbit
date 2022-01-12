/*
 * PROBLEM
 *
 * There are N holes and a rabbit that jumps between those holes.
 * The goal is to find the rabbit.
 *
 * You can look in 1 hole 1 time per turn.
 * The rabbit always jumps at the end of the turn.
 */

/****************
 * GLOBAL VARIABLS
 */
const maxIndex = Math.floor(Math.floor(Math.random() * 100));
let debug: boolean;
let rabbitIndex: number;
let gessingHistory: { guess: number, actual: number }[];

/****************
 * HELPER FUNCTIONS
 */
const log = (message: any): void => {
 if (debug) {
  console.log(message);
 }
};

/****************
 * ACTIONS
 */
const moveRabbit = (): void => {
 // random boolean to determinate where the gonna rabbit move
 const increase = Math.random() < 0.5;

 let newRabbitIndex = increase ? rabbitIndex + 1 : rabbitIndex - 1;

 // if reached the maximun => increase
 if (newRabbitIndex > maxIndex) newRabbitIndex = rabbitIndex - 1;

 // if reached the minimun => decrease
 if (newRabbitIndex < 0) newRabbitIndex = rabbitIndex + 1;

 rabbitIndex = newRabbitIndex;
};

// if I dont guess correctly the rabbit jump
const checkOnce = (index: number): boolean => {
 log({ guess: index, actual: rabbitIndex });
 gessingHistory.push({ guess: index, actual: rabbitIndex });

 const found = index === rabbitIndex;

 if (found) {
  log(`=== I found the rabbit in position ${index} 🐰 ===`);
 }

 if (!found) {
  moveRabbit();
 }

 return found;
};

/****************
 * SOLUTION: STRATEGY TO FIND THE RABBIT
 */
const solution = () => {
 gessingHistory = [];
 rabbitIndex = Math.floor(Math.floor((Math.random() * maxIndex) / 2));
 rabbitIndex = Math.floor(rabbitIndex / 2) * 2;

 let found = false;

 for (let index = 0; index <= maxIndex; index++) {
  found = checkOnce(index);

  if (found) break;
 }

 //Waiting 1 "tick" more
 if (maxIndex % 2 === 0) {
  checkOnce(0);
 }

 if (!found) {
  for (let index = 0; index <= maxIndex; index++) {
   found = checkOnce(index);

   if (found) break;
  }
 }
 if (!found) {
  log('=== Rabbit not found 😢 ===');
  console.log(history);
 }

 return found;
};

/********************************** 
 * RUNNING THE GAME
 */

const gamesQty = 100000;
debug = gamesQty === 1;

let win = 0;
let loss = 0;
for (let a = 0; a < gamesQty; a++) {
 const found = solution();
 if (found) {
  win = win + 1;
 } else {
  loss = loss + 1;
 }
}

if (gamesQty > 1) {
 console.log(new Date(), { win, loss });
}
