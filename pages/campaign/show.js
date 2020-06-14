import React,{Component} from 'react';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/contributeForm';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Grid, Card, Button } from 'semantic-ui-react';
import { Link } from '../../routes';

class CampaignShow extends React.Component {

  static async getInitialProps(props){
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address:props.query.address,
      minimumContribution:summary[0],
      balance:summary[1],
      requestLength:summary[2],
      approversCount:summary[3],
      manager:summary[4]
    };
  }

  readCards(){
    const {
      address,
      minimumContribution,
      balance,
      requestLength,
      approversCount,
      manager
    } = this.props;

    const items = [
      {
        header : manager,
        meta : '管理者地址',
        description : '当前管理者的地址，并且是受益人地址',
        style : {overflowWrap:'break-word'}
      },
      {
        header : minimumContribution,
        meta : '最小贡献量',
        description : '你想投资的众筹项目最小额度',
        style : {overflowWrap:'break-word'}
      },
      {
        header : web3.utils.fromWei(balance,'ether') + ' ether',
        meta : '众筹总金额',
        description : '当前众筹项目以募集到的总金额',
        style : {overflowWrap:'break-word'}
      },
      {
        header : requestLength,
        meta : '发起付款请求，投资人同意的总数',
        description : '受益人想支取金额，必须满足投资人同意个数大于总投资人的50%',
        style : {overflowWrap:'break-word'}
      },
      {
        header : approversCount,
        meta : '投资人总数',
        description : '已为当前众筹项目投资的总人数',
        style : {overflowWrap:'break-word'}
      }
    ];

    return <Card.Group items={items} />;
  }

  render(){



    return(
      <Layout>
        <h3>合约地址：{this.props.address}</h3>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.readCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
            <Link route={`/campaign/${this.props.address}/requests`}>
                <Button primary>查看请求</Button>
            </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Layout>
    );
  }
}

export default CampaignShow;
