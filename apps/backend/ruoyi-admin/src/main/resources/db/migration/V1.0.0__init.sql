-- =============================================
-- Flyway 基线迁移脚本
-- 版本: V1.0.0
-- 描述: RuoYi-Vue-Plus 初始化数据库结构
-- 
-- 注意: 此文件为基线脚本占位符
-- 实际的数据库初始化请使用 script/sql/ 目录下的脚本:
--   - ry_vue_5.X.sql: 核心系统表
--   - ry_job.sql: 定时任务表
--   - ry_workflow.sql: 工作流表
--
-- Flyway 配置了 baseline-on-migrate: true
-- 这意味着对于已存在的数据库，Flyway 会自动创建基线
-- 后续的增量迁移脚本应使用 V1.0.1__xxx.sql 格式命名
-- =============================================

-- 此脚本为空，因为初始数据库结构由 RuoYi-Vue-Plus 原有脚本创建
-- 后续数据库变更请创建新的迁移脚本，例如:
-- V1.0.1__add_new_table.sql
-- V1.0.2__alter_column.sql

SELECT 1;
