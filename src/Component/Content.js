import React, {Component} from "react";
import {Layout} from "antd";
import {Row, Col, List, Avatar , Tag} from "antd";



class Content extends Component{
    render(){
        console.log("content");
        let messageData = this.props.messageData;
        let keys = Object.keys(messageData);
        let main =  keys.map((key)=>(
            <Row  key={key}>
                <Col span={24} style={{textAlign:"left"}}>
                    <Tag color="#108ee9">{`${key}天前`}</Tag>
                    {
                        messageData[key].map(person =>
                            <List key={person.sender_id} itemLayout="horizontal"   dataSource={person.articles}
                            renderItem={item=>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.content.recipient_avatar} />}
                                        title={<><Tag color="#2db7f5">{item.content.sender_name}</Tag> <a href={item.content.object_url}>{item.content.object_title}</a></>}
                                        description={ item.content.body}
                                    />
                                </List.Item>
                            }/>
                        )
                    }
            </Col>
            </Row>));
        return (
            <Layout.Content style={{overflow: "auto"}}>
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        {
                           main || <List loading={this.props.loading} dataSource={[]}/>
                        }
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
            </Layout.Content>
        )
    }
}

export default Content;
