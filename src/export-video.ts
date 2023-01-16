import { GovernanceProposal, Status, Symbol } from './interfaces/GovernanceProposal'
import { Proposal, ProposalParsed, ProposalVotes } from './interfaces/Proposal'
import { fetchGraphQL, fetchURL, saveToCSV, saveToJSON } from '../utils'

import 'isomorphic-fetch'
import proposals from '../public/proposals.json'

const DID_KEY = ''
const DID_SECRET = ''

var script =  `Hello everyone and welcome to Decentraland DAO Summary! I'm Marvin, your host. Today I'm here to talk about a grant request for the development of "Exodus: Goodbye World" (Exodus), a free to play Metaverse role-playing game (MRPG) based in Decentraland (DCL).`

async function main() {
  
  const url = 'https://api.d-id.com/talks'
  const body =   {
    'source_url': 'https://create-images-results.d-id.com/google-oauth2|114424387944501237181/upl_Y7qsSUcWxrqCEBkxXpkrq/image.jpeg',
    'script': {
      'type': 'audio',
      'audio_url': 'https://media.play.ht/full_-NLvnqav1YzLFZwxC5TF.mp3?generation=1673893217328272&alt=media'
    },
    'face': {
      'mask_confidence': 0.9770992366412213,
      'overlap': 'NO',
      'size': 1459,
      'top_left': [ 1178, 199 ],
      'detect_confidence': 0.9935867786407471
    },
  }

  const options = {
    'method': 'POST',
    'headers': {
        'authorization': `Basic ${DID_KEY}:${DID_SECRET}`,
        'content-type': 'application/json',
        'accept': 'application/json',
      },
    'body': JSON.stringify(body)
  }

  console.log('making request', options)
  var response = await fetch(url, options)
  var data = await response.json()

  console.log(data)
}

main()
