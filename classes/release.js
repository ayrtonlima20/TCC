define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    function Release(idRelease, nome, descricao, objetivo, sprints) {
        if (!(this instanceof Release)) {
            throw new TypeError("Release constructor cannot be called as a function.");
        }
        this.idRelease = idRelease;
        this.nome = nome;
        this.descricao = descricao;
        this.objetivo = objetivo;
        this.sprints = sprints;
    };
    Release.create = function (idRelease, nome, descricao, objetivo, sprints) {
        var result = new Release(idRelease, nome, descricao, objetivo, sprints);
        return result;
    };
    function returnReleaseNome(release) {
        return ("Release name is " + release.nome);
    };
    Release.prototype = {
    	constructor: Release,
        setIdRelease: function (id) {
            this.idRelease = id;
        },
        setNome: function (nome) {
            this.nome = nome;
        },
        setDescricao: function (descricao) {
            this.descricao = descricao;
        },
        setObjetivo: function (objetivo) {
            this.objetivo = objetivo;
        },
        setSprints: function (sprints) {
            this.sprints = sprints;
        },
        getIdRelease: function () {
            return this.idRelease;
        },
        getNome: function () {
            return this.nome;
        },
        getDescricao: function () {
            return this.descricao;
        },
        getObjetivo: function () {
            return this.objetivo;
        },
        getSprints: function () {
            return this.sprints;
        },
        toString: function() {
            return returnReleaseNome(this);
        }
    };
    return Release;
});