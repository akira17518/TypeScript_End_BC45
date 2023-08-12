import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/HeaderHomePage/Header';
import Footer from '../../components/Footer/Footer';
import {ScheduleOutlined} from '@ant-design/icons'
type Props = {};

const HomeTemplate = (props: Props) => {
  const location = useLocation();
  const excludeFooterFromPages = ['/admin', '/register']; 

  const shouldExcludeFooter = excludeFooterFromPages.includes(location.pathname);

  return (
    <>
      <Header logo ={<ScheduleOutlined style={{fontSize:60}}/>} />
      <div className='content' style={{ minHeight: '75vh' }}>
        <Outlet />
      </div>
    
      {!shouldExcludeFooter && <Footer />}
    </>
  );
};

export default HomeTemplate;
