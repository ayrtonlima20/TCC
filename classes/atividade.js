define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    function Atividade(idAtividade, nome, descricao, estimativa, idHistoria, dependencia, status, desenvolvedor) {
        if (!(this instanceof Atividade)) {
            throw new TypeError("Atividade constructor cannot be called as a function.");
        }
        this.idAtividade = idAtividade;
        this.nome = nome;
        this.descricao = descricao;
        this.estimativa = estimativa;
        this.idHistoria = idHistoria;
        this.dependencia = dependencia;
        this.status = status;
        this.desenvolvedor = desenvolvedor;
    };
    Atividade.create = function (idAtividade, nome, descricao, estimativa, idHistoria, dependencia, status, desenvolvedor) {
        var result = new Atividade(idAtividade, nome, descricao, estimativa, idHistoria, dependencia, status, desenvolvedor);
        return result;
    };
    function returnNomeAtividade(atividade) {
        return ("Atividade nome is " + atividade.nome);
    };
    Atividade.prototype = {
    	constructor: Atividade,
        setIdAtividade: function (id) {
            this.idAtividade = id;
        },
        setNome: function (nome) {
            this.nome = nome;
        },
        setDescricao: function (descricao) {
            this.descricao = descricao;
        },
        setEstimativa: function (estimativa) {
            this.estimativa = estimativa;
        },
        setIdHistoria: function (idHistoria) {
            this.idHistoria = idHistoria;
        },
        setDependencia: function (dependencia) {
            this.dependencia = dependencia;
        },
        setStatus: function (status) {
            this.status = status;
        },
        setDesenvolvedor: function (desenvolvedor) {
            this.desenvolvedor = desenvolvedor;
        },
        getIdAtividade: function (id) {
            return this.idAtividade;
        },
        getNome: function (nome) {
            return this.nome;
        },
        getDescricao: function (descricao) {
            return this.descricao;
        },
        getEstimativa: function (estimativa) {
            return this.estimativa;
        },
        getIdHistoria: function (idHistoria) {
            return this.idHistoria;
        },
        getDependencia: function (dependencia) {
            return this.dependencia;
        },
        getStatus: function (status) {
            return this.status;
        },
        getDesenvolvedor: function (desenvolvedor) {
            return this.desenvolvedor;
        },
        alterarAtividade: function (atividade) {
            var result = false;
            atividades.update(atividade).success(function(data) {
                result = true;
            });
            return result;
        },
        alterarStatusAtividade: function (atividade) {
            var result  = null;
            atividades.updateStatus(atividade).success(function(data) {
                result = data;
            });
            return result;
        },
        deletarAtividade: function () {
            var result = false;
            atividades.delete($scope.dialog.selected.idAtividade).success(function(data) {
                result = true;
            }).error(function(error){ 
                result = false;
            });
            return result;
        },
        cadastrarAtividade: function (atividade)  {
            var result = false;
            atividades.create(atividade).success(function(data) {
                result = true;
            });
            return result;
        },
        toString: function() {
            return returnNomeAtividade(this);
        }
    };
    return Atividade;
});