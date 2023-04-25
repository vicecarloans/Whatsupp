import { IVpc, Vpc } from "aws-cdk-lib/aws-ec2";
import { InfraStack } from "./infra-stack";

export class Network {
    readonly auroraVpc: IVpc;

    constructor(scope: InfraStack) {
        this.auroraVpc = new Vpc(scope, "AuroraVPC", {});
    }
}
