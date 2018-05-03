"use strict";
exports.__esModule = true;
var opcua = require("node-opcua");
var electron_1 = require("electron");
var client = new opcua.OPCUAClient({
    applicationName: 'MatUA',
    connectionStrategy: {
        maxRetry: 1
    },
    clientName: 'MatUA'
});
var m_session, m_subscription;
var lastBrowseResult = [];
function InitIpcMainForUa() {
    // creating Ipc Listeners
    electron_1.ipcMain.on('getopcclient', function (event, arg) {
        event.returnValue = client;
    });
    electron_1.ipcMain.on('opcconnectasync', function (event, endpointUrl) {
        client.connect(endpointUrl, function (err) {
            if (err) {
                event.sender.send('opcconnected', false);
                console.log('Cannot connect to endpoint :', endpointUrl);
            }
            else {
                event.sender.send('opcconnected', true);
                console.log('Connected !');
            }
        });
        console.log('connect received');
    });
    electron_1.ipcMain.on('opccreatesession', function (event, UserIdent) {
        client.createSession(UserIdent, function (err, session) {
            if (!err) {
                m_session = session;
                event.sender.send('opcsessioncreated', true);
            }
            else {
                event.sender.send('opcsessioncreated', false);
            }
        });
    });
    electron_1.ipcMain.on('opcgetsession', function (event, arg) {
        // #TODO Manage multiple sessions
        event.returnValue = m_session;
    });
    electron_1.ipcMain.on('opcbrowse', function (event, path) {
        m_session.browse(path, function (err, browseResult) {
            if (!err) {
                lastBrowseResult = [];
                browseResult.references.forEach(function (reference) {
                    lastBrowseResult.push(reference);
                    console.log(reference.browseName.toString());
                });
                event.sender.send('opcbrowseresult', lastBrowseResult);
            }
            else {
                event.sender.send('opcbrowseresult', undefined);
            }
        });
    });
    electron_1.ipcMain.on('opcreadvariable', function (event, uanode) {
        m_session.readVariableValue(uanode, function (err, dataValue) {
            if (!err) {
                event.sender.send('opcreadresult', dataValue);
                console.log(dataValue.toString());
            }
            else {
                event.sender.send('opcreadresult', undefined);
            }
        });
    });
    // ipcMain.on('opcreadvariable', (event, uanode: string) => {
    //     var maxAge = 0;
    //     var nodeToRead = { nodeId: 'ns=1;s=free_memory', attributeId: opcua.AttributeIds.Value };
    //     the_session.read(nodeToRead, maxAge, function(err,dataValue) {
    //         if (!err) {
    //             console.log(' free mem % = ' , dataValue.toString() );
    //         }
    //         callback(err);
    //     });
    // });
    electron_1.ipcMain.on('opcsubscribe', function (event, uanode) {
        m_subscription = new opcua.ClientSubscription(m_session, {
            requestedPublishingInterval: 1000,
            requestedLifetimeCount: 10,
            requestedMaxKeepAliveCount: 2,
            maxNotificationsPerPublish: 10,
            publishingEnabled: true,
            priority: 10
        });
        m_subscription.on('started', function () {
            console.log('subscription started for 2 seconds - subscriptionId=', m_subscription.subscriptionId);
        }).on('keepalive', function () {
            console.log('keepalive');
        }).on('terminated', function () {
        });
        // setTimeout(function() {
        //     m_subscription.terminate(callback);
        // }, 10000);
        // install monitored item
        var monitoredItem = m_subscription.monitor({
            nodeId: opcua.resolveNodeId('ns=1;s=free_memory'),
            attributeId: opcua.AttributeIds.Value
        }, {
            samplingInterval: 100,
            discardOldest: true,
            queueSize: 10
        }, opcua.read_service.TimestampsToReturn.Both);
        console.log('-------------------------------------');
        monitoredItem.on('changed', function (dataValue) {
            event.sender.send('opcsubscriptionvaluechanged', dataValue);
            console.log(dataValue.value.value);
        });
    });
    electron_1.ipcMain.on('opcterminatesession', function (event) {
        m_session.close(function (err) {
            if (err) {
                console.log('session closed failed ?');
            }
        });
    });
    // Logging Client data
    console.log(client);
    return true;
}
exports.InitIpcMainForUa = InitIpcMainForUa;
