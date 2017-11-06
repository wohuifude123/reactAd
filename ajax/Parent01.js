import React, { Component } from 'react';
import $ from 'jquery';
import constantData from './data/SimpleSample.json';

class Parent01 extends Component {
    constructor(props) {
        super(props)

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
                if(test.readyState==4&&test.status==200){
                    var obj = JSON.parse(test.responseText);
                    alert(obj);
                }
            };

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
