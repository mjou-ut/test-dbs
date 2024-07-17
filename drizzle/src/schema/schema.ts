import { integer, PgDate, pgEnum, pgTable, PgUUID, serial, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'

// declaring enum in database
export const evidenceTypeEnum = pgEnum('evidenceType', ['IE_IMAGE'])

export const evidences = pgTable(
  'evidences',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    evidenceType: evidenceTypeEnum('evidenceType'),
    sourceHost: varchar('sourceHost').notNull(),
    sourcePath: varchar('sourcePath').notNull(),
    accountId: uuid('accountId').notNull(),
    workspaceId: uuid('workspaceId').notNull(),
  },
  (e) => {
    return {
      uniqueUuids: uniqueIndex('unique_idx').on(e.id, e.accountId, e.workspaceId),
    }
  },
)

export const embeds = pgTable('embeds', {
  id: uuid('id').defaultRandom().primaryKey(),
  evidenceId: uuid('evidenceId').references(() => evidences.id),
  reportId: uuid('reportId').notNull(),
  userId: uuid('userId').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  deletedAt: timestamp('deletedAt'),
})
