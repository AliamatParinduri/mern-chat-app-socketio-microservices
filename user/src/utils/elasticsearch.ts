import { Client } from '@elastic/elasticsearch'

import { ElasticUri, USER_INDEX } from '../../config'

export const client = new Client({
  node: ElasticUri
})

async function prepare() {
  const index = await client.indices.exists({ index: USER_INDEX })
  if (index) return false

  await client.indices.create({
    index: USER_INDEX,
    body: {
      mappings: {
        properties: {
          id: { type: 'text' },
          name: { type: 'text' },
          email: { type: 'text' },
          password: { type: 'text' },
          pic: { type: 'text' },
          createdAt: { type: 'date' },
          updatedAt: { type: 'date' }
        }
      }
    }
  })
}

prepare().catch((err: any) => {
  console.log(err)
  process.exit(1)
})
