import { GovernanceProposal, Status, Symbol } from './interfaces/GovernanceProposal'
import { Proposal, ProposalParsed, ProposalVotes } from './interfaces/Proposal'
import { fetchGraphQL, fetchURL, saveToCSV, saveToJSON } from '../utils'
import proposals from '../public/proposals.json'

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '',
});
const openai = new OpenAIApi(configuration);


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

  var prompt = ''

  prompt = prompt.concat('Your name is Marvin, you are the host of a Youtube Channel called "Decentraland DAO Summary", that summarize the most interesting proposals being voted in Decentraland DAO.', '\n')
  prompt = prompt.concat('Write an speech for a new video, it should include a welcoming your audience, introduction of the proposal, go into explaining different parts of the proposal and closing with a summary.', '\n')
  prompt = prompt.concat('Be more funny but keep a neutral position. Encourage the audience to share their opinions, concerns and feedback in the comments. Remember the audience to follow and subscribe.', '\n')

  prompt = prompt.concat('Sumarize the following project description: \n')
  
  if (proposal.type == 'grant') {
    prompt = prompt.concat('Project Type: Grant Request')
    prompt = prompt.concat('Grant Tier:' + proposal.configuration.tier.slice(0, 6))
    var currency = proposal.configuration.size > 5000 ? ' USD' : 'MANA'
    prompt = prompt.concat('Grant Amount: $' + proposal.configuration.size + ' USD')
  }

  prompt = prompt.concat('Author:', names[0])
  prompt = prompt.concat('Co-authors:', names.slice(1).join(' and '), '\n')
  
  prompt = prompt.concat('# Title:', proposal.title, '\n')
  prompt = prompt.concat('## Project Abstract:\n', proposal.configuration.abstract, '\n')
  prompt = prompt.concat('## Project Description:\n', proposal.configuration.description, '\n')
  prompt = prompt.concat('## Project Specification:\n', proposal.configuration.specification, '\n')
  prompt = prompt.concat('## Project Personnel:\n', proposal.configuration.personnel, '\n')
  prompt = prompt.concat('## Project Roadmap:\n', proposal.configuration.roadmap, '\n')

  prompt = prompt.concat('[Write an speech for a new video, it should include a welcoming your audience, introduction of the proposal, go into explaining different parts of the proposal and closing with a summary.]', '\n\n')

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.3,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response.data.choices[0].text)

}

main()
