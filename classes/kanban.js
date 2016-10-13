define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    function Kanban(idKanban, atividades) {
        if (!(this instanceof Kanban)) {
            throw new TypeError("Kanban constructor cannot be called as a function.");
        }
        this.idKanban = idKanban;
        this.atividades = atividades;
    };
    Kanban.create = function (idKanban, atividades) {
        var result = new Kanban(idKanban, atividades);
        return result;
    };
    function returnKanbanId(kanban) {
        return ("Kanban name is " + kanban.idKanban);
    };
    Kanban.prototype = {
    	constructor: Kanban,
        setIdKanban: function (id) {
            this.idKanban = id;
        },
        setAtividades: function (atividades) {
            this.atividades = atividades;
        },
        getIdKanban: function () {
            return this.idKanban;
        },
        getAtividades: function () {
            return this.atividades;
        },
        // Usar classe de conversão
        getFlagKanban: function (horaTrabInicio, horaTrabFim, dataInicioAtiv, dataFimAtiv, duracaoAtiv) {
            // Calcular duração real da atividade
            var duracaoTotAtiv;
            var actualDate = new Date();
            // var dateAtivDiff = getConvDateDiff(dataInicioAtiv, dataFimAtiv);
            var dateAtivDiff = getConvDateDiff(dataInicioAtiv, actualDate);
            if(dataInicioAtiv < dataFimAtiv){
                var diasTrab = dateAtivDiff.days;
                var count = 1;
                if (dateAtivDiff.days === 0) {
                    // duracaoTotAtiv = dataFimAtiv.getHours() - horaTrabInicio;
                    duracaoTotAtiv = actualDate.getHours() - dataInicioAtiv.getHours();
                }else{
                    duracaoTotAtiv = horaTrabFim - dataInicioAtiv.getHours() ;  
                };
                while(count < diasTrab){
                    if((count + 1) === diasTrab){
                        duracaoTotAtiv += dataFimAtiv.getHours() - horaTrabInicio;
                    }else{
                        duracaoTotAtiv += horaTrabFim - dataInicioAtiv.getHours();
                    }
                    count++; 
                }
            }else{
                duracaoTotAtiv = dataFimAtiv.getHours() - dataInicioAtiv.getHours();
            };
            // Calcular flag Kanban
            if(duracaoTotAtiv > duracaoAtiv){
                return "red";
            }else{
                if( Math.abs(100 - ((100 * duracaoTotAtiv) / duracaoAtiv)) < 25 ){
                    return "yellow";
                }else{
                    return "green";
                }
            };
        },
        toString: function() {
            return returnKanbanId(this);
        }
    };
    return Kanban;
});