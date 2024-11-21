import React, { useState, useMemo } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoodsModal from './GoodsModal'; // Make sure this import is correct
import { GoodsItem } from '../types'; // Update with the correct path to `types.ts`
import './GoodsTable.css';

const GoodsTable: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goods = useSelector((state: any) => state.goods.items); // Replace `any` with appropriate type if available
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<GoodsItem | null>(null);
  const [newItem, setNewItem] = useState<GoodsItem>({
    id: 0,
    name: '',
    price: 0,
    category: 'Văn phòng phẩm',
  });

  const filteredGoods = useMemo(
    () =>
      goods.filter((item: GoodsItem) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [goods, searchTerm]
  );

  const handleAddItem = () => {
    dispatch({
      type: 'ADD_GOODS',
      payload: {
        ...newItem,
        id: goods.length + 1,
      },
    });
    setNewItem({ id: 0, name: '', price: 0, category: 'Văn phòng phẩm' });
    setShowModal(false);
  };

  const handleEditItem = (item: GoodsItem) => {
    setCurrentItem(item);
    setNewItem(item);
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    if (currentItem) {
      dispatch({
        type: 'EDIT_GOODS',
        payload: { ...currentItem, ...newItem },
      });
    }
    setShowModal(false);
    setCurrentItem(null);
  };

  const handleDeleteItem = (id: number) => {
    dispatch({ type: 'DELETE_GOODS', payload: id });
  };

  const handleNavigateToDetails = (id: number) => {
    navigate(`/goods/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2>Bảng Thông Tin</h2>
      <Button className="button-primary mb-3" onClick={() => setShowModal(true)}>
        Thêm Hàng Hóa
      </Button>
      <Form.Control
        type="text"
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box mb-3"
      />
      <Table className="table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredGoods.length > 0 ? (
            filteredGoods.map((item: GoodsItem) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <Button className="button-edit" onClick={() => handleEditItem(item)}>
                    Chỉnh sửa
                  </Button>
                  <Button className="button-delete" onClick={() => handleDeleteItem(item.id)}>
                    Xóa
                  </Button>
                  <Button className="button-info" onClick={() => handleNavigateToDetails(item.id)}>
                    Chi tiết
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Không có hàng hóa</td>
            </tr>
          )}
        </tbody>
      </Table>

      <GoodsModal
        show={showModal}
        currentItem={currentItem}
        newItem={newItem}
        setNewItem={setNewItem}
        handleClose={() => setShowModal(false)}
        handleSave={currentItem ? handleSaveEdit : handleAddItem}
      />
    </div>
  );
};

export default GoodsTable;
