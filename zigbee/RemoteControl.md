# Zigbee Remote Control Module

<br />

## Contents  
1. [Introduction](#Introduction)  
2. [Hardware Overview](#HW_Overview)  
3. [Usage](#Usage)  
4. [Clusters & Attributes](#Clusters)  

<a name="Introduction"></a>
<br />
## 1. Introduction  

Zigbee Remote Control 模組上面有 5 個按鍵，每個按鍵的點擊都會透過 BLE 將資訊傳出，得知哪個按鍵被按下。  

#### Features  
 * 5 個按鍵給使用者使用  
 * 資料格式符合 Zigbee 聯盟規範   

#### Specifications  
 * 無線模組：Zigbee TC2530-pHPTIF256 (TI CC2530)  
 * 模組工作電壓: 可使用 3V 電池(CR2032/兩顆 AA 電池)或 3.7V LiPo 鋰離子聚合物電池  

<a name="HW_Overview"></a>
<br />
## 2. Hardware Overview  

此無線模組由三種電路模組堆疊而成，包括上層感測模組、中層 Zigbee 無線模組，以及底層電源模組，如下圖所示。  

![RemoteControl](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/zigbee_remote.png)  

<a name="Usage"></a>
<br />
## 3. Usage  

1. 如下圖所示，於模組背面金屬凹槽處置入 CR2032 水銀電池供電，請注意**金屬殼為正極** 
![Battery](https://raw.githubusercontent.com/sivann-tw/sivann-modules/master/media/battery.png)  
2. 按鍵功能如下:  
    | Button | Description                 |  
    |--------|-----------------------------|  
    | UP     | Level Control Move Up Cmd   |  
    | DOWN   | Level Control Move Down Cmd |  
    | SELECT | On/Off Toggle Cmd           |  
    | LEFT   | Level Control Step Down Cmd |  
    | RIGHT  | Level Control Step Up Cmd   |  


<a name="Clusters"></a>
<br />
## 4. Clusters & Attributes  

下列表格為此模組的 Cluster 及 Attribute 介紹。  

* **Profile ID**: HA (0x0104)  
* **Device ID**: On/Off Switch (0x0000)  
* **Endpoint ID**: 1  

* **Remote Control Module Cluster ID**  

| Server Side       | Client Side            |  
|-------------------|------------------------|  
| Basic (0x0000)    | Basic (0x0000)         |  
| Identify (0x0003) | On/Off (0x0006)        |  
|                   | Level Control (0x0008) |  

* **Attribute of Basic Cluster Information**  

| Identifier ID | Name                | Access | Default      |  
|---------------|---------------------|--------|--------------|  
| 0x0000        | ZCLVersion          | R      | 0x01         |  
| 0x0003        | HWVersion           | R      | 0x01         |  
| 0x0004        | ManufacturerName    | R      | sivann       |  
| 0x0005        | ModelIdentifier     | R      | remote_001   |  
| 0x0006        | DateCode            | R      | 2017-10-16   |  
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
