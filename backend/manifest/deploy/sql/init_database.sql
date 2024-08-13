create database `phospherus`;

use `phospherus`;

-- table of user
create table `user` (
    `id` int not null auto_increment comment '用户ID',
    `passport` varchar(64) not null comment '用户账户',
    `nickname` varchar(64) not null comment '用户昵称',
    `password` varchar(128) not null comment '用户密码',
    `avatar` varchar(128) not null comment '用户头像',
    `email` varchar(128) not null comment '用户邮箱',
    `github_url` varchar(128) not null comment '用户github地址',
    primary key (`id`)
);

-- table of article
create table `article` (
    `id` int not null auto_increment comment '文章ID',
    `author_id` int not null comment '文章作者ID',
    `title` varchar(128) not null comment '文章标题',
    `content` text not null comment '文章内容',
    `cover` varchar(128) default '' comment '文章图片封面',
    `description` varchar(1024) default '暂无文章概述' comment '文章概述',
    `is_visible` tinyint not null default 1 comment '文章是否可见 1-可见 0-不可见',
    `status` tinyint not null default 0 comment '文章状态 0-草稿 1-已发布 2-垃圾箱',
    `view_count` int not null default 0 comment '文章浏览量',
    `like_count` int not null default 0 comment '文章点赞量',
    `created_at` timestamp not null default current_timestamp comment '创建时间',
    `updated_at` timestamp not null default current_timestamp on update current_timestamp comment '修改时间',
    primary key (`id`)
);

-- table of tag
create table `tag` (
    `id` int not null auto_increment comment '标签ID',
    `name` varchar(64) not null comment '标签名称',
    `background_color` varchar(7) not null default '#6366f1' comment '标签背景颜色',
    primary key (`id`)
);

-- table of article_tag
create table `article_tag` (
    `article_id` int not null comment '文章ID',
    `tag_id` int not null comment '标签ID',
    primary key (`article_id`, `tag_id`)
);

-- table of friend_link
create table `friend_link` (
    `id` int not null auto_increment comment '友链ID',
    `url` varchar(128) not null comment '网址路径',
    `name` varchar(64) not null comment '网址名称',
    `icon` varchar(128) not null comment '网址图标',
    primary key (`id`)
);