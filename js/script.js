'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resettBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    servicesPercent: [],
    servicesNumber: [],
    rollback: 0,
    fullPrice: 0,
    servicePricePercent: 0,
    servicePriceNumber: 0,
    count: 0,

    init: function () {
        appData.disabledStartBtn();
        appData.addTitle();
        startBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);
        inputRange.addEventListener('input', appData.addRolback);
    },

    addRolback: function (event) {
        inputRangeValue.textContent = event.target.value + '%';
        appData.rollback = +event.target.value;
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.logger();
        appData.showResult();
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePriceNumber + appData.servicePricePercent;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
        totalCount.value = appData.count;
    },
    addScreens: function () {
        let screens = document.querySelectorAll('.screen');

        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.count += +input.value;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value
            });
        });
    },
    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },
    asking: function () {
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

    },

    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for (let key in appData.servicesNumber) {
            appData.servicePriceNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricePercent += appData.screenPrice * (appData.servicesPercent / 100);
        }

        appData.fullPrice = appData.screenPrice + appData.servicePriceNumber + appData.servicePricePercent;

        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },

    logger: function () {
        console.log(appData);
    },
    disabledStartBtn: function () {
        const select = document.querySelector('.main-controls__select select');
        const input = document.querySelector('.main-controls__input input');
        startBtn.setAttribute('disabled', 'disabled');
        const onSelectChange = function () {
            input.addEventListener("input", onInputChange);

            if (input.value) {
                startBtn.removeAttribute("disabled");
            }
        };

        function onInputChange() {
            startBtn.setAttribute("disabled", "disabled");

            if (input.value) {
                startBtn.removeAttribute("disabled");
            }
        }
        select.addEventListener('change', onSelectChange);

    }
};

appData.init();