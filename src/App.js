import React, {Component} from 'react';
// import logo from './logo.svg';
import {Layout,  Button} from "antd";
import request from "./utils/request";
import ApiUrl from "./utils/UrlConfig";
import Content from "./Component/Content";
import './App.css';
const {Header,  Footer} = Layout;


class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            messageData: [],
            loading: false
        }
    }

    //测试接口
    handleClickGetData = ()=>{
        this.setState({
            loading: true
        });
        let params = {
            "access-token": "dev",
            group_id: 3
        };
        request.get(ApiUrl.getMessages, params).then((res)=>{
            let messageData = this.filter(res.data);
            this.setState({
                messageData,
                loading: false
            });
        }).catch(err=>{
            console.log(err);
        })

    };

    //按时间归类数据
    filter(data){
        let sortData = {
            // "1": [{sender_id: 11，  articles: ["文章1","文章2"]}]
        };
        let day;
        data.forEach(item=> {
           day = this.getMinusDays(item.content.object_createdAt *1000);
           if(sortData[day])
           {
               let index = sortData[day].findIndex(list=>list.sender_id === item.sender_id)
               if(index >= 0)
               {
                   sortData[day][index].articles.push(item);
               }
                else {
                   sortData[day].push({sender_id: item.sender_id, articles: [item]});
               }
           }
           else
               sortData[day] = [{sender_id: item.sender_id, articles: [item]}]
        });

        console.log("相同作者按天分类好的数据-- sortData");
        console.log(sortData);
        return sortData;
    }

    //取文章创建时间和现在的时间差计算天数
    getMinusDays(millisecond){
        //取今天凌晨的毫秒数
        let weeMS = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
        let date = new Date();
        let currentMS = date.getTime();

        if(millisecond >= weeMS){
            return 0
        }else if(millisecond < weeMS){
            console.log(Math.ceil((weeMS - millisecond) / (1000 * 60 * 60 * 24)));
            return Math.ceil((weeMS - millisecond )/(1000 * 60 * 60 *24));
        }else{
            console.warn("数据时间错误")
        }
    }

    render(){
        return (
            <Layout className="app">
                <Header>
                    header
                    <Button  type="primary" onClick={this.handleClickGetData}>获取数据</Button>

                </Header>
                <Content if={Object.keys(this.state.messageData).length}  messageData={this.state.messageData}>
                </Content>
                <Footer>
                    footer
                </Footer>
            </Layout>
        );
    }
}

export default App;
