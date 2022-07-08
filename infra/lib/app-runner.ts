import * as apprunner from "aws-cdk-lib/aws-apprunner";
import {
    APP_RUNNER_SERVER_ID,
    APP_RUNNER_WEB_ID,
    AURORA_DATABASE_NAME,
    AURORA_USERNAME,
} from "./constants";
import { ECR } from "./ecr";
import { ServerlessCluster } from "aws-cdk-lib/aws-rds";
import { SecretValue } from "aws-cdk-lib";
import { InfraStack } from "./infra-stack";
import { IRole } from "aws-cdk-lib/aws-iam";
import { IVpc, SubnetType } from "aws-cdk-lib/aws-ec2";

export interface IAppRunnerProps {
    ecr: ECR;
    auroraCluster: ServerlessCluster;
    auroraPassword: SecretValue;
    appRunnerRole: IRole;
    vpc: IVpc;
}

export class AppRunner {
    readonly appRunnerWeb: apprunner.CfnService;
    readonly appRunnerServer: apprunner.CfnService;

    constructor(scope: InfraStack, props: IAppRunnerProps) {
        const appRunnerVpcConnector = new apprunner.CfnVpcConnector(
            scope,
            "AppRunnerVPCCon",
            {
                subnets: props.vpc.selectSubnets({
                    subnetType: SubnetType.PRIVATE_WITH_NAT,
                }).subnetIds,
                securityGroups: [
                    props.auroraCluster.connections.securityGroups[0]
                        .securityGroupId,
                ],
                vpcConnectorName: "AppRunnerVPCConnector",
            }
        );

        this.appRunnerServer = new apprunner.CfnService(
            scope,
            APP_RUNNER_SERVER_ID,
            {
                sourceConfiguration: {
                    authenticationConfiguration: {
                        accessRoleArn: props.appRunnerRole.roleArn,
                    },
                    imageRepository: {
                        imageIdentifier: `${props.ecr.serverRegistry.repositoryUri}:latest`,
                        imageRepositoryType: "ECR",
                        imageConfiguration: {
                            port: "4000",
                            runtimeEnvironmentVariables: [
                                {
                                    name: "DATABASE_URL",
                                    value: props.auroraCluster.clusterEndpoint
                                        .hostname,
                                },
                                {
                                    name: "DATABASE_PORT",
                                    value: props.auroraCluster.clusterEndpoint.port.toString(),
                                },
                                {
                                    name: "DATABASE_USERNAME",
                                    value: AURORA_USERNAME,
                                },
                                {
                                    name: "DATABASE_PASSWORD",
                                    value: process.env.DATABASE_SECRET,
                                },
                                {
                                    name: "DATABASE_NAME",
                                    value: AURORA_DATABASE_NAME,
                                },
                            ],
                        },
                    },
                },
                networkConfiguration: {
                    egressConfiguration: {
                        egressType: "VPC",
                        vpcConnectorArn:
                            appRunnerVpcConnector.attrVpcConnectorArn,
                    },
                },
            }
        );

        this.appRunnerWeb = new apprunner.CfnService(scope, APP_RUNNER_WEB_ID, {
            sourceConfiguration: {
                authenticationConfiguration: {
                    accessRoleArn: props.appRunnerRole.roleArn,
                },
                imageRepository: {
                    imageIdentifier: `${props.ecr.webRegistry.repositoryUri}:latest`,
                    imageRepositoryType: "ECR",
                    imageConfiguration: {
                        port: "3001",
                        runtimeEnvironmentVariables: [
                            {
                                name: "NEXT_PUBLIC_API_BASE_URL",
                                value: this.appRunnerServer.attrServiceUrl.includes(
                                    "http"
                                )
                                    ? this.appRunnerServer.attrServiceUrl
                                    : `https://${this.appRunnerServer.attrServiceUrl}`,
                            },
                            {
                                name: "NEXT_PUBLIC_API_GRAPHQL_ENDPOINT",
                                value: "/graphql",
                            },
                            {
                                name: "NEXT_PUBLIC_SOCKET_API_BASE_URL",
                                value: this.appRunnerServer.attrServiceUrl.includes(
                                    "http"
                                )
                                    ? this.appRunnerServer.attrServiceUrl.replace(
                                          /^(http|https):\/\//g,
                                          "ws://"
                                      )
                                    : `ws://${this.appRunnerServer.attrServiceUrl}`,
                            },
                        ],
                    },
                },
            },
        });
    }
}
