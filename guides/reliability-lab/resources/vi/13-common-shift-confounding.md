# Biến đổi chung không nhất thiết là hiệu ứng kỹ thuật

**Tiếng Việt · Reliability Lab 13 · Bài thực hành độ tin cậy có lời giải**

Bài này dùng dữ liệu tổng hợp để giải thích một vấn đề mô hình hóa hoặc đánh giá dự đoán đơn bào và không gian. Không đọc dữ liệu cuộc thi, không tính điểm chính thức và không dự đoán kết quả của mẫu bị ẩn.

Trung vị qua các loại tách thành phần chung và phần dư theo loại. Gọi thành phần chung là kỹ thuật cần giả định thêm; đáp ứng sinh học chung cũng có thể như vậy.

## Chạy ví dụ

Tạo môi trường mới, sao chép kho mã và cài thư viện được chỉ định. Chạy lệnh từ thư mục gốc của kho. Đọc kết quả trước khi sửa mã. Lệnh và khóa JSON là định danh mã dùng chung giữa các phiên bản ngôn ngữ.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 13 --seed 7
```

## Câu hỏi

Phép tính có xác định nguyên nhân không?

## Kết quả tham chiếu: seed 7

```json
{
  "observed_type_deltas": [
    [
      -1.0,
      1.5
    ],
    [
      -1.0,
      -0.5
    ],
    [
      -1.0,
      0.5
    ]
  ],
  "common_component": [
    -1.0,
    0.5
  ],
  "residual": [
    [
      0.0,
      1.0
    ],
    [
      0.0,
      -1.0
    ],
    [
      0.0,
      0.0
    ]
  ],
  "caveat": "Common biology and batch remain confounded without additional assumptions."
}
```

## Diễn giải

Không. Nó khôi phục thành phần được dựng sẵn, nhưng cùng các số đó có thể biểu diễn đáp ứng sinh học chung.

## Thử trường hợp khác

Thêm cùng hiệu ứng sinh học cho mọi loại.

## Giới hạn

Ví dụ chỉ tách riêng một cơ chế số học. Nó không chứng minh mức quan trọng trong dữ liệu thật, không xác định quan hệ nhân quả và không thay bộ đánh giá chính thức. Hãy lưu giả định, nguồn gốc và dữ liệu ban đầu.

Bản chuyển thể có hỗ trợ máy, chưa được người bản ngữ thẩm định có xác nhận. Hoan nghênh góp ý. Tiếng Anh là bản tham chiếu về nội dung; mã và giá trị toán học được giữ nguyên.

[Source code](../../tools/experiments.py) · [Canonical English](../en/13-common-shift-confounding.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
