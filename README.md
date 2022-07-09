# Whatsupp

Monorepo setup using docker-compose

Make sure you have docker installed. To run this

```shell
cp ./web/.env.example ./web/.env.local
cp ./server/.env.example ./server/.env
docker-compose up
```

> Note that initial load is going to take sometime
> You should also add couple of channels in database manually if testing this locally

## Deployment

> Since App Runner currently doesn't support Websockets protocol, the deployment will work but graphql subscription won't work: https://stackoverflow.com/questions/70414143/does-aws-app-runner-properly-support-websocket-connections/70852965#70852965. In the future, this might change and unblock the subscription feature.

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
