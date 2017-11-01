# BLE PIR Module
--------------------

## Contents  
1. [Introduction](#Introduction)  
2. [Hardware Overview](#HW_Overview)  
3. [Usage](#Usage)  
4. [Services and Characteristic UUID](#Service_Char_UUID)  
5. [Resources](#Resources)  

<a name="Introduction"></a>
## 1. Introduction  

BLE 人體紅外線感測器(PIR)模組，可以透過低功耗藍牙(BLE)以無線方式發送感測器訊號。  

#### Features  
 * 偵測人體紅外線  
 * 紅外線感測器狀態指示燈(紅色)  
 * GATT Characteristics 資料格式符合 [BIPSO](https://github.com/bluetoother/bipso/wiki/BIPSO-Specification) 規範   

#### Specifications  
 * 無線模組：低功耗藍牙 BM05_AN(TI CC2541)  
 * 模組工作電壓: 5V  

<a name="HW_Overview"></a>
## 2. Hardware Overview  

此無線感測模組由底層電源模組及上層 BLE 無線模組，外加 PIR 感測器組合而成(連接 P4 Connector)，如下圖所示。  

![PIR](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/ble_pir.png)  

<a name="Usage"></a>
## 3. Usage  

1. 連接 Micro USB 以 5V 電源供應  

<a name="Service_Char_UUID"></a>
## 4. Services & Characteristic UUID  

下表為此模組的 Service 及 Char.(Characteristic) 介紹。  

| Service Name | Service ID | Char. Name      | Char. ID | Possible Fields in Char. Value                                       | Access Type | Unit | Description                                  |  
|--------------|------------|-----------------|----------|----------------------------------------------------------------------|-------------|------|----------------------------------------------|  
| **PIR**      |  0xBB90    | Presence Sensor | 0xCC06   | id (uint8), flags (uint8), dInState (boolean), sensorType (string)   | R/W         |      | 0 (Low), 1 (High)                            |  
| **AIN**      |  0xBB10    | Analogue Input  | 0xCC02   | id (uint8), flags (uint8), aInCurrValue (float), sensorType (string) | R           | mV   |                                              |  
|              |            | AIN Conf.       | 0xBB11   | config (boolean)                                                     | R/W         |      | Measurment Switch. 0 (OFF), 1 (ON)           |  
|              |            | AIN Peri.       | 0xBB12   | period (uint8)                                                       | R/W         |      | Period = [Data * 10] ms, Data Range : 10~255 |  

<a name="Resources"></a>
## 5. Resources  
 * [PIR](http://www.icshopping.com.tw/368030200141/368030200141.pdf)  
 * [Sample Code for ble-shepherd](https://github.com/sivann-tw/hiver-iot-kit-ble/blob/master/example/pir.js)  
 * [Plugin for ble-shepherd](https://github.com/bluetoother/bshep-plugin-sivann-pir/blob/master/index.js)  
