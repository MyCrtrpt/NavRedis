// import Vue from 'vue'
// import Vuex from 'vuex'
// import { mapActions } from 'vuex'
// import { mapGetters } from 'vuex'

const Vue = require("vue/dist/vue.js");
const Vuex = require("vuex");
const _ = require("lodash");
const VueRouter = require("vue-router");
const App = require('electron').remote.app;
const shell = require('electron').shell;
const {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Loading,
    MessageBox,
    Message,
    Notification
} = require("element-ui");



const {
    mapActions,
    mapGetters
} = require("vuex");

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

const store = new Vuex.Store({
    state: {
        cur_session: {},
        config: {
            mode: "local"
        },
        driver: [{
            id: 1,
            name: "redis",
        }],
        session: [],
    },
    getters: {
        driver: state => {
            return state.driver;
        },
        session: state => {
            return state.session;
        },
        cur_session: state => {
            return state.cur_session;
        }
    },
    mutations: {
        save_new_session(s, payload) {
            if (payload.id === null) {
                payload.id = s.session.length + 1;
            } else {

            }
            s.session.push(payload);
            s.cur_session = payload;
        },
        set_cur_session(s, session) {
            s.cur_session = session;

        },
        init_state() {

        },
        //更新当前状态
        save_state() {

        },
    },
    actions: {
        save_new_session(ctx, payload) {
            ctx.commit("save_new_session", _.cloneDeep(payload))
        },
        set_cur_session(ctx, payload) {
            ctx.commit("set_cur_session", payload)
        },
        init_state(ctx) {
            console.log(">>> init state <<<")
            ctx.commit("init_state")
        }
    }
})


var app = new Vue({
    el: '#app',
    store,
    data: {
        new_session: {
            id: null,
            name: "127.0.0.1",
            type: "redis",
            info: {
                host: "127.0.0.1",
                port: "6379",
                user: "root",
                password: ""
            }
        },
        dialogVisible: false
    },
    created: function () {
        this.init_state();
    },

    computed: {
        ...mapGetters([
            'driver',
            'session',
            'cur_session'
        ])
    },
    methods: {
        ...mapActions([
            'save_new_session',
            "set_cur_session",
            "init_state"
        ]),
        //创建
        sidebar() {

        },
        //退出app
        exit() {
            App.quit();
        },
        create_new_session(driver) {

            this.dialogVisible = true
        },
        handleClose() {
            this.dialogVisible = false
        },
        handleSave() {
            this.save_new_session(this.new_session);
            this.dialogVisible = false
        },
        handleClickSession(session) {
            this.set_cur_session(session);
            console.log(this.cur_session)
        },
        handleClickDashboard() {
            this.set_cur_session({});
        },

    }
})