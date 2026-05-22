CREATE TABLE `badges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`icon` varchar(512) NOT NULL,
	`criteriaType` enum('first_course_completed','five_courses_completed','ten_courses_completed','all_foundation_courses','all_beginner_courses','all_intermediate_courses','all_advanced_courses','perfect_quiz_score','learning_streak_7_days','learning_streak_30_days','course_category_master') NOT NULL,
	`criteriaValue` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `badges_id` PRIMARY KEY(`id`),
	CONSTRAINT `badges_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `certificates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`certificateNumber` varchar(50) NOT NULL,
	`certificateUrl` varchar(512) NOT NULL,
	`completionDate` timestamp NOT NULL,
	`issuedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `certificates_id` PRIMARY KEY(`id`),
	CONSTRAINT `certificates_certificateNumber_unique` UNIQUE(`certificateNumber`)
);
--> statement-breakpoint
CREATE TABLE `courseEnrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`lessonsCompleted` int NOT NULL DEFAULT 0,
	`quizzesCompleted` int NOT NULL DEFAULT 0,
	`progressPercentage` decimal(5,2) NOT NULL DEFAULT 0,
	`isCompleted` boolean NOT NULL DEFAULT false,
	`certificateGenerated` boolean NOT NULL DEFAULT false,
	`certificateUrl` varchar(512),
	`certificateGeneratedAt` timestamp,
	`enrolledAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`lastAccessedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `courseEnrollments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courseReviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`rating` int NOT NULL,
	`review` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courseReviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseNumber` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`outcome` text NOT NULL,
	`concepts` text NOT NULL,
	`topics` text NOT NULL,
	`project` text NOT NULL,
	`duration` varchar(50) NOT NULL,
	`level` enum('Foundation','Beginner','Intermediate','Advanced') NOT NULL,
	`assumesZeroKnowledge` boolean NOT NULL DEFAULT true,
	`isPublished` boolean NOT NULL DEFAULT true,
	`enrollmentCount` int NOT NULL DEFAULT 0,
	`averageRating` decimal(3,2) DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`),
	CONSTRAINT `courses_courseNumber_unique` UNIQUE(`courseNumber`)
);
--> statement-breakpoint
CREATE TABLE `leaderboard` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`rank` int NOT NULL,
	`points` int NOT NULL DEFAULT 0,
	`coursesCompleted` int NOT NULL DEFAULT 0,
	`badgesEarned` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leaderboard_id` PRIMARY KEY(`id`),
	CONSTRAINT `leaderboard_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `lessonProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` int NOT NULL,
	`courseId` int NOT NULL,
	`isCompleted` boolean NOT NULL DEFAULT false,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lessonProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`lessonNumber` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`duration` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lessons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quizAttempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`quizId` int NOT NULL,
	`courseId` int NOT NULL,
	`score` int NOT NULL,
	`passed` boolean NOT NULL,
	`answers` text NOT NULL,
	`attemptedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quizAttempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lessonId` int NOT NULL,
	`courseId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`questions` text NOT NULL,
	`passingScore` int NOT NULL DEFAULT 70,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quizzes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userBadges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`badgeId` int NOT NULL,
	`earnedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userBadges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`bio` text,
	`avatar` varchar(512),
	`totalCoursesCompleted` int NOT NULL DEFAULT 0,
	`totalBadgesEarned` int NOT NULL DEFAULT 0,
	`totalLessonsCompleted` int NOT NULL DEFAULT 0,
	`learningStreak` int NOT NULL DEFAULT 0,
	`lastActivityDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
