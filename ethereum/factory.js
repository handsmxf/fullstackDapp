import web3 from './web3';

import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  '0xcbc53d7d879D8115EF974464203E110236AA8055'
);

export default instance;
