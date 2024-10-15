# Local running project

If you want to run this project in your local machine, you need to prepare following environment:

- mysql:8.4
- nodejs 18+
- golang:1.22+
- pnpm: `npm install -g pnpm`

## Run server

Find config file `Phospherus/backend/etc/config-dev.yml`

Modify mysql and oss config

```shell
# change mysql config 
mysql:
  host: "127.0.0.1"
  port: 3306
  dbname: "phospherus"
  user: "root"
  password: "123456"
  max_open_conns: 200
  max_idle_conns: 50

# fill your aliyun oss secretKey
oss:
  accessKey: ""
  secretKey: ""
  endpoint: ""
  bucket: ""
```

Run server

```shell
cd Phospherus/backend
go run .
```

## Run frontend

```shell
cd Phospherus/frontend/blog
pnpm run dev

cd Phospherus/frontend/console
pnpm run dev
```

- `127.0.0.1:9000` for console
- `127.0.0.1:10000` for blog homepage

# Project Deployment

### Step 1

Clone source code to local.

```shell
git clone https://github.com/NextEcho/Phospherus.git
```

### Step 2

You should modify `Phospherus/backend/etc/config-prod.yml` config file if you want to deploy this project on your local machine

Modify mysql and oss config

```shell
# change mysql config 
mysql:
  host: "phospherus-db"
  port: 3306
  dbname: "phospherus"
  user: "root"
  password: "123456"
  max_open_conns: 200
  max_idle_conns: 50

# fill your aliyun oss secretKey
oss:
  accessKey: ""
  secretKey: ""
  endpoint: ""
  bucket: ""
```

### Step 3

Go to the project root directory.

```shell
cd Phospherus
```

Execute the command `docker compose` to build and run the container group.

```bash
docker compose up -d
```

Then, you can access `127.0.0.1:9000` to enter the Phospherus admin system, and access `127.0.0.1:10000` to enter the blog homepage.
