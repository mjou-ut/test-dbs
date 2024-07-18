import { prisma } from './config'

export const embedsDomain = {
  new: async (sourceHost: string, sourcePath: string, accountId: string, workspaceId: string) => {
    const newEvidence = await prisma.evidence.create({
      data: {
        sourceHost: sourceHost,
        sourcePath: sourcePath,
        accountId: accountId,
        workspaceId: workspaceId,
      },
    })

    return newEvidence
  },
  getById: async (id: string) => {
    const evidence = await prisma.evidence.findUnique({
      where: {
        id: id,
      },
      include: {
        embeds: true,
      },
    })

    return evidence
  },
  newEmbed: async (evidenceId: string, reportId: string, userId: string) => {
    const newEmbed = await prisma.embed.create({
      data: {
        evidenceId: evidenceId,
        reportId: reportId,
        userId: userId,
      },
    })

    return newEmbed
  },
}
