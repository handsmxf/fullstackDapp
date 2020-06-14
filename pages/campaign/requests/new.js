import React,{ Component } from 'react';
import Layout from '../../../components/Layout';
import { Button,Form,Input,Message } from 'semantic-ui-react';
import { Router, Link } from '../../../routes';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';


class CampaignRequestsNew extends React.Component {

  static async getInitialProps(props) {
    const {address} = props.query;
    return {address};
  };

  state={
    discription : '',
    totalValue : '',
    recipientAddress : '',
    errorMessage : ''
  };

  onSubmit = async()=> {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    const {discription,totalValue,recipientAddress} = this.state;
    this.setState({loading:true});

    try {

      await campaign.methods.createRequest(discription,web3.utils.toWei(totalValue,'ether'),recipientAddress).send({
        from : accounts[0]
      });
      Router.pushRoute(`/campaign/${this.props.address}/requests`);
    } catch (err) {
      this.setState({errorMessage:err.message});
    }
    this.setState({loading:false});
  }

  render(){
    return(

      <Layout>
        <h3>管理员创建请求</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>请求描述</label>
            <Input
              placeholder='请输请求描述'
              value={this.state.discription}
              onChange={event=>this.setState({discription:event.target.value})}
            />
          </Form.Field>

          <Form.Field>
            <label>请求总金额（wei）</label>
            <Input
              placeholder='请输请求总金额'
              value={this.state.totalValue}
              onChange={event=>this.setState({totalValue:event.target.value})}
            />
          </Form.Field>

          <Form.Field>
            <label>受益人地址</label>
            <Input
              placeholder='请输受益人地址'
              value={this.state.recipientAddress}
              onChange={event=>this.setState({recipientAddress:event.target.value})}
            />
          </Form.Field>

          <Message error header='异常提示：' content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>创建众筹</Button>
          <Link route={`/campaign/${this.props.address}/requests`}>
            <Button labelPosition='left' icon='left chevron' content='返回列表' />
          </Link>
        </Form>
      </Layout>
    );
  }
}

export default CampaignRequestsNew;
