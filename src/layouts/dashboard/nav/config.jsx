// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Sinh viên',
    items: [
      {
        title: 'Tin tức',
        path: '/Dashboard/Post',
        icon: icon('ic_news'),
      },
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
    title: 'Quản lý',
    items: [
      {
        title: 'Quản lý NGƯỜI DÙNG',
        path: '/Dashboard/UsersManagement',
        icon: icon('ic_account'),
      },
      {
        title: 'Quản lý PHÚC KHẢO',
        path: '/Dashboard/RecheckManagement',
        icon: icon('ic_document'),
      },
      {
        title: 'Quản lý HOÃN THI',
        path: '/Dashboard/PostponeManagement',
        icon: icon('ic_postpone'),
      },
      {
        title: 'Quản lý TIN TỨC',
        path: '/Dashboard/PostManagement',
        icon: icon('ic_news'),
      },
      {
        title: 'Quản lý THÔNG BÁO',
        path: '/Dashboard/NotificationManagement',
        icon: icon('ic_bell'),
      },
    ],
  },
];

export default navConfig;
