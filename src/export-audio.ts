import { GovernanceProposal, Status, Symbol } from './interfaces/GovernanceProposal'
import { Proposal, ProposalParsed, ProposalVotes } from './interfaces/Proposal'
import { fetchGraphQL, fetchURL, saveToCSV, saveToJSON } from '../utils'

import 'isomorphic-fetch'
import proposals from '../public/proposals.json'

const PLAYHT_SECRET = ''
const PLAYHT_USER = ''

var script =  `Hello everyone and welcome to Decentraland DAO Summary! I'm Marvin, your host. Today I'm here to talk about a grant request for the development of "Exodus: Goodbye World" (Exodus), a free to play Metaverse role-playing game (MRPG) based in Decentraland (DCL).`

async function main() {
  
  const url = 'https://play.ht/api/v1/convert'
  const body =   {
    "voice": 'en-US_MichaelV3Voice',
    "content": [ script ],
    //"title": "my-audio",          // Optional
    //"narrationStyle": string, // Optional
    //"globalSpeed": string,    // Optional
    //"pronunciations": { key: string, value: string }[], // Optional
    //"trimSilence": boolean,   // Optional
    //"transcriptionId": string  // Optional - use it to update the same audio file
  }

  const options = {
    'method': 'POST',
    'headers': {
        'Authorization': PLAYHT_SECRET,
        'X-User-ID': PLAYHT_USER,
        'Content-Type': 'application/json',
      },
    'body': JSON.stringify(body)
  }

  console.log('making request', options)
  var response = await fetch(url, options)
  var data = await response.json()

  console.log(data)
}

main()
