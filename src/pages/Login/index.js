import React, { Component } from 'react'
import { Card, Form, Input, Button, Icon, Checkbox } from "antd";
import http from '../../axios'
const FormItem = Form.Item
class FormLogin extends React.Component{
    async getLogin(userInfo){
        const res = await http.get('/v1/login',userInfo)
        sessionStorage.setItem('uid', res.data.uid)
        sessionStorage.setItem('account', res.data.account)
        window.location.href='/home'
    }
  handleSubmit = ()=>{
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err,values)=>{
        if(!err){
            this.getLogin(userInfo)
        }
    })
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="登录表单" style={{marginTop:10}}>
                    <Form style={{width:300}}>
                        <FormItem>
                            {
                                getFieldDecorator('account',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        },
                                        {
                                            min:5,max:20,
                                            message:'长度不在范围内'
                                        },
                                        // {
                                        //     pattern:new RegExp('^\\w+$','g'),
                                        //     message:'用户名必须为字母或者数字'
                                        // }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName:'checked',
                                    initialValue: false
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="/reg" style={{float:'right'}}>用户注册</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
      </div>
    )
  }
}

export default Form.create()(FormLogin);