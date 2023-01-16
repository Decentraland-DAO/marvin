import { GovernanceProposal, Status, Symbol } from './interfaces/GovernanceProposal'
import { Proposal, ProposalParsed, ProposalVotes } from './interfaces/Proposal'
import { fetchGraphQL, fetchURL, saveToCSV, saveToJSON } from '../utils'

import 'isomorphic-fetch'
import proposals from '../public/proposals.json'

const PLAYHT_SECRET = ''
const PLAYHT_USER = ''

var script =  `Hello everyone and welcome to Decentraland DAO Summary! I'm Marvin, your host. Today I'm here to talk about a grant request for the development of "Exodus: Goodbye World" (Exodus), a free to play Metaverse role-playing game (MRPG) based in Decentraland (DCL).`

async function main() {
  
  const url = 'https://play.ht/api/v1/articleStatus?transcriptionId=-NLvnqav1YzLFZwxC5TF'
  const options = {
    'method': 'GET',
    'headers': {
        'Authorization': PLAYHT_SECRET,
        'X-User-ID': PLAYHT_USER,
        'Content-Type': 'application/json',
      },
  }

  console.log('making request', options)
  var response = await fetch(url, options)
  var data = await response.json()

  console.log(data)
}

main()
