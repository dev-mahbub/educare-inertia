INSERT INTO `infra_levels` (`id`, `school_id`, `parent_id`, `name`, `description`, `status`, `created_at`, `updated_at`) VALUES
	(1, 1, NULL, 'SCHOOL', '', 'Active', '2024-01-31 04:02:46', '2024-02-01 02:54:46'),
	(2, 1, 1, 'First Floor', '', 'Active', '2024-02-01 03:00:47', '2024-02-01 03:00:52'),
	(3, 1, 1, 'Second Floor', '', 'Active', '2024-02-01 03:01:09', '2024-02-01 03:01:09'),
	(4, 1, 2, 'Reception', '', 'Active', '2024-02-01 03:04:44', '2024-02-01 03:04:44'),
	(5, 1, 2, 'Principal Office', '', 'Active', '2024-02-01 03:04:59', '2024-02-01 03:04:59');