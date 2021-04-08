-- MySQL dump 10.13  Distrib 5.7.32, for Win64 (x86_64)
--
-- Host: localhost    Database: proj
-- ------------------------------------------------------
-- Server version	5.7.32-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `productCode` varchar(100) NOT NULL,
  `productName` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `createdDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(100) DEFAULT NULL,
  `userCode` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`productCode`),
  KEY `product_FK` (`userCode`),
  CONSTRAINT `product_FK` FOREIGN KEY (`userCode`) REFERENCES `user` (`userCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('S21032901-21033001','MIlo Complete Mix',5000,100,'Nestle MIlo Complete Mix 60gr','2021-03-30 06:30:10','active','SELLER-2021-03-29-01'),('S21032901-21033002','Nestea Lemon Tea',6000,10,'Nestea Lemon Tea 90gr','2021-03-30 06:38:01','active','SELLER-2021-03-29-01'),('S21032901-21033003','Nescafe Cappucino',3000,50,'Nescafe Cappucino Carramel 20gr','2021-03-30 07:29:43','active','SELLER-2021-03-29-01'),('S21032901-21033101','Dancow',6000,68,'test','2021-03-31 03:27:31','disabled','SELLER-2021-03-29-01'),('S21032901-21040701','Corn Flakes',39000,30,'Gold Corn Flakes Sereal 275g','2021-04-07 02:16:34','inactive','SELLER-2021-03-29-01'),('S21032901-21040702','Maggi Saus Tiram',20000,40,'Maggi Saus Tiram Botol 350g','2021-04-07 02:17:20','active','SELLER-2021-03-29-01'),('S21032901-21040703','DANCOW Fortgiro',45000,50,'DANCOW Fortgiro Susu UHT Coklat 110ml 10 pcs','2021-04-07 02:18:10','inactive','SELLER-2021-03-29-01'),('S21032901-21040704','Fitnesse Granola Oat',14000,10,'Fitnesse Granola Oats & Honey Combo 45g','2021-04-07 02:18:57','inactive','SELLER-2021-03-29-01'),('S21032901-21040705','MILO ACTIV-GO',100000,20,'MILO ACTIV-GO Minuman Cokelat Berenergi Tin 800g','2021-04-07 02:19:33','inactive','SELLER-2021-03-29-01'),('S21032901-21040706','NESTLE MILO Cereal',20000,30,'NESTLE MILO Cereal Combo Pack 2 Pcs','2021-04-07 02:27:31','inactive','SELLER-2021-03-29-01'),('S21032901-21040707','Nestle Koko Krunch',50000,40,'nestle koko krunch','2021-04-07 02:28:50','inactive','SELLER-2021-03-29-01'),('S21032901-21040708','Nestle NESTUM',30000,40,'Nestle NESTUM Bubur Sereal Multigrain','2021-04-07 02:29:34','inactive','SELLER-2021-03-29-01'),('S21032901-21040709','Boost Optimum',299000,60,'Boost Optimum Susu Bubuk Kaleng 800gr','2021-04-07 02:30:07','active','SELLER-2021-03-29-01'),('S21032901-21040710','Coffee-Mate',15000,50,'Coffee-Mate Creamer Pouch 80g','2021-04-07 02:30:35','inactive','SELLER-2021-03-29-01'),('S21032901-21040711','NESCAFÉ Mocha',10000,50,'NESCAFÉ Mocha Can 240ml ','2021-04-07 02:31:41','inactive','SELLER-2021-03-29-01'),('S21032904-21040701','MIlo Complete Mix',5000,40,'Nestle MIlo Complete Mix 60gr','2021-04-07 07:14:44','inactive','SELLER-2021-03-29-04'),('S21032904-21040702','Nescafe Green Tea',63000,40,'Nescafe Green Tea','2021-04-07 07:33:35','inactive','SELLER-2021-03-29-04'),('S21032904-21040703','Nescafe Latte',43000,100,'Nescafe Latte','2021-04-07 07:34:28','inactive','SELLER-2021-03-29-04'),('S21032904-21040704','Nescafe Lemon Tea',30000,12,'Nescafe Lemon Tea','2021-04-07 07:38:47','inactive','SELLER-2021-03-29-04'),('S21032904-21040705','Nescafe Classic',35000,12,'Nescafe Classic','2021-04-07 07:39:18','inactive','SELLER-2021-03-29-04'),('S21032904-21040706','Nescafe Tiramisu',72000,33,'Nescafe Tiramisu','2021-04-07 07:39:39','inactive','SELLER-2021-03-29-04'),('S21032904-21040707','Nescafe Cappucino',52000,22,'Nescafe Cappucino','2021-04-07 07:41:04','inactive','SELLER-2021-03-29-04'),('S21032904-21040708','Nescafe Cappucino Ca',65000,55,'Nescafe Cappucino Caramel','2021-04-07 07:41:47','inactive','SELLER-2021-03-29-04'),('S21032904-21040709','Nescafe C Vending',40000,90,'Nescafe Classic Vending','2021-04-07 07:42:21','active','SELLER-2021-03-29-04');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userCode` varchar(100) NOT NULL,
  `userName` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `createdBy` varchar(100) DEFAULT NULL,
  `createdDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateBy` varchar(100) DEFAULT NULL,
  `updateDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `productLimit` int(11) DEFAULT '0',
  PRIMARY KEY (`userCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('ADMIN-2021-03-29-01','admin','089999999999','admin@admin.com','admin1234','active','ADMIN-29-03-2021-01','2021-03-29 01:09:08','ADMIN-29-03-2021-01','2021-03-29 01:09:08',NULL),('SELLER-2021-03-29-01','Ahmad','087999777888','ahmad@seller.com','ahmad123','active','SELLER-2021-03-29-01','2021-03-29 03:00:36','ADMIN-2021-03-29-01','2021-03-29 03:00:36',12),('SELLER-2021-03-29-04','Eka Nur','086555444333','eka@seller.com','eka12345','active','SELLER-2021-03-29-04','2021-03-29 07:25:15','ADMIN-2021-03-29-01','2021-03-29 07:25:15',7),('SELLER-2021-03-31-01','Ikhlasul Amal','082280524264','ikhlasul@gmail.com','A1234567','active','SELLER-2021-03-31-01','2021-03-31 03:49:53','ADMIN-2021-03-29-01','2021-03-31 03:49:53',0),('SELLER-2021-04-04-01','w','089122323','w@seller.com','qwe12345','inactive','SELLER-2021-04-04-01','2021-04-03 18:03:56','ADMIN-2021-03-29-01','2021-04-03 18:03:56',0),('SELLER-2021-04-06-01','Ridwan Ramadhan','087654333222','ridwan@seller.com','ridwan123','requested','SELLER-2021-04-06-01','2021-04-06 03:08:53','SELLER-2021-04-06-01','2021-04-06 03:08:53',0),('SELLER-2021-04-06-02','Lukman','087645637265','lukman@seller.com','lukman123','disabled','SELLER-2021-04-06-03','2021-04-06 03:09:56','SELLER-2021-04-06-03','2021-04-06 03:09:56',0),('SELLER-2021-04-06-03','Rokie','086473625123','rokie@seller.com','rokie123','active','SELLER-2021-04-06-03','2021-04-06 03:37:13','ADMIN-2021-03-29-01','2021-04-06 03:37:13',0),('SELLER-2021-04-06-04','Jaya','089234123234','jaya@seller.com','jaya1234','requested','SELLER-2021-04-06-04','2021-04-06 04:00:53','SELLER-2021-04-06-04','2021-04-06 04:00:53',0),('SELLER-2021-04-06-05','Rahmanika','087654567654','rahma@selle.com','rahma123','requested','SELLER-2021-04-06-05','2021-04-06 04:01:22','SELLER-2021-04-06-05','2021-04-06 04:01:22',0),('SELLER-2021-04-06-06','Mahardika','089123333444','mahardika@seller.com','mahardika123','requested','SELLER-2021-04-06-06','2021-04-06 04:01:58','SELLER-2021-04-06-06','2021-04-06 04:01:58',0),('SELLER-2021-04-06-07','Johan','087666555444','johan@selle.com','johan123','requested','SELLER-2021-04-06-07','2021-04-06 04:02:53','SELLER-2021-04-06-07','2021-04-06 04:02:53',0),('SELLER-2021-04-06-08','Raja Minyak','089997776555','minyak@seller.com','minyak123','requested','SELLER-2021-04-06-08','2021-04-06 04:03:54','SELLER-2021-04-06-08','2021-04-06 04:03:54',0),('SELLER-2021-04-06-09','Ruby DD','086444555233','ruby@selle.com','ruby1234','requested','SELLER-2021-04-06-09','2021-04-06 04:04:28','SELLER-2021-04-06-09','2021-04-06 04:04:28',0),('SELLER-2021-04-06-10','Dodi Mulyadi','085666444777','dodi@seller.com','dodi1234','requested','SELLER-2021-04-06-10','2021-04-06 04:05:45','SELLER-2021-04-06-10','2021-04-06 04:05:45',0),('SELLER-2021-04-06-11','Lukman','087645637265','lukman@seller.com','lukman123','requested','SELLER-2021-04-06-11','2021-04-06 04:13:05','SELLER-2021-04-06-11','2021-04-06 04:13:05',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'proj'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-08 18:48:37
