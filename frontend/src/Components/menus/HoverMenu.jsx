import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const HoverMenu = ({ items }) => (
  <Dropdown
    menu={{
      items: items.map((item) => ({
        ...item,
        label: (
          <div
            onClick={(e) => {
              e.preventDefault();
              item.onClick && item.onClick(e); 
            }}
            className="font-primary font-medium px-3"
          >
            {item.label}
          </div>
        ),
      })),
    }}
  >
    <a onClick={(e) => e.preventDefault()} >
      <Space >
        <EllipsisOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default HoverMenu;
