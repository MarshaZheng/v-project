/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : v-project

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 10/01/2022 13:05:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for community_info
-- ----------------------------
DROP TABLE IF EXISTS `community_info`;
CREATE TABLE `community_info`  (
  `id` int(0) NOT NULL,
  `PATIENT_ID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `COMMUNITY_ID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`, `PATIENT_ID`, `COMMUNITY_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of community_info
-- ----------------------------
INSERT INTO `community_info` VALUES (1, '1', '1');
INSERT INTO `community_info` VALUES (2, '2', '1');
INSERT INTO `community_info` VALUES (3, '3', '1');
INSERT INTO `community_info` VALUES (4, '4', '2');
INSERT INTO `community_info` VALUES (5, '5', '2');
INSERT INTO `community_info` VALUES (6, '6', '2');
INSERT INTO `community_info` VALUES (7, '7', '1');
INSERT INTO `community_info` VALUES (8, '8', '3');
INSERT INTO `community_info` VALUES (9, '9', '3');
INSERT INTO `community_info` VALUES (10, '10', '3');

-- ----------------------------
-- Table structure for dept_info
-- ----------------------------
DROP TABLE IF EXISTS `dept_info`;
CREATE TABLE `dept_info`  (
  `id` int(0) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dept_info
-- ----------------------------
INSERT INTO `dept_info` VALUES (1, 'xx');
INSERT INTO `dept_info` VALUES (2, 'xx');
INSERT INTO `dept_info` VALUES (3, 'xxx');

-- ----------------------------
-- Table structure for hospital_info
-- ----------------------------
DROP TABLE IF EXISTS `hospital_info`;
CREATE TABLE `hospital_info`  (
  `id` int(0) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `p_level` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `area_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `flag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `load_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `h_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `charge_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hospital_info
-- ----------------------------
INSERT INTO `hospital_info` VALUES (1, 'xxx医院', '1', '1', '1', '1', '1', '1', '1', '1', '1');
INSERT INTO `hospital_info` VALUES (2, 'xx医院', '2', '2', '2', '2', '2', '2', '2', '2', '2');

-- ----------------------------
-- Table structure for medical_record
-- ----------------------------
DROP TABLE IF EXISTS `medical_record`;
CREATE TABLE `medical_record`  (
  `ID` int(0) NOT NULL,
  `TIME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `PATIENT_ID` int(0) NULL DEFAULT NULL,
  `PATIENT_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `HOSPITAL_ID` int(0) NULL DEFAULT NULL,
  `HOSPITAL_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `PHYSICIAN_ID` int(0) NULL DEFAULT NULL,
  `PHYSICIAN_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `DEPT_ID` int(0) NULL DEFAULT NULL,
  `DEPT_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ADMISSION_DISEASE_ID` int(0) NULL DEFAULT NULL,
  `DISCHARGE_DISEASE_ID` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of medical_record
-- ----------------------------
INSERT INTO `medical_record` VALUES (1, '2020-01-01', 1, 'xxx', 1, 'xxx', 2, 'xxx', 3, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (2, '2020-01-02', 4, 'xxx', 1, 'xxx', 1, 'xxx', 2, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (3, '2020-01-03', 3, 'xxx', 1, 'xxx', 1, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (4, '2020-01-04', 1, 'xxx', 2, 'xxx', 3, 'xxx', 2, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (5, '2020-01-05', 1, 'xxx', 2, 'xxx', 3, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (6, '2020-01-06', 4, 'xxx', 1, 'xxx', 1, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (7, '2020-01-07', 1, 'xxx', 1, 'xxx', 2, 'xxx', 2, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (8, '2020-01-01', 2, 'xxx', 1, 'xxx', 1, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (9, '2020-01-02', 2, 'xxx', 2, 'xxx', 1, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (10, '2020-01-03', 3, 'xxx', 1, 'xxx', 1, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (11, '2020-01-04', 2, 'xxx', 2, 'xxx', 2, 'xxx', 3, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (12, '2020-01-05', 3, 'xxx', 2, 'xxx', 2, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (13, '2020-01-06', 2, 'xxx', 1, 'xxx', 1, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (14, '2020-01-07', 1, 'xxx', 1, 'xxx', 1, 'xxx', 3, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (15, '2020-01-05', 5, 'xxx', 2, 'xxx', 3, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (16, '2020-01-02', 6, 'xxx', 1, 'xxx', 1, 'xxx', 2, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (17, '2020-01-03', 7, 'xxx', 1, 'xxx', 1, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (18, '2020-01-04', 8, 'xxx', 2, 'xxx', 3, 'xxx', 2, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (19, '2020-01-05', 9, 'xxx', 2, 'xxx', 3, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (20, '2020-01-06', 5, 'xxx', 1, 'xxx', 1, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (21, '2020-01-07', 6, 'xxx', 1, 'xxx', 2, 'xxx', 2, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (22, '2020-01-01', 7, 'xxx', 1, 'xxx', 1, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (23, '2020-01-02', 8, 'xxx', 2, 'xxx', 1, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (24, '2020-01-03', 9, 'xxx', 1, 'xxx', 1, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (25, '2020-01-04', 5, 'xxx', 2, 'xxx', 2, 'xxx', 3, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (26, '2020-01-05', 6, 'xxx', 2, 'xxx', 2, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (27, '2020-01-06', 7, 'xxx', 1, 'xxx', 1, 'xxx', 1, 'xxx', 0, 0);
INSERT INTO `medical_record` VALUES (28, '2020-01-07', 8, 'xxx', 1, 'xxx', 1, 'xxx', 3, 'xxx', 0, 0);

-- ----------------------------
-- Table structure for path_info
-- ----------------------------
DROP TABLE IF EXISTS `path_info`;
CREATE TABLE `path_info`  (
  `id` int(0) NOT NULL,
  `patient1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `patient2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `step` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `internal_node_type1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `internal_node_type2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `internal_node_type3` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `internal_node1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `internal_patient1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `internal_node2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `internal_patient2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `internal_node3` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of path_info
-- ----------------------------
INSERT INTO `path_info` VALUES (1, '1', '2', 'step1', 'PHYSICIAN_ID', NULL, NULL, '1', NULL, NULL, NULL, NULL);
INSERT INTO `path_info` VALUES (2, '1', '2', 'step1', 'PHYSICIAN_ID', NULL, NULL, '2', NULL, NULL, NULL, NULL);
INSERT INTO `path_info` VALUES (3, '1', '2', 'step1', 'HOSPITAL_ID', NULL, NULL, '1', NULL, NULL, NULL, NULL);
INSERT INTO `path_info` VALUES (4, '1', '2', 'step1', 'HOSPITAL_ID', NULL, NULL, '2', NULL, NULL, NULL, NULL);
INSERT INTO `path_info` VALUES (5, '1', '2', 'step1', 'DEPT_ID', NULL, NULL, '1', NULL, NULL, NULL, NULL);
INSERT INTO `path_info` VALUES (6, '1', '2', 'step1', 'DEPT_ID', NULL, NULL, '2', NULL, NULL, NULL, NULL);
INSERT INTO `path_info` VALUES (7, '1', '2', 'step2', 'PHYSICIAN_ID', 'HOSPITAL_ID', NULL, '1', '3', '3', NULL, NULL);
INSERT INTO `path_info` VALUES (8, '1', '2', 'step2', 'PHYSICIAN_ID', 'DEPT_ID', NULL, '2', '4', '4', NULL, NULL);
INSERT INTO `path_info` VALUES (9, '1', '2', 'step2', 'HOSPITAL_ID', 'PHYSICIAN_ID', NULL, '1', '5', '5', NULL, NULL);
INSERT INTO `path_info` VALUES (10, '1', '2', 'step2', 'HOSPITAL_ID', 'DEPT_ID', NULL, '2', '6', '6', NULL, NULL);
INSERT INTO `path_info` VALUES (11, '1', '2', 'step2', 'DEPT_ID', 'HOSPITAL_ID', NULL, '1', '7', '7', NULL, NULL);
INSERT INTO `path_info` VALUES (12, '1', '2', 'step2', 'DEPT_ID', 'PHYSICIAN_ID', NULL, '2', '8', '8', NULL, NULL);
INSERT INTO `path_info` VALUES (13, '1', '2', 'step3', 'PHYSICIAN_ID', 'HOSPITAL_ID', 'PHYSICIAN_ID', '1', '3', '3', '9', '9');
INSERT INTO `path_info` VALUES (14, '1', '2', 'step3', 'PHYSICIAN_ID', 'DEPT_ID', 'PHYSICIAN_ID', '2', '4', '4', '10', '10');
INSERT INTO `path_info` VALUES (15, '1', '2', 'step3', 'HOSPITAL_ID', 'PHYSICIAN_ID', 'HOSPITAL_ID', '1', '5', '5', '11', '11');
INSERT INTO `path_info` VALUES (16, '1', '2', 'step3', 'HOSPITAL_ID', 'DEPT_ID', 'HOSPITAL_ID', '2', '6', '6', '12', '12');
INSERT INTO `path_info` VALUES (17, '1', '2', 'step3', 'DEPT_ID', 'HOSPITAL_ID', 'DEPT_ID', '1', '7', '7', '13', '13');
INSERT INTO `path_info` VALUES (18, '1', '2', 'step3', 'DEPT_ID', 'PHYSICIAN_ID', 'DEPT_ID', '2', '8', '8', '14', '14');
INSERT INTO `path_info` VALUES (19, '1', '2', 'step3', 'PHYSICIAN_ID', 'HOSPITAL_ID', 'PHYSICIAN_ID', '3', '6', '5', '6', '2');
INSERT INTO `path_info` VALUES (20, '1', '2', 'step3', 'PHYSICIAN_ID', 'HOSPITAL_ID', 'PHYSICIAN_ID', '2', '4', '3', '4', '8');
INSERT INTO `path_info` VALUES (21, '1', '2', 'step3', 'PHYSICIAN_ID', 'HOSPITAL_ID', 'PHYSICIAN_ID', '5', '3', '7', '5', '7');
INSERT INTO `path_info` VALUES (22, '2', '3', 'step1', 'PHYSICIAN_ID', NULL, NULL, '1', NULL, NULL, NULL, NULL);
INSERT INTO `path_info` VALUES (23, '2', '3', 'step1', 'PHYSICIAN_ID', NULL, NULL, '2', NULL, NULL, NULL, NULL);
INSERT INTO `path_info` VALUES (24, '2', '4', 'step1', 'HOSPITAL_ID', NULL, NULL, '1', NULL, NULL, NULL, NULL);
INSERT INTO `path_info` VALUES (25, '2', '4', 'step1', 'HOSPITAL_ID', NULL, NULL, '2', NULL, NULL, NULL, NULL);
INSERT INTO `path_info` VALUES (26, '1', '5', 'step1', 'DEPT_ID', NULL, NULL, '1', NULL, NULL, NULL, NULL);
INSERT INTO `path_info` VALUES (27, '1', '6', 'step1', 'DEPT_ID', NULL, NULL, '2', NULL, NULL, NULL, NULL);
INSERT INTO `path_info` VALUES (28, '2', '7', 'step1', 'PHYSICIAN_ID', '', '', '3', '', '', '', '');
INSERT INTO `path_info` VALUES (29, '3', '4', 'step1', 'PHYSICIAN_ID', '', '', '2', '', '', '', '');
INSERT INTO `path_info` VALUES (30, '3', '8', 'step1', 'HOSPITAL_ID', '', '', '4', '', '', '', '');
INSERT INTO `path_info` VALUES (31, '4', '8', 'step1', 'HOSPITAL_ID', '', '', '1', '', '', '', '');
INSERT INTO `path_info` VALUES (32, '4', '6', 'step1', 'DEPT_ID', '', '', '3', '', '', '', '');
INSERT INTO `path_info` VALUES (33, '5', '10', 'step1', 'DEPT_ID', '', '', '4', '', '', '', '');

-- ----------------------------
-- Table structure for patient_info
-- ----------------------------
DROP TABLE IF EXISTS `patient_info`;
CREATE TABLE `patient_info`  (
  `id` int(0) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `benefit_group_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `area_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dob` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `company` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `record_count` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of patient_info
-- ----------------------------
INSERT INTO `patient_info` VALUES (1, 'xxx', '1', '1', '0', '1990/01/01', 'xx单位', 'xxx', 'xxx', 'xx市', 4);
INSERT INTO `patient_info` VALUES (2, 'xxx', '2', '1', '1', '1990/01/01', 'xx单位', 'xxx', 'xxx', 'xx市', 3);
INSERT INTO `patient_info` VALUES (3, 'xxx', '1', '2', '1', '1990/01/01', 'xx单位', 'xxx', 'xxx', 'xx市', 4);
INSERT INTO `patient_info` VALUES (4, 'xxx', '1', '1', '0', '1990/01/01', 'xx单位', 'xxx', 'xxx', 'xx市', 5);
INSERT INTO `patient_info` VALUES (5, 'xxx', '4', '1', '1', '1990/01/01', 'xx单位', 'xxx', 'xxx', 'xx市', 2);
INSERT INTO `patient_info` VALUES (6, 'xxx', '1', '3', '0', '1990/01/01', 'xx单位', 'xxx', 'xxx', 'xx市', 1);
INSERT INTO `patient_info` VALUES (7, 'xxx', '1', '1', '1', '1990/01/01', 'xx单位', 'xxx', 'xxx', 'xx市', 3);
INSERT INTO `patient_info` VALUES (8, 'xxx', '1', '1', '0', '1990/01/01', 'xx单位', 'xxx', 'xxx', 'xx市', 3);
INSERT INTO `patient_info` VALUES (9, 'xxx', '1', '1', '1', '1990/01/01', 'xx单位', 'xxx', 'xxx', 'xx市', 3);

-- ----------------------------
-- Table structure for physician_info
-- ----------------------------
DROP TABLE IF EXISTS `physician_info`;
CREATE TABLE `physician_info`  (
  `id` int(0) NOT NULL,
  `doctor_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `hospital_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `doctor_sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `doctor_level` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `doctor_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of physician_info
-- ----------------------------
INSERT INTO `physician_info` VALUES (1, 'xxx', '1', '0', '1', '1');
INSERT INTO `physician_info` VALUES (2, 'xxx', '2', '1', '2', '2');
INSERT INTO `physician_info` VALUES (3, 'xxx', '2', '0', '1', '1');

-- ----------------------------
-- Table structure for similarity_info
-- ----------------------------
DROP TABLE IF EXISTS `similarity_info`;
CREATE TABLE `similarity_info`  (
  `id` int(0) NOT NULL,
  `PATIENT_ID1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PATIENT_ID2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SIMILARITY` float(255, 2) NULL DEFAULT NULL,
  `RELATED_NODE` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `RELATED_NODE_TYPE` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of similarity_info
-- ----------------------------
INSERT INTO `similarity_info` VALUES (1, '1', '2', 0.95, '1', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (2, '1', '3', 0.84, '1', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (3, '1', '4', 0.92, '1', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (4, '1', '5', 0.72, '1', 'DEPT_ID');
INSERT INTO `similarity_info` VALUES (5, '1', '6', 0.83, '1', 'DEPT_ID');
INSERT INTO `similarity_info` VALUES (6, '1', '7', 0.94, '1', 'DEPT_ID');
INSERT INTO `similarity_info` VALUES (7, '1', '8', 0.88, '2', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (8, '1', '9', 0.82, '2', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (9, '1', '10', 0.76, '2', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (10, '2', '1', 0.95, '1', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (11, '2', '3', 0.84, '1', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (12, '2', '4', 0.92, '1', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (13, '2', '5', 0.72, '1', 'DEPT_ID');
INSERT INTO `similarity_info` VALUES (14, '2', '6', 0.83, '1', 'DEPT_ID');
INSERT INTO `similarity_info` VALUES (15, '2', '7', 0.94, '1', 'DEPT_ID');
INSERT INTO `similarity_info` VALUES (16, '2', '8', 0.88, '2', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (17, '2', '9', 0.82, '2', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (18, '2', '10', 0.76, '2', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (19, '2', '1', 0.95, '1', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (20, '2', '3', 0.84, '1', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (21, '2', '4', 0.92, '1', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (22, '2', '5', 0.72, '1', 'DEPT_ID');
INSERT INTO `similarity_info` VALUES (23, '2', '6', 0.83, '1', 'DEPT_ID');
INSERT INTO `similarity_info` VALUES (24, '2', '7', 0.94, '1', 'DEPT_ID');
INSERT INTO `similarity_info` VALUES (25, '2', '8', 0.88, '2', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (26, '2', '9', 0.82, '2', 'PHYSICIAN_ID');
INSERT INTO `similarity_info` VALUES (27, '2', '10', 0.76, '2', 'PHYSICIAN_ID');

SET FOREIGN_KEY_CHECKS = 1;
