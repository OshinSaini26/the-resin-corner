-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2026 at 12:05 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `resin_orders`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `delivery_required` tinyint(1) DEFAULT 0,
  `address` text DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `product_type` varchar(50) NOT NULL,
  `is_custom` tinyint(1) DEFAULT 0,
  `custom_details` text DEFAULT NULL,
  `total_price` int(11) DEFAULT NULL,
  `order_status` varchar(30) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `advance_amount` decimal(10,2) DEFAULT 0.00,
  `remaining_amount` decimal(10,2) DEFAULT 0.00,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `customer_name`, `phone`, `delivery_required`, `address`, `delivery_date`, `product_type`, `is_custom`, `custom_details`, `total_price`, `order_status`, `created_at`, `advance_amount`, `remaining_amount`, `user_id`) VALUES
(30, 'Oshin Saini', '9465980238', 0, 'hbio', NULL, 'Floral Resin Keychain', 0, 'huioo', 199, 'pending', '2026-06-02 14:31:11', 0.00, 0.00, NULL),
(31, 'Oshin Saini', '9465980238', 0, 'swfgh', NULL, 'Floral Resin Keychain', 0, 'gfjf', 199, 'pending', '2026-06-02 15:15:27', 0.00, 0.00, NULL),
(32, 'Oshin Saini', '9465980237', 0, 'gfgj', NULL, 'Floral Resin Keychain', 0, 'ghjki', 199, 'pending', '2026-06-02 15:22:07', 0.00, 0.00, NULL),
(33, 'Oshin Saini', '9465980238', 0, 'hjk', NULL, 'Floral Resin Keychain', 0, 'bhkjk', 199, 'pending', '2026-06-02 15:26:46', 0.00, 0.00, 2),
(34, 'Oshin Saini', '9465980238', 0, 'chjk', NULL, 'Floral Resin Keychain', 0, 'fuioo', 199, 'pending', '2026-06-02 15:32:00', 0.00, 0.00, 2),
(35, 'Oshin Saini', '9465980238', 0, 'sdafc', NULL, 'Floral Resin Keychain', 0, 'sfawg', 199, 'paid', '2026-06-04 15:15:14', 0.00, 0.00, 2),
(36, 'Oshin Saini', '9465980238', 0, 'dfregh', NULL, 'Custom Resin Keychain', 1, 'fvgth', 2000, 'advance_paid', '2026-06-04 16:06:28', 1000.00, 0.00, 2),
(37, 'Oshin Saini', '9465980238', 0, 'xvcrfg', NULL, 'Preserved Rose Frame', 1, 'cdegy', 5000, 'advance_paid', '2026-06-04 16:09:09', 3000.00, 0.00, 2),
(38, 'Oshin Saini', '9465980238', 0, '33, Mugrala Rd\nnear Shiv Mandir\nChander Vihar', NULL, 'Custom Resin Keychain', 1, 'ghui', 5000, 'advance_paid', '2026-06-08 16:08:37', 3000.00, 2000.00, 2),
(39, 'Oshin Saini', '9465980237', 0, '33, Mugrala Rd\nnear Shiv Mandir\nChander Vihar', NULL, 'Custom Resin Keychain', 1, 'vfhfi', 4000, 'total_paid', '2026-06-10 15:04:38', 2500.00, 1500.00, 2),
(40, 'Oshin Saini', '9465980237', 0, '33, Mugrala Rd\nnear Shiv Mandir\nChander Vihar', NULL, 'Preserved Rose Frame', 1, 'grio', 5000, 'advance_paid', '2026-06-10 17:35:31', 3000.00, 2000.00, 2),
(41, 'Oshin Saini', '9465980238', 0, '33, Mugrala Rd\nnear Shiv Mandir\nChander Vihar', NULL, 'Floral Resin Keychain', 0, 'yjrlykp', 199, 'total_paid', '2026-06-10 17:37:08', 0.00, 0.00, 2),
(42, 'Oshin Saini', '9465980238', 0, '33, Mugrala Rd\nnear Shiv Mandir\nChander Vihar', NULL, 'Custom Resin Keychain', 1, 'fg', 4000, 'price_confirmed', '2026-06-10 17:45:42', 2500.00, 1500.00, 2),
(43, 'Oshin Saini', '9465980238', 0, '33, Mugrala Rd\nnear Shiv Mandir\nChander Vihar', NULL, 'Resin Earrings', 0, 'vfbrjjk', 299, 'pending', '2026-06-11 12:32:30', 0.00, 0.00, 2),
(44, 'Oshin Saini', '9465980238', 0, '33, Mugrala Rd\nnear Shiv Mandir\nChander Vihar', NULL, 'Custom Resin Car Hanger', 1, 'vjhikohgj', 4000, 'price_confirmed', '2026-06-11 12:32:58', 2000.00, 2000.00, 2),
(45, 'Oshin Saini', '9465980238', 0, '33, Mugrala Rd\nnear Shiv Mandir\nChander Vihar', NULL, 'Custom Resin Car Hanger', 1, 'grthty', 0, 'pending', '2026-06-11 13:03:02', 0.00, 0.00, 2),
(46, 'Oshin Saini', '9465980238', 0, '33, Mugrala Rd\nnear Shiv Mandir\nChander Vihar', NULL, 'Custom Resin Car Hanger', 1, 'Pink frame with An OM in the middle', 400, 'advance_paid', '2026-06-18 07:55:26', 300.00, 100.00, 2),
(47, 'Oshin ', '9478204114', 0, '33, Mugrala Rd\nnear Shiv Mandir\nChander Vihar', NULL, 'Resin Bookmark', 0, 'blue color with white waves', 249, 'paid', '2026-06-18 08:51:34', 0.00, 0.00, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Oshin', 'oshin@test.com', '123456', '2026-05-31 08:06:28'),
(2, 'Oshin Saini', 'saini.oshin7295@gmail.com', '45679', '2026-06-02 14:33:04'),
(3, 'Oshin', 'oshinsaini30@gmail.com', '654321', '2026-06-18 08:50:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
