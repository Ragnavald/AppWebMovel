-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 01-Dez-2019 às 22:29
-- Versão do servidor: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clube`
--
CREATE DATABASE IF NOT EXISTS `clube` DEFAULT CHARACTER SET utf8 COLLATE utf8_swedish_ci;
USE `clube`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `eventos`
--

DROP TABLE IF EXISTS `eventos`;
CREATE TABLE IF NOT EXISTS `eventos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` datetime NOT NULL,
  `descri` text COLLATE utf8_swedish_ci,
  `palestrantes` varchar(200) COLLATE utf8_swedish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Extraindo dados da tabela `eventos`
--

INSERT INTO `eventos` (`id`, `data`, `descri`, `palestrantes`) VALUES
(5, '2019-10-03 03:15:00', 'Todos os membros estão convidados para participar e desfrutar dessa sessão.  ', 'Alucard e Vlad Dlacula');

-- --------------------------------------------------------

--
-- Estrutura da tabela `membros`
--

DROP TABLE IF EXISTS `membros`;
CREATE TABLE IF NOT EXISTS `membros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) COLLATE utf8_swedish_ci NOT NULL,
  `cpf` varchar(11) COLLATE utf8_swedish_ci NOT NULL,
  `cep` varchar(8) COLLATE utf8_swedish_ci NOT NULL,
  `endereco` varchar(60) COLLATE utf8_swedish_ci NOT NULL,
  `cidade` varchar(60) COLLATE utf8_swedish_ci NOT NULL,
  `Estado` varchar(60) COLLATE utf8_swedish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Extraindo dados da tabela `membros`
--

INSERT INTO `membros` (`id`, `nome`, `cpf`, `cep`, `endereco`, `cidade`, `Estado`) VALUES
(18, 'Felipe Sarubo', '99966677712', '18271640', 'Rua Prefeito Antônio Tricta Junior', 'Tatuí', 'SP'),
(19, 'Ryan Gaeta Alves', '99911122274', '20785070', 'Rua Galileu', 'Rio de Janeiro', 'RJ'),
(17, 'Lucas Inácio ', '66611155588', '18270770', 'Avenida Coronel Firmo Vieira de Camargo', 'Tatuí', 'SP'),
(20, 'Enzo ', '33111999777', '38067756', 'Rua Agnaldo Ozelami', 'Uberaba', 'MG'),
(21, 'Jennifer S. Nunes', '66699988842', '68907110', 'Avenida Gerusa', 'Macapá', 'AP'),
(26, 'Osvaldo Cruz', '12345678978', '01021200', 'Rua Vinte e Cinco de Março', 'São Paulo', 'SP');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `email` varchar(60) COLLATE utf8_swedish_ci NOT NULL,
  `senha` text COLLATE utf8_swedish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`) VALUES
(17, 'Aioria de Leão', 'aioria@gmail.com', '4d9012b4a77a9524d675dad27c3276ab5705e5e8'),
(16, 'Seya de Pégasus', 'seynha@gmail.com', '4d9012b4a77a9524d675dad27c3276ab5705e5e8'),
(15, 'Giovanni Guarnieri', 'giovanni@etec.com', 'f7c3bc1d808e04732adf679965ccc34ca7ae3441'),
(14, 'Jennifer Shimabukuro', 'jenni@gmail.com', '4d9012b4a77a9524d675dad27c3276ab5705e5e8');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
