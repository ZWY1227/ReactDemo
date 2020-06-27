const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/admin/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '商品',
    key: '/admin/shop',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '品类管理',
        key: '/admin/shop/one',
        icon: 'bars'
      },
      {
        title: '商品管理',
        key: '/admin/shop/two',
        icon: 'tool'
      },
    ]
  },

  {
    title: '用户管理',
    key: '/admin/user',
    icon: 'user'
  },
  {
    title: '角色管理',
    key: '/admin/role',
    icon: 'safety',
  },

  {
    title: '图形图表',
    key: '/admin/pic',
    icon: 'area-chart',
    children: [
      {
        title: '柱形图',
        key: '/admin/pic/zhu',
        icon: 'bar-chart'
      },
      {
        title: '折线图',
        key: '/admin/pic/zhe',
        icon: 'line-chart'
      },
      {
        title: '饼图',
        key: '/admin/pic/bing',
        icon: 'pie-chart'
      },
    ]
  },

  {
    title: '订单管理',
    key: '/admin/order',
    icon: 'windows',
  },
]

export default menuList