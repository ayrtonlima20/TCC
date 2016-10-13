define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    function Historia(idHistoria, nome, prioridade, descricao, estimativa) {
        if (!(this instanceof Historia)) {
            throw new TypeError("Historia constructor cannot be called as a function.");
        }
        this.idHistoria = idHistoria;
        this.nome = nome;
        this.prioridade = prioridade;
        this.descricao = descricao;
        this.estimativa = estimativa;
    };
    Historia.create = function (idHistoria, nome, prioridade, descricao, estimativa) {
        var result = new Historia(idHistoria, nome, prioridade, descricao, estimativa);
        return result;
    };
    function returnHistoriaNome(historia) {
        return ("Historia name is " + historia.nome);
    };
    Historia.prototype = {
        setIdHistoria: function (id) {
            this.idHistoria = id;
        },
        setNome: function (nome) {
            this.nome = nome;
        },
        setPrioridade: function (prioridade) {
            this.prioridade = prioridade;
        },
        setDescricao: function (descricao) {
            this.descricao = descricao;
        },
        setEstimativa: function (estimativa) {
            this.estimativa = estimativa;
        },
        getIdHistoria: function (id) {
            return this.idHistoria = id;
        },
        getNome: function () {
            return this.nome;
        },
        getPrioridade: function () {
            return this.prioridade;
        },
        getDescricao: function () {
            return this.descricao;
        },
        getEstimativa: function () {
            return this.estimativa;
        },
        alterarHistoria: function () {
            var result = false;
            historias.updateStatus(setHistoria).success(function(data) {
                result = true;
            });
            return result;
        },
        getHistorias: function () {
            var result = null;
            historias.get().success(function(data) {
                result = data;
            }); 
            return result;
        },
        toString: function() {
            return returnHistoriaNome(this);
        }
    };
    return Historia;
});