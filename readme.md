

# 可视化

## 数据库

### 就诊数据表

| id   | HISID | HOSPITAL_ID | HOSPITAL_NAME | PATIENT_ID | PATIENT_NAME | PHYSICIAN_ID | PHYSICIAN_NAME | dept_id | DEPTNAME | ADMISSION_DISEASE_ID | DISCHARGE_DISEASE_ID | Is_fraud |
| ---- | ----- | ----------- | ------------- | ---------- | ------------ | ------------ | -------------- | ------- | -------- | -------------------- | -------------------- | -------- |
|      |       |             |               |            |              |              |                |         |          |                      |                      |          |

### 病人信息表

| PATIENT_ID | PATIENT_NAME | PATIENT_SEX | PATIENT_BIRTH | BENEFIT_TYPE | BENEFIT_GROUP_ID | AREA_ID | ID_TYPE | ID_NUMBER | COMPANY | ADDRESS |
| ---------- | ------------ | ----------- | ------------- | ------------ | ---------------- | ------- | ------- | --------- | ------- | ------- |
|            |              |             |               |              |                  |         |         |           |         |         |

### 节点相似度表（病人）

| PATIENT_ID1 | PATIENT_ID2 | SIMILARITY |
| ----------- | ----------- | ---------- |
|             |             |            |

### 社区归属表（病人）

| PATIENT_ID | COMMUNITY_ID |
| ---------- | ------------ |
|            |              |

### 关联路径表（病人）

| step | internal_node_type1 | internal_node_type2 | internal_node_type3 | patient1 | patient2 | internal_node1 | internal_patient1 | internal_node2 | internal_patient2 | internal_node3 |
| ---- | ------------------- | ------------------- | ------------------- | -------- | -------- | -------------- | ----------------- | -------------- | ----------------- | -------------- |
|      |                     |                     |                     |          |          |                |                   |                |                   |                |



docker run -v d:\桌面\v-project:/home/upload -p 9528:9528 -it centos-node-v2.0 bash

docker commit cdf59ea66530 centos-node-v2.2

docker run -dit -v /root/zt/data:/home/upload --privileged --name=centos-mysql-node centos-mysql-node:v1.0 /usr/sbin/init

source /etc/profile

docker exec -it centos-mysql-node-v1.0 /bin/bash

systemctl start mysqld.service

## 建库建表



```mysql
create database real_data;

CREATE TABLE patient_info (
    id INT NOT NULL AUTO_INCREMENT,
    PATIENT_ID VARCHAR(255) NOT NULL default '',
    PATIENT_NAME VARCHAR(255) NOT NULL default '',
    PATIENT_SEX VARCHAR(255) NOT NULL default '',
    PATIENT_BIRTH VARCHAR(255) NOT NULL default '',
    BENEFIT_TYPE VARCHAR(255) NOT NULL default '',
    BENEFIT_GROUP VARCHAR(255) NOT NULL default '',
    AREA_ID VARCHAR(255) NOT NULL default '',
    ID_TYPE VARCHAR(255) NOT NULL default '',
    ID_NUMBER VARCHAR(255) NOT NULL default '',
    COMPANY VARCHAR(255) NOT NULL default '',
    ADDRESS VARCHAR(255) NOT NULL default '',
    PRIMARY KEY (id)
);

CREATE TABLE medical_record (
    id INT NOT NULL AUTO_INCREMENT,
    HISID VARCHAR(255) NOT NULL default '',
    HOSPITAL_ID VARCHAR(255) NOT NULL default '',
    HOSPITAL_NAME VARCHAR(255) NOT NULL default '',
    PATIENT_ID  VARCHAR(255) NOT NULL default '',
    PATIENT_NAME VARCHAR(255) NOT NULL default '',
    PHYSICIAN_ID VARCHAR(255) NOT NULL default '',
    PHYSICIAN_NAME VARCHAR(255) NOT NULL default '',
    dept_id VARCHAR(255) NOT NULL default '',
    ID_NUMBER VARCHAR(255) NOT NULL default '',
    DEPTNAME VARCHAR(255) NOT NULL default '',
    ADMISSION_DISEASE_ID VARCHAR(255) NOT NULL default '',
    DISCHARGE_DISEASE_ID VARCHAR(255) NOT NULL default '',
    Is_fraud VARCHAR(255) NOT NULL default '',
    PRIMARY KEY (id)
);

CREATE TABLE path_info (
    id INT NOT NULL AUTO_INCREMENT,
    internal_node_type1 VARCHAR(255) NOT NULL default '',
    internal_node_type2 VARCHAR(255) NOT NULL default '',
    internal_node_type3 VARCHAR(255) NOT NULL default '',
    patient1  VARCHAR(255) NOT NULL default '',
    patient2 VARCHAR(255) NOT NULL default '',
    internal_node1 VARCHAR(255) NOT NULL default '',
    related_node1 VARCHAR(255) NOT NULL default '',
    internal_node2 VARCHAR(255) NOT NULL default '',
    related_node2 VARCHAR(255) NOT NULL default '',
    internal_node3 VARCHAR(255) NOT NULL default '',
    PRIMARY KEY (id)
);
```

```
修改sever的model
const Record = seq.define('medical_record', {
    // id 会被sequelize自动创建, 管理
    HISID: DataTypes.INTEGER,
    HOSPITAL_ID: DataTypes.STRING,
    HOSPITAL_NAME: DataTypes.STRING,
    PATIENT_ID: DataTypes.STRING,
    PATIENT_NAME: DataTypes.STRING,
    PHYSICIAN_ID: DataTypes.STRING,
    PHYSICIAN_NAME: DataTypes.STRING,
    dept_id: DataTypes.STRING,
    ID_NUMBER: DataTypes.STRING,
    DEPTNAME: DataTypes.STRING,
    ADMISSION_DISEASE_ID: DataTypes.STRING,
    DISCHARGE_DISEASE_ID: DataTypes.STRING,
	Is_fraud: DataTypes.STRING,
}, {
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步    
    timestamps: false
})

const Path = seq.define('path_info', {
    // id 会被sequelize自动创建, 管理
    step: DataTypes.STRING,
    internal_node_type1: DataTypes.STRING,
    internal_node_type2: DataTypes.STRING,
    internal_node_type3: DataTypes.STRING,
    patient1: DataTypes.STRING,
    patient2: DataTypes.STRING,
    internal_node1: DataTypes.STRING,
    related_node1: DataTypes.STRING,
    internal_node2: DataTypes.STRING,
    related_node2: DataTypes.STRING,
    internal_node3: DataTypes.STRING,

}, {
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步    
    timestamps: false
})

const Patient = seq.define('patient_info', {
    // id 会被sequelize自动创建, 管理
    PATIENT_ID: DataTypes.STRING,
    PATIENT_NAME: DataTypes.STRING,
    PATIENT_SEX: DataTypes.STRING,
    PATIENT_BIRTH: DataTypes.STRING,
    BENEFIT_TYPE: DataTypes.STRING,
    BENEFIT_GROUP_ID: DataTypes.STRING,
    AREA_ID: DataTypes.STRING,
    ID_TYPE: DataTypes.STRING,
    ID_NUMBER: DataTypes.STRING,
    COMPANY: DataTypes.STRING,
    ADDRESS: DataTypes.STRING,
}, {
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步    
    timestamps: false
})
```

```
导入csv文件
LOAD DATA LOCAL INFILE  '/home/upload/attribute_data.csv'
INTO TABLE patient_info
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE  '/home/upload/path_data.csv'
INTO TABLE medical_record
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE  '/home/upload/related_path.csv'
INTO TABLE path_info
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```



