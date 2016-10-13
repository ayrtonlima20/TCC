define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";

    function ProductBacklog(idProductBacklog, nome, historias) {
        if (!(this instanceof ProductBacklog)) {
            throw new TypeError("ProductBacklog constructor cannot be called as a function.");
        }
        this.idProductBacklog = idProductBacklog
        this.nome = nome;
        this.historias = historias;
    };
    ProductBacklog.create = function (idProductBacklog, nome, historias) {
        var result = new ProductBacklog(idProductBacklog, nome, historias);
        return result;
    };
    function returnProductBacklogNome(productBacklog) {
        return ("ProductBacklog name is " + productBacklog.nome);
    };
    ProductBacklog.prototype = {
    	constructor: ProductBacklog,
        setIdProductBacklog: function (id) {
            this.idProductBacklog = id;
        },
        setNome: function (nome) {
            this.nome = nome;
        },
        setHistorias: function (historias) {
            this.historias = historias;
        },
        getIdProductBacklog: function () {
            return this.idProductBacklog;
        },
        getNome: function () {
            return this.nome;
        },
        getHistorias: function () {
            return this.historias;
        },
        toString: function() {
            return returnProductBacklogNome(this);
        }
    };
    return ProductBacklog;
});