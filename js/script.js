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

const checkbox = document.querySelectorAll('.custom-checkbox');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    servicesPercent: [],
    servicesNumber: [],
    rollback: 0,
    fullPrice: 0,
    servicePricePercent: 0,
    servicePriceNumber: 0,
    servicePercentPrice: 0,
    count: 0,

    init: function () {
        this.addTitle();
        startBtn.addEventListener('click', this.start);
        buttonPlus.addEventListener('click', this.addScreenBlock);
        buttonPlus.addEventListener('click', this.disabledStartBtn);
        inputRange.addEventListener('input', this.addRolback);
        this.disabledStartBtn();
        resettBtn.addEventListener('click', appData.reset);
    },

    reset: function () {
        appData.inputsReset();
        appData.servicesReset();
        appData.resultReset();
        appData.showResult();
        appData.disabledStartBtn();
    },

    inputsReset: function () {
        screens = document.querySelectorAll('.screen');
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.removeAttribute('disabled');
            input.removeAttribute('disabled');
            input.value = '';
            select.value = '';

            if (index > 0) {
                screen.remove();
            }
        });

        startBtn.style.display = 'block';
        resettBtn.style.display = 'none';


    },
    servicesReset: function () {

        checkbox.forEach((check) => {
            if (check.checked) {
                check.checked = false;
            }
            check.removeAttribute('disabled');
        });
        inputRange.removeAttribute('disabled');
        inputRange.value = 0;
        inputRangeValue.textContent = '0%';


    },

    resultReset: function () {
        // total.value = '0';
        // totalCountOther.value = '0';
        // fullTotalCount.value = '0';
        // totalCountRollback.value = '0';
        // totalCount.value = '0';

        appData.screens = [];
        appData.screenPrice = 0;
        appData.servicesPercent = [];
        appData.servicesNumber = [];
        appData.rollback = 0;
        appData.fullPrice = 0;
        appData.servicePricePercent = 0;
        appData.servicePriceNumber = 0;
        appData.servicePercentPrice = 0;
        appData.count = 0;
    },

    addRolback: function (event) {
        inputRangeValue.textContent = event.target.value + '%';
        appData.rollback = +event.target.value;
        console.log(event.target.value);
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.logger();
        appData.showResult();
        appData.blockInput();
    },

    blockInput: function () {
        startBtn.style.display = 'none';
        resettBtn.style.display = 'block';
        screens = document.querySelectorAll('.screen');
        screens.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.setAttribute('disabled', 'disabled');
            input.setAttribute('disabled', 'disabled');
        });
        inputRange.setAttribute('disabled', 'disabled');
        buttonPlus.setAttribute('disabled', 'disabled');
        checkbox.forEach((check) => {
            check.setAttribute('disabled', 'disabled');
        });
    },

    addTitle: function () {
        document.title = title.textContent;
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePriceNumber + this.servicePricePercent;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
        totalCount.value = this.count;
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen');
        screens.forEach((screen, index) => {
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

    disabledStartBtn: function () {
        screens = document.querySelectorAll('.screen');
        let x = true;
        const disabledBtn = () => {
            if (x === true) {
                startBtn.setAttribute('disabled', 'disabled');
                startBtn.style.backgroundColor = 'gray';
            } else if (x === false) {
                startBtn.removeAttribute('disabled');
                startBtn.style.backgroundColor = '';
            }
        };

        const check = () => {
            screens = document.querySelectorAll('.screen');

            for (let i = 0; i < screens.length; i++) {
                const select = screens[i].querySelector('select');
                const input = screens[i].querySelector('input');
                if (select.value === '' || input.value === '') {
                    x = true;
                    disabledBtn();
                    break;
                } else {
                    x = false;
                }
                disabledBtn();
            }

        };
        check();
        disabledBtn();

        screens.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.addEventListener('change', check);
            input.addEventListener('input', check);
        });
    },

    addServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }

        });

        otherItemsNumber.forEach((item) => {
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
    addPrices: function () {
        for (let screen of this.screens) {
            this.screenPrice += +screen.price;
        }

        for (let key in this.servicesNumber) {
            this.servicePriceNumber += this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.servicePricePercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }

        this.fullPrice = this.screenPrice + this.servicePriceNumber + this.servicePricePercent;

        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
    },

    logger: function () {
        console.log(appData);
        console.log(this.servicePercentPrice);
        console.log(this.rollback);
    },

};


appData.init();