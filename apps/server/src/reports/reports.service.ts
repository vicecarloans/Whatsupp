import { Injectable } from "@nestjs/common";
import { ReportInput } from "src/graphql.schema";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(reportInput: ReportInput) {
    return this.prisma.report.create({
      data: {
        name: reportInput.name,
        description: reportInput.description,
        status: reportInput.status,
        reportedBy: {
          connectOrCreate: {
            where: { email: reportInput.reportedBy.email },
            create: {
              full_name: reportInput.reportedBy.full_name,
              email: reportInput.reportedBy.email,
              avatar: reportInput.reportedBy.avatar,
            },
          },
        },
        proposals: {
          create: reportInput.proposals,
        },
      },
    });
  }

  async findAll(offset: number, limit: number) {
    return this.prisma.report.findMany({
      skip: offset,
      take: limit,
      include: {
        reportedBy: true,
        proposals: true,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.report.findUnique({
      where: {
        id,
      },
      include: {
        reportedBy: true,
        proposals: true,
      },
    });
  }
}
