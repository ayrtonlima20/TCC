define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    function Projeto(idProjeto, nome, equipe) {
        if (!(this instanceof Projeto)) {
            throw new TypeError("Projeto constructor cannot be called as a function.");
        }
        this.idProjeto = idProjeto;
        this.nome = nome;
        this.equipe = equipe;
    };
    Projeto.create = function (idProjeto, nome, equipe) {
        var result = new Projeto(idProjeto, nome, equipe);
        return result;
    };
    function returnNomeProjeto(projeto) {
        return ("Projeto name is " + projeto.nome);
    };
    Projeto.prototype = {
    	constructor: Projeto,
        setIdProjeto: function (id) {
            this.idProjeto = id;
        },
        setNome: function (nome) {
            this.nome = nome;
        },
        setEquipe: function (equipe) {
            this.equipe = equipe;
        },
        getIdProjeto: function (id) {
            return this.idProjeto;
        },
        getNome: function (nome) {
            return this.nome;
        },
        getEquipe: function (equipe) {
            return this.equipe;
        },
        toString: function() {
            return returnNomeProjeto(this);
        }
    };
    return Projeto;
});