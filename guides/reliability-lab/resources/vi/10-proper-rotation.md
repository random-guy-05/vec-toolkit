# Căn chỉnh bằng phép quay cần ràng buộc định thức

**Tiếng Việt · Reliability Lab 10 · Bài thực hành độ tin cậy có lời giải**

Bài này dùng dữ liệu tổng hợp để giải thích một vấn đề mô hình hóa hoặc đánh giá dự đoán đơn bào và không gian. Không đọc dữ liệu cuộc thi, không tính điểm chính thức và không dự đoán kết quả của mẫu bị ẩn.

Khớp trực giao tự do có thể dùng phản xạ. Phép quay thực sự có định thức +1 và giữ định hướng; ràng buộc này thay đổi tập nghiệm.

## Chạy ví dụ

Tạo môi trường mới, sao chép kho mã và cài thư viện được chỉ định. Chạy lệnh từ thư mục gốc của kho. Đọc kết quả trước khi sửa mã. Lệnh và khóa JSON là định danh mã dùng chung giữa các phiên bản ngôn ngữ.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 10 --seed 7
```

## Câu hỏi

Vì sao phép khớp hoàn hảo có định thức -1?

## Kết quả tham chiếu: seed 7

```json
{
  "unconstrained_determinant": -1.0000000000000007,
  "proper_determinant": 1.0000000000000016,
  "unconstrained_error": 6.891658975852732e-15,
  "proper_error": 15.367278961474724
}
```

## Diễn giải

Đích là ảnh phản xạ qua một trục. Phản xạ khớp chính xác; phép quay định thức +1 để lại sai số.

## Thử trường hợp khác

Tạo đích bằng phép quay đúng đã biết và so sai số.

## Giới hạn

Ví dụ chỉ tách riêng một cơ chế số học. Nó không chứng minh mức quan trọng trong dữ liệu thật, không xác định quan hệ nhân quả và không thay bộ đánh giá chính thức. Hãy lưu giả định, nguồn gốc và dữ liệu ban đầu.

Bản chuyển thể có hỗ trợ máy, chưa được người bản ngữ thẩm định có xác nhận. Hoan nghênh góp ý. Tiếng Anh là bản tham chiếu về nội dung; mã và giá trị toán học được giữ nguyên.

[Source code](../../tools/experiments.py) · [Canonical English](../en/10-proper-rotation.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
