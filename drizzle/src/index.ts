import { drizzle, NodePgDatabase, NodePgQueryResultHKT } from 'drizzle-orm/node-postgres'
import { eq, sql } from 'drizzle-orm'

import { Client } from 'pg'

import { evidences, embeds } from './schema/schema'

const client = new Client({
  connectionString: 'postgres://user:password@localhost:5432/db_drizzle',
})

const createEvidences = async (db: NodePgDatabase) => {
  const evidence = {
    sourceHost: 'https://app.usertesting.com',
    sourcePath: '/path/to/embed_image',
    accountId: '91694395-a0fd-48b3-8758-a8c4ea4286f9',
    workspaceId: '91694395-a0fd-48b3-8758-a8c4ea4286f9',
  }

  const created = await db.insert(evidences).values(evidence).returning()

  return created
}

const createEmbed = async (db: NodePgDatabase, evidenceId: string) => {
  const embed = {
    evidenceId: evidenceId,
    reportId: '135c5ad1-804d-4b4e-9af9-a1dce06c16f8',
    userId: '135c5ad1-804d-4b4e-9af9-a1dce06c16f8',
  }
  return await db.insert(embeds).values(embed).returning()
}

const customQuery = async (db: NodePgDatabase, query: any) => {
  const customData = await db.execute(sql`select count(*) from evidences`)
  const result = await query.execute()

  console.log('Custom query', customData.rows)
  return result
}

const main = async () => {
  console.log('Hi there, drizzle!')

  await client.connect()
  const db = drizzle(client)
  // create
  const newEvidence = await createEvidences(db)
  console.log('New evidence:', newEvidence)

  // select
  const allEvidences = await db.select({ id: evidences.id }).from(evidences)
  console.log('All evidences: ', allEvidences)

  // select one
  const oneEvidence = await db.select({ id: evidences.id }).from(evidences).where(eq(evidences.id, '135c5ad1-804d-4b4e-9af9-a1dce06c16f8'))
  console.log('One evidence: ', oneEvidence)

  // select missing

  const missingEvidenceQ = db.select({ id: evidences.id }).from(evidences).where(eq(evidences.id, '135c5ad1-804d-4b4e-9af9-a1dce06c1aaa'))
  const missingEvidence = await customQuery(db, missingEvidenceQ)

  console.log('Missing evidence: ', missingEvidence)

  // delete
  const deletedEvidence = await db.delete(evidences).where(eq(evidences.id, oneEvidence[0]?.id)).returning()
  console.log('Deleted Ecidence:', deletedEvidence)

  // create embed
  const newEmbed = await createEmbed(db, newEvidence[0]?.id)
  console.log('New embed:', newEmbed)

  const joined = await db
    .select()
    .from(evidences)
    .where(eq(evidences.id, newEvidence[0]?.id))
    .leftJoin(embeds, eq(evidences.id, embeds.evidenceId))

  console.log(joined)
}

main()
