import { IPAddress } from 'ip-address';
import { SecurityPolicy } from 'node-opcua';

export enum EncryptionMethod {
    None,
    AES128,
    AES256
}

export enum GraphType {
    Gauge,
    LinearGauge,
    VerticalBar,
    HorizontalBar,
    Pie,
    Line,
    Radar
}

export class GuiObject {
    name: string;
    path: string;
    img: string;
    type: GraphType;
    unit: string;
    uapath: string;
    template: string;
    data = [];
    chart: any;
    options: any;
    updateOptions: any;
}

export class GraphObject extends GuiObject {
}

export class SettingsClass {
    windowsize = {x: 0, y: 0};
    connectionspath: string;
    logpath: string;

    constructor() {
        // this.windowsize.x = 1024;
        // this.windowsize.y = 600;
        // this.connectionspath = './connections/';
        // this.logpath = './logs/';
    }
}

export class ConnectionConfiguration {
    name: string;
    ip: string;
    port: number;
    encryption: SecurityPolicy;
    username: string;
    password: string;

    constructor(name: string, ip: string, port: number, encryption: SecurityPolicy, username, password) {
        // const ipaddress = IPAddress(ip);
        // if (ipaddress.isValid()) {
           this.name = name;
           this.ip = ip;
           this.port = port;
           this.encryption = encryption;
           this.username = username;
           this.password = password;
        // }
    }
}
