# Zigbee Power Meter Relay Module  

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

Zigbee Power Meter Relay 模組包含繼電器及電流感測器，並可透過 zigbee 以無線方式控制切換電器開關、讀取量測的電流值。  

#### Features  
 * 量測 AC 電流，電流值範圍 120 mA 至 3A (誤差範圍 ±10%)  
 * 量測 AC 功率，功率範圍 13 W 至 330 W (誤差範圍 ±10%)  
 * 繼電器狀態指示燈(綠色)  
 * 資料格式符合 Zigbee 聯盟規範   

#### Specifications  
 * 無線模組：Zigbee TC2530-pHPTIF256 (TI CC2530)  
 * 模組工作電壓: 5V  
 * 模組最大工作電流: 85mA  
 * 繼電器壽命: 100,000 次 (電子式切換)  
 * 繼電器規格: 3A, 120VAC / 24VDC  

<a name="HW_Overview"></a>
<br />
## 2. Hardware Overview  

此無線感測模組由三種電路模組堆疊而成，包括上層感測模組、中層 Zigbee 無線模組，以及底層電源模組，如下圖所示。  

![Relay](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/zigbee_relay.png)  

<a name="Usage"></a>
<br />
## 3. Usage  

1. 連接電器  
2. 連接 Micro USB 以 5V 電源供應  

<a name="Clusters"></a>
<br />
## 4. Clusters & Attributes  

下列表格為此模組的 Cluster 及 Attribute 介紹。  

* **Profile ID**: HA (0x0104)  
* **Device ID**: Smart Plug (0x0051)  
* **Endpoint ID**: 1  

* **Power Meter Relay Module Cluster ID**  

| Server Side                     | Client Side    |  
|---------------------------------|----------------|  
| Basic (0x0000)                  | Basic (0x0000) |  
| Identify (0x0003)               |                |  
| On/Off (0x0006)                 |                |  
| Electrical Measurement (0X0B04) |                |  

* **Attribute of Basic Cluster Information**  

| Identifier ID | Name                | Access | Default      |  
|---------------|---------------------|--------|--------------|  
| 0x0000        | ZCLVersion          | R      | 0x01         |  
| 0x0003        | HWVersion           | R      | 0x01         |  
| 0x0004        | ManufacturerName    | R      | sivann       |  
| 0x0005        | ModelIdentifier     | R      | relay_001    |  
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

* **Attribute of Electrical Measurement Cluster Information**  

| Identifier ID | Name                | Access | Default       |  
|---------------|---------------------|--------|---------------|  
| 0x0000        | MeasurementType     | R      | 0x00000001    |  
| 0x0508        | RMSCurrent          | R      | 0x0000        |  
| 0x050B        | ActivePower         | R      | 0             |  

<a name="Resources"></a>
<br />
## 5. Resources  

 * [電流感測器 - ACS712 Datasheets](https://www.allegromicro.com/~/media/Files/Datasheets/ACS712-Datasheet.ashx?la=en&hash=36988234DAD64352493E4A4686E6C3A927F4D7AC)  
