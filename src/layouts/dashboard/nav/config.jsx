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
        path: '/dashboard/post',
        icon: icon('ic_news'),
      },
      {
        title: 'Phúc khảo',
        path: '/dashboard/phuckhao',
        icon: icon('ic_document'),
      },
    ],
  },
  {
    title: 'Quản lý',
    items: [
      {
        title: 'Quản lý NGƯỜI DÙNG',
        path: '/dashboard/user',
        icon: icon('ic_account'),
      },
      {
        title: 'Quản lý TIN TỨC',
        path: '/dashboard/postadm',
        icon: icon('ic_news'),
      },
      {
        title: 'Quản lý PHÚC KHẢO',
        path: '/dashboard/quanlyphuckhao',
        icon: icon('ic_document'),
      },
      {
        title: 'Quản lý THÔNG BÁO',
        path: '/dashboard/notification',
        icon: icon('ic_bell'),
      },
      {
        title: 'Quản lý HOÃN THI',
        path: '/dashboard/postponeadm',
        icon: icon('ic_bell'),
      },
    ],
  },
];

export default navConfig;
