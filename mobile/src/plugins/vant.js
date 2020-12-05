// npm i vant -S
// npm i babel-plugin-import -D
import Vue from "vue";
import {
  Button,
  Popup,
  DatetimePicker,
  Tabbar,
  TabbarItem,
  Card,
  NavBar,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Swipe,
  SwipeItem,
  Stepper,
  SubmitBar,
  Checkbox,
  SwipeCell,
  Form,
  Field,
  PullRefresh,
  CountDown,
  Sticky,
  List,
  Cell,
  Tab,
  Tabs,
} from "vant";

Vue.use(Button)
  .use(Popup)
  .use(DatetimePicker)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Card)
  .use(NavBar)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(GoodsActionIcon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Stepper)
  .use(SubmitBar)
  .use(Checkbox)
  .use(SwipeCell)
  .use(Form)
  .use(Field)
  .use(PullRefresh)
  .use(CountDown)
  .use(Sticky)
  .use(List)
  .use(Cell)
  .use(Tab)
  .use(Tabs);
//适配 vant使用的是37.5
// npm install postcss-pxtorem --save-dev
// npm i -S  amfe-flexible
