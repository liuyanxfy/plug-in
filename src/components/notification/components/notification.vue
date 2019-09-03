<template>
    <transition name="slide-fade">
        <div class="tips" v-show="visible" @mouseenter="clearTimer()" @mouseleave="startTimer()"
            :class="[horizontalClass]" :style="positionStyle">
            <div class="icon">
                <i class="icon-style iconfont  " :class="[typeClass]"></i>
            </div>
            <div class="message-href">
                <div class="tip-name">
                    <p :class="[messageType]">{{message}}</p>
                    <p class="tip-href" @click="detailsInfo()" v-if="hrefShow">{{hrefName}}</p>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import router from "../../../router/router";
const typeMap = {
    success: 'success',
    info: 'timeout',
    warning: 'warning',
    error: 'fail',
};
export default {
    name: 'Notifocations',
    data() {
        return {
            visible: false,
            duration: 4500,
            type: '',
            message: '计费方案下发成功',
            href: '',
            onClick: '',
            timer: null,
            onClose: null,
            closed: false,
            position: 'top-right',
            hrefName: '查看详情',
            verticalOffset: 0,
            router: router
        };
    },
    computed: {
        // 图标类型
        typeClass() {
            return this.type && typeMap[this.type] ? `icon-${typeMap[this.type]} ${this.type}-icon` : '';
        },
        // 提示文字颜色
        messageType() {
            return this.type && typeMap[this.type] ? `${this.type}-message` : '';
        },
        // 是否传入地址
        hrefShow() {
            if (typeof this.href === 'object') {
                return Reflect.has(this.href, 'name') || Reflect.has(this.href, 'path');
            }
            return this.href !== '';
        },
        // 水平位置
        horizontalClass() {
            return this.position.indexOf('right') > -1 ? 'right' : 'left';
        },
        // 检测位置
        verticalProperty() {
            return /^top-/.test(this.position) ? 'top' : 'bottom';
        },
        //位置
        positionStyle() {
            return {
                [this.verticalProperty]: `${this.verticalOffset}px`,
            };
        },
    },
    methods: {
        destroyElement() {
            this.$el.removeEventListener('transitionend', this.destroyElement);
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        // 如果传入路由可以点击跳转
        detailsInfo() {
            if (typeof this.href === 'object') {
                this.close();
                this.router.push(this.href);
            } else {
                this.close();
                this.router.push(this.href);
            }
        },
        close() {
            this.closed = true;
            if (typeof this.onClose === 'function') {

                this.onClose();
            }
        },
        clearTimer() {
            clearTimeout(this.timer);
        },

        startTimer() {
            if (this.duration > 0) {
                this.timer = setTimeout(() => {
                    if (!this.closed) {
                        this.close();
                    }
                }, this.duration);
            }
        },
    },
    mounted() {
        if (this.duration > 0) {
            this.timer = setTimeout(() => {
                if (!this.closed) {
                    this.close();
                }
            }, this.duration);
        }
        document.addEventListener('keydown', this.keydown);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.keydown);
    },
    watch: {
        closed(newVal) {
            if (newVal) {
                this.visible = false;
                this.$el.addEventListener('transitionend', this.destroyElement);
            }
        }
    },

};
</script>
<style lang="scss">
.tips {
    display: flex;
    width: 220px;
    height: 80px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    -ms-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    position: fixed;
    transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
        bottom 0.3s;
    overflow: hidden;
}
.icon {
    position: relative;
    display: inline-block;
    width: 70px;
    height: 100%;
    box-sizing: border-box;
    vertical-align: top;
    text-align: center;
}
.icon-style {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 40px;
    height: 40px;
}
/*成功 失败 提示样式 图标*/
.success-icon {
    color: #1da500;
    font-size: 29px !important;
}
.error-icon {
    color: #e02020;
    font-size: 31px !important;
}
.info-icon {
    color: #9ea5ae;
    font-size: 40px !important;
}
// 文字样式
.success-message {
    color: #1da500;
}
.error-message {
    color: #e02020;
}
.info-message {
    color: #9ea5ae;
}
/* 提示文字 */
.message-href {
    width: calc(100% - 70px);
    box-sizing: border-box;
    align-self: center;
    .tip-name {
        > p {
            font-size: 14px;
            line-height: 14px;
            letter-spacing: 0;
            margin: 0;
        }
        > p:nth-child(2) {
            font-size: 14px;
            line-height: 14px;
            letter-spacing: 0;
            margin-top: 10px;
            color: #9ea5ae;
            &:hover {
                cursor: pointer;
            }
        }
    }
}
.right {
    right: 20px;
}
.left {
    left: 20px;
}
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-80px);
    opacity: 0;
}
</style>