use `phospherus`;

-- table of user
create table `user` (
    `id` int not null auto_increment comment '博主ID',
    `passport` varchar(64) not null comment '博主账户',
    `nickname` varchar(64) not null comment '博主昵称',
    `password` varchar(128) not null comment '博主密码',
    `avatar` varchar(128) not null comment '博主头像',
    `signature` varchar(128) not null comment '博主签名',
    `email` varchar(128) not null comment '博主邮箱',
    `github` varchar(128) not null comment '用户github地址',
    `introduction` text not null comment '博主介绍',
    `resume` varchar(128) not null comment '博主简历',
    primary key (`id`)
);

-- table of article
create table `article` (
    `id` int not null auto_increment comment '文章ID',
    `author_id` int not null comment '文章作者ID',
    `title` varchar(128) not null comment '文章标题',
    `content` text not null comment '文章内容',
    `cover` varchar(128) default 'default.png' comment '文章图片封面',
    `description` varchar(1024) default '暂无文章概述' comment '文章概述',
    `is_visible` tinyint not null default 1 comment '文章是否可见 1-不可见 2-可见',
    `status` tinyint not null default 1 comment '文章状态 1-草稿 2-已发布 3-垃圾箱',
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

--table of category
create table `category` (
    `id` int not null auto_increment comment '分类ID',
    `parent_id` int not null default 0 comment '父级分类ID',
    `name` varchar(64) not null comment '分类名称',
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

-- table of attachment
create table `attachment` (
    `id` int not null auto_increment comment '附件ID',
    `creator_id` int not null comment '创建者ID',
    `name` varchar(128) not null comment '附件名称',
    `ext` varchar(16) not null comment '附件后缀',
    `url` varchar(128) not null comment '附件路径',
    `type` tinyint not null comment '附件类型 1-图片 2-视频 3-音频 4-其他',
    `size` int not null comment '附件大小',
    `created_at` timestamp not null default current_timestamp comment '创建时间',
    primary key (`id`)
);