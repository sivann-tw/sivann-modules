# Zigbee Weather Station Module  

<br />

## Contents  
1. [Introduction](#Introduction)  
2. [Hardware Overview](#HW_Overview)  
3. [Usage](#Usage)  
4. [Clusters & Attributes](#Clusters)  
5. [Resources](#Resources)  

<a name="Introduction"></a>
<br />
## 1. Introduction  

Zigbee Weather Station 模組包含光度、大氣壓力、溫濕度、聲音以及 PM2.5 (需自行購買 [PM 2.5 感測器](https://www.seeedstudio.com/Grove-Dust-Sensor%EF%BC%88PPD42NS%EF%BC%89-p-1050.html)) 等感測器，模組上的感測值皆可透過 zigbee 以無線方式傳出。  

#### Features  
 * 量測環境光度 (Si1132)  
 * 量測大氣壓力 (LPS25HB)  
 * 量測溫溼度 (SHT20)  
 * 量測聲音響度 (SPW2430HR5H)  
 * 量測 PM2.5
 * 資料格式符合 Zigbee 聯盟規範   

#### Specifications  
 * 無線模組：Zigbee TC2530-pHPTIF256 (TI CC2530)  
 * 模組工作電壓: 5V
 * 環境光度：0 – 128k lux  
 * 大氣壓力：260 – 1260 hPa  
 * 溫度：-40 - 125 °C
 * 濕度：0 - 100 %RH
 * 分貝計範圍：35 – 80 dB  

<a name="HW_Overview"></a>
<br />
## 2. Hardware Overview  

此無線感測模組由三種電路模組堆疊而成，包括上層感測模組、中層 Zigbee 無線模組，以及底層電源模組，如下圖所示。  

![WeatherStation](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/zigbee_weather.png)  

<a name="Usage"></a>
<br />
## 3. Usage  

1. 連接 Micro USB 以 5V 電源供應  

<a name="Clusters"></a>
<br />
## 4. Clusters & Attributes  

下列表格為此模組的 Cluster 及 Attribute 介紹。  

* **Profile ID**: HA (0x0104)  
* **Device ID**: Simple Sensor (0x000C)  
* **Endpoint ID**: 1  

* **Weather Station Module Cluster ID**  

| Server Side                            | Client Side    |  
|----------------------------------------|----------------|  
| Basic (0x0000)                         | Basic (0x0000) |  
| Identify (0x0003)                      |                |  
| Analog Input Basic (0x000C)            |                |  
| Analog Value Basic (0x000C)            |                |  
| Illuminance Measurement (0x0400)       |                |  
| Temperature Measurement (0x0402)       |                |  
| Pressure Measurement (0x0403)          |                |  
| Relative Humidity Measurement (0x0405) |                |  

* **Attribute of Basic Cluster Information**  

| Identifier ID | Name                | Access | Default            |  
|---------------|---------------------|--------|--------------------|  
| 0x0000        | ZCLVersion          | R      | 0x01               |  
| 0x0003        | HWVersion           | R      | 0x01               |  
| 0x0004        | ManufacturerName    | R      | sivann             |  
| 0x0005        | ModelIdentifier     | R      | weather_001        |  
| 0x0006        | DateCode            | R      | 2017-10-16         |  
| 0x0007        | PowerSource         | R      | 0x01               |  
| 0x0010        | LocationDescription | R/W    |                    |  
| 0x0011        | PhysicalEnvironment | R/W    | 0x00               |  
| 0x0012        | DeviceEnabled       | R/W    | 0x01               |  

* **Attribute of  Identify Information**  

| Identifier ID | Name                | Access | Default            |  
|---------------|---------------------|--------|--------------------|  
| 0x0000        | IdentifyTime        | R/W    | 0x0000             |  

* **Attribute of Analog Input Basic Cluster Information** (註：用於 聲音響度)  

| Identifier ID | Name                | Access | Default            |  
|---------------|---------------------|--------|--------------------|  
| 0x0051        | OutOfService        | R/W    | 0x00               |  
| 0x0055        | PresentValue        | R      | 0                  |  
| 0x006F        | StatusFlags         | R      | 0x00               |  

* **Attribute of Analog Value Basic Cluster Information** (註：用於 PM2.5)  

| Identifier ID | Name                | Access | Default            |  
|---------------|---------------------|--------|--------------------|  
| 0x0051        | OutOfService        | R/W    | 0x00               |  
| 0x0055        | PresentValue        | R      | 0                  |  
| 0x006F        | StatusFlags         | R      | 0x00               |  

* **Attribute of Illuminance Measurement Cluster Information**  

| Identifier ID | Name                | Access | Default            |  
|---------------|---------------------|--------|--------------------|  
| 0x0051        | MeasuredValue       | R      | 0x0000             |  
| 0x0055        | MinMeasuredValue    | R      | 1 (1 lux)          |  
| 0x006F        | MaxMeasuredValue    | R      | 51073 (128000 lux) |  

* **Attribute of Temperature Measurement Cluster Information**  

| Identifier ID | Name                | Access | Default             |  
|---------------|---------------------|--------|---------------------|  
| 0x0051        | MeasuredValue       | R      | 0x0000              |  
| 0x0055        | MinMeasuredValue    | R      | -4000 (-40 ºC))     |  
| 0x006F        | MaxMeasuredValue    | R      | 12500 (125 ºC)      |  

* **Attribute of Pressure Measurement Cluster Information**  

| Identifier ID | Name                | Access | Default             |  
|---------------|---------------------|--------|---------------------|  
| 0x0051        | MeasuredValue       | R      | 0x0000              |  
| 0x0055        | MinMeasuredValue    | R      | 260 (26 kPa)        |  
| 0x006F        | MaxMeasuredValue    | R      | 1260 (126 kPa)      |  

* **Attribute of Relative Humidity Measurement Cluster Information**  

| Identifier ID | Name                | Access | Default             |  
|---------------|---------------------|--------|---------------------|  
| 0x0051        | MeasuredValue       | R      | 0x0000              |  
| 0x0055        | MinMeasuredValue    | R      | 0 (0 %RH)           |  
| 0x006F        | MaxMeasuredValue    | R      | 10000 (100 %RH)     |  

<a name="Resources"></a>
<br />
## 5. Resources  
 * [光度感測器 - Si1132 Datasheets](https://www.silabs.com/Support%20Documents/TechnicalDocs/Si1132.pdf)  
 * [氣壓感測器 - LPS25HB Datasheets](http://www.st.com/content/ccc/resource/technical/document/datasheet/9a/4c/aa/72/1f/45/4e/24/DM00141379.pdf/files/DM00141379.pdf/jcr:content/translations/en.DM00141379.pdf)  
 * [溫溼度感測器 - SHT20 Datasheets](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/Humidity_Sensors/Sensirion_Humidity_Sensors_SHT20_Datasheet_V4.pdf)  
 * [聲音感測器 - SPW2430HR5H-B Datasheets](http://www.mouser.com/ds/2/218/-531228.pdf)  
 * [PM2.5 - Dust Sensor](https://www.seeedstudio.com/Grove-Dust-Sensor%EF%BC%88PPD42NS%EF%BC%89-p-1050.html)  
