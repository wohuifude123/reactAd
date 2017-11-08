import React, { Component } from 'react';
import $ from 'jquery';
import constantData from './data/SimpleSample.json';

class Parent01 extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){ // 在初始化render后只执行一次
        //渲染完毕之后，用ajax方法去服务器 取数据
        //alert('渲染正式开始');
        $(function($) {
            var url = 'https://suggest.taobao.com/sug?code=utf-8&q=%E5%8D%AB%E8%A1%A3&callback=cb';
            $.ajax(url, {
                data: {
                    'cityname': '成都',
                    'date': '2016.12.12'
                },
                dataType: 'jsonp',
                crossDomain: true,
                success: function (data) {
                    //alert('开始获取数据');
                    console.log(data)
                }
            });
        })
    }



    Ad = () => {
        alert('cac');
        /*
        console.log("constantData  taype is ="+typeof(constantData));
        console.log("employees  taype is ="+typeof(constantData.employees));
        console.log("employees  length = "+constantData.employees.length);
        console.log("No.1 givenName ="+constantData.employees[0].giveName);
        console.log("No.1 FamilyName ="+constantData.employees[0].giveName);
        console.log("No.1 Salary"+constantData.employees[0].salary);
        console.log("type of No.1 Salary"+typeof(constantData.employees[0].salary));
        */

        /*
        var test;
        if(window.XMLHttpRequest){
            test = new XMLHttpRequest();
        }else if(window.ActiveXObject){
            test = new window.ActiveXObject();
        }else{
            alert("请升级至最新版本的浏览器");
        }
        if(test !=null){
            test.open("GET","./data/SimpleSample.json",true);
            test.send(null);
            test.onreadystatechange=function(){
                //alert('开始GET')
                if(test.readyState==4&&test.status==200){
                    var obj = JSON.parse(test.responseText);
                    alert(obj);
                }
            };

        }
        */
        for(var a in constantData){
            console.log('a===');
            console.log(a);
            console.log('constantData[a]===');
            console.log(constantData[a]);
        }
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr data-resourceuuid="201612121641078700726">
                            <td width="30%">2</td>
                            <td width="35%">3</td>
                            <td width="30%"><a href="#" onClick={this.Ad}>点击</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


export default Parent01;
