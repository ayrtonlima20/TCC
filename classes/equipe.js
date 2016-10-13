define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    function Equipe(nome, usuarios, idEquipe, projeto) {
        if (!(this instanceof Equipe)) {
            throw new TypeError("Equipe constructor cannot be called as a function.");
        }
        this.usuarios = usuarios;
        this.idEquipe = idEquipe;
        this.projeto = projeto;
        this.nome = nome;

    };
    Equipe.create = function (usuarios, idEquipe, projeto) {
        var result = new Equipe(nome, usuarios, idEquipe, projeto);
        return result;
    };
    function returnName(equipe) {
        return ("Equipe name is " + equipe.nome);
    };
    Equipe.prototype = {
    	constructor: Equipe,
        setName: function (nome) {
            this.nome = nome;
        },
        setUsuarios: function (usuarios) {
            this.usuarios = usuarios;
        },
        setIdEquipe: function (id) {
            this.idEquipe = id;
        },
        setProjeto: function (projeto) {
            this.projeto = projeto;
        },
        getName: function () {
            return this.nome;
        },
        getUsuarios: function () {
            return this.usuarios;
        },
        getIdEquipe: function () {
            return this.idEquipe;
        },
        getProjeto: function () {
            return this.projeto;
        },
        toString: function() {
            return returnName(this);
        }
    };
    return Equipe;
});