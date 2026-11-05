# Hội thảo Task 1: Dự đoán quần thể tế bào đang thay đổi

**75 phút · 4–20 người tham gia · không cần mã hoặc dữ liệu của Challenge**

Buổi học dành cho người điều phối này phù hợp với những người đã biết các khái niệm cơ bản về tế bào đơn lẻ và mới tìm hiểu việc dự đoán biểu hiện gen theo thời gian. Buổi học dùng số lượng tế bào và giá trị đặc trưng hư cấu để phân biệt thay đổi thành phần trạng thái tế bào với thay đổi biểu hiện bên trong một trạng thái. Mục tiêu là suy luận về đại lượng cần dự đoán và bằng chứng, không phải chỉ định mô hình.

## Chuẩn bị

Mở các trang chính thức về [mô tả tác vụ](https://virtualembryo.ai/challenge/tasks), [lược đồ dữ liệu](https://virtualembryo.ai/challenge/data) và [đánh giá](https://virtualembryo.ai/challenge/evaluation). Chuẩn bị giấy hoặc chia sẻ hướng dẫn này. Các con số dưới đây đều được bịa để minh họa và không phải quan sát của VEC. Không dùng phép đo của mục tiêu bị ẩn. Trang chính thức là nguồn chuẩn và có thể thay đổi.

## Lịch trình

| Phút | Hoạt động | Câu hỏi gợi ý cho người điều phối |
|---:|---|---|
| 0–8 | Xác định điều cần dự đoán | “Ta dự đoán từng tế bào hay một quần thể trong tương lai?” |
| 8–20 | Đọc phân chia dữ liệu hiện tại | “Hiện những giai đoạn nào là huấn luyện, xác thực và kiểm tra ẩn?” |
| 20–38 | Phân biệt danh tính với phân bố | Dùng Bài tập 1. |
| 38–52 | Phân tích thay đổi pseudobulk | Dùng Bài tập 2. |
| 52–65 | Nhận diện câu hỏi của các chỉ số | Dùng Bài tập 3. |
| 65–72 | Đặt ranh giới cho kết luận | Mỗi cặp viết một kết luận có căn cứ và một kết luận chưa có căn cứ. |
| 72–75 | Kết thúc | Quay lại trang tác vụ chính thức và các câu hỏi còn bỏ ngỏ. |

## Bài tập 1 — Quần thể mới, không phải theo dõi từng tế bào

Các số đếm sau là hư cấu. Hãy tưởng tượng mẫu huấn luyện đã phát hành có 70 tế bào loại A và 30 tế bào loại B. Một mục tiêu giả định ở giai đoạn sau có 40 tế bào loại A, 30 loại B và 30 tế bào loại C mới xuất hiện. Hỏi các cặp: tế bào nào ở mục tiêu là “cùng một” tế bào với tế bào trong dữ liệu huấn luyện? Ví dụ cho thấy điều gì về dự đoán quần thể thay vì theo dấu danh tính từng tế bào?

### Đáp án

Bảng giả lập không cung cấp bằng chứng về danh tính tế bào giữa các giai đoạn, nên không thể ghép từng tế bào. Phân bố ở mục tiêu có một loại không xuất hiện trong mẫu huấn luyện hư cấu, đồng thời tỷ lệ của các loại đã có cũng thay đổi. Dự đoán quần thể theo thời gian cần tính đến những trạng thái nào xuất hiện và mức độ phổ biến của chúng; đây không phải yêu cầu đưa từng tế bào quan sát được tiến về phía trước theo thời gian. Hãy kiểm tra phân chia dữ liệu và định nghĩa mục tiêu thực tế trên trang chính thức hiện hành.

## Bài tập 2 — Thành phần có thể làm thay đổi giá trị tổng hợp

Các giá trị trung bình đặc trưng hư cấu dưới đây giữ nguyên trong từng loại tế bào nhưng tỷ lệ pha trộn thay đổi:

| Giai đoạn | Tỷ lệ loại A | Trung bình A | Tỷ lệ loại B | Trung bình B | Trung bình gộp |
|---|---:|---:|---:|---:|---:|
| sớm hơn | 80% | 2 | 20% | 12 | 4 |
| muộn hơn | 20% | 2 | 80% | 12 | 10 |

Yêu cầu các cặp tính trung bình gộp ở mỗi giai đoạn. Điều gì đã thay đổi: trung bình đặc trưng bên trong từng loại hay tỷ lệ pha trộn của quần thể? Chỉ một giá trị gộp không cho biết điều gì?

### Đáp án

Trung bình gộp ở giai đoạn sớm là `0.8 × 2 + 0.2 × 12 = 4`; ở giai đoạn muộn là `0.2 × 2 + 0.8 × 12 = 10`. Trung bình bên trong từng loại không đổi; tỷ lệ pha trộn đã đổi. Chỉ nhìn độ dịch chuyển của giá trị gộp không thể phân biệt phản ứng bên trong trạng thái tế bào với thay đổi tỷ lệ các trạng thái. Đây là ví dụ giảng dạy, không phải kết luận về gen hay giai đoạn thật.

## Bài tập 3 — Bốn câu hỏi đánh giá khác nhau

Đánh giá Task 1 chính thức tách riêng việc khôi phục gen biểu hiện khác biệt (DE), hướng thay đổi, phân bố trạng thái tế bào và đồng biến thiên giữa các gen. Yêu cầu các nhóm ghép từng lỗi giả định với câu hỏi bị ảnh hưởng trực tiếp nhất: (a) bỏ sót nhiều gen thay đổi; (b) các gen liên quan đổi theo hướng ngược lại; (c) tỷ lệ loại tế bào dự đoán sai; (d) trung bình từng gen có vẻ hợp lý nhưng quan hệ giữa các gen biến mất.

### Đáp án

(a) khôi phục gen DE; (b) hướng thay đổi; (c) phân bố trạng thái tế bào; (d) đồng biến thiên giữa các gen. Một lỗi có thể ảnh hưởng nhiều chỉ số, và các ví dụ này không xác định một mẫu điểm số chắc chắn. Kết quả tốt ở một chỉ số không chứng minh các chỉ số khác cũng tốt.

## Phiếu bài tập

1. Từ trang tác vụ chính thức hiện hành, liệt kê các giai đoạn huấn luyện đang hiển thị, mục tiêu xác thực, mục tiêu kiểm tra ẩn và đại lượng cần dự đoán.
2. Trong Bài tập 1, cần bằng chứng gì để khẳng định hai tế bào ở các giai đoạn khác nhau là cùng một tế bào? Có bằng chứng đó không?
3. Trình bày phép tính trong Bài tập 2. Giải thích vì sao trung bình gộp đổi trong khi hai trung bình bên trong từng loại vẫn giữ nguyên.
4. Ghép từng lỗi trong Bài tập 3 với câu hỏi chỉ số chính thức phù hợp nhất.
5. Viết một kết luận được các ví dụ hư cấu hỗ trợ và một kết luận sinh học mà chúng không thể hỗ trợ.

## Lời kết cho người điều phối

Không diễn giải các con số hư cấu như sinh học thật hoặc kết quả mô hình. Khuyến khích người tham gia phân biệt thành phần trạng thái tế bào, biểu hiện bên trong trạng thái, phân chia dữ liệu và bằng chứng từ scorer trong các phân tích. Đây là tài liệu giáo dục độc lập, không phải hướng dẫn chấm điểm chính thức hay công thức mô hình.
