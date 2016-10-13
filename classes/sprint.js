define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    function Sprint(idSprint, nome, atividades, descricao, duracao, participantes, historias) {
        if (!(this instanceof Sprint)) {
            throw new TypeError("Sprint constructor cannot be called as a function.");
        }
        this.idSprint = idSprint; 
        this.nome = nome; 
        this.atividades = atividades;
        this.descricao = descricao;
        this.duracao = duracao;
        this.participantes = participantes;
        this.historias = historias;
    };
    Sprint.create = function (idSprint, nome, atividades, descricao, duracao, participantes, historias) {
        var result = new Sprint(idSprint, nome, atividades, descricao, duracao, participantes, historias);
        return result;
    };
    function returnSprintName(sprint) {
        return ("Sprint name is " + sprint.name);
    };
    Sprint.prototype = {
    	constructor: Sprint,
        setIdSprint: function (id) {
            this.idSprint = id;
        },
        setNome: function (nome) {
            this.nome = nome;
        },
        setAtividades: function (atividades) {
            this.atividades = atividades;
        },
        setDescricao: function (descricao) {
            this.descricao = descricao;
        },
        setDuracao: function (duracao) {
            this.duracao = duracao;
        },
        setParticipantes: function (participantes) {
            this.participantes = participantes;
        },
        setHistorias: function (historias) {
            this.historias = historias;
        },
        getIdSprint: function () {
            return this.idSprint;
        },
        getNome: function () {
            return this.nome;
        },
        getAtividades: function () {
            return this.atividades;
        },
        getDescricao: function () {
            return this.descricao;
        },
        getDuracao: function () {
            return this.duracao;
        },
        getParticipantes: function () {
            return this.participantes;
        },
        getHistorias: function () {
            return this.historias;
        },
        toString: function() {
            return returnSprintName(this);
        }
    };
    return Sprint;
});