var BleShepherd = require('ble-shepherd');

var relayPlugin = require('bshep-plugin-sivann-relay'),
    gasSensorPlugin = require('bshep-plugin-sivann-gassensor'),
    weatherPlugin = require('bshep-plugin-sivann-weatherstation'),
    remoteCtrlPlugin = require('bshep-plugin-sivann-remotecontrol');

var relay, gasSensor, weatherStation, remoteCtrl;
var relayState = 0, buzzerState = 0;

var central = new BleShepherd('noble');

central.on('ready', function () {
    console.log('[         ready ] ');
    addWhitelist();
});

central.on('permitJoining', function (timeLeft) {
    console.log('[ permitJoining ] ' + timeLeft + ' sec');
});

central.on('error', function (err) {
    console.log('[         error ] ' + err.message);
});

central.on('ind', function(msg) {
    var dev = msg.periph;
    
    switch (msg.type) {
        case 'devIncoming':
            if (dev.name)
                console.log('[   devIncoming ] ' + '@' + dev.addr + ', ' + dev.name + ', firmware ' + dev.findChar('0x180a', '0x2a26').value.firmwareRev); // display the device MAC and name. Use this MAC address for blacklist or whitelist.
            else
                console.log('[   devIncoming ] ' + '@' + dev.addr + ', failed to recognize this incoming device.');

            if (dev.name === 'gasSensor') {
                gasSensor = dev;

                /* enable or disable the indication/notification of each Characteristic. */
                gasSensor.configNotify('0xbb60', '0xcc28', true);      // buzzer
                gasSensor.configNotify('0xbb50', '0xcc04', true);      // gas

                /* Register your handler to handle notification or indication of each Characteristic.*/
                gasSensor.onNotified('0xbb60', '0xcc28', buzzerHdlr);  // buzzer
                gasSensor.onNotified('0xbb50', '0xcc04', gasHdlr);     // gas
            } else if (dev.name === 'relay') {
                relay = dev;

                relay.configNotify('0xbb40', '0xcc0e', true); // Relay

                relay.onNotified('0xbb40', '0xcc0e', relayHdlr);  // multiState key

                setInterval(function () {
                    var value;

                    if (relayState === 1) {
                        relayState = 0;
                        value = {onOff: 0};
                    } else {
                        relayState = 1;
                        value = {onOff: 1};
                    }

                    relay.write('0xbb40', '0xcc0e', value, function (err) {
                        if (err) console.log(err);
                    });
                }, 5000);
            } else if (dev.name === 'weatherStation') {
                weatherStation = dev;

                weatherStation.configNotify('0xbb80', '0xcc07', true);  // temperature
                weatherStation.configNotify('0xbb80', '0xcc08', true);  // humidity
                weatherStation.configNotify('0xbb80', 65,       true);  // UV Index
                weatherStation.configNotify('0xbb80', 69,       true);  // illuminance
                weatherStation.configNotify('0xbb80', '0xcc11', true);  // barometer

                weatherStation.onNotified('0xbb80', '0xcc07', tempHdlr);          // temperature
                weatherStation.onNotified('0xbb80', '0xcc08', humidHdlr);         // humidity
                weatherStation.onNotified('0xbb80', 65,       uvIndexHdlr);       // UV Index
                weatherStation.onNotified('0xbb80', 69,       ambientLightHdlr);  // illuminance
                weatherStation.onNotified('0xbb80', '0xcc11', barometerHdlr);     // barometer
            } else if (dev.name === 'remoteCtrl') {
                remoteCtrl = dev;

                remoteCtrl.configNotify('0xbb70', '0xcc32', true);  // multiState key

                remoteCtrl.onNotified('0xbb70', '0xcc32', remoteCtrlHdlr);  // multiState key
            }
            break;

        case 'devStatus':
            console.log('[     devStatus ] ' + '@' + dev.addr + ', ' + msg.data);
            break;

        case 'devLeaving':
            console.log('[    devLeaving ] ' + '@' + dev.addr);
            break;
    }
});

central.support('relay', relayPlugin);  // give a device name to the module you are going to use.
central.support('gasSensor', gasSensorPlugin);
central.support('weatherStation', weatherPlugin);
central.support('remoteCtrl', remoteCtrlPlugin);
central.start();

function addWhitelist () {
    var blocker = central.blocker;

    /*** add your devices mac to whitelist ***/
    blocker.enable('white');            // enable whitelist service. Use whitelist to block other unknown/unwanted BLE devices, and only specified devices can join your network.
    blocker.unblock('0x689e192a8740');  // specify a device to join the network by using its MAC address
    blocker.unblock('0xe0e5cfe3687c');
    blocker.unblock('0xe0e5cfe36c65');
    blocker.unblock('0xe0e5cfe36c19');

    central.permitJoin(60);             // 60s the default value to allow devices joining the network.
}

/*****************************************************/
/*    Power Meter Relay Callback Handler             */
/*****************************************************/
function relayHdlr(data) {
    console.log('[ debug message ] Relay State: ' + data.onOff);
}

/*****************************************************/
/*    Gas Alarm Sensor Callback Handler              */
/*****************************************************/
function buzzerHdlr(data) {
    console.log('[ debug message ] Buzzer State: ' + data.onOff);
}

function gasHdlr(data) {
    console.log('[ debug message ] Gas Concentration: ' + data.sensorValue.toFixed(1) + ' ' + data.units);
}

/*****************************************************/
/*    Weather Station Callback Handler               */
/*****************************************************/
function tempHdlr(data) {
    console.log('[ debug message ] Temperature : ' + data.sensorValue.toFixed(1) + ' ' + data.units);
}

function humidHdlr(data) {
    console.log('[ debug message ] Humidity : ' + data.sensorValue.toFixed(1) + ' ' + data.units);
}

function ambientLightHdlr(data) {
    console.log('[ debug message ] Ambient Light : ' + data.sensorValue + ' ' + data.units);
}

function uvIndexHdlr(data) {
    console.log('[ debug message ] UV Index : ' + data.sensorValue + ' ' + data.units);
}

function barometerHdlr(data) {
    console.log('[ debug message ] Atmospheric Pressure : ' + data.sensorValue + ' ' + data.units);
}

/*****************************************************/
/*    Remote Control Callback Handler                */
/*****************************************************/
function remoteCtrlHdlr(data) {
    if (data.mStateIn === 1) {          // up
        console.log('[ debug message ] Remote Control State: Up');
    } else if (data.mStateIn === 2) {   // down
        console.log('[ debug message ] Remote Control State: Down');
    } else if (data.mStateIn === 4) {   // center
        console.log('[ debug message ] Remote Control State: Center');
        if (gasSensor) {
            var value;

            if (buzzerState === 1) {
                buzzerState = 0;
                value = {onOff: 0};
            } else {
                buzzerState = 1;
                value = {onOff: 1};
            }

            gasSensor.write('0xbb60', '0xcc28', value, function (err) {
                if (err) console.log(err);
            });
        }
    } else if (data.mStateIn === 8) {   // left
        console.log('[ debug message ] Remote Control State: Left');
    } else if (data.mStateIn === 16) {  // right
        console.log('[ debug message ] Remote Control State: Right');
    }
}
