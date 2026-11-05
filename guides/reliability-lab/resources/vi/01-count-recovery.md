# Khi biểu hiện chuẩn hóa không khôi phục được số phân tử

**Tiếng Việt · Reliability Lab 01 · Bài thực hành độ tin cậy có lời giải**

Bài này dùng dữ liệu tổng hợp để giải thích một vấn đề mô hình hóa hoặc đánh giá dự đoán đơn bào và không gian. Không đọc dữ liệu cuộc thi, không tính điểm chính thức và không dự đoán kết quả của mẫu bị ẩn.

CP10K loại bỏ tổng mỗi hàng. Nếu các số đếm dương có thừa số nguyên chung, giá trị dương nhỏ nhất chưa chắc đại diện một phân tử.

## Chạy ví dụ

Tạo môi trường mới, sao chép kho mã và cài thư viện được chỉ định. Chạy lệnh từ thư mục gốc của kho. Đọc kết quả trước khi sửa mã. Lệnh và khóa JSON là định danh mã dùng chung giữa các phiên bản ngôn ngữ.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 01 --seed 7
```

## Câu hỏi

Vì sao hàng đầu không được khôi phục đúng?

## Kết quả tham chiếu: seed 7

```json
{
  "input_counts": [
    [
      2.0,
      4.0,
      8.0
    ],
    [
      1.0,
      3.0,
      5.0
    ]
  ],
  "recovered_counts": [
    [
      1.0,
      2.0,
      4.0
    ],
    [
      1.0,
      3.0,
      5.0
    ]
  ],
  "exact_rows": 1,
  "lesson": "Normalization loses a common integer factor."
}
```

## Diễn giải

[2,4,8] và [1,2,4] có cùng tỷ lệ. Thừa số chung bị mất; [1,3,5] có quan sát một phân tử.

## Thử trường hợp khác

So sánh [3,6,12] với [1,6,12].

## Giới hạn

Ví dụ chỉ tách riêng một cơ chế số học. Nó không chứng minh mức quan trọng trong dữ liệu thật, không xác định quan hệ nhân quả và không thay bộ đánh giá chính thức. Hãy lưu giả định, nguồn gốc và dữ liệu ban đầu.

Bản chuyển thể có hỗ trợ máy, chưa được người bản ngữ thẩm định có xác nhận. Hoan nghênh góp ý. Tiếng Anh là bản tham chiếu về nội dung; mã và giá trị toán học được giữ nguyên.

[Source code](../../tools/experiments.py) · [Canonical English](../en/01-count-recovery.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
