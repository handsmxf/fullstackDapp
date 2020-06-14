import React,{Component} from 'react';
import factory from '../ethereum/factory';
import { Card, Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {

  //react生命周期函数，获取初始化的属性
  static async getInitialProps(){
    const campaign = await factory.methods.getDeployedCampaign().call();
    return {campaign};
  }

  // async componentDidMount(){
  //   const compaign = await factory.methods.getDeployedCampaign().call();
  //   console.log(compaign);
  // }

  readerHtml(){
    const items = this.props.campaign.map(address=>{
      return{
        header : address,
        description : <Link route={'/campaign/'+ address}><a>查看链接</a></Link> ,
        fluid : true
      }
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>众筹列表</h3>
          <Link route='/campaign/new'>
            <Button content='创建众筹' floated='right' icon='add' labelPosition='right' primary />
          </Link>
          {this.readerHtml()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
