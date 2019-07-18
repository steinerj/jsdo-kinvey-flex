require('./jsdo-node-compat-shims');
const sdk = require('kinvey-flex-sdk');
const progressCore = require("@progress/jsdo-core");

sdk.service((err, flex) => {
	// gets the FlexData object from the service
    const data = flex.data; 
    // set the serviceObject
    const items = data.serviceObject("items");
    // wire up the event that we want to process
    items.onGetAll(getAll);
	items.onGetByQuery(getAll);
});

function getAll(context, complete, modules) {
    console.log('handler start');
    const session = progressCore.progress.data.getSession({
        name: 'oe',
        serviceURI: 'http://oemobiledemo.progress.com/OEMobileDemoServices',
        catalogURI: 'http://oemobiledemo.progress.com/OEMobileDemoServices/static/SportsService.json',
        authenticationModel: progressCore.progress.data.Session.AUTH_TYPE_ANON
        //username: '',
        //password: '',
    }).then(session => {
        console.log('session success');
        const jsdo = new progressCore.progress.data.JSDO({
            name: 'Item',
        });
        jsdo.fill({skip:20, top:20}).then((result, success, request) =>{
            const data = jsdo.getData();
            if (typeof data === "undefined" || data === null) {
                complete("The data could not be found").notFound().next();
            }
            else {
                // return the entity
                complete().setBody(JSON.stringify(data)).ok().next();
            }
        }).catch(err => {
            console.log('ERROR OCCURRED');
            console.log(err.message);
            console.log(err.stack);
            complete(err).runtimeError().next();
        });;
    }).catch(err => {
        console.log('ERROR OCCURRED');
        console.log(err.message);
        console.log(err.stack);
        complete(err).runtimeError().next();
    });
}
