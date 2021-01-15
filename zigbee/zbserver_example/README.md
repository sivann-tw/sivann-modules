# zbserver example 

* Install
```sh  
$ cd zbserver_example  
/zbserver_example$ npm install zigbee-shepherd@0.3.0  
```

* Run the App
```sh  
/zbserver_example$ DEBUG=zigbee-shepherd* node zbserver.js
```
* Notes  
1. 新裝置加入網路後，裝置相關資訊將儲存於資料庫中。若要讓已加入過的裝置變為新裝置入網，可刪除路徑 `node_modules/zigbee-shepherd/lib/database/dev.db` 的資料庫檔案。
