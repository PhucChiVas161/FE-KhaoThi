// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: icon('ic_analytics'),
  // },
  {
    title: 'Sinh viên',
    items: [
      {
        title: 'Tin tức',
        path: '/dashboard/post',
        icon: icon('ic_blog'),
      },
    ],
  },
  {
    title: 'Quản lý',
    items: [
      {
        title: 'Quản lý người dùng',
        path: '/dashboard/user',
        icon: icon('ic_user'),
      },
      {
        title: 'Quản lý tin tức',
        path: '/dashboard/postadm',
        icon: icon('ic_blog'),
      },
    ],
  },
];

export default navConfig;
