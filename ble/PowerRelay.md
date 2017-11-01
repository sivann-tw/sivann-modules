# BLE Power Meter Relay Module  

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

BLE Power Meter Relay 模組包含繼電器、電流感測器以及人體紅外線感測器(PIR，選用)，並可透過低功號藍牙(BLE)以無線方式控制切換電器開關、讀取量測的電流值和 PIR 變化。  

#### Features  
 * 量測 AC 電流，電流值範圍 120 mA 至 3A (誤差範圍 ±10%)  
 * 量測 AC 功率，功率範圍 13 W 至 330 W (誤差範圍 ±10%)  
 * 繼電器狀態指示燈(綠色)  
 * GATT Characteristics 資料格式符合 [BIPSO](https://github.com/bluetoother/bipso/wiki/BIPSO-Specification) 規範   

#### Specifications  
 * 無線模組：低功耗藍牙 BM05_AN(TI CC2541)  
 * 模組工作電壓: 5V  
 * 模組最大工作電流: 85mA  
 * 繼電器壽命: 100,000 次 (電子式切換)  
 * 繼電器規格: 3A, 120VAC / 24VDC  

<a name="HW_Overview"></a>
<br />
## 2. Hardware Overview  

此無線感測模組由三種電路模組堆疊而成，包括上層感測模組、中層 BLE 無線模組，以及底層電源模組，如下圖所示。  

![Relay](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/ble_relay.png)  

<a name="Usage"></a>
<br />
## 3. Usage  

1. 連接電器  
2. 連接 Micro USB 以 5V 電源供應  
3. 可外接 PIR 感測器[選用]  

![Relay_PIR](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/ble_relay_pir.png)  

<a name="Service_Char_UUID"></a>
<br />
## 4. Service & Characteristics UUID  

下表為此模組的 Service 及 Char.(Characteristic) 介紹。  

| Service Name | Service ID | Char. Name      | Char. ID | Possible Fields in Char. Value                                       | Access Type | Unit | Description                                  |  
|--------------|------------|-----------------|----------|----------------------------------------------------------------------|-------------|------|----------------------------------------------|  
| **Metering** |  0xBB30    | Power           | 0xCC1E   | id (uint8), flags (uint8), sensorValue (float), units (string)       | R           | W    |                                              |  
|              |            | Current         | 0xCC13   | id (uint8), flags (uint8), sensorValue (float), units (string)       | R           | A    |                                              |  
|              |            | Metering Conf.  | 0xBB31   | config (boolean)                                                     | R/W         |      | Measurment Switch. 0 (OFF), 1 (ON)           |  
|              |            | Metering Peri.  | 0xBB32   | period (uint8)                                                       | R/W         |      | Period = [Data * 10] ms, Data Range : 10~255 |  
| **Relay**    |  0xBB40    | Power Control   | 0xCC0E   | id (uint8), flags (uint8), onOff (boolean)                           | R/W         |      | 0 (NC), 1 (NO)                               |  
| **PIR**      |  0xBB90    | Presence Sensor | 0xCC06   | id (uint8), flags (uint8), dInState (boolean), sensorType (string)   | R/W         |      | 0 (Low), 1 (High)                            |  
| **DIN**      |  0xBB00    | Digital Input   | 0xCC00   | id (uint8), flags (uint8), dInState (boolean)                        | R           |      | 0 (Low), 1 (High)                            |  
| **AIN**      |  0xBB10    | Analogue Input  | 0xCC02   | id (uint8), flags (uint8), aInCurrValue (float), sensorType (string) | R           | mV   |                                              |  
|              |            | AIN Conf.       | 0xBB11   | config (boolean)                                                     | R/W         |      | Measurment Switch. 0 (OFF), 1 (ON)           |  
|              |            | AIN Peri.       | 0xBB12   | period (uint8)                                                       | R/W         |      | Period = [Data * 10] ms, Data Range : 10~255 |  

<a name="Resources"></a>
<br />
## 5. Resources  

 * [電流感測器 - ACS712 Datasheets](https://www.allegromicro.com/~/media/Files/Datasheets/ACS712-Datasheet.ashx?la=en&hash=36988234DAD64352493E4A4686E6C3A927F4D7AC)  
 * [Sample Code for ble-shepherd](https://github.com/sivann-tw/hiver-iot-kit-ble/blob/master/example/powerMeterRelay.js)  
 * [Plugin for ble-shepherd](https://github.com/bluetoother/bshep-plugin-sivann-relay/blob/master/index.js)  
