

# 可视化

## 数据库

### 就诊数据表

| id   | HISID | HOSPITAL_ID | HOSPITAL_NAME | PATIENT_ID | PATIENT_NAME | PHYSICIAN_ID | PHYSICIAN_NAME | dept_id | DEPTNAME | ADMISSION_DISEASE_ID | DISCHARGE_DISEASE_ID | Is_fraud |
| ---- | ----- | ----------- | ------------- | ---------- | ------------ | ------------ | -------------- | ------- | -------- | -------------------- | -------------------- | -------- |
|      |       |             |               |            |              |              |                |         |          |                      |                      |          |

### 就诊记录表

| PATIENT_ID | PATIENT_NAME | PATIENT_SEX | PATIENT_BIRTH | BENEFIT_TYPE | BENEFIT_GROUP_ID | AREA_ID | ID_TYPE | ID_NUMBER | COMPANY | ADDRESS |
| ---------- | ------------ | ----------- | ------------- | ------------ | ---------------- | ------- | ------- | --------- | ------- | ------- |
|            |              |             |               |              |                  |         |         |           |         |         |

### 节点相似度表（病人）

| PATIENT_ID1 | PATIENT_ID1 | SIMILARITY |
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
