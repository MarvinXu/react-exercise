const departments = [
  {
    id: 1,
    label: '工程研发部门'
  },
  {
    id: 2,
    label: '产品设计部门'
  }
]

const positions = [
  {
    label: 'Mac 开发工程师',
    count: 9,
    departmentId: 1
  },
  {
    label: 'IOS App 测试工程师',
    count: 17,
    departmentId: 1
  },
  {
    label: 'Android 远程控制工程师',
    count: 61,
    departmentId: 1
  },
  {
    label: 'Web 前端工程师',
    count: 31,
    departmentId: 1
  },
  {
    label: 'Android 多媒体软件开发工程师',
    count: 2,
    departmentId: 1
  },
  {
    label: '网页设计师',
    count: 47,
    departmentId: 2
  },
  {
    label: 'ID / 工业设计师',
    count: 39,
    departmentId: 2
  },
  {
    label: '视觉设计师 / GUI 界面设计师',
    count: 42,
    departmentId: 2
  },
  {
    label: '平面设计师',
    count: 8,
    departmentId: 2
  }
].map((item, index) => Object.assign(item, {id: index + 1}))

const res = departments.map(dep => Object.assign(dep, {
  children: positions.filter(pos => pos.departmentId === dep.id)
}))
export default res