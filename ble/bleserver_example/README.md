# bleserver example 

* Install
```sh  
$ cd bleserver_example  
/bleserver_example$ npm install
```

* Add your devices MAC address to whitelist
```sh  
function addWhitelist () {
    var blocker = central.blocker;

    /*** enable whitelist service. Use whitelist to block other unknown/unwanted BLE devices,
       and only specified devices can join your network. ***/
    blocker.enable('white');

    /*** specify a device to join the network by using its MAC address ***/
    blocker.unblock('0x689e192a8740');  
    blocker.unblock('your_DeviceMac');  
}
```

* [Running without root/sudo on Linux](https://github.com/noble/noble#running-without-rootsudo)  
Run the following command:  
```sh 
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`) 
```

* Run the App
```sh  
/bleserver_example$ node bleserver.js
```

* Notes  
1. 於白名單中新增允許加入網路的藍牙裝置 MAC 位址
2. 新裝置加入網路後，裝置相關資訊將儲存於資料庫中。若要讓已加入過的裝置變為新裝置入網，可刪除路徑 `node_modules/ble-shepherd/lib/database/ble.db` 的資料庫檔案。
