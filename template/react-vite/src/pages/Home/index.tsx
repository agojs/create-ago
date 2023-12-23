import Icon from '@ant-design/icons';
import { ReactComponent as IconDraw } from '@/assets/draw.svg';

const HomePage = () => {
  return (
    <>
      首页
      <Icon component={IconDraw} style={{ fontSize: 20, color: 'red' }} />
    </>
  );
};

export default HomePage;
