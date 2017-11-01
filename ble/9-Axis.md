# BLE 9-Axis Sensor Module
--------------------

## Contents  
1. [Introduction](#Introduction)  
2. [Hardware Overview](#HW_Overview)  
3. [Usage](#Usage)  
4. [Services and Characteristic UUID](#Service_Char_UUID)  
5. [Resources](#Resources)  

<a name="Introduction"></a>
## 1. Introduction  

BLE 9-Axis 模組包含三軸磁力感測器、三軸加速度及三軸陀螺儀感測器，其所感測到的磁力、加速度以及陀螺儀的數值皆可透過低功耗藍牙(BLE)模組以無線方式讀取。

#### Features  
 * 量測磁力 (MAG3110FCR1)  
 * 量測加速度和陀螺儀 (LSM6DS3)  
 * GATT Characteristics 資料格式符合 [BIPSO](https://github.com/bluetoother/bipso/wiki/BIPSO-Specification) 規範   

#### Specifications  
 * 無線模組：低功耗藍牙 BM05_AN(TI CC2541)  
 * 模組工作電壓: 可使用 3V 電池(CR2032/兩顆 AA 電池)或 3.7V LiPo 鋰離子聚合物電池  
 * 模組最大工作電流：16mA  
 * 3軸磁力計：±1000uT  
 * 3軸加速度：±16g  
 * 3軸陀螺儀：±2000dps  

<a name="HW_Overview"></a>
## 2. Hardware Overview  

此無線感測模組由三種電路模組堆疊而成，包括上層感測模組、中層 BLE 無線模組，以及底層電源模組(電池母板或 USB 母板)，如下圖所示。  

![9-Axis](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/ble_9-axis.png)  

<a name="Usage"></a>
## 3. Usage  

1. 如下圖所示，於模組背面金屬凹槽處置入 CR2032 水銀電池供電，請注意**金屬殼為正極** 
![Battery](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/battery.png)  

<a name="Service_Char_UUID"></a>
## 4. Services & Characteristic UUID  

下表為此模組的 Service 及 Char.(Characteristic) 介紹。  

| Service Name  | Service ID | Char. Name     | Char. ID | Possible Fields in Char. Value                                                                  | Access Type | Unit | Description                                  |  
|---------------|------------|----------------|----------|-------------------------------------------------------------------------------------------------|-------------|------|----------------------------------------------|  
| **Nine-Axis** |  0xBB20    | Gyrometer      | 0xCC24   | id (uint8), flags (uint8), xValue (float), yValue (float), zValue (float), units (string)       | R           | dps  |                                              |  
|               |            | Accelerometer  | 0xCC0F   | id (uint8), flags (uint8), xValue (float), yValue (float), zValue (float), units (string)       | R           | mg   |                                              |  
|               |            | Magnetometer   | 0xCC10   | id (uint8), flags (uint8), xValue (float), yValue (float), zValue (float), units (string)       | R           | uT   |                                              |   
|               |            | NineAxis Conf. | 0xBB21   | config (boolean)                                                                                | R/W         |      | Measurment Switch. 0 (OFF), 1 (ON)           |  
|               |            | NineAxis Peri. | 0xBB22   | period (uint8)                                                                                  | R/W         |      | Period = [Data * 10] ms, Data Range : 10~255 |  
| **DIN**       |  0xBB00    | Digital Input  | 0xCC00   | id (uint8), flags (uint8), dInState (boolean)                                                   | R           |      | 0 (Low), 1 (High)                            |  
| **AIN**       |  0xBB10    | Analogue Input | 0xCC02   | id (uint8), flags (uint8), aInCurrValue (float), sensorType (string)                            | R           | mV   |                                              |  
|               |            | AIN Conf.      | 0xBB11   | config (boolean)                                                                                | R/W         |      | Measurment Switch. 0 (OFF), 1 (ON)           |  
|               |            | AIN Peri.      | 0xBB12   | period (uint8)                                                                                  | R/W         |      | Period = [Data * 10] ms, Data Range : 10~255 |  


<a name="Resources"></a>
## 5. Resources  
 * [MAG3110 Datasheets](https://www.nxp.com/files/sensors/doc/data_sheet/MAG3110.pdf)   
 * [LSM6DS3 Datasheets](http://www.st.com/content/ccc/resource/technical/document/datasheet/a3/f5/4f/ae/8e/44/41/d7/DM00133076.pdf/files/DM00133076.pdf/jcr:content/translations/en.DM00133076.pdf)  
 * [Sample Code for ble-shepherd](https://github.com/sivann-tw/hiver-iot-kit-ble/blob/master/example/nineAxis.js)  
 * [Plugin for ble-shepherd](https://github.com/bluetoother/bshep-plugin-sivann-nineaxis/blob/master/index.js)  
