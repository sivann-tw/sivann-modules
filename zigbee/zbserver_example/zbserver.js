var ZShepherd = require('zigbee-shepherd');
var zserver = new ZShepherd('/dev/ttyACM0');

zserver.on('ready', function () {
    console.log('Server is ready. Allow devices to join the network within 180 secs.');
    console.log('Waiting for incoming clients or messages...');
    zserver.permitJoin(180);
});

zserver.on('permitJoining', function (joinTimeLeft) {
    console.log(joinTimeLeft);
});

var gasSensor,
    relaySensor,
    weatherSensor,
    remoteSensor;

function attReportHdlr(msg) {
    var ep = msg.endpoints[0];
    // console.log(msg.data);

    if(ep.devId === 12 && msg.data.cid ==='msTemperatureMeasurement'){
        var temp = msg.data.data.measuredValue /100;
        console.log('Temp: '+ temp + '°C');
    } else if(ep.devId === 12 && msg.data.cid ==='msRelativeHumidity'){
        var humi = msg.data.data.measuredValue /100;
        console.log('Humi: '+ humi + '%RH');
    } else if(ep.devId === 12 && msg.data.cid ==='msPressureMeasurement'){
        var pres = msg.data.data.measuredValue;
        console.log('Pres: '+ pres + 'hPa');
    } else if(ep.devId === 12 && msg.data.cid ==='msIlluminanceMeasurement'){
        var ligh = msg.data.data.measuredValue;
        console.log('Ligh: '+ ligh + 'lux');
    } else if(ep.devId === 12 && msg.data.cid ==='genAnalogInput'){
        var gas = msg.data.data.presentValue;
        console.log('Gas : '+ gas + 'ppm');
    }
}

// see [2]
zserver.on('ind', function (msg) {
    switch (msg.type) {
        case 'devIncoming':
            console.log('Device: ' + msg.data + ' joining the network!');
            msg.endpoints.forEach(function (ep) {
                // console.log(ep.dump());  // endpoint information

                if (ep.clusters.genBasic.attrs.modelId === 'weather_001') {
                    weatherSensor = ep;

                    weatherSensor.report('msTemperatureMeasurement','measuredValue',2,3,100,function(err){
                        if(!err) 
                            console.log('Set Temperature report success!');
                    });
                    weatherSensor.report('msRelativeHumidity','measuredValue',2,3,100,function(err){
                        if(!err)
                            console.log('Set Humidity report success!');
                    });
                    weatherSensor.report('msIlluminanceMeasurement','measuredValue',2,3,100,function(err){
                        if(!err)
                            console.log('Set Illuminance report success!');
                    });
                    weatherSensor.report('msPressureMeasurement','measuredValue',2,3,100,function(err){
                        if(!err)
                            console.log('Set Pressure report success!');
                    });
                } else if (ep.clusters.genBasic.attrs.modelId === 'gasAlarm_001') {
                    gasSensor = ep;

                    console.log("relay joined!");

                    gasSensor.report('genAnalogInput','presentValue',2,3,100,function(err){
                        if(!err)
                            console.log('Set Gas report success!');
                    });

                    setInterval(function () {
                        gasSensor.functional('genOnOff', 'toggle', {}, function (err) {
                            if (!err)
                                console.log('Buzzer TOGGLE!');
                        });
                    }, 5000);
                } else if (ep.clusters.genBasic.attrs.modelId === 'relay_001') {
                    relaySensor = ep;

                    setInterval(function () {
                        relaySensor.functional('genOnOff', 'toggle', {}, function (err) {
                            if (!err)
                                console.log('Relay TOGGLE!');
                        });
                    }, 5000);
                } else if (ep.clusters.genBasic.attrs.modelId === 'remote_001') {
                    remoteSensor = ep;

                    if (gasSensor) {
                        remoteSensor.bind('genOnOff', gasSensor, function (err) {
                            if (!err)
                                console.log('Successfully bind switch to buzzer!');
                        });
                    }

                    // if (relaySensor) {
                    //     remoteSensor.bind('genOnOff', relaySensor, function (err) {
                    //         if (!err)
                    //             console.log('Successfully bind switch to relaySensor!');
                    //     });
                    // }
                }
            });
            break;

        case'devChange':
            // console.log('------devChange------');
            break;

        case 'attReport':
            // console.log('------attReport------');
            attReportHdlr(msg);
            break;

        default:
            // Not deal with other msg.type in this example
            break;
    }
});

zserver.start(function (err) {
    if (err) {
        console.log(err);
    }
});
