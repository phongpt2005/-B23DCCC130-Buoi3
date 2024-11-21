import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

interface GoodsItem {
  id: number;
  name: string;
  price: number;
}

interface RootState {
  goods: {
    items: GoodsItem[];
  };
}

type GoodsDetailsParams = {
  id: string;
};

export const GoodsDetails: React.FC = () => {
  const { id } = useParams<GoodsDetailsParams>();
  const navigate = useNavigate();
  const goods = useSelector((state: RootState) => state.goods.items);
  const item = goods.find((item) => item.id === parseInt(id ?? '0'));

  if (!item) {
    return <div>Hàng hóa không tồn tại</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Chi Tiết Hàng Hóa</h2>
      <p><strong>Tên:</strong> {item.name}</p>
      <p><strong>Giá:</strong> {item.price}</p>
      <Button variant="secondary" onClick={() => navigate('/')}>Quay lại</Button>
    </div>
  );
};