# Hội thảo Task 3: Dự đoán phản ứng với perturbation

**75 phút · 4–20 người tham gia · không cần mã hoặc dữ liệu của Challenge**

Buổi học giúp người tham gia suy luận về tác vụ dự đoán knockout có điều kiện. Mục tiêu chính là phân biệt ảnh hưởng của perturbation với nền kiểu hoang dại (wild type). Buổi học không đề xuất cơ chế sinh học hay công thức mô hình.

## Chuẩn bị

Mở các trang chính thức về [mô tả tác vụ](https://virtualembryo.ai/challenge/tasks), [lược đồ dữ liệu](https://virtualembryo.ai/challenge/data) và [quy tắc hiện hành](https://virtualembryo.ai/challenge/rules). Chuẩn bị giấy hoặc chia sẻ hướng dẫn này. Bài tập dùng số liệu bịa để minh họa và tên đặc trưng chung. Không dùng phép đo của mục tiêu bị ẩn. Trang chính thức là nguồn chuẩn và có thể thay đổi.

## Lịch trình

| Phút | Hoạt động | Câu hỏi gợi ý cho người điều phối |
|---:|---|---|
| 0–8 | Xác định điều cần dự đoán | “Challenge yêu cầu mô hình thay đổi điều gì?” |
| 8–20 | Lập bản đồ điều kiện và phân chia dữ liệu | “Knockout nào là huấn luyện, xác thực hay kiểm tra ẩn?” |
| 20–38 | So sánh với kiểu hoang dại | Dùng Bài tập 1. |
| 38–52 | Đọc các chỉ số phản ứng | Dùng Bài tập 2. |
| 52–65 | Sàng lọc nguồn dữ liệu bên ngoài | Dùng Bài tập 3. |
| 65–72 | Nêu độ bất định | Viết một kết luận về phản ứng và một giới hạn của nó. |
| 72–75 | Kết thúc | Xem lại các trang chính thức hiện hành và câu hỏi còn bỏ ngỏ. |

## Bài tập 1 — Nền so với phản ứng

Các giá trị sau là số liệu đồ chơi hư cấu đã chuẩn hóa cho một đặc trưng chung. Đây không phải quan sát thực tế của VEC.

| Điều kiện | Giá trị hư cấu |
|---|---:|
| kiểu hoang dại tương ứng | 10.0 |
| perturbation, Mô hình A | 10.1 |
| perturbation, Mô hình B | 7.0 |

Hỏi các cặp mô hình nào tái tạo nền kiểu hoang dại và mô hình nào dự đoán thay đổi lớn hơn. Sau đó hỏi tại sao chỉ so sánh mức biểu hiện tuyệt đối có thể ưu ái mô hình chỉ sao chép kiểu hoang dại.

### Đáp án

Mô hình A gần giá trị kiểu hoang dại, nên thay đổi mà nó dự đoán gần bằng không. Mô hình B dự đoán mức giảm lớn hơn. Ví dụ đồ chơi này không cho biết hướng nào đúng về mặt sinh học; phản ứng perturbation quan sát được mới quyết định điều đó. Challenge đánh giá phản ứng tương đối so với kiểu hoang dại, nên chỉ khớp nền chung là chưa đủ.

## Bài tập 2 — Bốn câu hỏi về phản ứng

Các chỉ số T3 chính thức bao gồm khôi phục gen phản ứng, hướng phản ứng, độ lớn phản ứng và phân bố trạng thái tế bào. Yêu cầu mỗi cặp ghép lỗi hư cấu với chỉ số: (a) gen đúng thay đổi theo hướng sai; (b) hướng đúng nhưng hiệu ứng quá nhỏ; (c) thay đổi lớn xảy ra ở gen không đúng; (d) tỷ lệ quần thể bị sụp đổ.

### Đáp án

(a) hướng phản ứng; (b) độ lớn phản ứng; (c) khôi phục gen phản ứng; (d) phân bố trạng thái tế bào. Các chỉ số là những loại bằng chứng riêng biệt. Giá trị tốt ở một chỉ số không chứng minh các kết quả khác cũng tốt.

## Bài tập 3 — Sàng lọc dữ liệu bên ngoài

Một đồng nghiệp đề xuất bộ dữ liệu công khai về knockout của gen liên quan ở giai đoạn tương tự. Yêu cầu các nhóm liệt kê điều cần kiểm tra trước khi dùng: chính xác gen/alel và kiểu gen, giai đoạn, nguồn và bản phát hành, giấy phép, mức độ liên quan với tác vụ, quy tắc hiện hành về mục tiêu bị giữ lại và yêu cầu công bố. Sự thật nào chưa rõ thì cần dừng việc sử dụng?

### Đáp án

Nhóm nên tạm dừng cho tới khi nguồn, perturbation và giai đoạn cụ thể được đối chiếu với quy tắc hiện hành. Một alen liên quan hoặc kiểu hình giống nhau vẫn có thể thuộc điều kiện kiểm tra ẩn được bảo vệ; URL công khai không chứng minh dữ liệu đủ điều kiện. Hãy tuân thủ ranh giới nêu rõ trong quy tắc và hỏi ban tổ chức trước nếu điểm tương đồng còn mơ hồ.

## Phiếu bài tập

1. Từ trang tác vụ chính thức, nêu ví dụ perturbation Task 3 đã phát hành cho huấn luyện, mục tiêu xác thực và mục tiêu kiểm tra ẩn hiện tại.
2. Với đặc trưng hư cấu, tính `perturbation − kiểu hoang dại tương ứng` cho mỗi mô hình. Hiệu số cho thấy điều gì mà các giá trị tuyệt đối che khuất?
3. Ghép mỗi lỗi trong Bài tập 2 với chỉ số phản ứng phù hợp.
4. Liệt kê bằng chứng cần có trước khi xem một bộ dữ liệu perturbation bên ngoài là đủ điều kiện và có thể công bố.
5. Viết một kết luận về kết quả được ví dụ đồ chơi hỗ trợ và một kết luận sinh học mà ví dụ không hỗ trợ.

## Lời kết cho người điều phối

Không suy luận về sinh học thật từ ví dụ hư cấu. Yêu cầu người tham gia nêu rõ độ tương phản perturbation, đối chứng tương ứng, kiểu gen, giai đoạn và nguồn gốc dữ liệu trong phân tích. Đây là tài liệu giáo dục độc lập, không phải hướng dẫn đánh giá chính thức.
