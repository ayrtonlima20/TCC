define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    function TesteAceitacao(idTeste, nome, descricao, status, atividade, resultadoEsperado) {
        if (!(this instanceof TesteAceitacao)) {
            throw new TypeError("TesteAceitacao constructor cannot be called as a function.");
        }
        this.idTeste = idTeste;
        this.nome = nome;
        this.descricao = descricao;
        this.status = status;
        this.atividade = atividade;
        this.resultadoEsperado = resultadoEsperado;
    };
    TesteAceitacao.create = function (idTeste, nome, descricao, status, atividade, resultadoEsperado) {
        var result = new TesteAceitacao(idTeste, nome, descricao, status, atividade, resultadoEsperado);
        return result;
    };
    function returnNomeTeste(testeAceitacao) {
        return ("TesteAceitacao name is " + testeAceitacao.nome);
    };
    TesteAceitacao.prototype = {
    	constructor: TesteAceitacao,
        setIdTeste: function (id) {
            this.idTeste = id;
        },
        setNome: function (nome) {
            this.nome = nome;
        },
        setDescricao: function (descricao) {
            this.descricao = descricao;
        },
        setStatus: function (status) {
            this.status = status;
        },
        setAtividade: function (atividade) {
            this.atividade = atividade;
        },
        setResultadoEsperado: function (resultado) {
            this.resultadoEsperado = resultado;
        },
        getIdTeste: function () {
            return this.idTeste;
        },
        getNome: function () {
            return this.nome;
        },
        getDescricao: function () {
            return this.descricao;
        },
        getStatus: function () {
            return this.status;
        },
        getAtividade: function () {
            return this.atividade;
        },
        getResultadoEsperado: function () {
            return this.resultadoEsperado;
        },
        deletarTeste: function (idTeste) {
            var result = false;
            testeAceitacao.delete(idTeste).success(function(data) {
                result = true;
            });
            return result;
        },
        cadastrarTeste: function (teste){
            result = null;
            testeAceitacao.create(teste).success(function(data) {
                testeAceitacao.get(teste.idHistoria).success(function(data) {
                    result = data;
                });
            });
            return result;
        },
        toString: function() {
            return returnNomeTeste(this);
        }
    };
    return TesteAceitacao;
});