"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright no header tabel
 * @description
 * @augments
 * @example
 *
 */

const src= {
    "gsmc": "恒生电子股份有限公司",
    "ywmc": "Hundsun Technologies Inc.",
    "zyfw": "计算机软件的技术开发、咨询、服务、成果转让；计算机系统集成；自动化控制工程设计、承包、安装；计算机及配件的销售；电子设备、通讯设备、计算机硬件及外部设备的生产、销售；自有房屋的租赁；本企业自产产品及技术的出口业务：经营本企业生产、科研所需的原辅材料、机械设备、仪器仪表、零配件及技术的进口业务（国家限定公司经营和国家禁止进出口的商品及技术除外）；经营进料加工和“三来一补”业务。经政府有关部门批准并办理工商登记手续，公司可另开设业务发展所需的投资与经营项目，扩大经营范围。",
    "gsjs": "1995年2月,恒生电子创始团队八位年轻的工程师怀揣梦想,毅然决然投身于金融IT领域。恒生电子股份有限公司(以下简称公司或本公司)系经浙江省人民政府企业上市工作领导小组浙上市〔2000〕48号文批准,由杭州恒生电子集团有限公司、中国投资担保有限公司和黄大成等15位自然人股东在原杭州恒生电子有限公司基础上整体变更设立的股份有限公司,于2000年12月13日在浙江省工商行政管理局登记注册,取得注册号为330000000027505的营业执照,公司现有注册资本61,780.518万元,股份总数61,780.518万股(每股面值1元),均系无限售条件的流通股。公司股票于2003年12月16日在上海证券交易所挂牌交易。",
};

// shaped Objects
const datas = [
    {
        "index": "01",
        "key": "gsmc",
        "name": "gsmc",
        "value": "恒生电子股份有限公司",
        "colspan": 1,
        "rowspan": 1,
        "newline": false,
    },
    {
        "index": "02",
        "key": "ywmc",
        "name": "ywmc",
        "value": "Hundsun Technologies Inc.",
        "colspan": 1,
        "rowspan": 1,
        "newline": true,
    },
    {
        "index": "03",
        "key": "zyfw",
        "name": "zyfw",
        "value": "计算机软件的技术开发、咨询、服务、成果转让；计算机系统集成；自动化控制工程设计、承包、安装；计算机及配件的销售；电子设备、通讯设备、计算机硬件及外部设备的生产、销售；自有房屋的租赁；本企业自产产品及技术的出口业务：经营本企业生产、科研所需的原辅材料、机械设备、仪器仪表、零配件及技术的进口业务（国家限定公司经营和国家禁止进出口的商品及技术除外）；经营进料加工和“三来一补”业务。经政府有关部门批准并办理工商登记手续，公司可另开设业务发展所需的投资与经营项目，扩大经营范围。",
        "colspan": 3,
        "rowspan": 1,
        "newline": true,
    },
    {
        "index": "04",
        "key": "gsjs",
        "name": "gsjs",
        "value": "1995年2月,恒生电子创始团队八位年轻的工程师怀揣梦想,毅然决然投身于金融IT领域。恒生电子股份有限公司(以下简称公司或本公司)系经浙江省人民政府企业上市工作领导小组浙上市〔2000〕48号文批准,由杭州恒生电子集团有限公司、中国投资担保有限公司和黄大成等15位自然人股东在原杭州恒生电子有限公司基础上整体变更设立的股份有限公司,于2000年12月13日在浙江省工商行政管理局登记注册,取得注册号为330000000027505的营业执照,公司现有注册资本61,780.518万元,股份总数61,780.518万股(每股面值1元),均系无限售条件的流通股。公司股票于2003年12月16日在上海证券交易所挂牌交易。",
        "colspan": 3,
        "rowspan": 1,
        "newline": true,
    },
];


// const noHeaderTable = (datas = [], obj = {}, debug = false) => {
const options = {
    datas: [],
    obj: {},
    debug: false,
};

// let  {
//     datas: [1,2,3],
//     obj: {k: 1},
//     debug: true,
// } = ...options;


const noHeaderTable = (
    {
        datas: [],
        obj: {},
        debug: false
    } = options
    ) => {
    let section = document.createDocumentFragment(`section`),/// virtual DOM / shadow DOM
        table = document.createElement(`table`),
        thead = document.createElement(`thead`),
        tbody = document.createElement(`tbody`);
    let result = ``,
        tds = "";
    for (let i = 0; i < datas.length; i++) {
        let {
            index,
            key,
            name,
            value,
            colspan,
            newline,
        } = datas[i];
        if (newline) {
            tds += `
                <td class="gildata-td" data-index="${index}" colspan="${colspan}">
                    ${value ? value : "--"}
                </td>
            `;
            tbody.insertAdjacentHTML(`beforeend`, `<tr>${tds}</tr>`);
            // reset
            tds = "";
        } else {
            tds += `
                <td class="gildata-td" data-index="${index}" colspan="${colspan}">
                    ${value ? value : "--"}
                </td>
            `;
        }
    }
    table.appendChild(tbody);
    section.append(table);
    let body = document.querySelector(`body`);
    body.appendChild(section);
    // console.log(`result =`, result);
    // return result;
};
