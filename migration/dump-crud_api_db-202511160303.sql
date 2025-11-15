-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: crud_api_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Lenovo Laptop',90000.00,0,'inactive','2025-11-15 10:15:23','2025-11-15 21:49:17'),(2,'Mouse',1500.00,0,'active','2025-11-15 10:15:23','2025-11-15 21:39:48'),(3,'Keyboard',3500.00,1,'active','2025-11-15 10:15:23','2025-11-15 19:22:01'),(4,'Monitor',15000.00,0,'active','2025-11-15 10:15:23','2025-11-15 12:21:39'),(5,'Webcam',4000.00,5,'inactive','2025-11-15 10:15:23','2025-11-15 20:30:26'),(6,'Headphones',2500.00,25,'active','2025-11-15 10:15:23','2025-11-15 10:15:23'),(7,'USB Cable',500.00,100,'active','2025-11-15 10:15:23','2025-11-15 10:15:23'),(8,'Desk Lamp',1200.00,15,'active','2025-11-15 10:15:23','2025-11-15 10:15:23'),(9,'Phone Stand',800.00,40,'active','2025-11-15 10:15:23','2025-11-15 10:15:23'),(10,'Screen Protector',300.00,200,'active','2025-11-15 10:15:23','2025-11-15 10:15:23'),(11,'Xiomi phone',909818.00,20,'active','2025-11-15 17:42:58','2025-11-15 17:42:58'),(12,'Book',600.00,70,'active','2025-11-15 21:41:37','2025-11-15 21:41:37'),(13,'cover',900.00,7,'active','2025-11-15 21:43:02','2025-11-15 21:43:02'),(14,'cover',900.00,7,'active','2025-11-15 21:44:45','2025-11-15 21:44:45');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'crud_api_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-16  3:03:05
