-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2016 at 08:45 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `yellow_pixel`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `ID` int(20) NOT NULL AUTO_INCREMENT,
  `NAME` text NOT NULL,
  `CREATED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATED` datetime(1) DEFAULT '0000-00-00 00:00:00.0',
  `DELETED` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID`, `NAME`, `CREATED`, `UPDATED`, `DELETED`) VALUES
(5, 'test4', '2016-02-04 03:19:43', '0000-00-00 00:00:00.0', 0);

-- --------------------------------------------------------

--
-- Table structure for table `footer_info`
--

CREATE TABLE IF NOT EXISTS `footer_info` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `ABOUT` text NOT NULL,
  `CREATED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATED` datetime NOT NULL,
  `DELETED` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `project_info`
--

CREATE TABLE IF NOT EXISTS `project_info` (
  `ID` int(100) NOT NULL AUTO_INCREMENT,
  `IMAGE` int(50) NOT NULL,
  `IMAGE_CATEGORY` int(20) NOT NULL,
  `CAPTION` text NOT NULL,
  `CREATED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATED` datetime(1) NOT NULL,
  `DELETED` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `IMAGE_CATEGORY` (`IMAGE_CATEGORY`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE IF NOT EXISTS `slider` (
  `ID` int(100) NOT NULL AUTO_INCREMENT,
  `IMAGE` text NOT NULL,
  `HEAD_CAPTION` text NOT NULL,
  `SUB_CAPTION` text NOT NULL,
  `CREATED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATED` datetime(1) NOT NULL,
  `DELETED` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
