# Turbo-Stack 部署配置

整合自 RuoYi-Vue-Plus Docker 配置，适配 Monorepo 结构。

## 快速开始

### 开发环境 (仅基础设施)

```bash
cd deploy
docker compose up -d
```

默认启动：
- MySQL 8.0 - `localhost:3306` (root/root)
- Redis 7.2 - `localhost:6379`
- MinIO - `localhost:9000` (ruoyi/ruoyi123)

### 生产环境 (完整服务)

```bash
cd deploy
docker compose --profile prod up -d
```

额外启动：
- Nginx - `localhost:80/443`
- Backend x2 - 负载均衡 (8080/8081)
- Monitor Admin - `localhost:9090`
- SnailJob Server - `localhost:8800`

## 目录结构

```
deploy/
├── docker-compose.yml    # 主配置文件
├── mysql/
│   ├── conf/my.cnf       # MySQL 配置
│   └── init/             # 初始化 SQL 脚本
├── redis/
│   └── redis.conf        # Redis 配置
└── nginx/
    ├── nginx.conf        # Nginx 配置
    ├── cert/             # SSL 证书
    └── html/             # 前端构建产物
```

## 常用命令

```bash
# 查看服务状态
docker compose ps

# 查看日志
docker compose logs -f mysql
docker compose logs -f redis
docker compose logs -f backend-1

# 停止服务
docker compose down

# 停止并清除数据卷
docker compose down -v

# 重启单个服务
docker compose restart mysql
```

## 部署前端

```bash
# 1. 构建 Admin 前端
cd apps/admin
pnpm build

# 2. 复制到 nginx 目录
cp -r dist/* ../deploy/nginx/html/
```

## 环境变量

可通过 `.env` 文件或环境变量覆盖默认配置：

```env
# MySQL
MYSQL_ROOT_PASSWORD=your_password
MYSQL_DATABASE=ry-vue

# Redis
REDIS_PASSWORD=your_password

# MinIO
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=your_password
```

## 注意事项

1. **开发环境**: 后端和前端建议用 IDE 启动，方便调试
2. **生产环境**: 需要先构建后端 Docker 镜像
3. **数据持久化**: 使用 Docker volumes，数据不会因容器删除而丢失
4. **HTTPS**: 取消 nginx.conf 中 HTTPS server 注释，并放置证书文件
