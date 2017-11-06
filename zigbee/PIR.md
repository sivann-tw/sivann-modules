# Zigbee PIR Module

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

Zigbee 人體紅外線感測器(PIR)模組，可以透過 zigbee 以無線方式發送感測器訊號。  

#### Features  
 * 偵測人體紅外線  
 * 紅外線感測器狀態指示燈(紅色)  
 * 資料格式符合 Zigbee 聯盟規範   

#### Specifications  
 * 無線模組：Zigbee TC2530-pHPTIF256 (TI CC2530)  
 * 模組工作電壓: 5V  

<a name="HW_Overview"></a>
<br />
## 2. Hardware Overview  

此無線感測模組由底層電源模組及上層 Zigbee 無線模組，外加 PIR 感測器組合而成(連接 P4 Connector)，如下圖所示。  

![PIR](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/zigbee_pir.png)  

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

* **PIR Module Cluster ID**  

| Server Side                | Client Side    |  
|----------------------------|----------------|  
| Basic (0x0000)             | Basic (0x0000) |  
| Identify (0x0003)          |                |  
| Occupancy Sensing (0x0406) |                |  

* **Attribute of Basic Cluster Information**  

| Identifier ID | Name                | Access | Default      |  
|---------------|---------------------|--------|--------------|  
| 0x0000        | ZCLVersion          | R      | 0x01         |  
| 0x0003        | HWVersion           | R      | 0x01         |  
| 0x0004        | ManufacturerName    | R      | sivann       |  
| 0x0005        | ModelIdentifier     | R      | pir_001      |  
| 0x0006        | DateCode            | R      | 2017-10-16   |  
| 0x0007        | PowerSource         | R      | 0x01         |  
| 0x0010        | LocationDescription | R/W    |              |  
| 0x0011        | PhysicalEnvironment | R/W    | 0x00         |  
| 0x0012        | DeviceEnabled       | R/W    | 0x01         |  

* **Attribute of  Identify Information**  

| Identifier ID | Name                | Access | Default      |  
|---------------|---------------------|--------|--------------|  
| 0x0000        | IdentifyTime        | R/W    | 0x0000       |  

* **Attribute of Occupancy Sensing Cluster Information**  

| Identifier ID | Name                | Access | Default      |  
|---------------|---------------------|--------|--------------|  
| 0x0000        | Occupancy           | R      | 0x00         |  
| 0x0001        | OccupancySensorType | R      | 0x00         |  

<a name="Resources"></a>
<br />
## 5. Resources  

 * [PIR](http://www.icshopping.com.tw/368030200141/368030200141.pdf)  
