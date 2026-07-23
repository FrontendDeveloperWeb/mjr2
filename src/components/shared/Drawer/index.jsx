import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const CustomDrawer = ({ onClose, open, children, title, size }) => {

    return (
        <>

            <Drawer
                title={title}
                size={size}
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={open}
            >
                {children}
            </Drawer>
        </>
    );
};
export default CustomDrawer;