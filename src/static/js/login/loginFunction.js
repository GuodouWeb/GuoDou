import {ElMessage} from "element-plus";
import {account, register} from "@/static/js/login/loginData";
import {user, register as reg} from "@/services/user"

/*
获取本地缓存数据
 */
function getLocalStorageAccount() {
    let account = window.localStorage.getItem("account");
    if (!account) {
      return;
    }
    account = account.split(",");
    const loadAll = [];
    for (let i = 0; i < account.length; i++) {
      loadAll.push({ id: i, value: account[i] });
    }
    return loadAll;
}
/**
 * 输入框自动补全
 * @param queryString
 * @param cb
 */
function querySearch(queryString, cb) {
    if (queryString && queryString.length > 0) {
        try {
            var list = getLocalStorageAccount();
            if (!list) {
                list = [];
                list.push({
                    id: "-1",
                    value: "无匹配结果",
                });
                // 调用 callback 返回建议列表的数据
                cb(list);
            } else {
                let showitem = [];
                for (var i = 0; i < list.length; i++) {
                    if (list[i].value.indexOf(queryString) > -1) {
                        showitem.push({
                            value: `${list[i].value}`,
                            id: `${list[i].id}`,
                        });
                    }
                }
                if (showitem.length > 0) {
                    // 调用 callback 返回建议列表的数据
                    cb(showitem);
                } else {
                    list = list.map((item) => {
                        return {
                            value: `${item.value}`,
                            id: `${item.id}`,
                        };
                    });
                    // 调用 callback 返回建议列表的数据
                    cb(list);
                }
            }
        } catch (error) {
            ElMessage({
                showClose: true,
                message: error,
                type: "error",
            });
        }
    }
}

function setLocalStorageAccount(res, router, username) {
    if (!window.localStorage.getItem("account")) {
        window.localStorage.setItem("account", username);
    } else {
        console.log(username)
        let value = window.localStorage.getItem("account").split(",");
        if (value.indexOf(username) < 0) {
            value.push(username);
        }
        window.localStorage.setItem("userInfo", JSON.stringify(res.data))
        window.localStorage.setItem("account", value.toString());
    }
    router.push( "project" )
}

/**
 * 登录
 */
function login_btn(router) {
    if (account.username === "" || account.password === "") {
        ElMessage({
            showClose: true,
            message: "账号或者密码不能为空",
            type: "warning",
        });
        return;
    }
    user({
        username: account.username,
        password: account.password,
    }).then((res) => {
        if (res.data.code === 200) {
            setLocalStorageAccount(res, router, account.username)
        } else {
            ElMessage({
                showClose: true,
                message: res.data.msg,
                type: "warning",
            });
        }
    })
    .catch((err) => {
        ElMessage({
            showClose: true,
            message: err,
            type: "error",
        });
    });
}

/**
 * 注册
 */
function register_btn(router) {
    for (let item in register) {
        if (item === "") {
            ElMessage({
                showClose: true,
                message: "注册信息应全部填写",
                type: "warning",
            });
            return;
        }
    }
    if(register.password!==register.againPassword){
        ElMessage({
            showClose: true,
            message: "密码不一致请重新填写",
            type: "warning",
        });
        return;
    }
    if(register.password === register.username){
        ElMessage({
            showClose: true,
            message: "账号与密码不应当一致",
            type: "warning",
        });
        return;
    }
    reg({
        name: register.name,
        username: register.username,
        password: register.password,})
        .then((res) => {
            if (res.data.code === 200) {
                setLocalStorageAccount(res, router, register.username)
            } else {
                ElMessage({
                    showClose: true,
                    message: res.data.msg,
                    type: "warning",
                });
            }
        })
        .catch((err) => {
            ElMessage({
                showClose: true,
                message: err,
                type: "error",
            });
        });
}

export {
    getLocalStorageAccount,
    querySearch,
    login_btn,
    register_btn
}
