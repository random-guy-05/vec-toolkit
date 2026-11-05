# Mọi loại tăng nhưng trung bình chung vẫn có thể giảm

**Tiếng Việt · Reliability Lab 17 · Bài thực hành độ tin cậy có lời giải**

Bài này dùng dữ liệu tổng hợp để giải thích một vấn đề mô hình hóa hoặc đánh giá dự đoán đơn bào và không gian. Không đọc dữ liệu cuộc thi, không tính điểm chính thức và không dự đoán kết quả của mẫu bị ẩn.

Trung bình chung phụ thuộc biểu hiện theo loại và thành phần. Tăng tỷ lệ loại biểu hiện thấp có thể lấn át mức tăng bên trong từng loại.

## Chạy ví dụ

Tạo môi trường mới, sao chép kho mã và cài thư viện được chỉ định. Chạy lệnh từ thư mục gốc của kho. Đọc kết quả trước khi sửa mã. Lệnh và khóa JSON là định danh mã dùng chung giữa các phiên bản ngôn ngữ.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 17 --seed 7
```

## Câu hỏi

Vì sao trung bình giảm khi cả hai loại đều tăng?

## Kết quả tham chiếu: seed 7

```json
{
  "type_means_before": [
    1.0,
    8.0
  ],
  "type_means_after": [
    2.0,
    9.0
  ],
  "aggregate_before": 7.3,
  "aggregate_after": 2.7
}
```

## Diễn giải

Hỗn hợp chuyển sang tế bào biểu hiện thấp. Hiệu ứng thành phần vượt mức tăng trong loại.

## Thử trường hợp khác

Giữ nguyên tỷ lệ và tính lại hướng thay đổi chung.

## Giới hạn

Ví dụ chỉ tách riêng một cơ chế số học. Nó không chứng minh mức quan trọng trong dữ liệu thật, không xác định quan hệ nhân quả và không thay bộ đánh giá chính thức. Hãy lưu giả định, nguồn gốc và dữ liệu ban đầu.

Bản chuyển thể có hỗ trợ máy, chưa được người bản ngữ thẩm định có xác nhận. Hoan nghênh góp ý. Tiếng Anh là bản tham chiếu về nội dung; mã và giá trị toán học được giữ nguyên.

[Source code](../../tools/experiments.py) · [Canonical English](../en/17-composition-simpson.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
