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

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    service1: '',
    service2: '',
    rollback: 45,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,

    asking: function () {
        appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');

        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?', 12000);
        }
        while (!appData.isNumber(appData.screenPrice));
        appData.screenPrice = +appData.screenPrice;

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return 'Даем скидку в 10%';
        } else if (price >= 15000 && price < 30000) {
            return 'Даем скидку в 5%';
        } else if (price >= 0 && price < 15000) {
            return 'Скидка не предусмотрена';
        } else {
            return 'Что то пошло не так';
        }
    },

    getAllServicePrices: function () {
        let sum1;
        let sum2;
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'Метрика');
                while (!appData.isNumber(sum1)) {
                    sum1 = prompt('Сколько это будет стоить?', 1000);
                }
                sum1 = Number(sum1);
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?', 'Отправка форм');
                while (!appData.isNumber(sum2)) {
                    sum2 = prompt('Сколько это будет стоить?', 1000);
                }
                sum2 = Number(sum2);
            }
        }

        return sum1 + sum2;
    },

    getFullPrice: function (scrPrice, serPrise) {
        return scrPrice + serPrise;
    },

    getServicePercentPrices: function (price, roll) {
        return price - (price * (roll / 100));
    },

    getTitle: function (title) {
        title = title.replace(/^ +| +$|( ) +/g, "$1");
        title = title.toLowerCase();
        title = title[0].toUpperCase() + title.slice(1);
        return title;

    },

    start: function () {
        appData.asking();

        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
        appData.title = appData.getTitle(appData.title);

        appData.logger();
    },

    logger: function () {
        for (let key in appData) {
            console.log(key + ' ' + appData[key]);
        }
    }
};

appData.start();