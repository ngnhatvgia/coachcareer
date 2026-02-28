import { LucideIcon } from "lucide-react";

export interface Question {
  id: number;
  text: string;
  group: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
}

export const HOLLAND_QUESTIONS: Question[] = [
  // R - Realistic (5 questions)
  { id: 1, text: "Bạn thích sửa chữa các thiết bị, máy móc hoặc làm việc với các công cụ?", group: 'R' },
  { id: 2, text: "Bạn thích các hoạt động vận động, làm việc ngoài trời hơn là ngồi văn phòng?", group: 'R' },
  { id: 13, text: "Bạn thích lắp ráp mô hình, đồ điện tử hoặc làm đồ thủ công (DIY)?", group: 'R' },
  { id: 14, text: "Bạn không ngại làm bẩn tay khi trồng cây, chăm sóc thú cưng hoặc sửa xe?", group: 'R' },
  { id: 15, text: "Bạn thích các môn học thực hành như Công nghệ, Thể dục, hoặc các hoạt động hướng đạo?", group: 'R' },

  // I - Investigative (5 questions)
  { id: 3, text: "Bạn thích tìm hiểu nguyên nhân, lý giải tại sao mọi thứ hoạt động?", group: 'I' },
  { id: 4, text: "Bạn thích giải các bài toán khó hoặc phân tích các vấn đề logic?", group: 'I' },
  { id: 16, text: "Bạn hay tò mò về các hiện tượng khoa học, vũ trụ hoặc lịch sử?", group: 'I' },
  { id: 17, text: "Bạn thích đọc sách chuyên khảo, xem phim tài liệu hơn là phim giải trí đơn thuần?", group: 'I' },
  { id: 18, text: "Bạn thường suy nghĩ kỹ và phân tích các lựa chọn trước khi đưa ra quyết định?", group: 'I' },

  // A - Artistic (5 questions)
  { id: 5, text: "Bạn thích vẽ, hát, chơi nhạc cụ, viết lách hoặc các hoạt động sáng tạo?", group: 'A' },
  { id: 6, text: "Bạn thích sự tự do, không thích bị gò bó bởi các quy tắc cứng nhắc?", group: 'A' },
  { id: 19, text: "Bạn có gu thẩm mỹ tốt, thích phối đồ, trang trí phòng ốc hoặc chụp ảnh nghệ thuật?", group: 'A' },
  { id: 20, text: "Bạn dễ xúc động trước cái đẹp và thích thể hiện cảm xúc của mình ra bên ngoài?", group: 'A' },
  { id: 21, text: "Bạn thích tham gia các câu lạc bộ văn nghệ, kịch, hoặc làm báo tường?", group: 'A' },

  // S - Social (6 questions)
  { id: 7, text: "Bạn thích lắng nghe, chia sẻ và giúp đỡ người khác giải quyết vấn đề?", group: 'S' },
  { id: 8, text: "Bạn thích tham gia các hoạt động xã hội, làm việc nhóm?", group: 'S' },
  { id: 22, text: "Bạn dễ dàng kết bạn và bắt chuyện với người lạ?", group: 'S' },
  { id: 23, text: "Bạn thích dạy học, hướng dẫn người khác làm một việc gì đó?", group: 'S' },
  { id: 24, text: "Bạn quan tâm đến cảm xúc của người khác và thường là người hòa giải trong nhóm?", group: 'S' },
  { id: 25, text: "Bạn thích tham gia các hoạt động tình nguyện, mùa hè xanh hoặc công tác xã hội?", group: 'S' },

  // E - Enterprising (6 questions)
  { id: 9, text: "Bạn thích lãnh đạo, thuyết phục người khác làm theo ý mình?", group: 'E' },
  { id: 10, text: "Bạn thích kinh doanh, bán hàng hoặc các hoạt động liên quan đến khởi nghiệp?", group: 'E' },
  { id: 26, text: "Bạn thích đặt ra mục tiêu cao và cạnh tranh để đạt được thành tích tốt nhất?", group: 'E' },
  { id: 27, text: "Bạn tự tin khi đứng trước đám đông và trình bày ý tưởng của mình?", group: 'E' },
  { id: 28, text: "Bạn quan tâm đến các tin tức kinh tế, thị trường chứng khoán hoặc xu hướng khởi nghiệp?", group: 'E' },
  { id: 29, text: "Bạn thích tổ chức sự kiện, điều phối mọi người trong các dự án của lớp/trường?", group: 'E' },

  // C - Conventional (5 questions)
  { id: 11, text: "Bạn thích sự ngăn nắp, có trật tự và làm việc theo quy trình rõ ràng?", group: 'C' },
  { id: 12, text: "Bạn thích làm việc với các con số, dữ liệu chi tiết hoặc sổ sách?", group: 'C' },
  { id: 30, text: "Bạn là người cẩn thận, tỉ mỉ, ít khi mắc lỗi sai sót nhỏ?", group: 'C' },
  { id: 31, text: "Bạn thích lập kế hoạch chi tiết cho việc học tập và chi tiêu cá nhân?", group: 'C' },
  { id: 32, text: "Bạn cảm thấy thoải mái khi làm việc trong môi trường có quy định rõ ràng, ít biến động?", group: 'C' },
];

export const HOLLAND_TYPES = {
  R: "Realistic (Thực tế)",
  I: "Investigative (Nghiên cứu)",
  A: "Artistic (Nghệ thuật)",
  S: "Social (Xã hội)",
  E: "Enterprising (Quản lý)",
  C: "Conventional (Nghiệp vụ)",
};
