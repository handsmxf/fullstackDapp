import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import {Router} from '../routes';

class RequestRow extends React.Component {

  onApprove = async()=>{
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approvalRequest(this.props.id).send({
      from : accounts[0]
    });
    Router.pushRoute(`/campaign/${this.props.address}/requests`);
  }

  onFinalize = async()=>{
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(this.props.id).send({
      from : accounts[0]
    });
    Router.pushRoute(`/campaign/${this.props.address}/requests`);
  }

  render(){
    const {Row, Cell} = Table;
    const {id, request, approversCount} = this.props;
    console.log(request.complate);
    return(
      <Row disabled={request.complate}>
        <Cell>{id}</Cell>
        <Cell>{request.discription}</Cell>
        <Cell>{web3.utils.fromWei(request.totalValue,'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount} / {approversCount}</Cell>
        <Cell>
          {
            request.complate?null:(<Button color='green' onClick={this.onApprove} >同意</Button>)
          }
        </Cell>
        <Cell>
          {
            request.complate?null:(<Button color='orange' onClick={this.onFinalize} >完成</Button>)
          }
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
