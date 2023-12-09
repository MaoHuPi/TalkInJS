/* 
 * 2023 (c) MaoHuPi
 * SHM.mjs
 */

import * as ti from '../talkin.mjs';

let m = new ti.State();
let k = new ti.State();
let x = new ti.State();
let v = new ti.State(function(delta){this.set(x, this.get(x) + delta);});
let a = new ti.State(function(delta){this.set(v, this.get(v) + delta);});
let F = new ti.State(function(delta){this.set(a, -this.get(k)*this.get(x)/this.get(m));});

let system = new ti.Something();
system.ownState(m, 5);
system.ownState(k, 1000);
system.ownState(x, 10);
system.ownState(v, 0);
system.ownState(a, -system.how(k)*system.how(x)/system.how(m));
system.ownState(F, 1);

let world = new ti.Timeline();
world.push(system);
console.log(system.how(x));
let s = 1;
let deltaTime = 0.01*s;
let viewWidth = 20;
setInterval(() => {
	world.pass(deltaTime, 0.001*s);
	let row = new Array(45).fill('　');
	row[Math.min(row.length-1, Math.max(0, Math.floor((system.how(x)+viewWidth/2)/viewWidth*row.length)))] = '點';
	console.log(row.join(''));
}, deltaTime*1e3);