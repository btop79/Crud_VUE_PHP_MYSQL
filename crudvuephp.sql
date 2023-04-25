-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-04-2023 a las 07:56:38
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `crudvuephp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingrediente`
--

CREATE TABLE `ingrediente` (
  `Id_ingrediente` int(11) NOT NULL,
  `Nombre_ingrediente` varchar(50) NOT NULL,
  `Descripcion_ingrediente` varchar(200) NOT NULL,
  `Fecha_ingreso_in` date NOT NULL,
  `Fecha_vencimiento_in` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ingrediente`
--

INSERT INTO `ingrediente` (`Id_ingrediente`, `Nombre_ingrediente`, `Descripcion_ingrediente`, `Fecha_ingreso_in`, `Fecha_vencimiento_in`) VALUES
(1, 'Azucar', 'Morena', '2022-04-07', '2023-04-02'),
(2, 'Harina ', 'De trigo', '2022-11-22', '2023-06-20'),
(5, 'Huevos', 'Frescos', '2023-03-27', '2023-05-03'),
(6, 'Mantequilla', 'De maní', '2023-04-25', '2023-05-03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pastel`
--

CREATE TABLE `pastel` (
  `Id_pastel` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `Preparado_por` varchar(50) NOT NULL,
  `Fecha_creacion` date NOT NULL,
  `Fecha_vencimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pastel`
--

INSERT INTO `pastel` (`Id_pastel`, `Nombre`, `Descripcion`, `Preparado_por`, `Fecha_creacion`, `Fecha_vencimiento`) VALUES
(1, 'Fresas con Crema', 'Bizcocho esponjoso bañado con miel de azúcar, almíbar de frutas y canela, relleno y decorado con crema láctea batida y fresas frescas.', 'Pasteleria Peckys', '2023-04-20', '2023-04-23'),
(2, 'Frutas en Crema', 'Bizcocho de vainilla , humedecido con almíbar, relleno con jalea natural de berries, decorado con frutas tropicales, crema batida y coco dorado.', 'Pasteleria Peckys', '2023-03-28', '2023-04-15'),
(3, 'Chocolate', 'Suave bizcocho de chocolate, relleno con cremoso chocolate y cubierto con ganache de chocolate semi-amargo.', 'Pasteleria Peckys', '2023-04-18', '2023-04-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pastel_ingredientes`
--

CREATE TABLE `pastel_ingredientes` (
  `Id_Pastel_ingrediente` int(11) NOT NULL,
  `ID_pastel` int(11) NOT NULL,
  `ID_ingrediente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pastel_ingredientes`
--

INSERT INTO `pastel_ingredientes` (`Id_Pastel_ingrediente`, `ID_pastel`, `ID_ingrediente`) VALUES
(1, 1, 1),
(2, 3, 2),
(3, 3, 6);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ingrediente`
--
ALTER TABLE `ingrediente`
  ADD PRIMARY KEY (`Id_ingrediente`);

--
-- Indices de la tabla `pastel`
--
ALTER TABLE `pastel`
  ADD PRIMARY KEY (`Id_pastel`);

--
-- Indices de la tabla `pastel_ingredientes`
--
ALTER TABLE `pastel_ingredientes`
  ADD PRIMARY KEY (`Id_Pastel_ingrediente`),
  ADD KEY `ID_pastel` (`ID_pastel`),
  ADD KEY `ID_ingrediente` (`ID_ingrediente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ingrediente`
--
ALTER TABLE `ingrediente`
  MODIFY `Id_ingrediente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `pastel`
--
ALTER TABLE `pastel`
  MODIFY `Id_pastel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `pastel_ingredientes`
--
ALTER TABLE `pastel_ingredientes`
  MODIFY `Id_Pastel_ingrediente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pastel_ingredientes`
--
ALTER TABLE `pastel_ingredientes`
  ADD CONSTRAINT `pastel_ingredientes_ibfk_1` FOREIGN KEY (`ID_pastel`) REFERENCES `pastel` (`Id_pastel`),
  ADD CONSTRAINT `pastel_ingredientes_ibfk_2` FOREIGN KEY (`ID_ingrediente`) REFERENCES `ingrediente` (`Id_ingrediente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
