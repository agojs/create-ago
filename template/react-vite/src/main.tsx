import React from 'react';
import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { observer } from 'mobx-react-lite';
import { ConfigProvider } from 'antd';
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';
import { BrowserRouter } from 'react-router-dom';
import Route from '@/routes';
import zhCN from 'antd/locale/zh_CN';
import { AntdThemeToken } from '@/styles/antdThemeToken';

const MainApp: React.FC = observer(() => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={{ token: AntdThemeToken }} locale={zhCN}>
        <StyleProvider
          hashPriority="high"
          transformers={[legacyLogicalPropertiesTransformer]}
        >
          <Suspense>
            <Route />
          </Suspense>
        </StyleProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MainApp />,
);
