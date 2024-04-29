create database `phospherus`;

use `phospherus`;

-- table of user
-- 用于存储博主信息
create table `user` (
    `id` int not null auto_increment comment '用户ID',
    `passport` varchar(64) not null comment '用户账户',
    `nickname` varchar(64) not null comment '用户昵称',
    `password` varchar(128) not null comment '用户密码',
    `avatar` varchar(128) not null comment '用户头像',
    `email` varchar(128) not null comment '用户邮箱',
    `github` varchar(128) not null comment '用户github地址',
    primary key (`id`)
);

-- table of article
create table `article` (
    `id` int not null auto_increment comment '文章ID',  
    `author_id` int not null comment '文章作者ID',
    `category_id` int not null comment '文章所属分类ID',
    `title` varchar(128) not null comment '文章标题',
    `content` text not null comment '文章内容',
    `cover` varchar(128) default '' comment '文章图片封面',
    `description` varchar(1024) default '暂无文章概述' comment '文章概述',
    `is_visible` tinyint not null default 1 comment '文章是否可见 1-可见 0-不可见',
    `is_about` tinyint not null default 0 comment '文章是否为博主关于页面 0-不是 1-是',
    `created_at` timestamp not null default current_timestamp comment '创建时间',
    `updated_at` timestamp not null default current_timestamp on update current_timestamp comment '修改时间',
    primary key (`id`)
);

-- table of tag
create table `tag` (
    `id` int not null auto_increment comment '标签ID',
    `name` varchar(64) not null comment '标签名称',
    `is_visible` tinyint not null default 1 comment '标签是否可见 1-可见 0-不可见',
    primary key (`id`)
);

-- table of article_tag
create table `article_tag` (
    `article_id` int not null comment '文章ID',
    `tag_id` int not null comment '标签ID',
    primary key (`article_id`, `tag_id`)
);

-- table of category
create table `category` (
    `id` int not null auto_increment comment '分类ID',
    `parent_id` int not null default 0 comment '父分类ID 0-无父分类',
    `name` varchar(64) not null comment '分类名称',
    `is_visible` tinyint not null default 1 comment '分类是否可见 1-可见 0-不可见',
    primary key (`id`)
);

-- table of friend_link
create table `friend_link` (
    `id` int not null auto_increment comment '友链ID',
    `url` varchar(128) not null comment '网址路径',
    `name` varchar(64) not null comment '网址名称',
    `icon` varchar(128) not null comment '网址图标',
    primary key (`id`)
);