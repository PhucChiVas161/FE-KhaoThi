// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },

  {
    title: 'post',
    path: '/dashboard/post',
    icon: icon('ic_blog'),
  },
  {
    title: 'postadm',
    path: '/dashboard/postadm',
    icon: icon('ic_blog'),
  },
  


];

export default navConfig;
