/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 5.7.32-0ubuntu0.18.04.1 : Database - BBRoom
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`BBRoom` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `BBRoom`;

/*Table structure for table `diary` */

DROP TABLE IF EXISTS `diary`;

CREATE TABLE `diary` (
  `diary_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(100) DEFAULT NULL,
  `info` mediumtext,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`diary_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

/*Data for the table `diary` */

insert  into `diary`(`diary_id`,`user_id`,`info`,`time`) values 
(1,1,'过热或和他和她和他很饿','2020-12-25 21:26:39'),
(2,1,'sbdjcbddsfd','2020-12-25 21:26:40'),
(4,1,'ssssss','2020-12-25 21:26:41'),
(6,1,'放的地方地方的范德萨范德萨范德萨范德萨范德萨发','2020-12-25 21:26:48'),
(7,24,'ddddddd','2020-12-01 10:42:27'),
(8,24,'ffrfrfrfrf','2021-02-01 10:42:28'),
(9,24,'rrggrr','2021-01-01 10:42:30'),
(10,24,'ssssss','2021-01-01 10:42:31'),
(11,24,'ssssss','2021-01-01 10:42:33'),
(14,24,'<p>sdasssnnnnnananannananaankowdjdsa<br></p>','2021-01-01 15:43:17'),
(15,24,'<p>sdasssnnnnnananannananaankowdjdsa<br></p>','2021-01-01 15:43:27'),
(17,24,'<p>nishuoshawanyi<br></p>','2021-01-01 15:52:09'),
(21,40,'<p>nishuoshaasdasdnsa<br></p>','2021-01-03 16:41:15'),
(23,40,'<p>nidajidsadsad<img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/pcmoren_wu_org.png\" alt=\"[污]\" data-w-e=\"1\"></p>','2021-01-03 17:17:32'),
(24,27,'<p>今天是个好日子 今天是个好日子<span style=\"font-weight: bold;\">今天是个好日子今天是个好日子&nbsp;</span><img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/pcmoren_wu_org.png\" alt=\"[污]\" data-w-e=\"1\"></p>','2021-01-03 17:17:38'),
(25,27,'<p>dvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv</p>','2020-12-01 17:20:35'),
(32,42,'<p>谢谢</p>','2021-01-03 18:05:30'),
(34,42,'<table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th></tr><tr><td>&nbsp;</td><td>&nbsp; &nbsp; 佛挡杀佛</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;宣传册错错</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p><br></p>','2021-01-03 18:07:56'),
(35,42,'<p>李慧秀憨批</p>','2021-01-03 18:08:40'),
(36,44,'<p>李慧秀憨批</p>','2021-01-03 18:19:27'),
(48,45,'<p>vfvfb</p>','2021-01-03 19:07:44'),
(49,48,'<p>wwww</p>','2021-01-03 19:12:17');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `perms` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'user',
  `sex` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '女',
  `profession` varchar(255) COLLATE utf8_unicode_ci DEFAULT '程序员',
  `whether_change` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NO' COMMENT '用户是否需要重设密码，需要(YES)则不能登录，验证身份重设密码方可登录',
  `number` int(11) NOT NULL DEFAULT '0' COMMENT '用户密码输错次数，5次以上需要重设密码，whether_change改为YES，修改密码后number改为0 。',
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `salt` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `headImageUrl` varchar(100) COLLATE utf8_unicode_ci DEFAULT 'a4a33b9919e543458a3bc3d4124ed316.jpg',
  PRIMARY KEY (`user_id`,`number`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `user` */

insert  into `user`(`user_id`,`username`,`email`,`perms`,`sex`,`profession`,`whether_change`,`number`,`password`,`salt`,`headImageUrl`) values 
(16,NULL,'3574264471@qq.com','admin','女','程序员','NO',0,'1d2c97b7bb8977336c7231e16ac82a69','3zGCaEZr','a4a33b9919e543458a3bc3d4124ed316.jpg'),
(40,'用户40','1343385202@qq.com','admin','女','秃头怪','NO',1,'89a662ad9465fa5eaa593f30de7c50c2','LGp1n^vT','a4a33b9919e543458a3bc3d4124ed316.jpg'),
(41,NULL,'2380886380@qq.com','user','女','程序员','NO',0,'8ca091ba1a2fac9364c92f59e4b51505','ggwhXzLM','a4a33b9919e543458a3bc3d4124ed316.jpg'),
(43,'嘻嘻','767798711@qq.com','admin','男','程序员','NO',2,'f94792fbca348564c5155f402cb018c4','MQ0BZi5N','a4a33b9919e543458a3bc3d4124ed316.jpg'),
(44,'憨憨李慧秀','2477431862@qq.com','user','女','秃头少女','NO',0,'d813166fdb75d6cd8b4c7c8076e71ef7','eqY8u&W7','a4a33b9919e543458a3bc3d4124ed316.jpg'),
(45,'yyx','3389607683@qq.com','admin','女','程序员','NO',0,'b9b08d877e2f9a6db8410368b3bb5f31','O6435)EH','a4a33b9919e543458a3bc3d4124ed316.jpg'),
(48,NULL,'1471416970@qq.com','admin','女','程序员','NO',0,'2362d6ee02b098949903dda1fb8f23f9','&s=ekS==','a4a33b9919e543458a3bc3d4124ed316.jpg');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
