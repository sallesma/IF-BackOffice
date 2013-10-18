SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE DATABASE `IF_BO` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `IF_BO`;

CREATE TABLE `artistes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `picture` varchar(200) NOT NULL,
  `genre` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `jour` varchar(10) NOT NULL,
  `scene` varchar(50) NOT NULL,
  `debut` time NOT NULL,
  `fin` time NOT NULL,
  `website` varchar(200) NOT NULL,
  `facebook` varchar(200) NOT NULL,
  `twitter` varchar(200) NOT NULL,
  `youtube` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

INSERT INTO `artistes` (`id`, `nom`, `picture`, `genre`, `description`, `jour`, `scene`, `debut`, `fin`, `website`, `facebook`, `twitter`, `youtube`) VALUES
(1, 'John Bobby', '', 'Hard Rock', '', 'Vendredi', 'Rock', '00:00:00', '00:00:00', '', '', '', ''),
(2, 'Ack', '', 'Punk', 'kjdkjdkj', 'Samedi', 'DJ', '00:00:00', '00:00:00', '', '', '', ''),
(3, '', 'pictureURL', '', '', 'vendredi', 'principale', '10:00:00', '10:00:00', '', '', '', ''),
(4, '', 'pictureURL', '', '', 'vendredi', 'principale', '10:00:00', '10:00:00', '', '', '', ''),
(5, 'Yoa', 'pictureURL', 'Yop', 'Kjhdhshjk', 'vendredi', 'principale', '11:00:00', '12:00:00', 'cool', 'cool', 'cool', 'cool'),
(6, 'Martin', 'pictureURL', 'Rock', 'Ce groupe dÃ©chire tout', 'samedi', 'chapiteau', '08:15:00', '10:00:00', 'martin.com', 'martin.com', 'martin.com', 'martin.com'),
(7, 'Martin 2', 'pictureURL', 'Rock', 'cool', 'vendredi', 'principale', '03:00:00', '04:00:00', 'Web', 'Fb', 'Tw', 'Yt');

CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=15 ;

INSERT INTO `news` (`id`, `title`, `content`, `date`) VALUES
(1, 'HiiiHaaaaaa', 'lol', '2013-10-09 18:40:29'),
(13, 'Titit', 'éééé', '2013-10-09 18:40:21'),
(14, 'toto', 'Here goes the content\n', '2013-10-09 18:47:12');
