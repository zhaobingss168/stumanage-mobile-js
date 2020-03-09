<template>
    <div>
        <box gap="10px 10px">
            <group gutter="0px">
                <x-input class="x-input" title="真实姓名" v-model="stuName" auto-complete="off" placeholder="请输入真实姓名"
                         type="text"></x-input>
                <x-input class="x-input" title="手机号码" v-model="stuPhone" auto-complete="off" is-type="china-mobile"
                         placeholder="请输入手机号码"></x-input>
                <x-input class="x-input" title="在读学校" v-model="readingSchool" auto-complete="off" placeholder="请输入在读学校"
                         type="text"></x-input>
                <x-input class="x-input" title="在读专业" v-model="readingMajor" auto-complete="off" placeholder="请输入在读专业"
                         type="text"></x-input>
                <x-input class="x-input" title="报名学校" v-model="applySchool" auto-complete="off" placeholder="请输入报名学校"
                         type="text"></x-input>
                <x-input class="x-input" title="报名专业" v-model="applyMajor" auto-complete="off" placeholder="请输入报名专业"
                         type="text"></x-input>
                <br>
                <x-button type="primary" action-type="button" @click.native="sub()">提交</x-button>
            </group>
        </box>
        <alert v-model="showAlert" :title="'提示'"> {{message}}</alert>
        <toast v-model="showMsg" :time="1000">{{messageMsg}}</toast>
    </div>
</template>

<script>
    import {XInput, Group, XButton, Box} from 'vux'
    import API from "../../api/api_ww";
    export default {
        name: "WriteApplyInfo",
        components: {
            XButton,
            Group,
            XInput,
            Box,
        },
        data() {
            return {
                stuName: '',// 姓名
                stuPhone: '',// 电话
                readingSchool: '',// 在读学校
                readingMajor: '',// 在读专业
                applySchool: '',// 报名学校
                applyMajor: '',// 报名专业

                showAlert: false,
                showMsg: false,
                message: '',
                messageMsg: '',
            }
        },
        methods: {
            // 验证提交
            sub() {
                if (this.stuName.trim() == "") {
                    this.message = "请填写真实姓名！"
                    this.showAlert = true
                    return
                }
                if (this.stuPhone.trim() == "") {
                    this.message = "请填写手机号码！"
                    this.showAlert = true
                    return
                }
                if (this.applySchool.trim() == "") {
                    this.message = "请填写报名学校！"
                    this.showAlert = true
                    return
                }
                if (this.applyMajor.trim() == "") {
                    this.message = "请填写报名专业！"
                    this.showAlert = true
                    return
                }
                const reqData = {
                    'stuName' : this.stuName,
                    'stuPhone' : this.stuPhone,
                    'readingSchool' : this.readingSchool,
                    'readingMajor' : this.readingMajor,
                    'applySchool' : this.applySchool,
                    'applyMajor' : this.applyMajor
                }
                API.saveApply(reqData).then(res => {
                    if(res.code == '0'){
                        this.message = "报名成功！"
                        this.showAlert = true
                        this.resetTemp()
                    }else{
                        this.message = "报名失败！"
                        this.showAlert = true
                    }
                })
            },
            resetTemp() {
               this.stuName = ''
               this.stuPhone = ''
               this.readingSchool = ''
               this.readingMajor = ''
               this.applySchool = ''
               this.applyMajor = ''
            },
        }
    }
</script>

<style scoped>

</style>
