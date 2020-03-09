import * as API from '.';

export default {
    // 保存报名信息
    saveApply: params => {
        return API.POST('/appApplyInfoManage/save', params);
    },
};
