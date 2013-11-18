-- phpMyAdmin SQL Dump
-- version OVH
-- http://www.phpmyadmin.net
--
-- Client: mysql51-101.perso
-- Généré le : Lun 18 Novembre 2013 à 17:04
-- Version du serveur: 5.1.66
-- Version de PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `titouanrif`
--

-- --------------------------------------------------------

--
-- Structure de la table `artists`
--

CREATE TABLE IF NOT EXISTS `artists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `picture` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `style` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `day` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `stage` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `beginHour` time NOT NULL,
  `endHour` time NOT NULL,
  `website` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `facebook` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `twitter` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `youtube` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=24 ;

--
-- Contenu de la table `artists`
--

INSERT INTO `artists` (`id`, `name`, `picture`, `style`, `description`, `day`, `stage`, `beginHour`, `endHour`, `website`, `facebook`, `twitter`, `youtube`) VALUES
(22, 'Daft Punk', 'http://titouanrossier.com/ifM/data/fileUpload/artists/tumblr_mm35b87dGz1qmwrnuo1_1280.jpg', '', 'Daft Punk est un groupe franÃ§ais de musique Ã©lectronique, originaire de Paris. Actifs depuis 1993, Thomas Bangalter et Guy-Manuel de Homem-Christo, les deux membres, ont alliÃ© Ã  leurs sons electro, house et techno des tonalitÃ©s rock, groove et disco. Le groupe participa Ã  la crÃ©ation et la dÃ©mocratisation du mouvement de musique Ã©lectronique baptisÃ© French touch. Ils font partie des artistes franÃ§ais s''exportant le mieux Ã  l''Ã©tranger, et ce depuis la sortie de leur premier vÃ©ritable succÃ¨s, Da Funk en 1996. Une des originalitÃ©s des Daft Punk est la culture de leur notoriÃ©tÃ© d''artistes indÃ©pendants anonymes, Ã  l''aide de casques et de costumes.', 'vendredi', 'principale', '23:15:00', '01:15:00', 'http://www.daftpunk.com/', 'https://www.facebook.com/daftpunk', 'https://twitter.com/daftpunk', 'http://www.youtube.com/user/DaftPunkVEVO'),
(23, 'Titouan Rossier', 'http://titouanrossier.com/ifM/data/fileUpload/artists/1476307_10151857078773893_1899618758_n.jpg', '', 'Un type chevelu', 'vendredi', 'principale', '10:15:00', '10:15:00', 'titouanrossier.com', '', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `filters`
--

CREATE TABLE IF NOT EXISTS `filters` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- Contenu de la table `filters`
--

INSERT INTO `filters` (`id`, `url`) VALUES
(22, 'http://titouanrossier.com/ifM/data/fileUpload/filters/martine.jpg'),
(23, 'http://titouanrossier.com/ifM/data/fileUpload/filters/martine2.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `infos`
--

CREATE TABLE IF NOT EXISTS `infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `isCategory` tinyint(1) NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=93 ;

--
-- Contenu de la table `infos`
--

INSERT INTO `infos` (`id`, `name`, `picture`, `isCategory`, `content`, `parent`) VALUES
(75, 'Bar Ã©tuville', '', 0, 'Ah ah ah', 70),
(72, 'Official Cauette', '', 0, 'Chez JP', 70),
(73, 'Bar Ã  vin', '', 0, 'Glou glou glou', 70),
(70, 'Bars', '', 1, '', 0),
(71, 'Pic''asso', '', 0, 'Au fond Ã  gauche', 70),
(69, 'Support', '', 0, 'Si Ã§a ne marche pas, dÃ©merdez vous !', 0),
(66, 'Pita party', '', 0, 'Le roi de la pita', 61),
(67, 'RU', '', 0, 'Berk', 61),
(68, 'CrÃ©dits', '', 0, 'Tit et Martin on beaucoup travaillÃ©', 0),
(65, 'Kebab the best', '', 0, 'Miam', 61),
(64, 'En voiture', '', 0, 'C''est pas dur', 62),
(63, 'En train', '', 0, 'C''est facile', 62),
(62, 'AccÃ¨s', '', 1, '', 0),
(61, 'Restauration', '', 1, '', 0);

-- --------------------------------------------------------

--
-- Structure de la table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=36 ;

--
-- Contenu de la table `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `date`) VALUES
(34, 'Lancement de l''application', 'L''application Imaginarium Festival est maintenant disponible sur les smartphones Android et iOS ! TÃ©lÃ©chargez la !', '2013-11-17 16:21:04'),
(35, 'Nouvelle news', 'Une news plus rÃ©cente pour tester', '2013-11-18 15:44:01');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
