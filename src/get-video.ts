import { GovernanceProposal, Status, Symbol } from './interfaces/GovernanceProposal'
import { Proposal, ProposalParsed, ProposalVotes } from './interfaces/Proposal'
import { fetchGraphQL, fetchURL, saveToCSV, saveToJSON } from '../utils'

import 'isomorphic-fetch'
import proposals from '../public/proposals.json'

const DID_KEY = ''
const DID_SECRET = ''

var script =  `Hello everyone and welcome to Decentraland DAO Summary! I'm Marvin, your host. Today I'm here to talk about a grant request for the development of "Exodus: Goodbye World" (Exodus), a free to play Metaverse role-playing game (MRPG) based in Decentraland (DCL).`

async function main() {
  
  const url = 'https://api.d-id.com/talks/tlk_kEefh0Am9PYbUmWxReGoX'

  const options = {
    'headers': {
        'authorization': `Basic ${DID_KEY}:${DID_SECRET}`,
        'content-type': 'application/json',
        'accept': 'application/json',
      },
  }

  console.log('making request', options)
  var response = await fetch(url, options)
  var data = await response.json()

  console.log(data)
}

main()
