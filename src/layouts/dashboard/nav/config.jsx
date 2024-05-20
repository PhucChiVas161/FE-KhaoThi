// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Student',
    items: [
      {
        title: 'Phúc khảo',
        path: '/Dashboard/Recheck',
        icon: icon('ic_document'),
      },
      {
        title: 'Hoãn Thi',
        path: '/Dashboard/Postpone',
        icon: icon('ic_postpone'),
      },
    ],
  },
  {
    title: 'Manager',
    items: [
      {
        title: 'QUẢN LÝ NGƯỜI DÙNG',
        path: '/Dashboard/UsersManagement',
        icon: icon('ic_account'),
      },
      {
        title: 'QUẢN LÝ PHÚC KHẢO',
        path: '/Dashboard/RecheckManagement',
        icon: icon('ic_document'),
      },
      {
        title: 'QUẢN LÝ HOÃN THI',
        path: '/Dashboard/PostponeManagement',
        icon: icon('ic_postpone'),
      },
      {
        title: 'QUẢN LÝ THÔNG BÁO',
        path: '/Dashboard/NotificationManagement',
        icon: icon('ic_bell'),
      },
      {
        title: 'QUẢN LÝ HỌC PHẦN',
        path: '/Dashboard/CourseManagement',
        icon: icon('ic_document'),
      },
    ],
  },
  {
    title: 'Lecturer',
    items: [
      {
        title: 'QUẢN LÝ PHÚC KHẢO',
        path: '/Dashboard/RecheckManagement',
        icon: icon('ic_document'),
      },
    ],
  },
];

export default navConfig;
