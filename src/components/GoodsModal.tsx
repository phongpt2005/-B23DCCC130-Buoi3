import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { GoodsItem } from '../types'; // Update with the correct path to `types.ts`

interface GoodsModalProps {
  show: boolean;
  currentItem: GoodsItem | null;
  newItem: GoodsItem;
  setNewItem: React.Dispatch<React.SetStateAction<GoodsItem>>;
  handleClose: () => void;
  handleSave: () => void;
}

const GoodsModal: React.FC<GoodsModalProps> = ({
  show,
  currentItem,
  newItem,
  setNewItem,
  handleClose,
  handleSave,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setNewItem({ ...newItem, category, expiryDate: category === 'Văn phòng phẩm' ? '' : undefined });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currentItem ? 'Chỉnh sửa Hàng Hóa' : 'Thêm Hàng Hóa'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tên hàng hóa</Form.Label>
            <Form.Control
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giá hàng hóa</Form.Label>
            <Form.Control
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Danh mục hàng hóa</Form.Label>
            <Form.Select value={newItem.category} onChange={handleCategoryChange}>
              <option value="Văn phòng phẩm">Văn phòng phẩm</option>
              <option value="Thực phẩm">Thực phẩm</option>
              <option value="Khác">Khác</option>
            </Form.Select>
          </Form.Group>
          {newItem.category === 'Văn phòng phẩm' && (
            <Form.Group className="mb-3">
              <Form.Label>Hạn sử dụng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập hạn sử dụng"
                value={newItem.expiryDate || ''}
                onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button-secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button className="button-success" onClick={handleSave}>
          {currentItem ? 'Lưu' : 'Thêm hàng hóa'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GoodsModal;
