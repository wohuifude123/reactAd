/**
   .
 */
/**
 *  作者：Abbott.liu
 *  日期：2017/11/02
 *  作用：全局配置文件
 *  描述：在应用过程中不要进行修改
 */
var ENV = (function() {

    var frontEndSLogin = '/public/slogin.html';
    var frontEndDomain = 'http://liujian.cloudwise.com:8083';

    return {
        DOMAIN: APP.bpmDomain,
        FrontDomain: frontEndDomain,
        frontSLogin: frontEndSLogin,

        AuthType:0,     //0-系统自带用户名+密码认证方式  1-sso认证.
        baseLogin:'/baselogin',
        loginType:'itm',   //如果是勤智itm系统,则传入itm参数,否则,传入产品的cwop参数.
        openAuthWithQinzhi:true,    //是否开启勤智集成认证

        SSOLogin: APP.ssoDomain + '/login?service=' + frontEndDomain + frontEndSLogin, //本地开发环境
        APIPrefix: "api/v1/platform/", //大屏访问的api接口地址版本.

        // 设置本地存储类型
        localStoreType: 'localStorage',

        /**
         * localStore key的枚举
         */
        storeKey: {
            userInfo: '_user_info_', //用户信息存储key
            userRbac: '_user_rbac_', //用户权限存储的key
            userToken: 'token', //jwt token
            userIsLogin: 'isLogin', //是否登录标志
            roles: 'roles', //系统角色列表
            rootDeptId: 'rootDeptId', //系统角色列表
            expire: 30 * 24 * 60 * 60 * 1000, //普通存储的保存时间.
            sharedTokenExpired: 'sharedExpired'
        },

        fetchTimeOut: 5000,
        /**
         * message 消息提醒相关配置
         */
        message: {
            alertExp: 3, //消息提醒过期时间
            usersetExp: 1, //个人设置提示框过期时间 add by harryguan
        },
        /**
         * token 刷新配置
         */
        token: {
            interval: 1000, //毫秒
            expire: 4 * 60 * 1000, //毫秒
        },
        /**
         * 分页参数
         */
        pageSize: 1000,
        /**
         * 大屏参数设置
         */
        screen: {
            scrollTime: 5, //定时滚动监测点列表的时间
            queryDataTime: 300, //请求新监测点数据的时间
            model: [{
                id: 1,
                title: '网络健康大屏',
                className: 'network-health-template', //模板组件名称
                component: 'NetworkHealth',
                route: 'network',
            }, {
                id: 2,
                title: '私有云监控大屏',
                className: 'monitor-screen-template', //模板组件名称
                component: 'MonitorScreen',
                route: 'monitor',
                useSkyBackground: true,
                levelToLabel: [{
                    key: 'level1',
                    name: '优秀',
                    color: '#0ccf55'
                }, {
                    key: 'level2',
                    name: '良好',
                    color: '#0cc3cf'
                }, {
                    key: 'level3',
                    name: '一般',
                    color: '#f6a822'
                }, {
                    key: 'level4',
                    name: '影响',
                    color: '#fc3333'
                }, {
                    key: 'level5',
                    name: '其他',
                    color: '#909090'
                }, ]
            }, {
                id: 3,
                title: '天机大屏',
                className: 'tianji-template', //模板组件名称
                component: 'Tianji',
                route: 'business',
                remoteUrl: frontEndDomain + '/bigScreen/index.html', //天机请求地址
                remoteAppId: 1, //天机应用id
            }, {
                id: 4,
                title: '空白大屏',
                className: 'tianji-template', //模板组件名称
                component: 'Tianji',
                route: 'business',
                remoteUrl: frontEndDomain + '/bigScreen/index.html', //天机请求地址
                remoteAppId: 1, //天机应用id
            }, {
                id: 50,
                title: '报告',
                className: 'tianji-template', //模板组件名称
                component: 'Report',
                route: 'report'
            }],
            modelImagePath: '/public/app/img', //模板图片的存放路径地址
            rootPath: '/operation',
            flushInteval: 2 * 60 * 1000, //大屏任务列表刷新时间
            flushMonitorInterval: 3000, //大屏监测点翻页间隔
            defaultMapType: 'china', //默认地图类型
            mapTypes: [ //地图类型枚举
                {
                    id: 0,
                    name: 'china'
                }, {
                    id: 1,
                    name: 'world'
                }
            ],
            shareUrl: window.location.origin + '/#/share/', //大屏分享地址
            shareRootPath: '/share',
            monitorScreenSwitchInterval: 330 * 1000, //私有云监控大屏的自动轮播时间.
            monitorScreenFlushInterval: 5000, //私有云监控大屏任务及其虚拟机table数据刷新间隔.
        },
        /**
         * 报告参数设置
         */
        report: {
            remoteUrl: frontEndDomain + '/report/index.html', //天机请求地址
            remoteAppId: 1, //天机应用id
            shareUrl: window.location.origin + '/#/share/', //大屏分享地址
        },
        exceptmodules: ['share', 'slogin', 'login', 'baselogin'], //权限校验例外模块.
        extraRoutes: ['dataplatform'], //例外路由地址,在此内的地址不走路由
        staticLink: {
            jiankongbao: APP.jiankongbaoLogin,
            toushibao: APP.toushibaoLogin,
        },
        accountException: '您的帐号存在异常,请联系系统管理人员!'
    }
})();
