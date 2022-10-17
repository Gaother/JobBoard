-- Active: 1664217574344@@127.0.0.1@3306@jobboard

CREATE DATABASE IF NOT EXISTS jobboard;
USE jobboard;
CREATE TABLE IF NOT EXISTS `advertising` (
	`advertising-id` INT NOT NULL AUTO_INCREMENT,
	`advertising-title` VARCHAR(255) NOT NULL,
	`advertising-companies` VARCHAR(255) NOT NULL,
	`advertising-city` VARCHAR(255) NOT NULL,
	`advertising-type` VARCHAR(255) NOT NULL,
	`advertising-date` DATE NOT NULL,
	`advertising-description` TEXT NOT NULL,
	`advertising-salary` DECIMAL,
	PRIMARY KEY (`advertising-id`)
);

CREATE TABLE IF NOT EXISTS `compagnies` (
	`compagnies-id` INT NOT NULL AUTO_INCREMENT,
	`compagnies-name` VARCHAR(255),
	`compagnies-sector` VARCHAR(255),
	`compagnies-city` VARCHAR(255),
	`compagnies-link` VARCHAR(255),
	`compagnies-weight` DECIMAL,
	`compagnies-turnover` DECIMAL,
	PRIMARY KEY (`compagnies-id`)
);

CREATE TABLE IF NOT EXISTS `user` (
	`user-id` INT NOT NULL AUTO_INCREMENT,
	`user-firstName` VARCHAR(255),
	`user-lastName` VARCHAR(255),
	`user-email` VARCHAR(255),
    `user-phone` VARCHAR(255),
	`user-password` VARCHAR(255),
	`user-date` DATE,
	`user-type` INT,
	PRIMARY KEY (`user-id`)
);

CREATE TABLE IF NOT EXISTS `apply-connected` (
	`co-id` INT NOT NULL AUTO_INCREMENT,
	`co-advertising-id` INT NOT NULL,
	`co-user-id`INT NOT NULL,
	`co-message` TEXT,
	PRIMARY KEY (`co-id`),
	CONSTRAINT fk_ad FOREIGN KEY (`co-advertising-id`) REFERENCES advertising (`advertising-id`),
	CONSTRAINT fk_user FOREIGN KEY (`co-user-id`) REFERENCES user (`user-id`)
);

CREATE TABLE IF NOT EXISTS `apply-unconnected` (
	`un-apply-id` INT NOT NULL AUTO_INCREMENT,
	`un-advertising-id` INT NOT NULL,
	`un-first-name` VARCHAR(255),
	`un-last-name` VARCHAR(255),
	`un-email` VARCHAR(255),
	`un-phone` VARCHAR(255),
	`message` TEXT,
	PRIMARY KEY (`un-apply-id`),
	CONSTRAINT fk_ad_un FOREIGN KEY (`un-advertising-id`) REFERENCES advertising (`advertising-id`)
);
