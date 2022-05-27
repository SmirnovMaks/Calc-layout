'use strict';

let title = 'js course';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 736;
let rollback = 45;
let fullPrice = 12000;
let adaptive = false;

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log(screenPrice + '₽');
console.log(fullPrice + '₽');
console.log(screens.toLowerCase().split(', '));
console.log(fullPrice * (rollback / 100));