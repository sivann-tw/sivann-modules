# Zigbee Gas Alarm Module

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

Zigbee Gas Alarm 模組包含 MQ-2 煙霧感測器以及蜂鳴器，蜂鳴器的開關可透過 zigbee 模組以無線方式控制。MQ-2 感測器對於煙霧、甲烷、丙烷和乙醇等氣體有不同的敏感度。  

#### Features  
 * 偵測煙霧與其他可燃性氣體濃度，單位為 ppm  
 * 可遠端操作蜂鳴器開關   
 * 資料格式符合 ZigBee 聯盟規範   

#### Specifications  
 * 無線模組：Zigbee TC2530-pHPTIF256 (TI CC2530)  
 * 模組工作電壓：5V  
 * 模組最大工作電流：240mA  
 * MQ-2 檢測濃度範圍：100 - 10000ppm (300ppm 以下為估算值)  
 * MQ-2 預熱時間：不低於 48 小時  

<a name="HW_Overview"></a>
<br />
## 2. Hardware Overview  

此無線感測模組由三種電路模組堆疊而成，包括上層感測模組、中層 Zigbee 無線模組，以及底層電源模組，如下圖所示。  

![GasAlarm](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/zigbee_gas.png)  

<a name="Usage"></a>
<br />
## 3. Usage  

1. 連接 Micro USB 以 5V 電源供應  
2. 等待煙霧感測器 MQ-2 預熱完畢後，可開始正常量測  

#### Notes  
1. MQ-2 感測器需預熱一段時間，量測數值才較準確  

<a name="Clusters"></a>
<br />
## 4. Clusters & Attributes  

下列表格為此模組的 Cluster 及 Attribute 介紹。  

* **Profile ID**: HA (0x0104)  
* **Device ID**: Simple Sensor (0x000C)  
* **Endpoint ID**: 1  

* **Gas Alarm Module Cluster ID**  

| Server Side                 | Client Side    |  
|-----------------------------|----------------|  
| Basic (0x0000)              | Basic (0x0000) |  
| Identify (0x0003)           |                |  
| On/Off (0x0006)             |                |  
| Analog Input Basic (0x000C) |                |  

* **Attribute of Basic Cluster Information**  

| Identifier ID | Name                | Access | Default      |  
|---------------|---------------------|--------|--------------|  
| 0x0000        | ZCLVersion          | R      | 0x01         |  
| 0x0003        | HWVersion           | R      | 0x01         |  
| 0x0004        | ManufacturerName    | R      | sivann       |  
| 0x0005        | ModelIdentifier     | R      | gasAlarm_001 |  
| 0x0006        | DateCode            | R      | 2017-09-30   |  
| 0x0007        | PowerSource         | R      | 0x01         |  
| 0x0010        | LocationDescription | R/W    |              |  
| 0x0011        | PhysicalEnvironment | R/W    | 0x00         |  
| 0x0012        | DeviceEnabled       | R/W    | 0x01         |  

* **Attribute of  Identify Information**  

| Identifier ID | Name                | Access | Default      |  
|---------------|---------------------|--------|--------------|  
| 0x0000        | IdentifyTime        | R/W    | 0x0000       |  

* **Attribute of On/Off Cluster Information**  

| Identifier ID | Name                | Access | Default      |  
|---------------|---------------------|--------|--------------|  
| 0x0000        | OnOff               | R      | 0x00         |  

* **Attribute of Analog Input Basic Cluster Information**  

| Identifier ID | Name                | Access | Default      |  
|---------------|---------------------|--------|--------------|  
| 0x0041        | MaxPresentValue     | R/W    | 10000 ppm    |  
| 0x0045        | MinPresentValue     | R/W    | 100 ppm      |  
| 0x0051        | OutOfService        | R/W    | 0x00         |  
| 0x0055        | PresentValue        | R      | 0            |  
| 0x006F        | StatusFlags         | R      | 0x00         |  

<a name="Resources"></a>
<br />
## 5. Resources  

 * [MQ-2 Datasheets](http://style.winsensor.com/pro_pdf/MQ-2.pdf)  
