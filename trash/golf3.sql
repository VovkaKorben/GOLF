/*
 Navicat Premium Data Transfer

 Source Server         : l2
 Source Server Type    : MySQL
 Source Server Version : 50743 (5.7.43-log)
 Source Host           : localhost:3306
 Source Schema         : golf

 Target Server Type    : MySQL
 Target Server Version : 50743 (5.7.43-log)
 File Encoding         : 65001

 Date: 29/10/2025 22:01:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for games
-- ----------------------------
DROP TABLE IF EXISTS `games`;
CREATE TABLE `games`  (
  `id` int(11) NOT NULL,
  `dt` datetime NOT NULL,
  `place` int(11) NOT NULL,
  `comment` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `judge` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of games
-- ----------------------------

-- ----------------------------
-- Table structure for pits
-- ----------------------------
DROP TABLE IF EXISTS `pits`;
CREATE TABLE `pits`  (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `place_id` int(11) NOT NULL,
  `pit_no` int(11) NOT NULL,
  `par` int(11) NOT NULL,
  `hcp` int(11) NOT NULL,
  `white` int(11) NOT NULL,
  `yellow` int(11) NOT NULL,
  `red` int(11) NOT NULL,
  PRIMARY KEY (`pid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pits
-- ----------------------------
INSERT INTO `pits` VALUES (1, 1, 1, 3, 15, 125, 125, 85);
INSERT INTO `pits` VALUES (2, 1, 11, 4, 6, 360, 350, 305);
INSERT INTO `pits` VALUES (3, 1, 10, 3, 16, 125, 125, 85);
INSERT INTO `pits` VALUES (4, 1, 9, 4, 13, 340, 325, 255);
INSERT INTO `pits` VALUES (5, 1, 8, 3, 17, 145, 145, 120);
INSERT INTO `pits` VALUES (6, 1, 7, 4, 9, 275, 270, 230);
INSERT INTO `pits` VALUES (7, 1, 6, 4, 7, 365, 355, 305);
INSERT INTO `pits` VALUES (8, 1, 5, 4, 3, 415, 380, 335);
INSERT INTO `pits` VALUES (9, 1, 4, 5, 1, 465, 450, 380);
INSERT INTO `pits` VALUES (10, 1, 3, 5, 11, 475, 450, 390);
INSERT INTO `pits` VALUES (11, 1, 2, 4, 5, 360, 350, 305);
INSERT INTO `pits` VALUES (12, 1, 18, 4, 14, 340, 325, 255);
INSERT INTO `pits` VALUES (13, 1, 17, 3, 18, 145, 145, 120);
INSERT INTO `pits` VALUES (14, 1, 16, 4, 10, 275, 270, 230);
INSERT INTO `pits` VALUES (15, 1, 15, 4, 8, 365, 355, 305);
INSERT INTO `pits` VALUES (16, 1, 14, 4, 4, 415, 380, 335);
INSERT INTO `pits` VALUES (17, 1, 13, 5, 2, 465, 450, 380);
INSERT INTO `pits` VALUES (18, 1, 12, 5, 12, 475, 450, 390);

-- ----------------------------
-- Table structure for places
-- ----------------------------
DROP TABLE IF EXISTS `places`;
CREATE TABLE `places`  (
  `place_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `abroad` int(11) NOT NULL,
  PRIMARY KEY (`place_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of places
-- ----------------------------
INSERT INTO `places` VALUES (1, 'Outokummun Golfseura Ry', 'Kerentintie 1, 83500 Outokumpu', 0);
INSERT INTO `places` VALUES (2, 'Joensuun Golf', 'Pelontie 11, 80100 Joensuu', 0);
INSERT INTO `places` VALUES (3, 'Helsinki Golf Oy', 'Koulukatu 4a, 10000 Helsinki', 0);
INSERT INTO `places` VALUES (4, 'Ruotsi Gölf', 'Mannerhaim str 15, 22000 Tukholma', 1);

-- ----------------------------
-- Table structure for places_info
-- ----------------------------
DROP TABLE IF EXISTS `places_info`;
CREATE TABLE `places_info`  (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `place_id` int(10) NOT NULL,
  `sex` int(11) NOT NULL,
  `color` int(11) NOT NULL,
  `cr` decimal(4, 1) NOT NULL,
  `slope` decimal(4, 1) NOT NULL,
  PRIMARY KEY (`pid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of places_info
-- ----------------------------
INSERT INTO `places_info` VALUES (1, 1, 0, 0, 72.8, 136.0);
INSERT INTO `places_info` VALUES (2, 1, 2, 3, 4.0, 6.0);
INSERT INTO `places_info` VALUES (3, 1, 2, 4, 5.0, 8.0);
INSERT INTO `places_info` VALUES (4, 1, 0, 1, 71.6, 133.0);
INSERT INTO `places_info` VALUES (5, 1, 0, 2, 68.1, 128.0);
INSERT INTO `places_info` VALUES (6, 1, 0, 3, 66.5, 123.0);
INSERT INTO `places_info` VALUES (7, 1, 1, 1, 76.8, 134.0);
INSERT INTO `places_info` VALUES (8, 1, 1, 3, 70.6, 121.0);

-- ----------------------------
-- Table structure for places_lvl
-- ----------------------------
DROP TABLE IF EXISTS `places_lvl`;
CREATE TABLE `places_lvl`  (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `place_id` int(11) NULL DEFAULT NULL,
  `sex` int(11) NULL DEFAULT NULL,
  `color` int(11) NULL DEFAULT NULL,
  `min_hcp` decimal(4, 1) NULL DEFAULT NULL,
  `max_hcp` decimal(4, 1) NULL DEFAULT NULL,
  `lvl` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`pid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 338 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of places_lvl
-- ----------------------------
INSERT INTO `places_lvl` VALUES (1, 1, 0, 0, -4.4, -3.6, -4);
INSERT INTO `places_lvl` VALUES (2, 1, 0, 0, -3.5, -2.8, -3);
INSERT INTO `places_lvl` VALUES (3, 1, 0, 0, -2.7, -2.0, -2);
INSERT INTO `places_lvl` VALUES (4, 1, 0, 0, -1.9, -1.1, -1);
INSERT INTO `places_lvl` VALUES (5, 1, 0, 0, -1.0, -0.3, 0);
INSERT INTO `places_lvl` VALUES (6, 1, 0, 0, -0.2, 0.5, 1);
INSERT INTO `places_lvl` VALUES (7, 1, 0, 0, 0.6, 1.4, 2);
INSERT INTO `places_lvl` VALUES (8, 1, 0, 0, 1.5, 2.2, 3);
INSERT INTO `places_lvl` VALUES (9, 1, 0, 0, 2.3, 3.0, 4);
INSERT INTO `places_lvl` VALUES (10, 1, 0, 0, 3.1, 3.9, 5);
INSERT INTO `places_lvl` VALUES (11, 1, 0, 0, 4.0, 4.7, 6);
INSERT INTO `places_lvl` VALUES (12, 1, 0, 0, 4.8, 5.5, 7);
INSERT INTO `places_lvl` VALUES (13, 1, 0, 0, 5.6, 6.3, 8);
INSERT INTO `places_lvl` VALUES (14, 1, 0, 0, 6.4, 7.2, 9);
INSERT INTO `places_lvl` VALUES (15, 1, 0, 0, 7.3, 8.0, 10);
INSERT INTO `places_lvl` VALUES (16, 1, 0, 0, 8.1, 8.8, 11);
INSERT INTO `places_lvl` VALUES (17, 1, 0, 0, 8.9, 9.7, 12);
INSERT INTO `places_lvl` VALUES (18, 1, 0, 0, 9.8, 10.5, 13);
INSERT INTO `places_lvl` VALUES (19, 1, 0, 0, 10.6, 11.3, 14);
INSERT INTO `places_lvl` VALUES (20, 1, 0, 0, 11.4, 12.2, 15);
INSERT INTO `places_lvl` VALUES (21, 1, 0, 0, 12.3, 13.0, 16);
INSERT INTO `places_lvl` VALUES (22, 1, 0, 0, 13.1, 13.8, 17);
INSERT INTO `places_lvl` VALUES (23, 1, 0, 0, 13.9, 14.7, 18);
INSERT INTO `places_lvl` VALUES (24, 1, 0, 0, 14.8, 15.5, 19);
INSERT INTO `places_lvl` VALUES (25, 1, 0, 0, 15.6, 16.3, 20);
INSERT INTO `places_lvl` VALUES (26, 1, 0, 0, 16.4, 17.1, 21);
INSERT INTO `places_lvl` VALUES (27, 1, 0, 0, 17.2, 18.0, 22);
INSERT INTO `places_lvl` VALUES (28, 1, 0, 0, 18.1, 18.8, 23);
INSERT INTO `places_lvl` VALUES (29, 1, 0, 0, 18.9, 19.6, 24);
INSERT INTO `places_lvl` VALUES (30, 1, 0, 0, 19.7, 20.5, 25);
INSERT INTO `places_lvl` VALUES (31, 1, 0, 0, 20.6, 21.3, 26);
INSERT INTO `places_lvl` VALUES (32, 1, 0, 0, 21.4, 22.1, 27);
INSERT INTO `places_lvl` VALUES (33, 1, 0, 0, 22.2, 23.0, 28);
INSERT INTO `places_lvl` VALUES (34, 1, 0, 0, 23.1, 23.8, 29);
INSERT INTO `places_lvl` VALUES (35, 1, 0, 0, 23.9, 24.6, 30);
INSERT INTO `places_lvl` VALUES (36, 1, 0, 0, 24.7, 25.5, 31);
INSERT INTO `places_lvl` VALUES (37, 1, 0, 0, 25.6, 26.3, 32);
INSERT INTO `places_lvl` VALUES (38, 1, 0, 0, 26.4, 27.1, 33);
INSERT INTO `places_lvl` VALUES (39, 1, 0, 0, 27.2, 28.0, 34);
INSERT INTO `places_lvl` VALUES (40, 1, 0, 0, 28.1, 28.8, 35);
INSERT INTO `places_lvl` VALUES (41, 1, 0, 0, 28.9, 29.6, 36);
INSERT INTO `places_lvl` VALUES (42, 1, 0, 0, 29.7, 30.4, 37);
INSERT INTO `places_lvl` VALUES (43, 1, 0, 0, 30.5, 31.3, 38);
INSERT INTO `places_lvl` VALUES (44, 1, 0, 0, 31.4, 32.1, 39);
INSERT INTO `places_lvl` VALUES (45, 1, 0, 0, 32.2, 32.9, 40);
INSERT INTO `places_lvl` VALUES (46, 1, 0, 0, 33.0, 33.8, 41);
INSERT INTO `places_lvl` VALUES (47, 1, 0, 0, 33.9, 34.6, 42);
INSERT INTO `places_lvl` VALUES (48, 1, 0, 0, 34.7, 35.4, 43);
INSERT INTO `places_lvl` VALUES (49, 1, 0, 0, 35.5, 36.3, 44);
INSERT INTO `places_lvl` VALUES (50, 1, 0, 0, 36.4, 37.1, 45);
INSERT INTO `places_lvl` VALUES (51, 1, 0, 0, 37.2, 37.9, 46);
INSERT INTO `places_lvl` VALUES (52, 1, 0, 0, 38.0, 38.8, 47);
INSERT INTO `places_lvl` VALUES (53, 1, 0, 0, 38.9, 39.6, 48);
INSERT INTO `places_lvl` VALUES (54, 1, 0, 0, 39.7, 40.4, 49);
INSERT INTO `places_lvl` VALUES (55, 1, 0, 0, 40.5, 41.2, 50);
INSERT INTO `places_lvl` VALUES (56, 1, 0, 0, 41.3, 42.1, 51);
INSERT INTO `places_lvl` VALUES (57, 1, 0, 0, 42.2, 42.9, 52);
INSERT INTO `places_lvl` VALUES (58, 1, 0, 0, 43.0, 43.7, 53);
INSERT INTO `places_lvl` VALUES (59, 1, 0, 0, 43.8, 44.6, 54);
INSERT INTO `places_lvl` VALUES (60, 1, 0, 0, 44.7, 45.4, 55);
INSERT INTO `places_lvl` VALUES (61, 1, 0, 0, 45.5, 46.2, 56);
INSERT INTO `places_lvl` VALUES (62, 1, 0, 0, 46.3, 47.1, 57);
INSERT INTO `places_lvl` VALUES (63, 1, 0, 0, 47.2, 47.9, 58);
INSERT INTO `places_lvl` VALUES (64, 1, 0, 0, 48.0, 48.7, 59);
INSERT INTO `places_lvl` VALUES (65, 1, 0, 0, 48.8, 49.6, 60);
INSERT INTO `places_lvl` VALUES (66, 1, 0, 0, 49.7, 50.4, 61);
INSERT INTO `places_lvl` VALUES (67, 1, 0, 0, 50.5, 51.2, 62);
INSERT INTO `places_lvl` VALUES (68, 1, 0, 0, 51.3, 52.0, 63);
INSERT INTO `places_lvl` VALUES (69, 1, 0, 0, 52.1, 52.9, 64);
INSERT INTO `places_lvl` VALUES (70, 1, 0, 0, 53.0, 53.7, 65);
INSERT INTO `places_lvl` VALUES (71, 1, 0, 0, 53.8, 54.0, 66);
INSERT INTO `places_lvl` VALUES (72, 1, 0, 1, -4.3, -3.5, -5);
INSERT INTO `places_lvl` VALUES (73, 1, 0, 1, -3.4, -2.7, -4);
INSERT INTO `places_lvl` VALUES (74, 1, 0, 1, -2.6, -1.8, -3);
INSERT INTO `places_lvl` VALUES (75, 1, 0, 1, -1.7, -1.0, -2);
INSERT INTO `places_lvl` VALUES (76, 1, 0, 1, -0.9, -0.1, -1);
INSERT INTO `places_lvl` VALUES (77, 1, 0, 1, 0.0, 0.7, 0);
INSERT INTO `places_lvl` VALUES (78, 1, 0, 1, 0.8, 1.6, 1);
INSERT INTO `places_lvl` VALUES (79, 1, 0, 1, 1.7, 2.4, 2);
INSERT INTO `places_lvl` VALUES (80, 1, 0, 1, 2.5, 3.3, 3);
INSERT INTO `places_lvl` VALUES (81, 1, 0, 1, 3.4, 4.1, 4);
INSERT INTO `places_lvl` VALUES (82, 1, 0, 1, 4.2, 5.0, 5);
INSERT INTO `places_lvl` VALUES (83, 1, 0, 1, 5.1, 5.8, 6);
INSERT INTO `places_lvl` VALUES (84, 1, 0, 1, 5.9, 6.7, 7);
INSERT INTO `places_lvl` VALUES (85, 1, 0, 1, 6.8, 7.5, 8);
INSERT INTO `places_lvl` VALUES (86, 1, 0, 1, 7.6, 8.4, 9);
INSERT INTO `places_lvl` VALUES (87, 1, 0, 1, 8.5, 9.2, 10);
INSERT INTO `places_lvl` VALUES (88, 1, 0, 1, 9.3, 10.1, 11);
INSERT INTO `places_lvl` VALUES (89, 1, 0, 1, 10.2, 10.9, 12);
INSERT INTO `places_lvl` VALUES (90, 1, 0, 1, 11.0, 11.8, 13);
INSERT INTO `places_lvl` VALUES (91, 1, 0, 1, 11.9, 12.6, 14);
INSERT INTO `places_lvl` VALUES (92, 1, 0, 1, 12.7, 13.5, 15);
INSERT INTO `places_lvl` VALUES (93, 1, 0, 1, 13.6, 14.3, 16);
INSERT INTO `places_lvl` VALUES (94, 1, 0, 1, 14.4, 15.2, 17);
INSERT INTO `places_lvl` VALUES (95, 1, 0, 1, 15.3, 16.0, 18);
INSERT INTO `places_lvl` VALUES (96, 1, 0, 1, 16.1, 16.9, 19);
INSERT INTO `places_lvl` VALUES (97, 1, 0, 1, 17.0, 17.7, 20);
INSERT INTO `places_lvl` VALUES (98, 1, 0, 1, 17.8, 18.6, 21);
INSERT INTO `places_lvl` VALUES (99, 1, 0, 1, 18.7, 19.4, 22);
INSERT INTO `places_lvl` VALUES (100, 1, 0, 1, 19.5, 20.3, 23);
INSERT INTO `places_lvl` VALUES (101, 1, 0, 1, 20.4, 21.1, 24);
INSERT INTO `places_lvl` VALUES (102, 1, 0, 1, 21.2, 22.0, 25);
INSERT INTO `places_lvl` VALUES (103, 1, 0, 1, 22.1, 22.8, 26);
INSERT INTO `places_lvl` VALUES (104, 1, 0, 1, 22.9, 23.7, 27);
INSERT INTO `places_lvl` VALUES (105, 1, 0, 1, 23.8, 24.5, 28);
INSERT INTO `places_lvl` VALUES (106, 1, 0, 1, 24.6, 25.4, 29);
INSERT INTO `places_lvl` VALUES (107, 1, 0, 1, 25.5, 26.2, 30);
INSERT INTO `places_lvl` VALUES (108, 1, 0, 1, 26.3, 27.1, 31);
INSERT INTO `places_lvl` VALUES (109, 1, 0, 1, 27.2, 27.9, 32);
INSERT INTO `places_lvl` VALUES (110, 1, 0, 1, 28.0, 28.8, 33);
INSERT INTO `places_lvl` VALUES (111, 1, 0, 1, 28.9, 29.6, 34);
INSERT INTO `places_lvl` VALUES (112, 1, 0, 1, 29.7, 30.5, 35);
INSERT INTO `places_lvl` VALUES (113, 1, 0, 1, 30.6, 31.3, 36);
INSERT INTO `places_lvl` VALUES (114, 1, 0, 1, 31.4, 32.2, 37);
INSERT INTO `places_lvl` VALUES (115, 1, 0, 1, 32.3, 33.0, 38);
INSERT INTO `places_lvl` VALUES (116, 1, 0, 1, 33.1, 33.8, 39);
INSERT INTO `places_lvl` VALUES (117, 1, 0, 1, 33.9, 34.7, 40);
INSERT INTO `places_lvl` VALUES (118, 1, 0, 1, 34.8, 35.5, 41);
INSERT INTO `places_lvl` VALUES (119, 1, 0, 1, 35.6, 36.4, 42);
INSERT INTO `places_lvl` VALUES (120, 1, 0, 1, 36.5, 37.2, 43);
INSERT INTO `places_lvl` VALUES (121, 1, 0, 1, 37.3, 38.1, 44);
INSERT INTO `places_lvl` VALUES (122, 1, 0, 1, 38.2, 38.9, 45);
INSERT INTO `places_lvl` VALUES (123, 1, 0, 1, 39.0, 39.8, 46);
INSERT INTO `places_lvl` VALUES (124, 1, 0, 1, 39.9, 40.6, 47);
INSERT INTO `places_lvl` VALUES (125, 1, 0, 1, 40.7, 41.5, 48);
INSERT INTO `places_lvl` VALUES (126, 1, 0, 1, 41.6, 42.3, 49);
INSERT INTO `places_lvl` VALUES (127, 1, 0, 1, 42.4, 43.2, 50);
INSERT INTO `places_lvl` VALUES (128, 1, 0, 1, 43.3, 44.0, 51);
INSERT INTO `places_lvl` VALUES (129, 1, 0, 1, 44.1, 44.9, 52);
INSERT INTO `places_lvl` VALUES (130, 1, 0, 1, 45.0, 45.7, 53);
INSERT INTO `places_lvl` VALUES (131, 1, 0, 1, 45.8, 46.6, 54);
INSERT INTO `places_lvl` VALUES (132, 1, 0, 1, 46.7, 47.4, 55);
INSERT INTO `places_lvl` VALUES (133, 1, 0, 1, 47.5, 48.3, 56);
INSERT INTO `places_lvl` VALUES (134, 1, 0, 1, 48.4, 49.1, 57);
INSERT INTO `places_lvl` VALUES (135, 1, 0, 1, 49.2, 50.0, 58);
INSERT INTO `places_lvl` VALUES (136, 1, 0, 1, 50.1, 50.8, 59);
INSERT INTO `places_lvl` VALUES (137, 1, 0, 1, 50.9, 51.7, 60);
INSERT INTO `places_lvl` VALUES (138, 1, 0, 1, 51.8, 52.5, 61);
INSERT INTO `places_lvl` VALUES (139, 1, 0, 1, 52.6, 53.4, 62);
INSERT INTO `places_lvl` VALUES (140, 1, 0, 1, 53.5, 54.0, 63);
INSERT INTO `places_lvl` VALUES (141, 1, 0, 3, -4.5, -3.7, -10);
INSERT INTO `places_lvl` VALUES (142, 1, 0, 3, -3.6, -2.8, -9);
INSERT INTO `places_lvl` VALUES (143, 1, 0, 3, -2.7, -1.9, -8);
INSERT INTO `places_lvl` VALUES (144, 1, 0, 3, -1.8, -1.0, -7);
INSERT INTO `places_lvl` VALUES (145, 1, 0, 3, -0.9, -0.1, -6);
INSERT INTO `places_lvl` VALUES (146, 1, 0, 3, 0.0, 0.9, -5);
INSERT INTO `places_lvl` VALUES (147, 1, 0, 3, 1.0, 1.8, -4);
INSERT INTO `places_lvl` VALUES (148, 1, 0, 3, 1.9, 2.7, -3);
INSERT INTO `places_lvl` VALUES (149, 1, 0, 3, 2.8, 3.6, -2);
INSERT INTO `places_lvl` VALUES (150, 1, 0, 3, 3.7, 4.5, -1);
INSERT INTO `places_lvl` VALUES (151, 1, 0, 3, 4.6, 5.5, 0);
INSERT INTO `places_lvl` VALUES (152, 1, 0, 3, 5.6, 6.4, 1);
INSERT INTO `places_lvl` VALUES (153, 1, 0, 3, 6.5, 7.3, 2);
INSERT INTO `places_lvl` VALUES (154, 1, 0, 3, 7.4, 8.2, 3);
INSERT INTO `places_lvl` VALUES (155, 1, 0, 3, 8.3, 9.1, 4);
INSERT INTO `places_lvl` VALUES (156, 1, 0, 3, 9.2, 10.1, 5);
INSERT INTO `places_lvl` VALUES (157, 1, 0, 3, 10.2, 11.0, 6);
INSERT INTO `places_lvl` VALUES (158, 1, 0, 3, 11.1, 11.9, 7);
INSERT INTO `places_lvl` VALUES (159, 1, 0, 3, 12.0, 12.8, 8);
INSERT INTO `places_lvl` VALUES (160, 1, 0, 3, 12.9, 13.7, 9);
INSERT INTO `places_lvl` VALUES (161, 1, 0, 3, 13.8, 14.6, 10);
INSERT INTO `places_lvl` VALUES (162, 1, 0, 3, 14.7, 15.6, 11);
INSERT INTO `places_lvl` VALUES (163, 1, 0, 3, 15.7, 16.5, 12);
INSERT INTO `places_lvl` VALUES (164, 1, 0, 3, 16.6, 17.4, 13);
INSERT INTO `places_lvl` VALUES (165, 1, 0, 3, 17.5, 18.3, 14);
INSERT INTO `places_lvl` VALUES (166, 1, 0, 3, 18.4, 19.2, 15);
INSERT INTO `places_lvl` VALUES (167, 1, 0, 3, 19.3, 20.2, 16);
INSERT INTO `places_lvl` VALUES (168, 1, 0, 3, 20.3, 21.1, 17);
INSERT INTO `places_lvl` VALUES (169, 1, 0, 3, 21.2, 22.0, 18);
INSERT INTO `places_lvl` VALUES (170, 1, 0, 3, 22.1, 22.9, 19);
INSERT INTO `places_lvl` VALUES (171, 1, 0, 3, 23.0, 23.8, 20);
INSERT INTO `places_lvl` VALUES (172, 1, 0, 3, 23.9, 24.8, 21);
INSERT INTO `places_lvl` VALUES (173, 1, 0, 3, 24.9, 25.7, 22);
INSERT INTO `places_lvl` VALUES (174, 1, 0, 3, 25.8, 26.6, 23);
INSERT INTO `places_lvl` VALUES (175, 1, 0, 3, 26.7, 27.5, 24);
INSERT INTO `places_lvl` VALUES (176, 1, 0, 3, 27.6, 28.4, 25);
INSERT INTO `places_lvl` VALUES (177, 1, 0, 3, 28.5, 29.3, 26);
INSERT INTO `places_lvl` VALUES (178, 1, 0, 3, 29.4, 30.3, 27);
INSERT INTO `places_lvl` VALUES (179, 1, 0, 3, 30.4, 31.2, 28);
INSERT INTO `places_lvl` VALUES (180, 1, 0, 3, 31.3, 32.1, 29);
INSERT INTO `places_lvl` VALUES (181, 1, 0, 3, 32.2, 33.0, 30);
INSERT INTO `places_lvl` VALUES (182, 1, 0, 3, 33.1, 33.9, 31);
INSERT INTO `places_lvl` VALUES (183, 1, 0, 3, 34.0, 34.9, 32);
INSERT INTO `places_lvl` VALUES (184, 1, 0, 3, 35.0, 35.8, 33);
INSERT INTO `places_lvl` VALUES (185, 1, 0, 3, 35.9, 36.7, 34);
INSERT INTO `places_lvl` VALUES (186, 1, 0, 3, 36.8, 37.6, 35);
INSERT INTO `places_lvl` VALUES (187, 1, 0, 3, 37.7, 38.5, 36);
INSERT INTO `places_lvl` VALUES (188, 1, 0, 3, 38.6, 39.5, 37);
INSERT INTO `places_lvl` VALUES (189, 1, 0, 3, 39.6, 40.4, 38);
INSERT INTO `places_lvl` VALUES (190, 1, 0, 3, 40.5, 41.3, 39);
INSERT INTO `places_lvl` VALUES (191, 1, 0, 3, 41.4, 42.2, 40);
INSERT INTO `places_lvl` VALUES (192, 1, 0, 3, 42.3, 43.1, 41);
INSERT INTO `places_lvl` VALUES (193, 1, 0, 3, 43.2, 44.0, 42);
INSERT INTO `places_lvl` VALUES (194, 1, 0, 3, 44.1, 45.0, 43);
INSERT INTO `places_lvl` VALUES (195, 1, 0, 3, 45.1, 45.9, 44);
INSERT INTO `places_lvl` VALUES (196, 1, 0, 3, 46.0, 46.8, 45);
INSERT INTO `places_lvl` VALUES (197, 1, 0, 3, 46.9, 47.7, 46);
INSERT INTO `places_lvl` VALUES (198, 1, 0, 3, 47.8, 48.6, 47);
INSERT INTO `places_lvl` VALUES (199, 1, 0, 3, 48.7, 49.6, 48);
INSERT INTO `places_lvl` VALUES (200, 1, 0, 3, 49.7, 50.5, 49);
INSERT INTO `places_lvl` VALUES (201, 1, 0, 3, 50.6, 51.4, 50);
INSERT INTO `places_lvl` VALUES (202, 1, 0, 3, 51.5, 52.3, 51);
INSERT INTO `places_lvl` VALUES (203, 1, 0, 3, 52.4, 53.2, 52);
INSERT INTO `places_lvl` VALUES (204, 1, 0, 3, 53.3, 54.0, 53);
INSERT INTO `places_lvl` VALUES (205, 1, 1, 1, -4.4, -3.7, 0);
INSERT INTO `places_lvl` VALUES (206, 1, 1, 1, -3.6, -2.8, 1);
INSERT INTO `places_lvl` VALUES (207, 1, 1, 1, -2.7, -2.0, 2);
INSERT INTO `places_lvl` VALUES (208, 1, 1, 1, -1.9, -1.1, 3);
INSERT INTO `places_lvl` VALUES (209, 1, 1, 1, -1.0, -0.3, 4);
INSERT INTO `places_lvl` VALUES (210, 1, 1, 1, -0.2, 0.5, 5);
INSERT INTO `places_lvl` VALUES (211, 1, 1, 1, 0.6, 1.4, 6);
INSERT INTO `places_lvl` VALUES (212, 1, 1, 1, 1.5, 2.2, 7);
INSERT INTO `places_lvl` VALUES (213, 1, 1, 1, 2.3, 3.1, 8);
INSERT INTO `places_lvl` VALUES (214, 1, 1, 1, 3.2, 3.9, 9);
INSERT INTO `places_lvl` VALUES (215, 1, 1, 1, 4.0, 4.8, 10);
INSERT INTO `places_lvl` VALUES (216, 1, 1, 1, 4.9, 5.6, 11);
INSERT INTO `places_lvl` VALUES (217, 1, 1, 1, 5.7, 6.4, 12);
INSERT INTO `places_lvl` VALUES (218, 1, 1, 1, 6.5, 7.3, 13);
INSERT INTO `places_lvl` VALUES (219, 1, 1, 1, 7.4, 8.1, 14);
INSERT INTO `places_lvl` VALUES (220, 1, 1, 1, 8.2, 9.0, 15);
INSERT INTO `places_lvl` VALUES (221, 1, 1, 1, 9.1, 9.8, 16);
INSERT INTO `places_lvl` VALUES (222, 1, 1, 1, 9.9, 10.7, 17);
INSERT INTO `places_lvl` VALUES (223, 1, 1, 1, 10.8, 11.5, 18);
INSERT INTO `places_lvl` VALUES (224, 1, 1, 1, 11.6, 12.3, 19);
INSERT INTO `places_lvl` VALUES (225, 1, 1, 1, 12.4, 13.2, 20);
INSERT INTO `places_lvl` VALUES (226, 1, 1, 1, 13.3, 14.0, 21);
INSERT INTO `places_lvl` VALUES (227, 1, 1, 1, 14.1, 14.9, 22);
INSERT INTO `places_lvl` VALUES (228, 1, 1, 1, 15.0, 15.7, 23);
INSERT INTO `places_lvl` VALUES (229, 1, 1, 1, 15.8, 16.6, 24);
INSERT INTO `places_lvl` VALUES (230, 1, 1, 1, 16.7, 17.4, 25);
INSERT INTO `places_lvl` VALUES (231, 1, 1, 1, 17.5, 18.2, 26);
INSERT INTO `places_lvl` VALUES (232, 1, 1, 1, 18.3, 19.1, 27);
INSERT INTO `places_lvl` VALUES (233, 1, 1, 1, 19.2, 19.9, 28);
INSERT INTO `places_lvl` VALUES (234, 1, 1, 1, 20.0, 20.8, 29);
INSERT INTO `places_lvl` VALUES (235, 1, 1, 1, 20.9, 21.6, 30);
INSERT INTO `places_lvl` VALUES (236, 1, 1, 1, 21.7, 22.5, 31);
INSERT INTO `places_lvl` VALUES (237, 1, 1, 1, 22.6, 23.3, 32);
INSERT INTO `places_lvl` VALUES (238, 1, 1, 1, 23.4, 24.2, 33);
INSERT INTO `places_lvl` VALUES (239, 1, 1, 1, 24.3, 25.0, 34);
INSERT INTO `places_lvl` VALUES (240, 1, 1, 1, 25.1, 25.8, 35);
INSERT INTO `places_lvl` VALUES (241, 1, 1, 1, 25.9, 26.7, 36);
INSERT INTO `places_lvl` VALUES (242, 1, 1, 1, 26.8, 27.5, 37);
INSERT INTO `places_lvl` VALUES (243, 1, 1, 1, 27.6, 28.4, 38);
INSERT INTO `places_lvl` VALUES (244, 1, 1, 1, 28.5, 29.2, 39);
INSERT INTO `places_lvl` VALUES (245, 1, 1, 1, 29.3, 30.1, 40);
INSERT INTO `places_lvl` VALUES (246, 1, 1, 1, 30.2, 30.9, 41);
INSERT INTO `places_lvl` VALUES (247, 1, 1, 1, 31.0, 31.7, 42);
INSERT INTO `places_lvl` VALUES (248, 1, 1, 1, 31.8, 32.6, 43);
INSERT INTO `places_lvl` VALUES (249, 1, 1, 1, 32.7, 33.4, 44);
INSERT INTO `places_lvl` VALUES (250, 1, 1, 1, 33.5, 34.3, 45);
INSERT INTO `places_lvl` VALUES (251, 1, 1, 1, 34.4, 35.1, 46);
INSERT INTO `places_lvl` VALUES (252, 1, 1, 1, 35.2, 36.0, 47);
INSERT INTO `places_lvl` VALUES (253, 1, 1, 1, 36.1, 36.8, 48);
INSERT INTO `places_lvl` VALUES (254, 1, 1, 1, 36.9, 37.6, 49);
INSERT INTO `places_lvl` VALUES (255, 1, 1, 1, 37.7, 38.5, 50);
INSERT INTO `places_lvl` VALUES (256, 1, 1, 1, 38.6, 39.3, 51);
INSERT INTO `places_lvl` VALUES (257, 1, 1, 1, 39.4, 40.2, 52);
INSERT INTO `places_lvl` VALUES (258, 1, 1, 1, 40.3, 41.0, 53);
INSERT INTO `places_lvl` VALUES (259, 1, 1, 1, 41.1, 41.9, 54);
INSERT INTO `places_lvl` VALUES (260, 1, 1, 1, 42.0, 42.7, 55);
INSERT INTO `places_lvl` VALUES (261, 1, 1, 1, 42.8, 43.5, 56);
INSERT INTO `places_lvl` VALUES (262, 1, 1, 1, 43.6, 44.4, 57);
INSERT INTO `places_lvl` VALUES (263, 1, 1, 1, 44.5, 45.2, 58);
INSERT INTO `places_lvl` VALUES (264, 1, 1, 1, 45.3, 46.1, 59);
INSERT INTO `places_lvl` VALUES (265, 1, 1, 1, 46.2, 46.9, 60);
INSERT INTO `places_lvl` VALUES (266, 1, 1, 1, 47.0, 47.8, 61);
INSERT INTO `places_lvl` VALUES (267, 1, 1, 1, 47.9, 48.6, 62);
INSERT INTO `places_lvl` VALUES (268, 1, 1, 1, 48.7, 49.5, 63);
INSERT INTO `places_lvl` VALUES (269, 1, 1, 1, 49.6, 50.3, 64);
INSERT INTO `places_lvl` VALUES (270, 1, 1, 1, 50.4, 51.1, 65);
INSERT INTO `places_lvl` VALUES (271, 1, 1, 1, 51.2, 52.0, 66);
INSERT INTO `places_lvl` VALUES (272, 1, 1, 1, 52.1, 52.8, 67);
INSERT INTO `places_lvl` VALUES (273, 1, 1, 1, 52.9, 53.7, 68);
INSERT INTO `places_lvl` VALUES (274, 1, 1, 1, 53.8, 54.0, 69);
INSERT INTO `places_lvl` VALUES (275, 1, 1, 3, -4.7, -3.9, -6);
INSERT INTO `places_lvl` VALUES (276, 1, 1, 3, -3.8, -2.9, -5);
INSERT INTO `places_lvl` VALUES (277, 1, 1, 3, -2.8, -2.0, -4);
INSERT INTO `places_lvl` VALUES (278, 1, 1, 3, -1.9, -1.1, -3);
INSERT INTO `places_lvl` VALUES (279, 1, 1, 3, -1.0, -0.1, -2);
INSERT INTO `places_lvl` VALUES (280, 1, 1, 3, 0.0, 0.8, -1);
INSERT INTO `places_lvl` VALUES (281, 1, 1, 3, 0.9, 1.7, 0);
INSERT INTO `places_lvl` VALUES (282, 1, 1, 3, 1.8, 2.7, 1);
INSERT INTO `places_lvl` VALUES (283, 1, 1, 3, 2.8, 3.6, 2);
INSERT INTO `places_lvl` VALUES (284, 1, 1, 3, 3.7, 4.5, 3);
INSERT INTO `places_lvl` VALUES (285, 1, 1, 3, 4.6, 5.5, 4);
INSERT INTO `places_lvl` VALUES (286, 1, 1, 3, 5.6, 6.4, 5);
INSERT INTO `places_lvl` VALUES (287, 1, 1, 3, 6.5, 7.3, 6);
INSERT INTO `places_lvl` VALUES (288, 1, 1, 3, 7.4, 8.3, 7);
INSERT INTO `places_lvl` VALUES (289, 1, 1, 3, 8.4, 9.2, 8);
INSERT INTO `places_lvl` VALUES (290, 1, 1, 3, 9.3, 10.1, 9);
INSERT INTO `places_lvl` VALUES (291, 1, 1, 3, 10.2, 11.1, 10);
INSERT INTO `places_lvl` VALUES (292, 1, 1, 3, 11.2, 12.0, 11);
INSERT INTO `places_lvl` VALUES (293, 1, 1, 3, 12.1, 12.9, 12);
INSERT INTO `places_lvl` VALUES (294, 1, 1, 3, 13.0, 13.9, 13);
INSERT INTO `places_lvl` VALUES (295, 1, 1, 3, 14.0, 14.8, 14);
INSERT INTO `places_lvl` VALUES (296, 1, 1, 3, 14.9, 15.7, 15);
INSERT INTO `places_lvl` VALUES (297, 1, 1, 3, 15.8, 16.7, 16);
INSERT INTO `places_lvl` VALUES (298, 1, 1, 3, 16.8, 17.6, 17);
INSERT INTO `places_lvl` VALUES (299, 1, 1, 3, 17.7, 18.5, 18);
INSERT INTO `places_lvl` VALUES (300, 1, 1, 3, 18.6, 19.5, 19);
INSERT INTO `places_lvl` VALUES (301, 1, 1, 3, 19.6, 20.4, 20);
INSERT INTO `places_lvl` VALUES (302, 1, 1, 3, 20.5, 21.3, 21);
INSERT INTO `places_lvl` VALUES (303, 1, 1, 3, 21.4, 22.3, 22);
INSERT INTO `places_lvl` VALUES (304, 1, 1, 3, 22.4, 23.2, 23);
INSERT INTO `places_lvl` VALUES (305, 1, 1, 3, 23.3, 24.1, 24);
INSERT INTO `places_lvl` VALUES (306, 1, 1, 3, 24.2, 25.1, 25);
INSERT INTO `places_lvl` VALUES (307, 1, 1, 3, 25.2, 26.0, 26);
INSERT INTO `places_lvl` VALUES (308, 1, 1, 3, 26.1, 26.9, 27);
INSERT INTO `places_lvl` VALUES (309, 1, 1, 3, 27.0, 27.9, 28);
INSERT INTO `places_lvl` VALUES (310, 1, 1, 3, 28.0, 28.8, 29);
INSERT INTO `places_lvl` VALUES (311, 1, 1, 3, 28.9, 29.7, 30);
INSERT INTO `places_lvl` VALUES (312, 1, 1, 3, 29.8, 30.7, 31);
INSERT INTO `places_lvl` VALUES (313, 1, 1, 3, 30.8, 31.6, 32);
INSERT INTO `places_lvl` VALUES (314, 1, 1, 3, 31.7, 32.5, 33);
INSERT INTO `places_lvl` VALUES (315, 1, 1, 3, 32.6, 33.5, 34);
INSERT INTO `places_lvl` VALUES (316, 1, 1, 3, 33.6, 34.4, 35);
INSERT INTO `places_lvl` VALUES (317, 1, 1, 3, 34.5, 35.3, 36);
INSERT INTO `places_lvl` VALUES (318, 1, 1, 3, 35.4, 36.3, 37);
INSERT INTO `places_lvl` VALUES (319, 1, 1, 3, 36.4, 37.2, 38);
INSERT INTO `places_lvl` VALUES (320, 1, 1, 3, 37.3, 38.1, 39);
INSERT INTO `places_lvl` VALUES (321, 1, 1, 3, 38.2, 39.1, 40);
INSERT INTO `places_lvl` VALUES (322, 1, 1, 3, 39.2, 40.0, 41);
INSERT INTO `places_lvl` VALUES (323, 1, 1, 3, 40.1, 40.9, 42);
INSERT INTO `places_lvl` VALUES (324, 1, 1, 3, 41.0, 41.9, 43);
INSERT INTO `places_lvl` VALUES (325, 1, 1, 3, 42.0, 42.8, 44);
INSERT INTO `places_lvl` VALUES (326, 1, 1, 3, 42.9, 43.7, 45);
INSERT INTO `places_lvl` VALUES (327, 1, 1, 3, 43.8, 44.7, 46);
INSERT INTO `places_lvl` VALUES (328, 1, 1, 3, 44.8, 45.6, 47);
INSERT INTO `places_lvl` VALUES (329, 1, 1, 3, 45.7, 46.6, 48);
INSERT INTO `places_lvl` VALUES (330, 1, 1, 3, 46.7, 47.5, 49);
INSERT INTO `places_lvl` VALUES (331, 1, 1, 3, 47.6, 48.4, 50);
INSERT INTO `places_lvl` VALUES (332, 1, 1, 3, 48.5, 49.4, 51);
INSERT INTO `places_lvl` VALUES (333, 1, 1, 3, 49.5, 50.3, 52);
INSERT INTO `places_lvl` VALUES (334, 1, 1, 3, 50.4, 51.2, 53);
INSERT INTO `places_lvl` VALUES (335, 1, 1, 3, 51.3, 52.2, 54);
INSERT INTO `places_lvl` VALUES (336, 1, 1, 3, 52.3, 53.1, 55);
INSERT INTO `places_lvl` VALUES (337, 1, 1, 3, 53.2, 54.0, 56);

-- ----------------------------
-- Table structure for points
-- ----------------------------
DROP TABLE IF EXISTS `points`;
CREATE TABLE `points`  (
  `game_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `a` int(11) NOT NULL,
  `b` int(11) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of points
-- ----------------------------

-- ----------------------------
-- Table structure for tees
-- ----------------------------
DROP TABLE IF EXISTS `tees`;
CREATE TABLE `tees`  (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `place_id` int(11) NOT NULL,
  `pit_no` int(11) NOT NULL,
  `tee_id` int(11) NOT NULL,
  `distance` int(11) NOT NULL,
  PRIMARY KEY (`pid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 61 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tees
-- ----------------------------
INSERT INTO `tees` VALUES (1, 1, 1, 0, 125);
INSERT INTO `tees` VALUES (2, 1, 2, 0, 360);
INSERT INTO `tees` VALUES (3, 1, 3, 0, 125);
INSERT INTO `tees` VALUES (4, 1, 4, 0, 340);
INSERT INTO `tees` VALUES (5, 1, 5, 0, 145);
INSERT INTO `tees` VALUES (6, 1, 6, 0, 275);
INSERT INTO `tees` VALUES (7, 1, 7, 0, 365);
INSERT INTO `tees` VALUES (8, 1, 8, 0, 415);
INSERT INTO `tees` VALUES (9, 1, 9, 0, 465);
INSERT INTO `tees` VALUES (10, 1, 10, 0, 475);
INSERT INTO `tees` VALUES (11, 1, 11, 0, 360);
INSERT INTO `tees` VALUES (12, 1, 12, 0, 340);
INSERT INTO `tees` VALUES (13, 1, 13, 0, 145);
INSERT INTO `tees` VALUES (14, 1, 14, 0, 275);
INSERT INTO `tees` VALUES (15, 1, 15, 0, 365);
INSERT INTO `tees` VALUES (16, 1, 16, 0, 415);
INSERT INTO `tees` VALUES (17, 1, 17, 0, 465);
INSERT INTO `tees` VALUES (18, 1, 18, 0, 475);
INSERT INTO `tees` VALUES (19, 1, 1, 1, 125);
INSERT INTO `tees` VALUES (20, 1, 2, 1, 350);
INSERT INTO `tees` VALUES (21, 1, 3, 1, 125);
INSERT INTO `tees` VALUES (22, 1, 4, 1, 325);
INSERT INTO `tees` VALUES (23, 1, 5, 1, 145);
INSERT INTO `tees` VALUES (24, 1, 6, 1, 270);
INSERT INTO `tees` VALUES (25, 1, 7, 1, 355);
INSERT INTO `tees` VALUES (26, 1, 8, 1, 380);
INSERT INTO `tees` VALUES (27, 1, 9, 1, 450);
INSERT INTO `tees` VALUES (28, 1, 10, 1, 450);
INSERT INTO `tees` VALUES (29, 1, 11, 1, 350);
INSERT INTO `tees` VALUES (30, 1, 12, 1, 325);
INSERT INTO `tees` VALUES (31, 1, 13, 1, 145);
INSERT INTO `tees` VALUES (32, 1, 14, 1, 270);
INSERT INTO `tees` VALUES (33, 1, 15, 1, 355);
INSERT INTO `tees` VALUES (34, 1, 16, 1, 380);
INSERT INTO `tees` VALUES (35, 1, 17, 1, 450);
INSERT INTO `tees` VALUES (36, 1, 18, 1, 450);
INSERT INTO `tees` VALUES (37, 1, 1, 3, 85);
INSERT INTO `tees` VALUES (38, 1, 2, 3, 305);
INSERT INTO `tees` VALUES (39, 1, 3, 3, 85);
INSERT INTO `tees` VALUES (40, 1, 4, 3, 255);
INSERT INTO `tees` VALUES (41, 1, 5, 3, 120);
INSERT INTO `tees` VALUES (42, 1, 6, 3, 230);
INSERT INTO `tees` VALUES (43, 1, 7, 3, 305);
INSERT INTO `tees` VALUES (44, 1, 8, 3, 335);
INSERT INTO `tees` VALUES (45, 1, 9, 3, 380);
INSERT INTO `tees` VALUES (46, 1, 10, 3, 390);
INSERT INTO `tees` VALUES (47, 1, 11, 3, 305);
INSERT INTO `tees` VALUES (48, 1, 12, 3, 255);
INSERT INTO `tees` VALUES (49, 1, 13, 3, 120);
INSERT INTO `tees` VALUES (50, 1, 14, 3, 230);
INSERT INTO `tees` VALUES (51, 1, 15, 3, 305);
INSERT INTO `tees` VALUES (52, 1, 16, 3, 335);
INSERT INTO `tees` VALUES (53, 1, 17, 3, 380);
INSERT INTO `tees` VALUES (54, 1, 18, 3, 390);

SET FOREIGN_KEY_CHECKS = 1;
