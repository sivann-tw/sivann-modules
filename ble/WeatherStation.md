# BLE Weather Station Module  

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

BLE Weather Station 模組包含光度、大氣壓力、溫濕度、聲音以及 PM2.5 (需自行購買 [PM 2.5 感測器](https://www.seeedstudio.com/Grove-Dust-Sensor%EF%BC%88PPD42NS%EF%BC%89-p-1050.html)) 等感測器，模組上的感測值皆可透過低功耗藍牙(BLE)以無線方式傳出。  

#### Features  
 * 量測環境光度和 UVI (Si1132)  
 * 量測大氣壓力 (LPS25HB)  
 * 量測溫溼度 (SHT20)  
 * 量測聲音的變化 (SPW2430HR5H)  
 * 量測 PM2.5
 * GATT Characteristics 資料格式符合 [BIPSO](https://github.com/bluetoother/bipso/wiki/BIPSO-Specification) 規範   

#### Specifications  
 * 無線模組：低功耗藍牙 BM05_AN(TI CC2541)  
 * 模組工作電壓: 5V
 * 環境光度：0 – 128k lux  
 * 大氣壓力：260 – 1260 hPa  
 * 溫度：-40 - 125 °C
 * 濕度：0 - 100 %RH
 * 分貝計範圍：35 – 80 dB  

<a name="HW_Overview"></a>
<br />
## 2. Hardware Overview  

此無線感測模組由三種電路模組堆疊而成，包括上層感測模組、中層 BLE 無線模組，以及底層電源模組，如下圖所示。  

![WeatherStation](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/ble_weather.png)  

<a name="Usage"></a>
<br />
## 3. Usage  

1. 連接 Micro USB 以 5V 電源供應  

<a name="Service_Char_UUID"></a>
<br />
## 4. Services & Characteristics UUID  

下表為此模組的 Service 及 Char.(Characteristic) 介紹。  

| Service Name | Service ID |  Char. Name    | Char. ID (Handle ID\*) | Possible Fields in Char. Value                                       | Access Type | Unit       | Description                                    |  
|--------------|------------|----------------|------------------------|----------------------------------------------------------------------|-------------|------------|------------------------------------------------|  
| **Weather**  |  0xBB80    | Barometer      | 0xCC11                 | id (uint8), flags (uint8), sensorValue (float), units (string)       | R           | hPa        |                                                |  
|              |            | Temperature    | 0xCC07                 | id (uint8), flags (uint8), sensorValue (float), units (string)       | R           | °C         |                                                |  
|              |            | Humidity       | 0xCC08                 | id (uint8), flags (uint8), sensorValue (float), units (string)       | R           | %RH        |                                                |  
|              |            | Illuminance    | 0xCC05 (65)            | id (uint8), flags (uint8), sensorValue (float), units (string)       | R           | UV Index   | UVI Data.                                      |  
|              |            | Illuminance    | 0xCC05 (69)            | id (uint8), flags (uint8), sensorValue (float), units (string)       | R           | lux        | Lux Data.                                      |  
|              |            | Loudness       | 0xCC1A                 | id (uint8), flags (uint8), sensorValue (float), units (string)       | R           | dB-SBL     |                                                |  
|              |            | Concentration  | 0xCC1B                 | id (uint8), flags (uint8), sensorValue (float), units (string)       | R           | pcs/0.01cf |                                                |  
|              |            | Weather Conf.  | 0xBB81                 | config (boolean)                                                     | R/W         |            | Measurment Switch. 0 (OFF), 1 (ON)             |  
|              |            | Weather Peri.  | 0xBB82                 | period (uint8)                                                       | R/W         |            | Period = [Data * 10] ms, Data Range : 100~255  |  
| **DIN**      |  0xBB00    | Digital Input  | 0xCC00                 | id (uint8), flags (uint8), dInState (boolean)                        | R           |            | 0 (Low), 1 (High)                              |  
| **AIN**      |  0xBB10    | Analogue Input | 0xCC02                 | id (uint8), flags (uint8), aInCurrValue (float), sensorType (string) | R           | mV         |                                                |  
|              |            | AIN Conf.      | 0xBB11                 | config (boolean)                                                     | R/W         |            | Measurment Switch. 0 (OFF), 1 (ON)             |  
|              |            | AIN Peri.      | 0xBB12                 | period (uint8)                                                       | R/W         |            | Period = [Data * 10] ms, Data Range : 10~255   |  

\* : Handle ID 可用來分辨相同的 Char. ID 的資料。可參考 Reference 的 Sample Code 是如何處理有相同 Char. ID 的情況。  

<a name="Resources"></a>
<br />
## 5. Resources  
 * [光度感測器 - Si1132 Datasheets](https://www.silabs.com/Support%20Documents/TechnicalDocs/Si1132.pdf "Si1132")  
 * [氣壓感測器 - LPS25HB Datasheets](http://www.st.com/content/ccc/resource/technical/document/datasheet/9a/4c/aa/72/1f/45/4e/24/DM00141379.pdf/files/DM00141379.pdf/jcr:content/translations/en.DM00141379.pdf)  
 * [溫溼度感測器 - SHT20 Datasheets](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/Humidity_Sensors/Sensirion_Humidity_Sensors_SHT20_Datasheet_V4.pdf)  
 * [聲音感測器 - SPW2430HR5H-B Datasheets](http://www.mouser.com/ds/2/218/-531228.pdf)  
 * [PM2.5 - Dust Sensor](https://www.seeedstudio.com/Grove-Dust-Sensor%EF%BC%88PPD42NS%EF%BC%89-p-1050.html)  
 * [Sample Code for ble-shepherd](https://github.com/sivann-tw/hiver-iot-kit-ble/blob/master/example/weatherStation.js)
 * [Plugin for ble-shepherd](https://github.com/bluetoother/bshep-plugin-sivann-weatherstation/blob/master/index.js)  
