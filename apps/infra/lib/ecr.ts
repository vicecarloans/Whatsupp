import { RemovalPolicy } from "aws-cdk-lib";
import { Repository } from "aws-cdk-lib/aws-ecr";
import { IRole } from "aws-cdk-lib/aws-iam";

import {
    ECR_SERVER_REGISTRY_ID,
    ECR_SERVER_REGISTRY_NAME,
    ECR_WEB_REGISTRY_ID,
    ECR_WEB_REGISTRY_NAME,
} from "./constants";
import { InfraStack } from "./infra-stack";

export interface IECRProps {
    appRunnerRole: IRole;
}

export class ECR {
    readonly webRegistry: Repository;
    readonly serverRegistry: Repository;

    constructor(readonly scope: InfraStack, props: IECRProps) {
        this.webRegistry = new Repository(scope, ECR_WEB_REGISTRY_ID, {
            repositoryName: ECR_WEB_REGISTRY_NAME,
            removalPolicy: RemovalPolicy.DESTROY,
        });

        this.webRegistry.grantPull(props.appRunnerRole);

        this.serverRegistry = new Repository(scope, ECR_SERVER_REGISTRY_ID, {
            repositoryName: ECR_SERVER_REGISTRY_NAME,
            removalPolicy: RemovalPolicy.DESTROY,
        });

        this.serverRegistry.grantPull(props.appRunnerRole);
    }
}
