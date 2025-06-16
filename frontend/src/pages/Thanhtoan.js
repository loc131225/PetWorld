import React from "react";
import {
  Form,
  Input,
  Radio,
  Row,
  Col,
  Typography,
  Button,
  Card,
  Image,
  Divider,
  message,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ThanhToan = () => {
  const [form] = Form.useForm();

  const handleAddToCart = async () => {
    try {
      await form.validateFields();
      // Nếu không có lỗi:
      message.success("Thêm vào giỏ hàng thành công!");
    } catch (errorInfo) {
      // Nếu có lỗi:
      message.error(
        "Vui lòng điền đầy đủ thông tin trước khi thêm vào giỏ hàng."
      );
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Thông tin người đặt hàng
      </Title>
      <Card>
        <Form layout="vertical" form={form} style={{ width: "100%" }}>
          <Row gutter={24}>
            {/* Form bên trái */}
            <Col span={14}>
              <div style={{ padding: "20px" }}>
                <Form.Item
                  label="Họ và tên"
                  name="fullname"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên" },
                  ]}
                  style={{ marginTop: "15px" }}
                >
                  <Input
                    placeholder="Nguyễn Văn A"
                    style={{ marginLeft: "0", width: "100%" }}
                  />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Số điện thoại"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại",
                        },
                        {
                          pattern: /^0\d{9}$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                      ]}
                      style={{ marginTop: "15px" }}
                    >
                      <Input
                        placeholder="Nhập số điện thoại"
                        style={{ marginLeft: "0" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Ghi chú (nếu có)"
                      name="note"
                      style={{ marginTop: "15px" }}
                    >
                      <Input
                        placeholder="Giao hàng từ 12h-17h"
                        style={{ marginLeft: "0", width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Địa chỉ nhận hàng"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ nhận hàng",
                    },
                  ]}
                  style={{ marginTop: "15px" }}
                >
                  <Input
                    placeholder="Nhập địa chỉ nhận hàng"
                    style={{ marginLeft: "0", width: "100%" }}
                  />
                </Form.Item>

                <Form.Item
                  label="Phương thức thanh toán"
                  name="payment"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn phương thức thanh toán",
                    },
                  ]}
                  style={{ marginTop: "40px" }}
                >
                  <Radio.Group>
                    <Radio value="cod">Thanh toán khi nhận hàng</Radio>
                    <br />
                    <Radio value="bank">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span>Thanh toán qua ngân hàng</span>
                        <img
                          src="https://cdn.brandfetch.io/id_T-oXJkN/w/800/h/800/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
                          alt="ZaloPay"
                          style={{ height: 18, marginLeft: 8 }}
                        />
                      </div>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </Col>

            {/* Thông tin đơn hàng bên phải */}
            <Col span={10}>
              <Card bordered={false}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Image
                      src="https://petcoglobal.com/wp-content/uploads/2024/08/Xi%CC%A3t-cho%CC%82%CC%81ng-ve-ra%CC%A3%CC%82n-Sa%CC%89n-pha%CC%82%CC%89m.jpg.webp"
                      alt="Sản phẩm"
                    />
                  </Col>
                  <Col span={16}>
                    <Text strong>Xịt Phòng Chống Côn Trùng Ve Rận</Text>
                    <div>Số lượng: 1</div>
                    <div>Size: X</div>
                  </Col>
                </Row>

                <Form.Item style={{ marginTop: 16 }}>
                  <Input.Group compact>
                    <Input
                      style={{
                        width: "50%",
                        marginTop: "20px",
                        marginRight: "5px",
                        
                        height: "32.5px",
                      }}
                      placeholder="Nhập mã khuyến mãi"
                    />
                    <Button style={{marginTop:"20px"}} type="primary">Áp dụng</Button>
                  </Input.Group>
                </Form.Item>
                <Divider />
                <Row justify="space-between">
                  <Text strong>Tổng cộng:</Text>
                  <Text strong style={{ color: "#1890ff", fontSize: "16px" }}>
                    150.000 VND
                  </Text>
                </Row>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 16,
                  }}
                >
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    style={{ width: "90%" }}
                    onClick={handleAddToCart}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>

                <div
                  style={{
                    marginTop: 16,
                    fontSize: "12px",
                    color: "#888",
                    textAlign: "right",
                  }}
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    strokeWidth="3"
                    stroke="#888"
                    fill="none"
                    style={{ float: "right", marginLeft: 8 }}
                  >
                    <path d="M21.68,42.22H37.17a1.68,1.68,0,0,0,1.68-1.68L44.7,19.12A1.68,1.68,0,0,0,43,17.44H17.61a1.69,1.69,0,0,0-1.69,1.68l-5,21.42a1.68,1.68,0,0,0,1.68,1.68h2.18" />
                    <path d="M41.66,42.22H38.19l5-17.29h8.22a.85.85,0,0,1,.65.3l3.58,6.3a.81.81,0,0,1,.2.53L52.51,42.22h-3.6" />
                    <ellipse cx="18.31" cy="43.31" rx="3.71" ry="3.76" />
                    <ellipse cx="45.35" cy="43.31" rx="3.71" ry="3.76" />
                    <line
                      x1="23.25"
                      y1="22.36"
                      x2="6.87"
                      y2="22.36"
                      strokeLinecap="round"
                    />
                    <line
                      x1="20.02"
                      y1="27.6"
                      x2="8.45"
                      y2="27.6"
                      strokeLinecap="round"
                    />
                    <line
                      x1="21.19"
                      y1="33.5"
                      x2="3.21"
                      y2="33.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p>Miễn phí vận chuyển</p>
                  <p>Tối đa 30K cho đơn hàng từ 500K</p>
                  <p>Áp dụng cho đơn nội thành HCM</p>
                </div>
              </Card>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default ThanhToan;
