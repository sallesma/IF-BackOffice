SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `db480737600`
--

-- --------------------------------------------------------

--
-- Structure de la table `bo_artists`
--

CREATE TABLE IF NOT EXISTS `bo_artists` (
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
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=24 ;

-- --------------------------------------------------------

--
-- Structure de la table `bo_filters`
--

CREATE TABLE IF NOT EXISTS `bo_filters` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `picture` text NOT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Structure de la table `bo_infos`
--

CREATE TABLE IF NOT EXISTS `bo_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `isCategory` tinyint(1) NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `parent` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

-- --------------------------------------------------------

--
-- Structure de la table `bo_map`
--

CREATE TABLE IF NOT EXISTS `bo_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `infoId` int(11) DEFAULT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

-- --------------------------------------------------------

--
-- Structure de la table `bo_news`
--

CREATE TABLE IF NOT EXISTS `bo_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=130 ;

-- --------------------------------------------------------

--
-- Structure de la table `bo_partners`
--

CREATE TABLE IF NOT EXISTS `bo_partners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `priority` int(11) NOT NULL DEFAULT '0',
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=44 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
