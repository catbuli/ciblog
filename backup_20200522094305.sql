-- 该数据库结构不为最终版本，仅为0.4.0使用。
-- 因还在开发阶段，不保证数据库结构不存在问题。
-- 用户名和密码为admin admin,因为不存在账号注册逻辑，所以请务必保证数据库user表中存在一个用户。
-- 数据库名称为ciblog
-- by 猫不理的锅包肉


-- MariaDB dump 10.17  Distrib 10.4.10-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: ciblog
-- ------------------------------------------------------
-- Server version	10.4.10-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ciblog_article`
--

DROP TABLE IF EXISTS `ciblog_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ciblog_article` (
  `aid` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章编号',
  `title` longtext DEFAULT NULL COMMENT '文章标题',
  `html` longtext DEFAULT NULL COMMENT '文章h5',
  `text` longtext DEFAULT NULL COMMENT '文章正文',
  `create_date` datetime DEFAULT NULL COMMENT '发表时间',
  `modify_date` datetime DEFAULT NULL COMMENT '最后编辑时间',
  `order` int(255) DEFAULT NULL COMMENT '排序',
  `author_id` int(11) DEFAULT NULL COMMENT '作者id',
  `status` varchar(255) DEFAULT '0' COMMENT '0-发布 无草稿\r\n1-发布 有草稿\r\n2-未发布 有草稿',
  `comment_count` int(11) unsigned DEFAULT 0 COMMENT '评论数',
  `allow_comment` int(11) unsigned DEFAULT 1 COMMENT '0-不允许\r\n1-允许',
  `pv` int(255) DEFAULT 0 COMMENT '阅读量',
  `cover_url` longtext DEFAULT NULL COMMENT '封面连接',
  `description` longtext CHARACTER SET utf32 DEFAULT NULL COMMENT '描述',
  `draft` longtext DEFAULT NULL COMMENT '草稿',
  PRIMARY KEY (`aid`) USING BTREE,
  FULLTEXT KEY `search` (`title`,`text`),
  FULLTEXT KEY `search1` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciblog_article`
--

