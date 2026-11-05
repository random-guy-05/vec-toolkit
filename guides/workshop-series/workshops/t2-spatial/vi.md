# Hội thảo Task 2: Suy luận về không gian và thời gian

**75 phút · 4–20 người tham gia · không cần mã hoặc dữ liệu của Challenge**

Buổi học dành cho người điều phối này phù hợp với người đã biết khái niệm cơ bản về tế bào đơn lẻ nhưng mới tìm hiểu dự đoán không gian–thời gian 3D. Buổi học dùng một phép so sánh mô hình hư cấu. Mục tiêu là suy luận về yêu cầu của tác vụ và bằng chứng, không phải dạy một công thức mô hình chưa được kiểm chứng.

## Chuẩn bị

Mở các trang chính thức về [mô tả tác vụ](https://virtualembryo.ai/challenge/tasks), [lược đồ dữ liệu](https://virtualembryo.ai/challenge/data) và [đánh giá](https://virtualembryo.ai/challenge/evaluation). Chuẩn bị giấy hoặc chia sẻ hướng dẫn này. Yêu cầu người tham gia không dùng mục tiêu ẩn hoặc chia sẻ kết quả mô hình riêng tư. Kiểm tra lại các trang chính thức trước buổi học; chúng là nguồn có thẩm quyền.

## Lịch trình

| Phút | Hoạt động | Câu hỏi gợi ý cho người điều phối |
|---:|---|---|
| 0–8 | Xác định câu hỏi | “Một dự đoán phải chứa chính xác những gì?” |
| 8–20 | Lập bản đồ phân chia dữ liệu | “Đây là nội suy hay ngoại suy? Những giai đoạn nào thực sự được thấy?” |
| 20–38 | Xử lý tình huống | Dùng Bài tập 1 dưới đây. |
| 38–52 | Diễn giải điểm số | Dùng Bài tập 2 dưới đây. |
| 52–65 | Kiểm tra tọa độ | Dùng Bài tập 3 dưới đây. |
| 65–72 | Đặt ranh giới cho kết luận | Mỗi cặp viết một kết luận có căn cứ và một kết luận chưa có căn cứ. |
| 72–75 | Kết thúc | Chỉ tới các trang chính thức hiện hành và mời nêu câu hỏi còn bỏ ngỏ. |

## Bài tập 1 — Một tác vụ, các thiết lập khác nhau

Nhóm hư cấu “Small Atlas” cho rằng mọi bảng Task 2 đều yêu cầu dự đoán vượt quá giai đoạn huấn luyện mới nhất. Yêu cầu các cặp xem bảng phân chia chính thức và sửa giả định đó. Họ cần nhận ra giai đoạn kiểm tra bị giữ lại của thiết lập toàn phôi là nội suy, rồi so sánh với các câu hỏi nội suy và ngoại suy của thiết lập tim. Hỏi điểm chung và khác nhau: cả hai đều dự đoán biểu hiện và tọa độ 3D, nhưng thiết lập và phân chia giai đoạn cũng rất quan trọng.

### Đáp án

Task 2 có hai thiết lập. Kiểm tra ở thiết lập toàn phôi là nội suy: giai đoạn bị giữ lại nằm giữa các giai đoạn đã phát hành. Trong thiết lập tim, một câu hỏi xác thực là nội suy, còn các giai đoạn muộn hơn kiểm tra ngoại suy vượt ngoài phạm vi huấn luyện đã phát hành. Hãy kiểm tra tên giai đoạn và ID bảng chính xác trên các trang chính thức hiện hành thay vì dựa vào trí nhớ.

## Bài tập 2 — Bốn câu hỏi có trọng số ngang nhau

Mô hình A hư cấu dự đoán khá đúng thay đổi biểu hiện nhưng tạo ra một đám mây tế bào đồng nhất. Mô hình B có hình dạng và các lân cận cục bộ hợp lý nhưng dự đoán thay đổi biểu hiện yếu. Chưa mô hình nào được chấm điểm chính thức. Hỏi từng cặp: cần bằng chứng gì để phân biệt hiệu quả phân tử, tế bào, mô và tổ chức cục bộ? Phân chia giả lập dữ liệu cục bộ có thể cho biết điều gì, và không thể xác lập điều gì về bảng ẩn?

### Đáp án

Điểm Task 2 chính thức phân đều: mỗi phần tư dành cho thay đổi biểu hiện, phân bố trạng thái tế bào, hình dạng/quy mô tăng trưởng của mô và tổ chức không gian cục bộ. Kết quả tốt ở một thành phần không chứng minh các thành phần khác cũng tốt. So sánh cục bộ chỉ mô tả dữ liệu, cách chia và scorer được chọn; đó không phải kết quả trên tập kiểm tra ẩn.

## Bài tập 3 — Kiểm tra hệ tọa độ

Hai giai đoạn hư cấu đều có đám mây điểm 3D. Một thành viên ghép các tế bào có cùng giá trị số `(x,y,z)` ở hai giai đoạn rồi gọi đó là cùng một tế bào. Hỏi: cần bằng chứng gì để biện minh cho khẳng định về danh tính này?

### Đáp án

Chỉ riêng các giá trị tọa độ không cung cấp bằng chứng đó. Trang dữ liệu chính thức nêu rõ tọa độ nằm trong hệ quy chiếu cục bộ của từng phôi và không được đăng ký chung giữa các thời điểm. Không suy ra sự tương ứng của tế bào giữa các giai đoạn hay một hệ quy chiếu chung chỉ từ những con số trùng nhau. Hãy đọc lược đồ chính thức trước khi đưa giả định đăng ký vào phân tích.

## Phiếu bài tập

1. Với bảng đã chọn, liệt kê các giai đoạn huấn luyện đang hiển thị, câu hỏi bị giữ lại và các kênh cần dự đoán. Dẫn trang chính thức hiện hành.
2. Với một điểm số được báo cáo, ghi lại cách chia dữ liệu, phiên bản scorer và nó đo chiều nào trong bốn chiều T2.
3. Cần bằng chứng bổ sung nào trước khi khẳng định tọa độ giữa các giai đoạn chỉ cùng một vị trí hoặc tế bào sinh học?
4. Viết một kết luận hẹp có bằng chứng hỗ trợ và một kết luận rộng hơn mà bằng chứng không hỗ trợ.

## Lời kết cho người điều phối

Không trình bày phép so sánh hư cấu như kết quả thật hoặc khuyến nghị mô hình chiến thắng. Khuyến khích người tham gia kiểm tra hợp đồng của bảng, giới hạn của công cụ cộng đồng và ghi lại cách chia dữ liệu cùng giả định của chính họ. Đây là tài liệu giáo dục độc lập, không phải hướng dẫn chấm điểm chính thức.
