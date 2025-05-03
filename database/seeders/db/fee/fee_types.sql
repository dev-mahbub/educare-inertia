INSERT INTO `fee_types` (`id`, `school_id`, `fee_type`, `installment_type`, `category_id`, `display_name`, `description`, `is_fee_refundable`, `is_fee_special`, `status`, `created_at`, `updated_at`) VALUES
	(1, 1, 'Transport', 'Installment', '5', 'Transport fee', 'Lorem ipsum dolor it ipsum dolor it ipsum dolor it ipsum dolor itg', 0, 0, 'Active', '2023-12-14 05:20:50', '2023-12-14 05:39:42'),
	(2, 1, 'Admission', 'Installment', '10', 'Admission fee', 'Lorem ipsum dolor it ipsum dolor it ipsum dolor it ipsum dolor it', 1, 0, 'Active', '2023-12-14 05:21:12', '2023-12-14 05:21:12'),
	(3, 1, 'Card', 'ExtraCharge', NULL, 'Card fee', 'Lorem ipsum dolor it ipsum dolor it ipsum dolor it ipsum dolor it', 0, 0, 'Active', '2023-12-14 05:22:09', '2023-12-14 05:22:09'),
	(4, 1, 'Board fee', 'ExtraCharge', NULL, 'Board fee', 'Lorem ipsum dolor it ipsum dolor it ipsum dolor it ipsum dolor it', 0, 0, 'Active', '2023-12-14 05:22:32', '2023-12-14 05:22:32'),
	(5, 1, 'Exam', 'Installment', '6', 'Exam fee', 'Lorem ipsum dolor it ipsum dolor it ipsum dolor it ipsum dolor it', 0, 0, 'Active', '2023-12-14 05:22:47', '2023-12-14 05:22:47'),
	(6, 1, 'Late fee', 'ExtraCharge', NULL, 'Late fee', 'Lorem ipsum dolor it ipsum dolor it ipsum dolor it ipsum dolor it', 0, 0, 'Active', '2023-12-14 05:23:06', '2023-12-14 05:23:06'),
	(7, 1, 'Due fee', 'ExtraCharge', NULL, 'Due fee', 'Lorem ipsum dolor it ipsum dolor it ipsum dolor it ipsum dolor it gfg', 0, 1, 'Active', '2023-12-14 05:24:17', '2023-12-14 05:42:10'),
	(8, 1, 'Special fee', 'ExtraCharge', NULL, 'Special fee', 'Lorem ipsum dolor it ipsum dolor it ipsum dolor it ipsum dolor it', 0, 1, 'Active', '2023-12-14 05:26:47', '2023-12-14 05:26:47'),
	(9, 1, 'Handicapped Quota', 'Installment', NULL, 'Handicapped Quota', 'lorem ipsum dolor it', 1, 1, 'Active', '2023-12-14 05:27:34', '2023-12-14 05:27:34'),
	(10, 1, 'Annual fee', 'ExtraCharge', '11', 'Annual Fee', 'lorem ipsum dolor it', 0, 1, 'Active', '2023-12-14 05:28:14', '2023-12-14 05:54:24');

