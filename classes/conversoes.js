define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    function Conversoes() {
        if (!(this instanceof Conversoes)) {
            throw new TypeError("Conversoes constructor cannot be called as a function.");
        }
    };
    Conversoes.create = function () {
        var result = new Conversoes();
        return result;
    };
    Conversoes.prototype = {
    	constructor: Conversoes,
        function getDataFim(date, estimativa, horaTrabInicio, horaTrabFim){
            var horasTrab = 0;
            if ((getHora(date) + estimativa) > horaTrabFim){
                console.log("modificação de data errada");
                horasTrab = horaTrabFim - getHora(date);
                console.log("---");
                date.setDate(getDia(date) + 1);
                date.setHours(horaTrabInicio + Math.abs(horasTrab - estimativa));
            }else{
                date.setHours(date.getHours() + estimativa);
            };
            return date;
        },
        getMes: function (date) {
            var month = date.getMonth() + 1;
            return month < 10 ? '0' + month : '' + month; 
        },
        getDia: function (date) {
            if (date === null || date === undefined){return 0;};
            var day = date.getDate();
            return day < 10 ? '0' + day : '' + day; 
        },
        getHora: function (date) {
            var hour = date.getHours();
            return hour < 10 ? '0' + hour : '' + hour; 
        },
        getMinutes: function (date) {
            var minutes = date.getMinutes();
            return minutes < 10 ? '0' + minutes : '' + minutes; 
        },
        getSeconds: function (date) {
            var seconds = date.getSeconds();
            return seconds < 10 ? '0' + seconds : '' + seconds; 
        },
        getDateFormatDDMMYY: function (date){
            return getDia(date) + '-' + getMes(date) + '-' + date.getFullYear();
            // database[i].month = date.getMonth() + 1;
            // database[i].day = date.getDate();
            // database[i].hours = date.getHours();
            // database[i].year = date.getFullYear();
        },
        getTimeFormatHHMMSS: function (time) {
            // fdsfs
            // fdsfs
            return getHora(time) + ':' + getMinutes(time) + ':' + getSeconds(time);
        }
    };
    return Conversoes;
});