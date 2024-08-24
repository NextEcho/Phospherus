# Project Deployment

> There are still some pre-features that are not ready.
>
> Such as initialization of blog system, otherwise there will be no initial user data in mysql.

## docker-compose

### Step 1

Clone source code to local.

```shell
git clone https://github.com/NextEcho/Phospherus.git
```

### Step 2

Enter the project root directory.

```shell
cd Phospherus
```

### Step 3

Execute the command `docker compose` to build and run the container group.

```bash
docker compose up -d
```

Then, you can access `localhost:9000` to enter the Phospherus admin system, and access `localhost:10000` to enter the blog homepage.