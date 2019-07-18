//Global variables needed to emulate missing browser features in node environment

XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function LocalStorageEmulation() {
    this._data = {};
};
LocalStorageEmulation.prototype.setItem = function(id, val) { return this._data[id] = String(val); },
LocalStorageEmulation.prototype.getItem = function(id) { return this._data.hasOwnProperty(id) ? this._data[id] : undefined; },
LocalStorageEmulation.prototype.removeItem = function(id) { return delete this._data[id]; },
LocalStorageEmulation.prototype.clear = function() { return this._data = {}; }

sessionStorage = new LocalStorageEmulation();
