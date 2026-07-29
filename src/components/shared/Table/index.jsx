import React from "react";
import { Table } from "antd";

const CustomTable = ({
  columns,
  data,
  loading,
  rowKey,
  className
}) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      loading={loading}
      rowKey={rowKey}
      className={className}
    />
  );
};

export default CustomTable;
