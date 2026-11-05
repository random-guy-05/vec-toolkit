# Trị riêng gần nhau làm trục PCA không ổn định

**Tiếng Việt · Reliability Lab 09 · Bài thực hành độ tin cậy có lời giải**

Bài này dùng dữ liệu tổng hợp để giải thích một vấn đề mô hình hóa hoặc đánh giá dự đoán đơn bào và không gian. Không đọc dữ liệu cuộc thi, không tính điểm chính thức và không dự đoán kết quả của mẫu bị ẩn.

Với trị riêng lặp, từng trục không duy nhất trong không gian con. Nhiễu hiệp phương sai rất nhỏ có thể xoay trục mạnh dù ma trận gần như không đổi.

## Chạy ví dụ

Tạo môi trường mới, sao chép kho mã và cài thư viện được chỉ định. Chạy lệnh từ thư mục gốc của kho. Đọc kết quả trước khi sửa mã. Lệnh và khóa JSON là định danh mã dùng chung giữa các phiên bản ngôn ngữ.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 09 --seed 7
```

## Câu hỏi

Vì sao xuất hiện góc xoay khoảng 45 độ?

## Kết quả tham chiếu: seed 7

```json
{
  "covariance_perturbation": 1.4142135623730952e-08,
  "principal_axis_angle_degrees": 45.00000000000001,
  "eigenvalues": [
    0.1,
    1.0,
    1.0
  ]
}
```

## Diễn giải

Hai trị riêng lớn nhất bằng nhau. Nhiễu chọn một cơ sở hợp lệ khác trong cùng mặt phẳng.

## Thử trường hợp khác

Đổi một trị riêng chính thành 1.2 rồi so góc.

## Giới hạn

Ví dụ chỉ tách riêng một cơ chế số học. Nó không chứng minh mức quan trọng trong dữ liệu thật, không xác định quan hệ nhân quả và không thay bộ đánh giá chính thức. Hãy lưu giả định, nguồn gốc và dữ liệu ban đầu.

Bản chuyển thể có hỗ trợ máy, chưa được người bản ngữ thẩm định có xác nhận. Hoan nghênh góp ý. Tiếng Anh là bản tham chiếu về nội dung; mã và giá trị toán học được giữ nguyên.

[Source code](../../tools/experiments.py) · [Canonical English](../en/09-pca-eigenvalue-gap.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