LOCK TABLES `ciblog_article` WRITE;
/*!40000 ALTER TABLE `ciblog_article` DISABLE KEYS */;
/*!40000 ALTER TABLE `ciblog_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciblog_article_meta`
--

DROP TABLE IF EXISTS `ciblog_article_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ciblog_article_meta` (
  `id` int(50) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `mid` int(11) DEFAULT NULL COMMENT '标签或分类主键',
  `aid` int(11) DEFAULT NULL COMMENT '文章主键',
  `type` varchar(20) DEFAULT NULL COMMENT '类型',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=836 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciblog_article_meta`
--

LOCK TABLES `ciblog_article_meta` WRITE;
/*!40000 ALTER TABLE `ciblog_article_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `ciblog_article_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciblog_comment`
--

DROP TABLE IF EXISTS `ciblog_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ciblog_comment` (
  `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `ip` varchar(100) DEFAULT NULL COMMENT 'ip地址',
  `content` longtext DEFAULT NULL COMMENT '评论内容',
  `nickname` varchar(50) DEFAULT NULL COMMENT '昵称',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `aid` int(11) DEFAULT NULL COMMENT '文章id',
  `status` int(11) DEFAULT NULL COMMENT '0-未审核\r\n1-通过\r\n2-垃圾',
  `reply` varchar(150) DEFAULT NULL COMMENT '回复的评论id 以及昵称',
  `create_date` datetime DEFAULT NULL COMMENT '评论时间',
  `client` varchar(100) DEFAULT NULL COMMENT '客户端信息',
  `avatar_url` varchar(100) DEFAULT NULL COMMENT '头像链接',
  PRIMARY KEY (`cid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciblog_comment`
--

LOCK TABLES `ciblog_comment` WRITE;
/*!40000 ALTER TABLE `ciblog_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `ciblog_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciblog_file`
--

DROP TABLE IF EXISTS `ciblog_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ciblog_file` (
  `fid` int(11) NOT NULL AUTO_INCREMENT COMMENT '文件主键',
  `name` varchar(255) DEFAULT NULL COMMENT '文件名',
  `type` varchar(50) DEFAULT NULL COMMENT '文件类型',
  `url` varchar(255) DEFAULT NULL COMMENT '文件url',
  `size` int(11) DEFAULT NULL COMMENT '文件大小',
  `aid` int(11) DEFAULT NULL COMMENT '所属文章id',
  `datetime` datetime DEFAULT NULL COMMENT '上传时间',
  `status` varchar(11) DEFAULT NULL COMMENT '0-归档文件\r\n1-临时文件\r\n2-全局文件',
  `path` varchar(255) DEFAULT NULL COMMENT '文件路径',
  PRIMARY KEY (`fid`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=188 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciblog_file`
--

LOCK TABLES `ciblog_file` WRITE;
/*!40000 ALTER TABLE `ciblog_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `ciblog_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciblog_meta`
--

DROP TABLE IF EXISTS `ciblog_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ciblog_meta` (
  `mid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '分类或标签名称',
  `type` varchar(50) NOT NULL COMMENT 'tag或者category\r\n',
  `description` varchar(50) DEFAULT NULL COMMENT '描述',
  `count` int(11) DEFAULT 0 COMMENT '使用该标签的文章数',
  `order` int(10) DEFAULT 0 COMMENT '分类排序  tag为0',
  `parent` int(10) DEFAULT NULL COMMENT '二级分类',
  PRIMARY KEY (`mid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciblog_meta`
--

LOCK TABLES `ciblog_meta` WRITE;
/*!40000 ALTER TABLE `ciblog_meta` DISABLE KEYS */;
INSERT INTO `ciblog_meta` VALUES (127,'aaa','tag',NULL,0,0,0),(162,'ccc','category','ccc',0,0,NULL);
/*!40000 ALTER TABLE `ciblog_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciblog_setup`
--

DROP TABLE IF EXISTS `ciblog_setup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ciblog_setup` (
  `name` varchar(255) DEFAULT NULL COMMENT '设置名称',
  `user` int(50) DEFAULT NULL COMMENT '所属用户',
  `value` longtext DEFAULT NULL COMMENT '设置值'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciblog_setup`
--

LOCK TABLES `ciblog_setup` WRITE;
/*!40000 ALTER TABLE `ciblog_setup` DISABLE KEYS */;
INSERT INTO `ciblog_setup` VALUES ('banner',1,'https://ciblog.oss-cn-shanghai.aliyuncs.com/images/bg1.jpg'),('comment_check',1,''),('qaq',1,'QAQ%OwQ%(/= _ =)/~┴┴%（●>∀<●）%(→_←)%ヾ(=^▽^=)ノ%(*￣∇￣*)%(*´∇｀*)%(*ﾟ▽ﾟ*)%(｡･ω･)ﾉﾞ%(≡ω≡．)%(｀･ω･´)%(´･ω･｀)%(●´ω｀●)φ%'),('web_description',1,'测试描述'),('default_category',1,'162'),('web_url',1,'http://localhost:8020/'),('web_name',1,'测试站点'),('comment_is_allow',1,'1'),('nav_configuration',1,'{\n    \"text\": \"bilibili\",\n    \"href\": \"https://space.bilibili.com/4568935/\",\n    \"icon\": \"iconfont icon-aria-about\"\n},\n{\n    \"text\": \"git\",\n    \"href\": \"https://github.com/zhangyifei233\",\n    \"icon\": \"iconfont icon-aria-github\"\n},\n{\n    \"text\": \"博客\",\n    \"linkto\": \"/\",\n    \"icon\": \"iconfont icon-aria-home\",\n    \"sub\": [\n        {\n            \"text\": \"ddd\",\n            \"linkto\": \"/search/category/163\",\n            \"icon\": \"iconfont icon-aria-music\"\n        }\n    ]\n},\n{\n    \"text\": \"归档\",\n    \"linkto\": \"/log\",\n    \"icon\": \"iconfont icon-aria-archives\"\n}'),('top_article',1,'');
/*!40000 ALTER TABLE `ciblog_setup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciblog_user`
--

DROP TABLE IF EXISTS `ciblog_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ciblog_user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id\r\n\r\n',
  `name` varchar(50) DEFAULT NULL COMMENT '用户姓名',
  `password` varchar(200) DEFAULT NULL COMMENT '用户密码',
  `mail` varchar(50) DEFAULT NULL COMMENT '用户邮箱',
  `bilibili` varchar(50) DEFAULT NULL COMMENT '用户哔哩哔哩（url地址）',
  `github` varchar(50) DEFAULT NULL COMMENT '用户github（rul地址）',
  `nickname` varchar(20) DEFAULT NULL COMMENT '用户昵称',
  `group_id` int(50) DEFAULT NULL COMMENT '用户组',
  `imgurl` varchar(200) DEFAULT NULL COMMENT '头像地址',
  `description` varchar(100) DEFAULT NULL COMMENT '个人描述',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciblog_user`
--

LOCK TABLES `ciblog_user` WRITE;
/*!40000 ALTER TABLE `ciblog_user` DISABLE KEYS */;
INSERT INTO `ciblog_user` VALUES (1,'admin','21232f297a57a5a743894a0e4a801fc3','15204944127@163.com','https://space.bilibili.com/4568935','https://github.com/zhangyifei233','测试昵称',0,'https://xiaochengxuimg.oss-cn-beijing.aliyuncs.com/Blog/oh.jpg','测试描述'),(2,'testadmin','21232f297a57a5a743894a0e4a801fc3','15204944127@163.com','https://space.bilibili.com/4568935','https://github.com/zhangyifei233','预览账号',0,'https://xiaochengxuimg.oss-cn-beijing.aliyuncs.com/Blog/oh.jpg','预览个人描述');
/*!40000 ALTER TABLE `ciblog_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-22  9:43:05
