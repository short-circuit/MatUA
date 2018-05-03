import * as opcua from 'node-opcua';
import { ConnectionConfiguration } from './classes';
import { ipcMain } from 'electron';
import { userInfo } from 'os';


const client = new opcua.OPCUAClient({
    applicationName: 'MatUA',
    connectionStrategy: {
        maxRetry: 10
    },
    clientName: 'MatUA',
    endpoint_must_exist: false
    });

let m_session, m_subscription;
let lastBrowseResult = [];

export function InitIpcMainForUa() {

    // creating Ipc Listeners
    ipcMain.on('getopcclient', (event) => {
        event.returnValue = client;
    });

    ipcMain.on('opcconnectasync', (event, endpointUrl: string) => {
        client.connect(endpointUrl, function (err) {
            if (err) {
                event.sender.send('opcconnected', false);
                console.log('Cannot connect to endpoint :', endpointUrl);
            } else {
                event.sender.send('opcconnected', true);
                console.log('Connected !');
            }
            // console.log(client);
        });
    console.log('connect received');
    });

    ipcMain.on('opcdisconnect', (event) => {
        client.disconnect(function (err) {
            if (err) {
                event.sender.send('opcdisconnected', false);
                console.log('Cannot disconnect.');
            } else {
                event.sender.send('opcdisconnected', true);
                console.log('Disconnected');
            }
        });
    console.log('disconnect received');
    });

    ipcMain.on('opccreatesession', (event, UserIdent: opcua.UserIdentityInfo) => {
        console.log('userident: ', UserIdent);
        client.createSession(UserIdent, function(err, session) {
            if (!err) {
                m_session = session;
                event.sender.send('opcsessioncreated', true);
            } else {
                event.sender.send('opcsessioncreated', false);
            }
            console.log(session);
        });
    });

    ipcMain.on('opcgetsession', (event, arg) => {
        // #TODO Manage multiple sessions
        event.returnValue = m_session;
    });

    ipcMain.on('opcbrowse', (event, path: string) => {
        m_session.browse(path, function(err, browseResult) {
            if (!err) {
                lastBrowseResult = [];
                browseResult.references.forEach(function(reference) {
                    lastBrowseResult.push(reference);
                    console.log( reference.browseName.toString());
                });
                event.sender.send('opcbrowseresult', lastBrowseResult);
            } else {
                event.sender.send('opcbrowseresult', undefined);
            }
        });
    });

    ipcMain.on('opcreadvariable', (event, uanode: string) => {
        m_session.readVariableValue(uanode, function(err, dataValue) {
            if (!err) {
                event.sender.send('opcreadresult', dataValue);
                console.log(dataValue.toString());
            } else {
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

    ipcMain.on('opcsubscribe', (event, uanode: string) => {
        m_subscription = new opcua.ClientSubscription(m_session, {
            requestedPublishingInterval: 1000,
            requestedLifetimeCount: 10,
            requestedMaxKeepAliveCount: 2,
            maxNotificationsPerPublish: 10,
            publishingEnabled: true,
            priority: 10
        });

        m_subscription.on('started', function() {
            console.log('subscription started for 2 seconds - subscriptionId=', m_subscription.subscriptionId);
        }).on('keepalive', function() {
            console.log('keepalive');
        }).on('terminated', function() {
        });

        // setTimeout(function() {
        //     m_subscription.terminate(callback);
        // }, 10000);

        // install monitored item
        const monitoredItem  = m_subscription.monitor({
            nodeId: opcua.resolveNodeId('ns=1;s=free_memory'),
            attributeId: opcua.AttributeIds.Value
        },
        {
            samplingInterval: 100,
            discardOldest: true,
            queueSize: 10
        },
        opcua.read_service.TimestampsToReturn.Both
        );
        console.log('-------------------------------------');
        monitoredItem.on('changed', function(dataValue) {
            event.sender.send('opcsubscriptionvaluechanged', dataValue);
            console.log(dataValue.value.value);
        });
    });

    ipcMain.on('opcterminatesession', (event) => {
        m_session.close(function(err) {
            if (err) {
                console.log('session closed failed ?');
            }
        });
    });

    // Logging Client data
    console.log(client);
    return true;
}
