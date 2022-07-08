# Whatsupp

Monorepo setup using docker-compose

Make sure you have docker installed. To run this

```shell
docker-compose up
```

> Note that initial load is going to take sometime
> You should also add couple of channels in database manually if testing this locally

## Deployment

Provisioning environment first

```
export DATABASE_SECRET=<your-db-secret>
export DATABASE_USERNAME=<your-db-username>
cdk boostrap
cdk deploy
```

> Note that on most cases, you should restrain from execute these commands manually and instead these commands will be executed by your CI/CD

```
aws ecr get-login-password --region region | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com
```

Build & Push Web Image

```
docker build -t whatsupp-web ./web
docker tag whatsupp-web:latest <ecr-web-registry>:latest
docker push <ecr-web-registry>:latest
```

Build & Push Server Image

```
docker build -t whatsupp-server ./server
docker tag whatsupp-server:latest <ecr-server-registry>:latest
docker push <ecr-server-registry>:latest
```
