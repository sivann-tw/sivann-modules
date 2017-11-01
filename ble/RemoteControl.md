# BLE Remote Control Module

<br />

## Contents  
1. [Introduction](#Introduction)  
2. [Hardware Overview](#HW_Overview)  
3. [Usage](#Usage)  
4. [Services and Characteristics UUID](#Service_Char_UUID)  
5. [Resources](#Resources)  

<a name="Introduction"></a>
<br />
## 1. Introduction  

BLE Remote Control 模組上面有 5 個按鍵，每個按鍵的點擊都會透過 BLE 將資訊傳出，得知哪個按鍵被按下。  

#### Features  
 * 5 個按鍵給使用者使用  
 * 待機低耗電，點擊任一按鍵可觸發 BLE 廣播入網  
 * GATT Characteristics 資料格式符合 [BIPSO](https://github.com/bluetoother/bipso/wiki/BIPSO-Specification) 規範   

#### Specifications  
 * 無線模組：低功耗藍牙 BM05_AN(TI CC2541)  
 * 模組工作電壓: 可使用 3V 電池(CR2032/兩顆 AA 電池)或 3.7V LiPo 鋰離子聚合物電池  
 * 模組最大工作電流: 20mA  

<a name="HW_Overview"></a>
<br />
## 2. Hardware Overview  

此無線模組由三種電路模組堆疊而成，包括上層感測模組、中層 BLE 無線模組，以及底層電源模組，如下圖所示。  

![RemoteControl](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/ble_remote.png)  

<a name="Usage"></a>
<br />
## 3. Usage  

1. 如下圖所示，於模組背面金屬凹槽處置入 CR2032 水銀電池供電，請注意**金屬殼為正極** 
![Battery](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/battery.png)  
2. 點擊任意按鍵，綠色 LED 開始閃爍，模組發出 BLE 廣播加入網路  

<a name="Service_Char_UUID"></a>
<br />
## 4. Services & Characteristics UUID  

下表為此模組的 Service 及 Char.(Characteristic) 介紹。  

| Service Name | Service ID | Char. Name          | Char. ID | Possible Fields in Char. Value              | Access Type | Unit | Description                                        |  
|--------------|------------|---------------------|----------|---------------------------------------------|-------------|------|----------------------------------------------------|  
| **Key**      |  0xBB70    | Multistate Selector | 0xCC32   | id (uint8), flags (uint8), mStateIn (uint8) | R           |      | 1 (UP), 2 (DOWN), 4 (SELECT), 8 (LEFT), 16 (RIGHT) |  

<a name="Resources"></a>
<br />
## 5. Resources  

 * [Sample Code for ble-shepherd](https://github.com/sivann-tw/hiver-iot-kit-ble/blob/master/example/remoteControl.js)  
 * [Plugin for ble-shepherd](https://github.com/bluetoother/bshep-plugin-sivann-remotecontrol/blob/master/index.js)  
