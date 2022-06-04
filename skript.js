'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let service2;
let rollback = 45;
let fullPrice;
let servicePercentPrice;
let allServicePrices;

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
    title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');

    do {
        screenPrice = +prompt('Сколько будет стоить данная работа?', 12000);
    } while (!isNumber(screenPrice));
    console.log(!isNumber(screenPrice));

    adaptive = confirm('Нужен ли адаптив на сайте?');
};

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
    if (price >= 30000) {
        return 'Даем скидку в 10%';
    } else if (price >= 15000 && price < 30000) {
        return 'Даем скидку в 5%';
    } else if (price >= 0 && price < 15000) {
        return 'Скидка не предусмотрена';
    } else {
        return 'Что то пошло не так';
    }
};

const getAllServicePrices = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?', 'Метрика');
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?', 'Отправка форм');
        }

        sum += +prompt('Сколько это будет стоить?', 1000);
    }

    return sum;
};

function getFullPrice(scrPrice, serPrise) {
    return scrPrice + serPrise;
}

const getServicePercentPrices = function (price, roll) {
    return price - (price * (roll / 100));
};

const getTitle = function (title) {
    title = title.replace(/^ +| +$|( ) +/g, "$1");
    title = title.toLowerCase();
    title = title[0].toUpperCase() + title.slice(1);
    return title;

};



asking();

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
showTypeOf(allServicePrices);
showTypeOf(fullPrice);
showTypeOf(screens);
console.log(getRollbackMessage(fullPrice));
showTypeOf(Math.ceil(servicePercentPrice));