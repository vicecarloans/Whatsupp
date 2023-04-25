import { SecretValue } from "aws-cdk-lib";
import { IVpc, Port, Protocol } from "aws-cdk-lib/aws-ec2";
import { IRole } from "aws-cdk-lib/aws-iam";
import {
    DatabaseClusterEngine,
    ParameterGroup,
    ServerlessCluster,
} from "aws-cdk-lib/aws-rds";
import {
    AURORA_CLUSTER_ID,
    AURORA_CLUSTER_IDENTIFIER,
    AURORA_DATABASE_NAME,
    AURORA_USERNAME,
} from "./constants";
import { InfraStack } from "./infra-stack";

export interface IAuroraProps {
    password: SecretValue;
    vpc: IVpc;
}

export class Aurora {
    readonly auroraCluster: ServerlessCluster;
    constructor(scope: InfraStack, props: IAuroraProps) {
        // TODO: for real prod environment, we should create a VPC and place everything instead the VPC instead
        this.auroraCluster = new ServerlessCluster(scope, AURORA_CLUSTER_ID, {
            engine: DatabaseClusterEngine.AURORA_POSTGRESQL,
            parameterGroup: ParameterGroup.fromParameterGroupName(
                scope,
                "ParameterGroup",
                "default.aurora-postgresql10"
            ),
            credentials: {
                username: AURORA_USERNAME,
                password: props.password,
            },
            clusterIdentifier: AURORA_CLUSTER_IDENTIFIER,
            defaultDatabaseName: AURORA_DATABASE_NAME,
            vpc: props.vpc,
        });

        this.auroraCluster.connections.allowFromAnyIpv4(Port.allTraffic());
        this.auroraCluster.connections.allowToAnyIpv4(Port.allTraffic());
    }
}
