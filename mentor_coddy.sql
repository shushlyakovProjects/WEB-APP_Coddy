-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 06 2025 г., 21:52
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `mentor_coddy`
--

-- --------------------------------------------------------

--
-- Структура таблицы `feedbacks`
--

CREATE TABLE `feedbacks` (
  `FeedBackID` int(11) NOT NULL,
  `Date` tinytext NOT NULL,
  `FIO` tinytext NOT NULL,
  `Phone` tinytext NOT NULL,
  `CheckInfo` varchar(20) NOT NULL,
  `Comments` text NOT NULL,
  `NewLoad` text NOT NULL,
  `HasConstantUnit` varchar(20) NOT NULL,
  `CountConstantUnits` tinyint(4) NOT NULL,
  `CountPaidModules` tinyint(4) NOT NULL,
  `CountTrialUnits` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `feedbacks`
--

INSERT INTO `feedbacks` (`FeedBackID`, `Date`, `FIO`, `Phone`, `CheckInfo`, `Comments`, `NewLoad`, `HasConstantUnit`, `CountConstantUnits`, `CountPaidModules`, `CountTrialUnits`) VALUES
(1, 'Mon May 05 2025 12:16:11 GMT+0300 (Москва, стандартное время)', 'Шушляков Никита', '89280140532', 'Всё верно', 'Супер!', 'Набираю', 'да', 5, 5, 0),
(2, 'Mon May 05 2025 12:19:00 GMT+0300 (Москва, стандартное время)', 'Шушляков Никита', '89280140532', 'Всё верно', 'Супер', 'Набираю', 'да', 3, 3, 0),
(3, 'Mon May 05 2025 12:21:12 GMT+0300 (Москва, стандартное время)', 'Шушляков Никита', '89280140532', 'Нужна помощь', 'Помзь', 'Набираю', 'нет', 0, 0, 2),
(4, 'Mon May 05 2025 13:28:37 GMT+0300 (Москва, стандартное время)', 'Иванов Иван', '+72342231', 'Нужна помощь', 'В общем, дело такое, не набираются ученики, что делать то? Может изучить чего?', 'Не могу пока, уехал(', 'да', 5, 2, 0),
(5, 'Tue May 06 2025 00:14:37 GMT+0300 (Москва, стандартное время)', 'Шушляков Никита', '89280140532', 'Всё верно', 'Класс!', 'Набираю', 'Да', 3, 4, 0),
(6, 'Tue May 06 2025 10:05:47 GMT+0300 (Москва, стандартное время)', 'Иванов Иван', '+72342231', 'Всё верно', 'Все супер', 'Набираю', 'Да', 4, 5, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `mentees`
--

CREATE TABLE `mentees` (
  `MenteeId` int(11) NOT NULL,
  `LastName` tinytext NOT NULL,
  `FirstName` tinytext NOT NULL,
  `Disciplines` text NOT NULL,
  `CountAllEdUnits` int(11) NOT NULL,
  `CountConstantUnits` int(11) NOT NULL,
  `CountTrialUnitsForWeek` int(11) NOT NULL,
  `CountTrialLessonsForSixMonths` int(11) NOT NULL,
  `LastUpdate` char(10) NOT NULL,
  `Status` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `mentees`
--

INSERT INTO `mentees` (`MenteeId`, `LastName`, `FirstName`, `Disciplines`, `CountAllEdUnits`, `CountConstantUnits`, `CountTrialUnitsForWeek`, `CountTrialLessonsForSixMonths`, `LastUpdate`, `Status`) VALUES
(23435, 'Каменский', 'Владислав', 'Python', 0, 0, 0, 0, '', 'Работает'),
(62998, 'Мосеечева', 'Анна', 'Дизайн сайтов,Веб-дизайн с нуля,Создание сайтов на Tilda,Figma - обучение дизайну с основ до PRO', 1, 1, 0, 0, '2025-04-29', ''),
(66309, 'Лобко', 'Елена', 'Ораторское мастерство,Актерское мастерство для детей,Мастер коммуникации,Сценарное мастерство и драматургия', 4, 4, 0, 10, '0000-00-00', ''),
(67934, 'Кадырова', 'Полина', 'Графический дизайн Photoshop,Основы Adobe Illustrator,Digital Art - рисование на планшете,Скетчинг', 1, 1, 0, 6, '0000-00-00', ''),
(67942, 'Шаназаров', 'Исмаил', 'Программирование игр на Python,Создание чат-ботов на Python для ВК и Telegram,Python и машинное обучение,Разработка чат-ботов на Python совместно с ВМК МГУ им. М.В. Ломоносова,Программирование на Python,Программирование на Python3', 0, 0, 0, 3, '0000-00-00', ''),
(67945, 'Селезнев', 'Сергей', 'Создание сайтов HTML, CSS,Программирование на JavaScript,Программирование для самых маленьких,Frontend-разработчик - сайты на HTML/CSS/JavaScript,Компьютерная грамотность,Веб-программирование,Программирование на Python,Компьютерная грамотность на MAC', 4, 4, 0, 0, '0000-00-00', ''),
(68504, 'Зимарев', 'Артемий', 'Обучение разработке мобильных приложений под Android,Unity 3D,Создание 2D и 3D игр на C#', 0, 0, 0, 2, '0000-00-00', ''),
(68982, 'Халлыев', 'Ишанберды', 'Создание игр в Scratch,Гарвардский курс CS50,Компьютерная грамотность,Разработка игр на С++,English&Python,Английский язык для детей,Создание сайтов на Tilda,ДУБЛЬ Создание 2D и 3D игр на С#,Разработка на С++,Компьютерная грамотность на MAC,Комплексный старт - первые шаги в ИТ (1 курс),Разработка на С#', 3, 2, 1, 8, '0000-00-00', ''),
(69185, 'Куликов', 'Юрий', 'Презентация PowerPoint,Minecraft - введение в искусственный интеллект,Математика в Minecraft,Киберспорт Dota 2,Figma - обучение дизайну с основ до PRO', 4, 3, 1, 20, '0000-00-00', ''),
(69253, 'Каллио', 'Михаил', 'Программирование игр на Python,Python и машинное обучение,Веб-приложения на Python при партнерстве с ВМК МГУ им. М.В. Ломоносова,Программирование на Python3', 1, 1, 0, 0, '0000-00-00', ''),
(69678, 'Николаева', 'Алла', 'Дизайн-мышление,Графический дизайн Photoshop,Основы Adobe Illustrator,Дизайн сайтов,Веб-дизайн с нуля,Создание сайтов на Tilda,Основы цифрового рисунка в Procreate,Figma - обучение дизайну с основ до PRO,Дизайн с нейросетями,Нейросети для детей - основы и практика', 1, 1, 0, 3, '0000-00-00', ''),
(69736, 'Дудкин', 'Александр', 'Китайский язык для детей', 2, 2, 0, 1, '0000-00-00', ''),
(69945, 'Юдин', 'Никита', 'Программирование на JavaScript,Программирование игр на Python,Frontend-разработчик - сайты на HTML/CSS/JavaScript,3D Программирование в Kodu Game Lab,Программирование на Python,Программирование на Python3', 0, 0, 0, 0, '0000-00-00', ''),
(69996, 'Петрова', 'Александра', 'Дизайн-мышление,Игровое 3D-моделирование в Blender,Рисование в стиле Аниме,Скетчинг', 0, 0, 0, 0, '0000-00-00', ''),
(70833, 'Тихонова', 'Ксения', 'Программирование игр на Python,Создание игр в Scratch,Игровое 3D-моделирование в Blender,Создание чат-ботов на Python для ВК и Telegram,Этичный хакер,Графический дизайн Photoshop,Основы Adobe Illustrator,Презентация PowerPoint,Разработка сценария игр,Создание игр в Roblox Studio,Digital Art - рисование на планшете,Программирование на Python,Разработка модов для Minecraft,Создание сайтов на Tilda,Создание мультиплеерной игры в Roblox Studio,Создание игр с помощью нейросетей', 3, 2, 1, 22, '0000-00-00', ''),
(70840, 'Валиуллин', 'Альберт', 'Программирование для самых маленьких,Компьютерная грамотность,Интернет-предпринимательство,Создание чат-ботов на Python для ВК и Telegram,Финансовая грамотность,Unity 3D,Подготовка к ОГЭ по математике,Я выбираю профессию - профориентационный курс,Английский язык для детей,Программирование на Python,Математика для детей,Информатика для детей,Русский язык для детей,ДУБЛЬ Создание 2D и 3D игр на С#,Подготовка к ЕГЭ  по математике,Figma - обучение дизайну с основ до PRO', 2, 2, 0, 3, '0000-00-00', ''),
(70929, 'Бочкарев', 'Алексей', 'Игровое 3D-моделирование в Blender,Трехмерное моделирование в 3DS Max,Подготовка к ЕГЭ по информатике,Подготовка к ОГЭ по информатике,Figma - обучение дизайну с основ до PRO', 2, 2, 0, 1, '0000-00-00', ''),
(71151, 'Рест', 'Владислав', 'Создание сайтов HTML, CSS,Программирование на JavaScript,Программирование игр на Python,Frontend-разработчик - сайты на HTML/CSS/JavaScript,Компьютерная грамотность,Создание чат-ботов на Python для ВК и Telegram,Python и машинное обучение,Python и JavaScript - игровое программирование в CodeCombat,Программирование Minecraft,Веб-программирование,Minecraft - программирование на Python,Разработка чат-ботов на Python совместно с ВМК МГУ им. М.В. Ломоносова,Minecraft - введение в искусственный интеллект,Веб-приложения на Python при партнерстве с ВМК МГУ им. М.В. Ломоносова,Программирование на Python,Разработка веб-приложений для бизнеса (при поддержке Эвотор),Подготовка к ЕГЭ по информатике,Подготовка к ОГЭ по информатике,Minecraft - программирование на JavaScript,Программирование на Python3,Информатика для детей', 2, 2, 0, 8, '0000-00-00', ''),
(71208, 'Саковых', 'Лев', 'Python и машинное обучение,Программирование на Python3,Нейросети для детей - основы и практика', 2, 2, 0, 0, '0000-00-00', ''),
(71331, 'Гузаревич', 'Илья', 'Создание игр в Scratch,Компьютерная грамотность,3D-игры в Scratch,Создание игр в Roblox Studio,Английский язык для детей,Информатика для детей,Русский язык для детей,Киберспорт Dota 2,Нейросети для детей - основы и практика', 9, 6, 3, 18, '0000-00-00', ''),
(71434, 'Носков', 'Никита', 'Программирование игр на Python,Создание чат-ботов на Python для ВК и Telegram,Веб-приложения на Python при партнерстве с ВМК МГУ им. М.В. Ломоносова,Программирование на Python,Программирование на Python3', 2, 2, 0, 1, '0000-00-00', ''),
(71694, 'Сарычева', 'Алиса', 'Создание сайтов на Tilda,Figma - обучение дизайну с основ до PRO,Нейросети для детей - основы и практика', 0, 0, 0, 6, '0000-00-00', ''),
(71718, 'Почестнев', 'Андрей', 'Программирование на JavaScript,Frontend-разработчик - сайты на HTML/CSS/JavaScript,Гарвардский курс CS50,Создание чат-ботов на Python для ВК и Telegram,Подготовка к ОГЭ по математике,Кибербезопасность,Разработка чат-ботов на Python совместно с ВМК МГУ им. М.В. Ломоносова,Веб-приложения на Python при партнерстве с ВМК МГУ им. М.В. Ломоносова,Программирование на Python,Программирование на Python3', 0, 0, 0, 0, '0000-00-00', ''),
(71736, 'Проданов', 'Никита', 'Английский язык для детей', 0, 0, 0, 0, '0000-00-00', ''),
(71738, 'Гладченко', 'Евгений', 'Программирование игр на Python,Frontend-разработчик - сайты на HTML/CSS/JavaScript,Создание чат-ботов на Python для ВК и Telegram,Python и машинное обучение,Программирование игр на Java,Создание игр в Roblox Studio,Программирование на Python,Подготовка к ЕГЭ по информатике,Подготовка к ОГЭ по информатике', 0, 0, 0, 0, '0000-00-00', ''),
(71936, 'Костина', 'Юлия', 'Ораторское мастерство,Блогинг и новые медиа,Мастер коммуникации', 0, 0, 0, 0, '0000-00-00', ''),
(71953, 'Некрасов', 'Антон', 'Программирование игр на Python,Обучение разработке мобильных приложений под Android,Создание чат-ботов на Python для ВК и Telegram,Программирование на Python,Программирование на Python3', 0, 0, 0, 0, '0000-00-00', ''),
(71954, 'Ганиев', 'Али', 'Frontend-разработчик - сайты на HTML/CSS/JavaScript,Программирование на Python3', 0, 0, 0, 0, '0000-00-00', ''),
(72065, 'Шишминцев', 'Антон', 'Игровое 3D-моделирование в Blender,Трехмерное моделирование в 3DS Max,Digital Art - рисование на планшете', 0, 0, 0, 1, '0000-00-00', ''),
(72086, 'Сон', 'Александр', 'Frontend-разработчик - сайты на HTML/CSS/JavaScript,Создание чат-ботов на Python для ВК и Telegram,Разработка чат-ботов на Python совместно с ВМК МГУ им. М.В. Ломоносова,Программирование на Python,Программирование на Python3,Компьютерная грамотность на MAC,Киберспорт Dota 2', 1, 1, 0, 2, '0000-00-00', ''),
(72088, 'Гаврилов', 'Дмитрий', 'Создание чат-ботов на Python для ВК и Telegram,Программирование на Python,Программирование на Python3', 0, 0, 0, 0, '0000-00-00', ''),
(72153, 'Саприна', 'Анастасия', 'Программирование игр на Python,Гарвардский курс CS50,Создание чат-ботов на Python для ВК и Telegram,Python и машинное обучение,English&Python,Создание игр в Roblox Studio,Разработка чат-ботов на Python совместно с ВМК МГУ им. М.В. Ломоносова,Английский язык для детей,Веб-приложения на Python при партнерстве с ВМК МГУ им. М.В. Ломоносова,Программирование на Python,Программирование на Python3,Подготовка к ЕГЭ  по математике', 6, 6, 0, 3, '0000-00-00', ''),
(72192, 'Новосельцев', 'Антон', 'Программирование игр на Python,Гарвардский курс CS50,Python и машинное обучение,Python и JavaScript - игровое программирование в CodeCombat,Minecraft - программирование на Python,Разработка чат-ботов на Python совместно с ВМК МГУ им. М.В. Ломоносова,Английский язык для детей,Веб-приложения на Python при партнерстве с ВМК МГУ им. М.В. Ломоносова,Программирование на Python,Программирование на Python3,Математика в Minecraft,Разработка 2D и 3D игр в Godot на Python', 0, 0, 0, 0, '0000-00-00', ''),
(72306, 'Шеляг', 'Даниил', 'Программирование на JavaScript,Создание игр в Scratch,Программирование для самых маленьких,Frontend-разработчик - сайты на HTML/CSS/JavaScript,Python и JavaScript - игровое программирование в CodeCombat,Minecraft - программирование на Python,Создание игр в Roblox Studio,Программирование на Python,Minecraft - программирование на JavaScript,Программирование на Python3,Киберспорт Dota 2,Комплексный старт - первые шаги в ИТ (1 курс)', 1, 1, 0, 2, '0000-00-00', ''),
(72308, 'Милевский', 'Юрий', 'Создание чат-ботов на Python для ВК и Telegram,Программирование на Python3', 2, 2, 0, 0, '0000-00-00', ''),
(72310, 'Пасынков', 'Матвей', 'Python и машинное обучение,Подготовка к ОГЭ по математике,Программирование на Python,Подготовка к ОГЭ по информатике,Программирование на Python3,Разработка на С++,Разработка на С#', 0, 0, 0, 0, '0000-00-00', ''),
(72502, 'Колесов', 'Алексей', 'Ораторское мастерство,Актерское мастерство для детей,Операторское мастерство,Сценарное мастерство и драматургия', 0, 0, 0, 0, '0000-00-00', ''),
(72503, 'Маслов', 'Глеб', 'Создание игр в Scratch,Программирование для самых маленьких,Unity 3D,Unreal Engine 4,Английский язык для детей,Подготовка к ОГЭ по информатике,Информатика для детей,Создание игр с помощью нейросетей', 2, 2, 0, 0, '0000-00-00', ''),
(72515, 'Акимова', 'Анастасия', 'Английский язык для детей,Русский язык для детей', 0, 0, 0, 0, '0000-00-00', ''),
(72704, 'Алпацкая', 'Елизавета', 'Программирование игр на Python,Создание игр в Scratch,Frontend-разработчик - сайты на HTML/CSS/JavaScript,Компьютерная грамотность,Презентация PowerPoint,Python и JavaScript - игровое программирование в CodeCombat,English&Python,Дизайн сайтов,Рисование в стиле Аниме,Английский язык для детей,Digital Art - рисование на планшете,Программирование на Python,Скетчинг,Математика для детей,Программирование на Python3,Русский язык для детей,Комплексный старт - первые шаги в ИТ (1 курс)', 4, 4, 0, 9, '0000-00-00', ''),
(73044, 'Семёнова', 'Тамара', 'Игровое 3D-моделирование в Blender,Графический дизайн Photoshop,Unity 3D,Рисование в стиле Аниме,Трехмерное моделирование в 3DS Max,Создание комиксов Манга,Digital Art - рисование на планшете,Скетчинг,Создание игрового персонажа в Photoshop,Figma - обучение дизайну с основ до PRO,Разработка на С#', 0, 0, 0, 0, '0000-00-00', ''),
(73087, 'Колмагорова', 'Мария', 'Рисование в стиле Аниме,Создание комиксов Манга,Основы цифрового рисунка в Procreate', 0, 0, 0, 0, '0000-00-00', ''),
(73088, 'Карагодин', 'Иван', 'Графический дизайн Photoshop,Digital Art - рисование на планшете,Скетчинг,Основы цифрового рисунка в Procreate', 0, 0, 0, 0, '0000-00-00', ''),
(73221, 'Атамась', 'Алиса', 'Графический дизайн Photoshop,Основы Adobe Illustrator', 0, 0, 0, 0, '0000-00-00', ''),
(73236, 'Дмитриенко', 'Вера', 'Дизайн-мышление,Компьютерная грамотность,Графический дизайн Photoshop,Основы Adobe Illustrator,Рисование в стиле Аниме,Я выбираю профессию - профориентационный курс,Создание комиксов Манга,Digital Art - рисование на планшете,Скетчинг,Основы цифрового рисунка в Procreate,Figma - обучение дизайну с основ до PRO', 0, 0, 0, 0, '0000-00-00', ''),
(73264, 'Джаббарлы', 'Мушфиг', 'Программирование игр на Python,Создание игр в Scratch,Программирование для самых маленьких,Компьютерная грамотность,Unity 3D,Кибербезопасность,Создание игр в Roblox Studio,Minecraft - введение в искусственный интеллект', 0, 0, 0, 0, '0000-00-00', ''),
(73470, 'Мосейчук', 'Фёдор', 'Создание чат-ботов на Python для ВК и Telegram,Python и машинное обучение,English&Python,Веб-программирование,Разработка чат-ботов на Python совместно с ВМК МГУ им. М.В. Ломоносова,Английский язык для детей,Программирование на Python,Программирование на Python3', 0, 0, 0, 0, '0000-00-00', '');

-- --------------------------------------------------------

--
-- Структура таблицы `summary_monthly`
--

CREATE TABLE `summary_monthly` (
  `DateOfUpdate` varchar(10) NOT NULL COMMENT 'Дата записи',
  `CountOfMentee` tinyint(3) UNSIGNED NOT NULL COMMENT 'Количество менти',
  `CountOfMenteeWithConstantUnits` tinyint(3) UNSIGNED NOT NULL COMMENT 'Количество менти с постоянными учениками',
  `CountOfConstantUnits` tinyint(3) UNSIGNED NOT NULL COMMENT 'Всего постоянных учеников',
  `CountOfPaidModules` tinyint(3) UNSIGNED NOT NULL COMMENT 'Всего отправлено модулей на проверку',
  `СountOfNewEdUnits` tinyint(3) UNSIGNED NOT NULL COMMENT 'Новых постоянных учеников',
  `СountOfNewTrials` tinyint(3) UNSIGNED NOT NULL COMMENT 'Проведено пробных занятий'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `summary_monthly`
--

INSERT INTO `summary_monthly` (`DateOfUpdate`, `CountOfMentee`, `CountOfMenteeWithConstantUnits`, `CountOfConstantUnits`, `CountOfPaidModules`, `СountOfNewEdUnits`, `СountOfNewTrials`) VALUES
('2025-04-01', 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `summary_weekly`
--

CREATE TABLE `summary_weekly` (
  `DateOfUpdate` varchar(10) NOT NULL COMMENT 'Дата записи',
  `CountOfMentee` tinyint(3) UNSIGNED NOT NULL COMMENT 'Количество менти',
  `CountOfMenteeWithConstantUnits` tinyint(3) UNSIGNED NOT NULL COMMENT 'Количество менти с постоянными учениками',
  `CountOfConstantUnits` tinyint(3) UNSIGNED NOT NULL COMMENT 'Всего постоянных учеников',
  `CountOfPaidModules` tinyint(3) UNSIGNED NOT NULL COMMENT 'Всего отправлено модулей на проверку',
  `СountOfNewEdUnits` tinyint(3) UNSIGNED NOT NULL COMMENT 'Новых постоянных учеников',
  `СountOfNewTrials` tinyint(3) UNSIGNED NOT NULL COMMENT 'Проведено пробных занятий'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `summary_weekly`
--

INSERT INTO `summary_weekly` (`DateOfUpdate`, `CountOfMentee`, `CountOfMenteeWithConstantUnits`, `CountOfConstantUnits`, `CountOfPaidModules`, `СountOfNewEdUnits`, `СountOfNewTrials`) VALUES
('2025-03-01', 29, 9, 26, 0, 0, 2),
('2025-04-01', 29, 9, 26, 0, 0, 2),
('2025-04-20', 29, 9, 26, 0, 0, 2),
('2025-04-29', 29, 9, 26, 0, 0, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `UserId` int(11) NOT NULL,
  `Email` tinytext NOT NULL,
  `Password` tinytext NOT NULL,
  `Phone` tinytext NOT NULL,
  `FirstName` tinytext NOT NULL,
  `LastName` tinytext NOT NULL,
  `Role` tinytext NOT NULL DEFAULT '\'base\''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`UserId`, `Email`, `Password`, `Phone`, `FirstName`, `LastName`, `Role`) VALUES
(4, 'amigo7772015@mail.ru', '$2b$05$RALGMB/J8Lj.FoiM4Iv5T.uEXsOVspDnYH1NztQfrkICNbDlOyL3.', '9280140532', 'Никита', 'Шушляков', 'admin'),
(5, 'test@mail.ru', '$2b$05$Bi3V5ZZxtn/vp0GPnPsYXOhbmKXu8QoKa2aUJkfvv0Rv1nRKKTNX.', '89998887767', 'Иван', 'Иванов', 'moderator'),
(7, 'vasya@mail.ru', '$2b$05$hADwP0RcFm3KNlowl3NzX.llA.Gjq3kwDzpX9aXdNpofK9svwzDbC', '889997766', 'Василий', 'Васильев', 'moderator'),
(10, 'qwe@qwe', '$2b$05$WPA7T.2rGbeWrXKMDU8d1OvFJXx.Akl7iSE4u5ryKkj50nLZyma/S', '889997766', 'Андрей', 'Андреев', 'mentor');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`FeedBackID`);

--
-- Индексы таблицы `mentees`
--
ALTER TABLE `mentees`
  ADD PRIMARY KEY (`MenteeId`);

--
-- Индексы таблицы `summary_monthly`
--
ALTER TABLE `summary_monthly`
  ADD PRIMARY KEY (`DateOfUpdate`);

--
-- Индексы таблицы `summary_weekly`
--
ALTER TABLE `summary_weekly`
  ADD PRIMARY KEY (`DateOfUpdate`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`),
  ADD UNIQUE KEY `Email` (`Email`) USING HASH;

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `FeedBackID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
