-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 11, 2023 at 05:50 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lat`
--

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `question_text` text NOT NULL,
  `test_case` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`test_case`)),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `status` enum('A','D','E') NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `question_text`, `test_case`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`) VALUES
(1, 'Write a program to print Hello World', '{\"sample_input\":\"None\",\"sample_output\":\"Hello World\"}', '2023-02-11 20:33:21', NULL, NULL, NULL, 'A'),
(2, 'Write a program to Get integer value and print integer value plus one.', '{\"sample_input\":10,\"sample_output\":11}', '2023-02-11 21:12:45', NULL, '2023-02-11 21:15:05', NULL, 'A');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `student_email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `status` enum('A','D','E') NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `student_name`, `student_email`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`) VALUES
(1, 'Dayanidi', 'dayanidigv954@gmail.com', '2023-02-07 15:12:59', NULL, '2023-02-11 19:59:02', NULL, 'A'),
(2, 'Gnanam', 'gnanamg65@gmail.com', '2023-02-08 09:43:36', NULL, NULL, NULL, 'A'),
(3, 'Hari prasath', 'harishree80@gmail.com', '2023-02-08 13:25:08', NULL, NULL, NULL, 'A'),
(4, 'Dharunika', 'dharunika2004@gmail.com', '2023-02-08 13:44:37', NULL, NULL, NULL, 'A');

-- --------------------------------------------------------

--
-- Table structure for table `student_programs`
--

CREATE TABLE `student_programs` (
  `student_program_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `time_to_complete` int(11) NOT NULL,
  `attend_date` date NOT NULL,
  `attend_time` time NOT NULL,
  `run_count` int(11) NOT NULL,
  `run_time` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`run_time`)),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `status` enum('A','D','E') NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_programs`
--

INSERT INTO `student_programs` (`student_program_id`, `student_id`, `question_id`, `time_to_complete`, `attend_date`, `attend_time`, `run_count`, `run_time`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`) VALUES
(1, 1, 1, 60, '2023-02-05', '13:00:00', 2, '{\r\n\"run_time\": [\r\n{\r\n\"language\": \"python\",\r\n\"line\": 1,\r\n\"letters\": 20,\r\n\"code\": \"print(\'Hello World \')\",\r\n\"input\": \"None\",\r\n\"output\": \"Hello World\",\r\n\"testcase\": true\r\n},\r\n{\r\n\"language\": \"python\",\r\n\"line\": 1,\r\n\"letters\": 14,\r\n\"code\": \"print(\'Hello\')\",\r\n\"input\": \"None\",\r\n\"output\": \"Hello World\",\r\n\"testcase\": false \r\n}\r\n]\r\n}', '2023-02-07 15:14:27', NULL, NULL, NULL, 'A');

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `student_programs`
--
ALTER TABLE `student_programs`
  ADD PRIMARY KEY (`student_program_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `question_id` (`question_id`);

--

-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `student_programs`
--
ALTER TABLE `student_programs`
  MODIFY `student_program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

-- Constraints for dumped tables
--

--
-- Constraints for table `student_programs`
--
ALTER TABLE `student_programs`
  ADD CONSTRAINT `student_programs_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  ADD CONSTRAINT `student_programs_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
