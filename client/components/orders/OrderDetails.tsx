import React from 'react';
import Table from 'rc-table';
import {
  // DeliveryInfo,
  // DeliveryAddress,
  // Address,
  // CostCalculation,
  // PriceRow,
  // Price,
  // ProgressWrapper,
  OrderTableWrapper,
  OrderTable,
} from './OrderDetails.style';

type OrderDetailsProps = {
  tableData?: any;
  columns?: any;
  progressData?: any;
  progressStatus?: any;
  address?: string;
  subtotal?: number;
  discount?: number;
  deliveryFee?: number;
  grandTotal?: number;
};

const components = {
  table: OrderTable,
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ tableData, columns }) => {
  console.log('columns::', columns);
  console.log('data:::', tableData);
  return (
    <>
      <OrderTableWrapper>
        <Table
          showHeader={false}
          columns={columns}
          data={tableData}
          rowKey={(record) => record.id}
          components={components}
          className="orderDetailsTable"
          // scroll={{ y: 350 }}
        />
      </OrderTableWrapper>
    </>
  );
};

export default OrderDetails;
