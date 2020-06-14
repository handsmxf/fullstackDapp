import React,{ Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class CampaignRequests extends React.Component {

  static async getInitialProps(props){
    const {address} = props.query;//等同于 const address = props.query.address;
    const campaign = Campaign(address);
    const accounts = web3.eth.getAccounts();
    const requestCount = await campaign.methods.getRequestCount().call();

    const approversCount = await campaign.methods.approversCount().call();
    //Promise.all()  将方法里面的所有操作执行完之后 才会返回requests对象
    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element,index)=>{
        return campaign.methods.requests(index).call();
      })
    );
    return {address, requests, approversCount};
  }

  initTableRow() {
    return this.props.requests.map((request, index)=>{
      return <RequestRow
              key={index}
              id={index}
              request={request}
              approversCount={this.props.approversCount}
              address={this.props.address} />
    })
  };


  render(){
    return(
      <Layout>
        <h3>请求列表</h3>
        <Link route={`/campaign/${this.props.address}/requests/new`}>
          <a>
          <Button primary>增加请求</Button>
          </a>
        </Link>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>描述</Table.HeaderCell>
              <Table.HeaderCell>总金额（wei）</Table.HeaderCell>
              <Table.HeaderCell>受益人地址</Table.HeaderCell>
              <Table.HeaderCell>同意数量</Table.HeaderCell>
              <Table.HeaderCell>是否同意</Table.HeaderCell>
              <Table.HeaderCell>是否完成</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.initTableRow()}
          </Table.Body>
        </Table>
      </Layout>
    );
  }
}

export default CampaignRequests;
