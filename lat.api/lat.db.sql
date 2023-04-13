
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `question_text`, `test_case`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`) VALUES
(1, 'Write a program to print Hello World', '[{\"sample_input\":\"\",\"sample_output\":\"Hello World\"}]', '2023-02-11 20:33:21', NULL, NULL, NULL, 'A'),
(2, 'Write a code to add two numbers.', '[{\"sample_input\":\"5\\n5\",\"sample_output\":\"10\"},{\"sample_input\":\"3\\n8\",\"sample_output\":\"11\"}]', '2023-04-12 13:14:08', NULL, NULL, NULL, 'A'),
(3, 'Write a code to find the given number is positive or negative.', '[{\"sample_input\":\"5\",\"sample_output\":\"5 is positive\"},{\"sample_input\":\"-5\",\"sample_output\":\"-5 is negative\"}]', '2023-04-12 15:27:53', NULL, NULL, NULL, 'A'),
(4, 'Write a code to Check if a Number is Odd or Even.', '[{\"sample_input\":\"5\",\"sample_output\":\"5 is Odd\"},{\"sample_input\":\"6\",\"sample_output\":\"6 is Even\"}]', '2023-04-12 15:28:51', NULL, NULL, NULL, 'A'),
(5, 'Write a code to find the maximum of two numbers.', '[{\"sample_input\":\"5\\n4\",\"sample_output\":\"5 is Maximum\"},{\"sample_input\":\"3\\n8\",\"sample_output\":\"8 is Maximum\"}]', '2023-04-12 15:31:03', NULL, NULL, NULL, 'A'),
(6, 'Write a code to find minimum of two numbers.', '[{\"sample_input\":\"5\\n4\",\"sample_output\":\"4 is Minimum\"},{\"sample_input\":\"2\\n8\",\"sample_output\":\"2 is minimum\"}]', '2023-04-12 15:32:01', NULL, NULL, NULL, 'A');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `student_name`, `student_email`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`) VALUES
(1, 'Dayanidi GV', 'dayanidigv954@gmail.com', '2023-02-07 15:12:59', NULL, NULL, NULL, 'A'),
(2, 'Hari prasath S', 'harishree80@gmail.com', '2023-02-08 13:25:08', NULL, NULL, NULL, 'A'),
(3, 'Gnanam', 'gnanamg65@gmail.com', '2023-02-08 09:43:36', NULL, NULL, NULL, 'A'),
(4, 'Dharunika B', 'darunikababu2004@gmail.com', '2023-02-08 13:44:37', NULL, NULL, NULL, 'A'),
(5, 'Aboorva', 'Aboorva@gmail.com', '2023-04-12 19:44:31', NULL, NULL, NULL, 'A'),
(6, 'Venkatesh', 'venkateshendo1200@gmail.com', '2023-04-12 19:51:30', NULL, NULL, NULL, 'A');

-- --------------------------------------------------------

--
-- Table structure for table `student_programs`
--

CREATE TABLE `student_programs` (
  `student_program_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `time_to_complete` text(11) NOT NULL,
  `program_language` text NOT NULL,
  `attend_date` date NOT NULL,
  `attend_time` time NOT NULL,
  `run_count` int(11) NOT NULL,
  `run_time` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`run_time`)),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `status` enum('A','D','E') NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_programs`
--

INSERT INTO `student_programs` (`student_program_id`, `student_id`, `question_id`, `time_to_complete`, `program_language`, `attend_date`, `attend_time`, `run_count`, `run_time`, `created_at`, `created_by`, `updated_at`, `updated_by`, `status`) VALUES
(1, 1, 1, "45s","python", '2023-02-07', '15:14:27', 2, '{\n\"run_time\": [{\"line\": 1,\n\"letters\": 20,\n\"code\": \"print(\'Hello World \')\",\n\"input\": \"None\",\n\"output\": \"Hello World\",\n\"testcase\": true\n},\n{\n\"line\": 1,\n\"letters\": 14,\n\"code\": \"print(\'Hello\')\",\n\"input\": \"None\",\n\"output\": \"Hello\",\n\"testcase\": false \n}\n]\n}', '2023-02-07 15:14:27', NULL, NULL, NULL, 'A');


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
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `student_programs`
--
ALTER TABLE `student_programs`
  MODIFY `student_program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
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
