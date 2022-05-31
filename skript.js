'use strict';

let title = prompt("Как называется ваш проект ?");
let screens = prompt('Какие типы экранов нужно разработать? Например: Простые, Сложные, Интерактивные');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен ?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен ?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let rollback = 45;
let fullPrice;
let servicePercentPrice;
let allServicePrices;

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

const getAllServicePrices = function (ser1, ser2) {
    return ser1 + ser2;
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

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);

console.log(showTypeOf(title));
console.log(showTypeOf(screenPrice));
console.log(showTypeOf(adaptive));
console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log(Math.ceil(getServicePercentPrices(fullPrice, rollback)));