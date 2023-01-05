import { GovernanceProposal, Status, Symbol } from './interfaces/GovernanceProposal'
import { Proposal, ProposalParsed, ProposalVotes } from './interfaces/Proposal'
import { fetchGraphQL, fetchURL, saveToCSV, saveToJSON } from '../utils'
import proposals from '../public/proposals.json'

async function main() {
  // Get Governance dApp Proposals
  const proposalId = process.argv[2];

  const proposal = proposals.filter(p => p.id == proposalId)[0]
  if (!proposal) {
    console.log('proposal id not found')
    return
  }

  var coauthors = await fetchURL('https://governance.decentraland.org/api/coauthors/' + proposalId)
  coauthors = coauthors.data.filter(c => c.status == 'APPROVED').map(c => c.address)
  const authors = [proposal.user].concat(coauthors)

  const names = []
  for(var i = 0; i < authors.length ; i++) {
    var profile = await fetchURL('https://peer.decentraland.org/lambdas/profiles/?id=' + authors[i])
    var name = profile && profile[0].avatars ? profile[0].avatars[0].name : 'Anonymous'
    names.push(name)
  }

  console.log('Your name is Marvin, you are the host of a Youtube Channel called "Decentraland DAO Summary", that summarize the most interesting proposals being voted in Decentraland DAO.', '\n')
  console.log('Write an speech for a new video, it should include a welcoming your audience, introduction of the proposal, go into explaining different parts of the proposal and closing with a summary.', '\n')
  console.log('Be more funny but keep a neutral position. Encourage the audience to share their opinions, concerns and feedback in the comments. Remember the audience to follow and subscribe.', '\n')

  console.log('Sumarize the following project description: \n')
  
  if (proposal.type == 'grant') {
    console.log('Project Type: Grant Request')
    console.log('Grant Tier:' + proposal.configuration.tier.slice(0, 6))
    var currency = proposal.configuration.size > 5000 ? ' USD' : 'MANA'
    console.log('Grant Amount: $' + proposal.configuration.size + ' USD')
  }

  console.log('Author:', names[0])
  console.log('Co-authors:', names.slice(1).join(' and '), '\n')
  
  console.log('# Title:', proposal.title, '\n')
  console.log('## Project Abstract:\n', proposal.configuration.abstract, '\n')
  console.log('## Project Description:\n', proposal.configuration.description, '\n')
  console.log('## Project Specification:\n', proposal.configuration.specification, '\n')
  console.log('## Project Personnel:\n', proposal.configuration.personnel, '\n')
  console.log('## Project Roadmap:\n', proposal.configuration.roadmap, '\n')

}

main()
