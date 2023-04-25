import { SecretValue, Stack, StackProps } from "aws-cdk-lib";
import { Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { AppRunner } from "./app-runner";
import { Aurora } from "./aurora";
import { ECR } from "./ecr";
import { Network } from "./network";

export class InfraStack extends Stack {
    readonly ecr: ECR;
    readonly appRunner: AppRunner;
    readonly aurora: Aurora;
    readonly network: Network;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const auroraPassword = SecretValue.unsafePlainText(
            process.env.DATABASE_SECRET!
        );

        const appRunnerRole = new Role(this, "AppRunnerRole", {
            assumedBy: new ServicePrincipal("build.apprunner.amazonaws.com"),
        });

        this.network = new Network(this);

        this.ecr = new ECR(this, { appRunnerRole });

        this.aurora = new Aurora(this, {
            password: auroraPassword,
            vpc: this.network.auroraVpc,
        });

        this.appRunner = new AppRunner(this, {
            ecr: this.ecr,
            auroraPassword,
            auroraCluster: this.aurora.auroraCluster,
            appRunnerRole,
            vpc: this.network.auroraVpc,
        });
    }
}
