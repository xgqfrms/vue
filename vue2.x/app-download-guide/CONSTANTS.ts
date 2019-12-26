// 抽离常量集合 CONSTANTs

const tabs = [
  {
    title: "已发布",
    key: "published",
  },
  {
    title: "已失效",
    key: "deleted",
  },
];

const channelClomuns = [
  {
    label: "投放 ID",
    prop: "putId",
    align: "center",
    width: 100,
    // fixed: false,
    slot: true,
  },
  {
    label: "投放链接",
    prop: "putLink",
    align: "center",
    width: 300,
    slot: true,
  },
  {
    label: "主标题",
    prop: "title",
    align: "center",
    width: 200,
    slot: true,
  },
  {
    label: "副标题",
    prop: "subtitle",
    align: "center",
    width: 300,
    slot: true,
  },
  {
    label: "投放时间",
    prop: "putTime",// array
    align: "center",
    width: 400,
    slot: true,
  },
];

const operations = {
  label: "操作",
  prop: "operations",
  align: "center",
  // width: 300,
  width: "auto",
  // fixed: false,
  slot: true,
};

const APP_DOWNLOAD_GUIDE = {
  tabs,
  channelClomuns,
  operations,
};

export default APP_DOWNLOAD_GUIDE;

export {
  APP_DOWNLOAD_GUIDE,
};
