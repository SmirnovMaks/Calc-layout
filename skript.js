'use strict';

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    services: [],
    rollback: 10,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,

    asking: function () {
        do {
            appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        } while (!isNaN(appData.title));
        for (let i = 0; i < 2; i++) {
            let name;
            let price = 0;

            do {
                name = prompt('Какие типы экранов нужно разработать ?');
            }
            while (!isNaN(name));

            do {
                price = prompt('Сколько будет стоить данная работа?');
            }
            while (!appData.isNumber(price));
            appData.screens.push({
                id: i,
                name: name,
                price: price
            });

        }

        for (let i = 0; i < 2; i++) {
            let name;
            let price = 0;
            do {
                name = prompt('Какой дополнительный тип услуги нужен?');
            }
            while (!isNaN(name));

            do {
                price = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(price));

            appData.services[name] = +price;
        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
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

    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },

    getServicePercentPrices: function () {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },

    getTitle: function () {
        appData.title = appData.title.replace(/^ +| +$|( ) +/g, "$1");
        appData.title = appData.title.toLowerCase();
        appData.title = appData.title[0].toUpperCase() + appData.title.slice(1);
        appData.title = appData.title;

    },

    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.logger();
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.services);
    }
};

appData.start();