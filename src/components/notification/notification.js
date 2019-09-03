/**
 * 提示弹窗
 * 三种状态 success error info
 *
 * 使用方式
 * this.$esNotify.success({
 *    message: '', // 提示弹框提示文字内容
 *    href: '',     //路由地址，需要跳转地址
 *    position: '', //提示位置 支持两个top-right 右上角 top-left 左上角
 *    hrefName: '查看详情',  //支持更改查看详情提示文字
 * })
 *
 */

import Vue from 'vue';
import Main from './components/notification.vue';


// 创建组件提示框
const NotificationConstructor = Vue.extend(Main);

// 添加组件标识
let seed = 1;
// 定义所有显示的提示框容器
const instances = [];
// 定义创建的组件对象
let instance;

const isVNode = function (options) {
    return options !== null && typeof options === 'object' && Object.prototype.hasOwnProperty.call(options, 'componentOptions');
};

const notification = function (opt) {
    // 判断是否运行在服务器端
    if (Vue.prototype.$isServer) {
        return;
    }
    const options = opt || {};
    // 定义用户关闭时方法
    const userOnClose = options.onClose;
    // 定义该组件标识
    const id = `notification_${seed++}`;
    // 显示位置
    const position = options.position || 'top-right';

    // 定义关闭方法
    options.onClose = function () {
        console.log(id, userOnClose);
        notification.close(id, userOnClose);
    };
    // 创建组件
    instance = new NotificationConstructor({
        data: options,
    });

    // 是否具有componentOptions 属性
    if (isVNode(options)) {
        instance.$slots.default = [options.message];
        options.message = '';
    }

    // 设置id
    instance.id = id;
    // 挂载组件
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.visible = true;
    instance.dom = instance.$el;
    instance.dom.style.zIndex = 9999;

    let verticalOffset = options.offset || 0;
    instances.filter((item) => item.position === position).forEach((item) => {
        verticalOffset += item.$el.offsetHeight + 16;
    });

    verticalOffset += 16;
    instance.verticalOffset = verticalOffset;
    instances.push(instance);
    return instance;
};

// 根据状态创建
// 'warning',暂时不需要 后期可添加
['success', 'info', 'error'].forEach((type) => {
    notification[type] = (opt) => {
        let options = opt;
        if (typeof options === 'string' || isVNode(options)) {
            options = {
                message: options,
            };
        }
        options.type = type;
        return notification(options);
    };
});


// 关闭提示框实现
notification.close = function (id, userOnClose) {
    let index = -1;
    const len = instances.length;

    // 查找用户点击的提示框位置
    const instanceDom = instances.filter((instan, i) => {
        if (instan.id === id) {
            index = i;
            return true;
        }
        return false;
    })[0];

    // 提示框是否还存在存在
    if (!instanceDom) {
        return;
    }

    if (typeof userOnClose === 'function') {
        userOnClose(instanceDom);
    }
    // 删除存在的弹窗
    instances.splice(index, 1);

    // 删除提示框后调整框位置，除第一位框
    if (len <= 1) {
        return;
    }

    // 调整其余框的位置
    const {position} = instanceDom;
    const removedHeight = instanceDom.dom.offsetHeight;
    for (let i = index; i < len - 1; i++) {
        if (instances[i].position === position) {
            instances[i].dom.style[instanceDom.verticalProperty] = `${parseInt(instances[i].dom.style[instanceDom.verticalProperty], 10) - removedHeight - 16}px`;
        }
    }
};

notification.closeAll = function () {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
};

export default notification;
