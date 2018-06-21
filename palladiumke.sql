-- phpMyAdmin SQL Dump
-- version 4.4.15.9
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 21, 2018 at 01:37 PM
-- Server version: 5.6.37
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `palladiumke`
--

-- --------------------------------------------------------

--
-- Table structure for table `palladium_contact_information`
--

CREATE TABLE IF NOT EXISTS `palladium_contact_information` (
  `EntryID` int(11) NOT NULL,
  `UserID` int(25) DEFAULT NULL,
  `Address` text NOT NULL,
  `PhoneNumber` varchar(15) DEFAULT NULL,
  `AltPhone` varchar(15) DEFAULT NULL,
  `Email` varchar(25) DEFAULT NULL,
  `County` varchar(35) DEFAULT NULL,
  `SubCounty` varchar(35) DEFAULT NULL,
  `Ward` varchar(35) DEFAULT NULL,
  `Village` varchar(35) DEFAULT NULL,
  `DateLogged` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `palladium_contact_information`
--

INSERT INTO `palladium_contact_information` (`EntryID`, `UserID`, `Address`, `PhoneNumber`, `AltPhone`, `Email`, `County`, `SubCounty`, `Ward`, `Village`, `DateLogged`) VALUES
(1, 111000, 'Stanford House, 5th floor Northern wing', '0728430728', '0705007984', 'iotuya05@gmail.com', 'Florida', 'Florida', 'Kisoi', 'Kisoi', '2018-06-20 11:52:44'),
(2, 111001, 'Nairobi, Kenya', '721356840', '0705007984', 'goldenfaith21@yahoo.com', 'Nairobi', 'Nairobi', 'Sagana', 'Sagana west', '2018-06-20 12:25:43'),
(3, 111002, 'imara', '0705007984', '0721356840', 'iotuya05@gmail.com', 'Nairobi', 'Nairobi', 'Bungoma West', 'Bungoma Inner', '2018-06-20 12:36:24'),
(4, 111003, 'Stanford House, 5th floor Northern wing', '0728430728', '0705007984', 'iotuya303@gmail.com', 'Florida', 'Florida', 'Kitui', 'kitu north', '2018-06-21 09:16:33');

-- --------------------------------------------------------

--
-- Table structure for table `palladium_nextofkin`
--

CREATE TABLE IF NOT EXISTS `palladium_nextofkin` (
  `EntryID` int(11) NOT NULL,
  `NokName` varchar(30) DEFAULT NULL,
  `NokEmail` varchar(35) DEFAULT NULL,
  `NokAddress` text,
  `Relationship` varchar(35) DEFAULT NULL,
  `UserID` int(25) DEFAULT NULL,
  `IsDisabled` int(1) NOT NULL DEFAULT '0',
  `IsDeleted` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `palladium_nextofkin`
--

INSERT INTO `palladium_nextofkin` (`EntryID`, `NokName`, `NokEmail`, `NokAddress`, `Relationship`, `UserID`, `IsDisabled`, `IsDeleted`) VALUES
(1, 'Kathure Wamalwa Kung', 'goldenfaith21@yahoo.com', 'Nairobi, Kenya', 'Auntie', 111002, 0, 0),
(2, 'Wamoi Anne', 'goldenfai@yahoo.com', 'Nairobi, Kenya', 'Mother', 111001, 0, 0),
(3, 'Wasee Wayne Kim', 'goldenfai@gmail.com', 'Nairobi, Kenya', 'Father', 111000, 0, 0),
(4, 'Maeni Antony', 'maeni.antony@gmail.com', 'KU', 'Father', 111003, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `palladium_users`
--

CREATE TABLE IF NOT EXISTS `palladium_users` (
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(30) DEFAULT NULL,
  `LastName` varchar(30) DEFAULT NULL,
  `MiddleName` varchar(30) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Gender` varchar(25) DEFAULT NULL,
  `Age` int(3) DEFAULT NULL,
  `MaritalStatus` varchar(30) DEFAULT NULL,
  `Height` decimal(10,3) DEFAULT NULL,
  `Weight` decimal(10,3) DEFAULT NULL,
  `UserType` int(3) DEFAULT NULL,
  `DateEnrolled` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IsDisabled` int(1) NOT NULL DEFAULT '0',
  `IsDeleted` int(1) DEFAULT '0',
  `DeletedOn` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=111004 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `palladium_users`
--

INSERT INTO `palladium_users` (`UserID`, `FirstName`, `LastName`, `MiddleName`, `DateOfBirth`, `Gender`, `Age`, `MaritalStatus`, `Height`, `Weight`, `UserType`, `DateEnrolled`, `IsDisabled`, `IsDeleted`, `DeletedOn`) VALUES
(111000, 'Moid', 'Daniel', 'Korir', '1924-09-24', 'Female', 99, 'Married', '15.000', '86.000', 1, '2018-06-20 11:52:44', 0, 0, NULL),
(111001, 'Emmah', 'Kimani', 'Gathoni', '1988-12-12', 'Female', 17, 'Married', '15.000', '86.000', 1, '2018-06-20 12:25:43', 0, 1, '2018-06-21 07:03:41'),
(111002, 'Idd', 'Juma', 'Gathon', '1994-01-12', 'Female', 24, 'Married', '15.000', '86.000', 1, '2018-06-20 12:36:24', 0, 1, '2018-06-21 04:56:36'),
(111003, 'Kiini', 'Mwaka', 'Joseph', '1983-12-12', 'Male', 45, 'Married', '15.000', '73.000', 1, '2018-06-21 09:16:33', 0, 0, NULL);

--
-- Triggers `palladium_users`
--
DELIMITER $$
CREATE TRIGGER `user_audit` BEFORE UPDATE ON `palladium_users`
 FOR EACH ROW BEGIN
INSERT INTO
  `palladiumke`.`palladium_users_audit`
VALUES
  (
    OLD.UserID,
    OLD.FirstName,
    OLD.LastName,
    OLD.MiddleName,
    OLD.DateOfBirth,
    OLD.Gender,
    OLD.Age,
    OLD.MaritalStatus,
    OLD.Height,
    OLD.Weight,
    OLD.UserType,
    OLD.DateEnrolled,
    OLD.IsDisabled,
    OLD.IsDeleted,
    OLD.DeletedOn
  );
  END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `palladium_users_audit`
--

CREATE TABLE IF NOT EXISTS `palladium_users_audit` (
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(30) DEFAULT NULL,
  `LastName` varchar(30) DEFAULT NULL,
  `MiddleName` varchar(30) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Gender` varchar(25) DEFAULT NULL,
  `Age` int(3) DEFAULT NULL,
  `MaritalStatus` varchar(30) DEFAULT NULL,
  `Height` decimal(10,3) DEFAULT NULL,
  `Weight` decimal(10,3) DEFAULT NULL,
  `UserType` int(3) DEFAULT NULL,
  `DateEnrolled` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IsDisabled` int(1) NOT NULL DEFAULT '0',
  `IsDeleted` int(1) DEFAULT '0',
  `DeletedOn` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=111004 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `palladium_users_audit`
--

INSERT INTO `palladium_users_audit` (`UserID`, `FirstName`, `LastName`, `MiddleName`, `DateOfBirth`, `Gender`, `Age`, `MaritalStatus`, `Height`, `Weight`, `UserType`, `DateEnrolled`, `IsDisabled`, `IsDeleted`, `DeletedOn`) VALUES
(111003, 'Kiini', 'Mwaka', 'Joseph', '1768-12-12', 'Male', 123, 'Divorced', '15.000', '73.000', 1, '2018-06-21 09:16:33', 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `palladium_usertypes`
--

CREATE TABLE IF NOT EXISTS `palladium_usertypes` (
  `UserType` int(11) NOT NULL,
  `Type` varchar(55) NOT NULL,
  `IsDisabled` int(11) NOT NULL DEFAULT '0',
  `IsDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `palladium_usertypes`
--

INSERT INTO `palladium_usertypes` (`UserType`, `Type`, `IsDisabled`, `IsDeleted`) VALUES
(1, 'Patient', 0, 0),
(2, 'Admin', 0, 0),
(3, 'User', 0, 0),
(4, 'Guest', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `palladium_contact_information`
--
ALTER TABLE `palladium_contact_information`
  ADD PRIMARY KEY (`EntryID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `palladium_nextofkin`
--
ALTER TABLE `palladium_nextofkin`
  ADD PRIMARY KEY (`EntryID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `palladium_users`
--
ALTER TABLE `palladium_users`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `UserType` (`UserType`);

--
-- Indexes for table `palladium_users_audit`
--
ALTER TABLE `palladium_users_audit`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `UserType` (`UserType`);

--
-- Indexes for table `palladium_usertypes`
--
ALTER TABLE `palladium_usertypes`
  ADD PRIMARY KEY (`UserType`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `palladium_contact_information`
--
ALTER TABLE `palladium_contact_information`
  MODIFY `EntryID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `palladium_nextofkin`
--
ALTER TABLE `palladium_nextofkin`
  MODIFY `EntryID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `palladium_users`
--
ALTER TABLE `palladium_users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=111004;
--
-- AUTO_INCREMENT for table `palladium_users_audit`
--
ALTER TABLE `palladium_users_audit`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=111004;
--
-- AUTO_INCREMENT for table `palladium_usertypes`
--
ALTER TABLE `palladium_usertypes`
  MODIFY `UserType` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `palladium_contact_information`
--
ALTER TABLE `palladium_contact_information`
  ADD CONSTRAINT `palladium_contact_information_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `palladium_users` (`UserID`);

--
-- Constraints for table `palladium_nextofkin`
--
ALTER TABLE `palladium_nextofkin`
  ADD CONSTRAINT `palladium_nextofkin_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `palladium_users` (`UserID`);

--
-- Constraints for table `palladium_users`
--
ALTER TABLE `palladium_users`
  ADD CONSTRAINT `palladium_users_ibfk_1` FOREIGN KEY (`UserType`) REFERENCES `palladium_usertypes` (`UserType`),
  ADD CONSTRAINT `palladium_users_ibfk_2` FOREIGN KEY (`UserType`) REFERENCES `palladium_usertypes` (`UserType`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
