import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Button, Form, Message } from 'semantic-ui-react'
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import {Router} from '../../routes';

class CampaignNew extends Component {

  state = {
    minimum : '',
    errorMessage : '',
    submitCss : ''
  };

  onSubmit = async()=>{
    this.setState({loading:true});
    try {
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();

      await factory.methods.createCampaign(this.state.minimum).send({from:accounts[0],gas:'1000000'});

      Router.pushRoute('/');
    } catch (err) {
      this.setState({errorMessage:err.message});
    }
    this.setState({loading:false});

  };

  render(){
    // console.log(this.state.minimum);
    return(
      <Layout>
        <h1>创建你的众筹项目</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>请输入最小贡献量</label>
            <input
              placeholder='请输入最小贡献量'
              value={this.state.minimum}
              onChange={event=>this.setState({minimum:event.target.value})}
            />
          </Form.Field>
          <Message error header='异常提示：' content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>创建众筹</Button>
        </Form>
      </Layout>
    );
  };
}

export default CampaignNew;
