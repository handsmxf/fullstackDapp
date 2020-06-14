import React , { Component } from 'react';
import {Form , Input, Button, Message} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class ContributeForm extends React.Component {

  state = {
    value:'',
    errorMessage : '',
    loading : false
  }

  onSubmit = async()=>{
    this.setState({errorMessage:''});
    this.setState({loading:true});
    try {
      event.preventDefault();
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from : accounts[0],
        value : web3.utils.toWei(this.state.value,'ether')
      });
      Router.replaceRoute(`/campaign/${this.props.address}`);
    } catch (err) {
      this.setState({errorMessage:err.message});
    }
    this.setState({loading:false});
  }

  render(){
    return(
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>投资总额</label>
          <Input
            value={this.state.value}
            onChange={event=>this.setState({value:event.target.value})}
            placeholder='请输入献量额度'
            label='ether'
            labelPosition='right'
          />
        </Form.Field>
        <Message error header='异常提示：' content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary>确认投资</Button>
      </Form>
    );
  }
}

export default ContributeForm;
