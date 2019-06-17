# vue-app-code-snippets


```js

<template>
    <section v-if="isShow">
        <div class="guide-item-box" data-uid="guide-item-box" v-for="(item, index) in items" :key="index">
            <span class="guide-item-icon" :data-key="item.itemKey"></span>
            <span class="guide-item-text">{{item.itemText}}</span>
        </div>
    </section>
</template>

<script>
    "use strict";
    /**
     *
     * @author xgqfrms
     * @license MIT
     * @copyright xgqfrms
     *
     * @description 模块-开探 itemsList
     * @augments
     * @example const listObj = {items: [{"itemKey": "", "itemText": ""}]};
     * @example <ItemsList :listObj="listObj"/>
     * @link
     * @created 2019-06-17
     *
     */
    export default {
        props: [
            "listObj",
            "isShow",
        ],
        name: "ItemsList",
        data() {
            return {
                items: [],
                // showList: false,
            };
        },
        methods: {
            init() {
                try {
                    if (this.listObj) {
                        let {
                            items,
                        } = this.listObj;
                        // this.showList = this.isShow || false;
                        this.items = items || [];
                    } else {
                        // this.showList = false;
                        throw new Error(`ItemsList 的 listObj 属性不可为空!`);
                    }
                } catch (err) {
                    console.error(`temsList 使用错误: \n`, err);
                }
            },
        },
        mounted() {
            // props
        },
        created() {
            this.init();
        },
    };
</script>

<style scoped lang="css">

.guide-item-box{
    width: calc(5.0rem + 0.36rem);
    height: 0.40rem;
    line-height:0.40rem;
    font-size: 0.28rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(111,124,140,1);
    text-align: left;
    vertical-align: middle;
}

.guide-item-icon{
    content: "";
    width: 0.36rem;
    height: 0.36rem;
    background: url("../../images/guide/check-circle.svg") no-repeat;
    display: inline-block;
    line-height:0.40rem;
    vertical-align: middle;
    cursor: pointer;

}

.guide-item-selected{
    content: "";
    width: 0.36rem;
    height: 0.36rem;
    background: url("../../images/guide/checked-circle.svg") no-repeat;
    display: inline-block;
    line-height:0.40rem;
    vertical-align: middle;
    cursor: pointer;
}

.guide-item-text{
    width: calc(4.0rem);
    height: 0.40rem;
    line-height:0.40rem;
    font-size: 0.28rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(111,124,140,1);
    text-align: left;
    text-overflow: ellipsis;
}
</style>


``
