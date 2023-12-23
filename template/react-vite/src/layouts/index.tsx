import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

export const BasicLayout: React.FC = () => {
  return <Outlet />;
};

export default observer(BasicLayout);
