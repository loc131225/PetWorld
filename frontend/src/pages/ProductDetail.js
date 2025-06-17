import React, { useState } from 'react';
import './ProductDetail.css'; // Đảm bảo bạn đã đổi tên file CSS cho khớp

const ProductDetail = () => {
  const [mainImage, setMainImage] = useState(
    'https://storage.googleapis.com/a1aa/image/1d89510c-f401-4bc2-ff22-0786386c94f3.jpg'
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('420g (350 + 70g)');

  const handleThumbnailClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    // Đây là div bao ngoài cùng của component, nó là một phần tử gốc hợp lệ
    <div className="bg-white text-gray-900 font-sans px-4 sm:px-6 md:px-10 lg:px-20 py-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Product Image Section */}
        <div className="flex flex-col">
          <div className="border border-gray-200 w-[400px] h-[400px] flex items-center justify-center">
            <img
              alt="Clear plastic jar of Applod dog biscuits with pink label featuring blueberry and cheese flavor, black lid, on white background with shadow"
              className="max-w-full max-h-full object-contain"
              height="400"
              src={mainImage}
              width="400"
            />
          </div>
          <div className="flex gap-3 mt-3">
            <button
              aria-label="Select main product image"
              className={`p-1 w-16 h-20 flex items-center justify-center ${
                mainImage ===
                'https://storage.googleapis.com/a1aa/image/942d3fee-439d-4b4b-25e6-d85a5f6d67a0.jpg'
                  ? 'border border-blue-500'
                  : 'border border-gray-300'
              }`}
              onClick={() =>
                handleThumbnailClick(
                  'https://storage.googleapis.com/a1aa/image/942d3fee-439d-4b4b-25e6-d85a5f6d67a0.jpg'
                )
              }
            >
              <img
                alt="Thumbnail of Applod dog biscuits jar with pink label and black lid"
                className="max-w-full max-h-full object-contain"
                height="80"
                src="https://storage.googleapis.com/a1aa/image/942d3fee-439d-4b4b-25e6-d85a5f6d67a0.jpg"
                width="64"
              />
            </button>
            <button
              aria-label="Select second product image"
              className={`p-1 w-16 h-20 flex items-center justify-center ${
                mainImage ===
                'https://storage.googleapis.com/a1aa/image/52c2ef7f-5a32-45ad-53c0-71cf6dafe99a.jpg'
                  ? 'border border-blue-500'
                  : 'border border-gray-300'
              }`}
              onClick={() =>
                handleThumbnailClick(
                  'https://storage.googleapis.com/a1aa/image/52c2ef7f-5a32-45ad-53c0-71cf6dafe99a.jpg'
                )
              }
            >
              <img
                alt="Thumbnail of Applod dog biscuits pink box and biscuits on white background"
                className="max-w-full max-h-full object-contain"
                height="80"
                src="https://storage.googleapis.com/a1aa/image/52c2ef7f-5a32-45ad-53c0-71cf6dafe99a.jpg"
                width="64"
              />
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-lg font-semibold leading-tight">
            Bánh quy phô mai việt quất Applod cho chó
          </h2>
          <p className="text-xs mt-1">
            Danh mục:
            <a className="text-blue-500 hover:underline" href="#">
              Sản phẩm cho chó
            </a>
            ,
            <a className="text-blue-500 hover:underline" href="#">
              Thức ăn cho chó.
            </a>
          </p>
          <div className="flex items-center text-xs mt-2 space-x-1">
            <span className="font-semibold">5.0</span>
            <div className="flex text-yellow-400">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <span className="text-gray-600">|</span>
            <span>1 Đánh Giá</span>
          </div>
          <p className="mt-3 text-base">
            Giá:
            <span className="line-through text-gray-400 text-sm">
              246.000 Đ
            </span>
            <span className="text-red-500 font-semibold ml-1">
              199.000 Đ
            </span>
          </p>
          <p className="mt-3 text-base">
            Size:
            <span className="font-semibold"> {selectedSize}</span>
          </p>
          <div className="flex gap-3 mt-2">
            <button
              className={`text-xs border rounded-full px-3 py-1 ${
                selectedSize === '420g (350 + 70g)'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-gray-400 text-gray-700'
              }`}
              type="button"
              onClick={() => setSelectedSize('420g (350 + 70g)')}
            >
              420g (350 + 70g)
            </button>
            <button
              className={`text-xs border rounded-full px-3 py-1 ${
                selectedSize === '845g (650 + 195g)'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-gray-400 text-gray-700'
              }`}
              type="button"
              onClick={() => setSelectedSize('845g (650 + 195g)')}
            >
              845g (650 + 195g)
            </button>
          </div>
          <p className="text-xs text-green-500 mt-2">Còn hàng</p>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <button
              aria-label="Decrease quantity"
              className="border border-gray-300 w-8 h-8 flex items-center justify-center"
              type="button"
              onClick={() => handleQuantityChange('decrease')}
            >
              -
            </button>
            <input
              className="w-8 h-8 border border-gray-300 text-center text-sm"
              readOnly
              type="text"
              value={quantity}
            />
            <button
              aria-label="Increase quantity"
              className="border border-gray-300 w-8 h-8 flex items-center justify-center"
              type="button"
              onClick={() => handleQuantityChange('increase')}
            >
              +
            </button>
          </div>
          <div
            className="bg-pink-200 text-pink-900 text-xs rounded-md mt-4 px-3 py-2 max-w-[400px]"
            role="alert"
          >
            <strong>Giảm 10%</strong> cho đơn hàng có giá trị
            <strong> trên 500k</strong>, sử dụng Vouchers
            <strong> PETWORLD1</strong>
          </div>
          <button
            className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold rounded-full w-full max-w-[400px] py-2"
            type="button"
          >
            Thêm vào giỏ
          </button>
          <button
            aria-label="Add to wishlist"
            className="ml-3 mt-4 text-gray-700 hover:text-red-600"
            type="button"
          >
            <i className="far fa-heart text-xl"></i>
          </button>
        </div>
      </div>

      {/* Product Description Section */}
      <section className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 md:px-10 lg:px-0">
        <h2 className="font-semibold text-lg mb-3">Mô tả sản phẩm</h2>
        <p className="text-sm leading-relaxed mb-3">
          Bạn đang tìm kiếm một món ăn vặt vừa ngon miệng vừa bổ dưỡng, vượt xa
          những món thông thường? Hãy thử ngay Bánh thưởng vị Việt quất &amp; Phô
          mai cho cục cưng tối!
          <br />
          Được nung nóng bằng cả tình yêu thương bởi đội ngũ chuyên gia dinh
          dưỡng, những người quan tâm đến thú cưng của bạn không kém gì chính
          bạn, những chiếc bánh này được làm từ nguyên liệu có nguồn gốc dược
          và bền vững, đảm bảo tiêu chuẩn chất lượng và an toàn cao nhất.
          Những chiếc bánh mềm, hình rùa, nướng là của Appplod Blueberry &amp; Cheese
          Dog Biscuits được biến thành tận tấc các thành phần lành mạnh, mang
          lại món ăn nhẹ thơm ngon, đồng thời hỗ trợ sức khỏe và thể trạng cho
          chú cún bạn.
          <br />
          Việt quất trong công thức cung cấp nguồn vitamin, khoáng chất và chất
          chống oxy hóa đối đạo, hỗ trợ hệ miễn dịch và tiêu hóa. Phô mai mang
          lại hương vị thơm ngon và là nguồn cung cấp canxi cùng protein, giúp
          xương và cơ bắp chắc khỏe.
          <br />
          Dù được dùng làm phần thưởng khi huấn luyện, món ăn vặt giữa các bữa
          ăn, hay đơn giản là để thể hiện tình yêu thương, Bánh thưởng vị Việt
          quất &amp; Phô mai của Appplod chắc chắn sẽ trở thành món khoái khẩu của
          thú cưng nhà bạn.
          <br />
          Hãy thử một hộp ngay hôm nay và chiều đãi cún cưng của bạn với sự
          khác biệt đầy ngon lành!
        </p>
        <h3 className="font-semibold text-base mb-2 mt-6">
          Đặc điểm nổi bật:
        </h3>
        <ul className="list-disc list-inside text-sm leading-relaxed space-y-2">
          <li>
            Kết cấu giòn nướng lớn: Bánh mềm và được nướng trong lò, dễ nhai và
            tiêu hóa, phù hợp với bản năng thích nhai của chó.
          </li>
          <li>
            Làm từ tâm huyết: Nguyên liệu có nguồn gốc dược đạo, đảm bảo chất
            lượng và sự yên tâm cho chú nuôi.
          </li>
          <li>
            Phù hợp với chó từ 8 tuần tuổi trở lên: Hoàn toàn thích hợp cho chó
            từ 8 tuần tuổi.
          </li>
          <li>
            Phù hợp với mọi giống chó: Món bánh này phù hợp với tất cả các giống
            chó.
          </li>
          <li>
            Hỗ trợ hệ tiêu hóa: Giàu bỉ độ, cà rốt và khoai lang giúp tăng cường
            tiêu hóa.
          </li>
          <li>
            Phô mai tăng nguồn và giàu protein: Bổ sung hương vị hấp dẫn, hỗ trợ
            cơ bắp, xương và răng chắc khỏe.
          </li>
          <li>
            Việt quất bổ dưỡng: Cung cấp vitamin, khoáng chất và chất chống oxy
            hóa đối đạo.
          </li>
          <li>
            Hình dạng vui nhộn: Tăng thêm phần hào hứng và thú vị cho giờ ăn vặt.
          </li>
        </ul>
        <h3 className="font-semibold text-base mb-2 mt-6">
          Món ăn lý tưởng cho:
        </h3>
        <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
          <li>Thường cho hành vi tốt</li>
          <li>Giảm cơn đói giữa buổi</li>
          <li>Bày tỏ tình yêu thương với thú cưng của bạn</li>
        </ul>
        <hr className="border-t border-gray-300 my-8" />
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-0">
        <h3 className="text-cyan-600 font-semibold text-xl mb-6">
          Đánh giá của khách hàng
        </h3>
        <article className="flex items-start space-x-4 mb-6">
          <img
            alt="Ảnh đại diện người dùng Nguyễn Thanh Minh Lộc, nam, tóc đen, mặc áo xanh, nền ngoài trời"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            height="48"
            src="https://storage.googleapis.com/a1aa/image/03cd4649-27e1-4545-2d8d-be4073c4a0e7.jpg"
            width="48"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <p className="font-semibold text-sm">Nguyễn Thanh Minh Lộc</p>
              <time className="text-xs text-gray-500">2024-09-14 18:14</time>
            </div>
            <div className="text-yellow-400 text-xs mb-1">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed">
              Tôi hài lòng với sản phẩm này, thú cưng của tôi rất thích, tôi
              chắc chắn sẽ quay lại ủng hộ shop
            </p>
          </div>
        </article>
        <article className="flex items-start space-x-4">
          <img
            alt="Ảnh đại diện người dùng Nguyễn Văn Mười, nam, tóc đen, mặc áo tối màu, nền ngoài trời"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            height="48"
            src="https://storage.googleapis.com/a1aa/image/7eaf8f2b-9a85-4fef-4be8-b00c7c47b7c0.jpg"
            width="48"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1">Nguyễn Văn Mười</p>
            <div className="text-gray-400 text-xs mb-2">
              Đánh giá:
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </div>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 text-xs resize-y min-h-[72px] focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Chia sẻ cảm nhận của bạn..."
            ></textarea>
            <button
              className="mt-2 bg-green-600 text-white text-xs font-semibold px-4 py-1 rounded hover:bg-green-700 transition-colors"
              type="button"
            >
              Gửi đánh giá
            </button>
          </div>
        </article>
      </section>

      {/* Recommended Products Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-0 pt-8">
        <hr className="border-t border-gray-300" />
        <h2
          className="text-center text-[#3BA4B0] font-semibold text-lg mt-6 mb-8"
          style={{ fontWeight: 600 }}
        >
          Có thể bạn cũng thích
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white shadow-lg p-4 rounded-md flex flex-col items-center">
            <div
              className="bg-[#B9F0FF] text-[#3BA4B0] text-xs font-semibold rounded-xl px-4 py-2 mb-3 max-w-[220px] text-left w-full"
              style={{ fontWeight: 600, lineHeight: 1.2 }}
            >
              <div>
                Giảm <span className="font-bold">10%</span> cho đơn hàng từ 500k
              </div>
              <div>
                Sử dụng voucher - <span className="font-bold">PetWorld2</span>
              </div>
            </div>
            <img
              alt="Cat food package with a box of Whiskas cat food and a pack of cat food with a cat image on it"
              className="mb-3 w-[220px] h-[165px] object-contain"
              src="https://storage.googleapis.com/a1aa/image/38c0f0af-7d51-413c-23e5-4021513c16dc.jpg"
            />
            <p className="text-xs text-black mb-1 text-left w-full">
              Thức ăn cho mèo, Hạt cá Hồi
            </p>
            <div className="flex space-x-2 text-xs w-full mb-1">
              <p className="text-gray-400 line-through" style={{ minWidth: 60 }}>
                200.000Đ
              </p>
              <p className="text-black font-semibold" style={{ minWidth: 60 }}>
                150.000Đ
              </p>
            </div>
            <div className="flex items-center space-x-3 w-full">
              <button
                className="bg-[#3BA4B0] text-white text-xs rounded-full px-6 py-1 hover:bg-[#2a8a95] transition-colors flex-1 text-center"
                style={{ fontWeight: 600 }}
              >
                Thêm vào giỏ
              </button>
              <button
                aria-label="Add to favorites"
                className="text-gray-500 hover:text-[#3BA4B0] transition-colors"
              >
                <i className="far fa-heart text-lg"></i>
              </button>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white shadow-lg p-4 rounded-md flex flex-col items-center">
            <div
              className="bg-[#B9F0FF] text-[#3BA4B0] text-xs font-semibold rounded-xl px-4 py-2 mb-3 max-w-[220px] text-left w-full"
              style={{ fontWeight: 600, lineHeight: 1.2 }}
            >
              <div>
                Giảm <span className="font-bold">10%</span> cho đơn hàng từ 500k
              </div>
              <div>
                Sử dụng voucher - <span className="font-bold">PetWorld2</span>
              </div>
            </div>
            <img
              alt="Cat food package with a box of Whiskas cat food and a pack of cat food with a cat image on it"
              className="mb-3 w-[220px] h-[165px] object-contain"
              src="https://storage.googleapis.com/a1aa/image/38c0f0af-7d51-413c-23e5-4021513c16dc.jpg"
            />
            <p className="text-xs text-black mb-1 text-left w-full">
              Thức ăn cho mèo, Hạt cá Hồi
            </p>
            <div className="flex space-x-2 text-xs w-full mb-1">
              <p className="text-gray-400 line-through" style={{ minWidth: 60 }}>
                200.000Đ
              </p>
              <p className="text-black font-semibold" style={{ minWidth: 60 }}>
                150.000Đ
              </p>
            </div>
            <div className="flex items-center space-x-3 w-full">
              <button
                className="bg-[#3BA4B0] text-white text-xs rounded-full px-6 py-1 hover:bg-[#2a8a95] transition-colors flex-1 text-center"
                style={{ fontWeight: 600 }}
              >
                Thêm vào giỏ
              </button>
              <button
                aria-label="Add to favorites"
                className="text-gray-500 hover:text-[#3BA4B0] transition-colors"
              >
                <i className="far fa-heart text-lg"></i>
              </button>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white shadow-lg p-4 rounded-md flex flex-col items-center">
            <div
              className="bg-[#B9F0FF] text-[#3BA4B0] text-xs font-semibold rounded-xl px-4 py-2 mb-3 max-w-[220px] text-left w-full"
              style={{ fontWeight: 600, lineHeight: 1.2 }}
            >
              <div>
                Giảm <span className="font-bold">10%</span> cho đơn hàng từ 500k
              </div>
              <div>
                Sử dụng voucher - <span className="font-bold">PetWorld2</span>
              </div>
            </div>
            <img
              alt="Cat food package with a box of Whiskas cat food and a pack of cat food with a cat image on it"
              className="mb-3 w-[220px] h-[165px] object-contain"
              src="https://storage.googleapis.com/a1aa/image/38c0f0af-7d51-413c-23e5-4021513c16dc.jpg"
            />
            <p className="text-xs text-black mb-1 text-left w-full">
              Thức ăn cho mèo, Hạt cá Hồi
            </p>
            <div className="flex space-x-2 text-xs w-full mb-1">
              <p className="text-gray-400 line-through" style={{ minWidth: 60 }}>
                200.000Đ
              </p>
              <p className="text-black font-semibold" style={{ minWidth: 60 }}>
                150.000Đ
              </p>
            </div>
            <div className="flex items-center space-x-3 w-full">
              <button
                className="bg-[#3BA4B0] text-white text-xs rounded-full px-6 py-1 hover:bg-[#2a8a95] transition-colors flex-1 text-center"
                style={{ fontWeight: 600 }}
              >
                Thêm vào giỏ
              </button>
              <button
                aria-label="Add to favorites"
                className="text-gray-500 hover:text-[#3BA4B0] transition-colors"
              >
                <i className="far fa-heart text-lg"></i>
              </button>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-white shadow-lg p-4 rounded-md flex flex-col items-center">
            <div
              className="bg-[#B9F0FF] text-[#3BA4B0] text-xs font-semibold rounded-xl px-4 py-2 mb-3 max-w-[220px] text-left w-full"
              style={{ fontWeight: 600, lineHeight: 1.2 }}
            >
              <div>
                Giảm <span className="font-bold">10%</span> cho đơn hàng từ 500k
              </div>
              <div>
                Sử dụng voucher - <span className="font-bold">PetWorld2</span>
              </div>
            </div>
            <img
              alt="Cat food package with a box of Whiskas cat food and a pack of cat food with a cat image on it"
              className="mb-3 w-[220px] h-[165px] object-contain"
              src="https://storage.googleapis.com/a1aa/image/38c0f0af-7d51-413c-23e5-4021513c16dc.jpg"
            />
            <p className="text-xs text-black mb-1 text-left w-full">
              Thức ăn cho mèo, Hạt cá Hồi
            </p>
            <div className="flex space-x-2 text-xs w-full mb-1">
              <p className="text-gray-400 line-through" style={{ minWidth: 60 }}>
                200.000Đ
              </p>
              <p className="text-black font-semibold" style={{ minWidth: 60 }}>
                150.000Đ
              </p>
            </div>
            <div className="flex items-center space-x-3 w-full">
              <button
                className="bg-[#3BA4B0] text-white text-xs rounded-full px-6 py-1 hover:bg-[#2a8a95] transition-colors flex-1 text-center"
                style={{ fontWeight: 600 }}
              >
                Thêm vào giỏ
              </button>
              <button
                aria-label="Add to favorites"
                className="text-gray-500 hover:text-[#3BA4B0] transition-colors"
              >
                <i className="far fa-heart text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#0F3B9D] mt-12 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-white text-xs">
          <div>
            <h3
              className="text-[#3BA4B0] font-semibold mb-3"
              style={{ fontWeight: 600 }}
            >
              Theo dõi chúng tôi
            </h3>
            <div className="flex space-x-3">
              <a
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center"
                href="#"
              >
                <i className="fab fa-facebook-f text-white text-sm"></i>
              </a>
              <a
                aria-label="YouTube"
                className="w-7 h-7 rounded-full bg-[#FF0000] flex items-center justify-center"
                href="#"
              >
                <i className="fab fa-youtube text-white text-sm"></i>
              </a>
              <a
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center"
                href="#"
              >
                <i className="fab fa-instagram text-white text-sm"></i>
              </a>
            </div>
          </div>
          <div>
            <h3
              className="text-[#3BA4B0] font-semibold mb-3"
              style={{ fontWeight: 600 }}
            >
              Mua sắm ngay
            </h3>
            <ul className="space-y-1">
              <li>Chó</li>
              <li>Mèo</li>
              <li>Quần áo thú cưng</li>
            </ul>
          </div>
          <div>
            <h3
              className="text-[#3BA4B0] font-semibold mb-3"
              style={{ fontWeight: 600 }}
            >
              Chính sách
            </h3>
            <ul className="space-y-1">
              <li>Chính sách bảo mật</li>
              <li>Chính sách vận chuyển</li>
              <li>Chính sách đổi trả</li>
              <li>Hướng dẫn mua hàng</li>
              <li>Hướng dẫn thanh toán</li>
            </ul>
          </div>
          <div>
            <h3
              className="text-[#3BA4B0] font-semibold mb-3"
              style={{ fontWeight: 600 }}
            >
              Về chúng tôi
            </h3>
            <ul className="space-y-1">
              <li>Giới thiệu</li>
              <li>Tin tức</li>
              <li>Liên hệ</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;