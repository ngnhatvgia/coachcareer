import { GoogleGenAI, Type } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const MODEL_NAME = "gemini-3.1-pro-preview";

const isQuotaError = (error: any): boolean => {
  return (
    error.status === 429 ||
    error.code === 429 ||
    error.message?.includes('429') ||
    error.message?.includes('quota') ||
    error.error?.code === 429 ||
    error.error?.status === 'RESOURCE_EXHAUSTED' ||
    (typeof error === 'object' && JSON.stringify(error).includes('RESOURCE_EXHAUSTED'))
  );
};

export interface UserProfile {
  name?: string;
  age?: string;
  birthDate?: string; // YYYY-MM-DD
  gender?: string;
  grade?: string;
  location?: string;
  academicPerformance?: string;
  favoriteSubjects?: string[];
  hobbies?: string[];
  strengths?: string[];
  goals?: string;
  workEnvironment?: string;
  hollandScores?: Record<string, number>;
  topHollandTypes?: string[];
}

export interface CareerSuggestion {
  title: string;
  reason: string;
  skills: string[];
  income: string;
  trend: string;
}

export interface RoadmapStage {
  stage: string;
  actions: string[];
}

export interface AIAnalysisResult {
  hollandType: string;
  personalityDescription: string;
  strengths: string[];
  weaknesses: string[];
  environment: string;
  careers: CareerSuggestion[];
  roadmap: RoadmapStage[];
  advice: string;
  quote: string;
}

export const FPT_CANTHO_DATA = `
THÔNG TIN ƯU TIÊN VỀ ĐẠI HỌC FPT CẦN THƠ (FPTU CẦN THƠ):
- Địa chỉ: Số 600, đường Nguyễn Văn Cừ (nối dài), Phường An Bình, Thành phố Cần Thơ.
- Hotline: (0292) 730 3636.
- Thành tích nổi bật:
  + Xếp hạng 200 Thế giới về chất lượng giáo dục (THE Impact Rankings 2025).
  + Xếp hạng 400 Thế giới về phát triển bền vững (THE Impact Rankings 2025).
  + Top 1 các trường đại học tốt nhất theo chuẩn chất lượng trong nước (MOET 2025).
- Triết lý giáo dục: "Trải nghiệm để thành công". Đào tạo dựa trên 3 trụ cột: Công nghệ, Quốc tế, Khởi nghiệp.
- Các ngành đào tạo chính tại Campus Cần Thơ:
  + Công nghệ thông tin: Kỹ thuật phần mềm, An toàn thông tin, Trí tuệ nhân tạo, Thiết kế đồ họa, Công nghệ ô tô số, Khoa học dữ liệu.
  + Quản trị kinh doanh: Digital Marketing, Kinh doanh quốc tế, Quản trị khách sạn, Quản trị dịch vụ du lịch & lữ hành, Tài chính (Fintech), Logistics & Quản lý chuỗi cung ứng.
  + Ngôn ngữ: Ngôn ngữ Anh, Ngôn ngữ Nhật, Ngôn ngữ Hàn Quốc, Ngôn ngữ Trung Quốc.
  + Truyền thông: Truyền thông đa phương tiện, Quan hệ công chúng.
  + Luật: Luật kinh tế.
- Môi trường: Cơ sở vật chất hiện đại (Hội trường, Phòng Lab, Thư viện, Sân bóng, Gym...), không gian xanh, môi trường học tập chuẩn quốc tế.
- Cơ hội việc làm: Hợp tác với nhiều doanh nghiệp lớn (FPT Software, VietinBank, LG, Bosch...).
`;

export const generateCareerAdvice = async (profile: UserProfile): Promise<AIAnalysisResult> => {
  try {
    const prompt = `
      Bạn là một chuyên gia tư vấn hướng nghiệp hàng đầu dành cho học sinh THPT tại Việt Nam.
      Dựa trên thông tin dưới đây, hãy phân tích và đưa ra lời khuyên nghề nghiệp chi tiết.
  
      CHIẾN LƯỢC TÂM LÝ:
      - Xây dựng hình ảnh "Phiên bản lý tưởng" (Ideal Self) cho học sinh.
      - Nhấn mạnh rằng họ không chỉ chọn nghề, mà đang xây dựng con người họ muốn trở thành.
      - Khéo léo lồng ghép gợi ý về Đại học FPT Cần Thơ (FPTU) NHƯNG CHỈ Ở NHỮNG ĐIỂM CAO TRÀO (khi nói về môi trường phát triển, sự năng động, công nghệ).
      - KHÔNG quảng cáo lộ liễu. Phải tinh tế, khách quan.
      - Ví dụ: "Với định hướng trở thành một [Ideal Self], một môi trường năng động và giàu trải nghiệm như FPTU có thể là bệ phóng phù hợp..."
  
      ${FPT_CANTHO_DATA}
  
      THÔNG TIN HỌC SINH:
      - Tuổi: ${profile.age}
      - Ngày sinh: ${profile.birthDate}
      - Giới tính: ${profile.gender}
      - Lớp: ${profile.grade}
      - Môn học yêu thích: ${profile.favoriteSubjects?.join(', ')}
      - Sở thích/Hoạt động: ${profile.hobbies?.join(', ')}
      - Điểm mạnh tự nhận thấy: ${profile.strengths?.join(', ')}
      - Mong muốn tương lai: ${profile.goals}
      - Môi trường làm việc mong muốn: ${profile.workEnvironment}
      - Kết quả trắc nghiệm Holland: ${JSON.stringify(profile.hollandScores)}
      - 2 Nhóm Holland nổi trội nhất: ${profile.topHollandTypes?.join(", ")}
  
      YÊU CẦU ĐẦU RA (JSON):
      Hãy trả về kết quả dưới dạng JSON tuân thủ schema sau.
      Nội dung phải bằng Tiếng Việt, giọng văn thân thiện, khích lệ, phù hợp với học sinh cấp 3.
      Dữ liệu về thu nhập và xu hướng phải thực tế với thị trường Việt Nam.
      
      Cấu trúc JSON mong muốn:
      {
        "hollandType": "Tên 2 nhóm nổi trội",
        "personalityDescription": "Mô tả tính cách...",
        "strengths": ["Điểm mạnh 1", ...],
        "weaknesses": ["Điểm cần cải thiện 1", ...],
        "environment": "Môi trường làm việc phù hợp...",
        "careers": [
          {
            "title": "Tên nghề nghiệp",
            "reason": "Tại sao phù hợp...",
            "skills": ["Kỹ năng 1", ...],
            "income": "Mức lương tham khảo",
            "trend": "Xu hướng tương lai"
          }
        ],
        "roadmap": [
          { "stage": "Giai đoạn THPT", "actions": [...] },
          { "stage": "Đại học/Cao đẳng (Gợi ý cụ thể trường/ngành)", "actions": [...] }
        ],
        "advice": "Lời khuyên (Lồng ghép thông điệp Ideal Self)...",
        "quote": "Câu nói truyền cảm hứng..."
      }
    `;
  
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hollandType: { type: Type.STRING },
            personalityDescription: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            environment: { type: Type.STRING },
            careers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  income: { type: Type.STRING },
                  trend: { type: Type.STRING },
                },
              },
            },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stage: { type: Type.STRING },
                  actions: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
              },
            },
            advice: { type: Type.STRING },
            quote: { type: Type.STRING },
          },
        },
      },
    });
  
    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    // Clean up markdown code blocks if present
    const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
    
    return JSON.parse(cleanText) as AIAnalysisResult;
  } catch (error: any) {
    if (isQuotaError(error)) {
      console.warn("Quota exceeded, using fallback content.");
      return {
        hollandType: "Nghệ thuật & Xã hội (Mô phỏng)",
        personalityDescription: "Bạn là người sáng tạo, giàu trí tưởng tượng và thích giúp đỡ người khác. Bạn có khả năng giao tiếp tốt và nhạy bén với cảm xúc. (Nội dung mô phỏng do hệ thống đang bận)",
        strengths: ["Sáng tạo", "Giao tiếp", "Thấu cảm"],
        weaknesses: ["Dễ xúc động", "Thiếu kiên nhẫn"],
        environment: "Môi trường tự do, sáng tạo, không gò bó.",
        careers: [
          {
            "title": "Thiết kế đồ họa",
            "reason": "Phù hợp với sự sáng tạo và yêu cái đẹp của bạn.",
            "skills": ["Sử dụng công cụ thiết kế", "Tư duy thẩm mỹ"],
            "income": "10 - 20 triệu VNĐ",
            "trend": "Tăng trưởng mạnh"
          },
          {
            "title": "Truyền thông đa phương tiện",
            "reason": "Kết hợp giữa công nghệ và nghệ thuật.",
            "skills": ["Biên tập video", "Viết nội dung"],
            "income": "12 - 25 triệu VNĐ",
            "trend": "Rất hot"
          }
        ],
        roadmap: [
          { "stage": "Giai đoạn THPT", "actions": ["Tham gia CLB Truyền thông", "Học Photoshop cơ bản"] },
          { "stage": "Đại học", "actions": ["Chọn ngành Thiết kế đồ họa tại ĐH FPT Cần Thơ", "Thực tập sớm"] }
        ],
        advice: "Hãy tự tin thể hiện cá tính của mình. Đừng ngại khác biệt!",
        quote: "Sáng tạo là trí thông minh đang vui đùa."
      };
    }
    throw error;
  }
};

export interface CareerDetail {
  title: string;
  overview: {
    dailyTasks: string;
    environment: string;
  };
  fitAnalysis: string;
  roadmap: {
    highSchool: string[];
    university: string[];
    skills: string[];
  };
  universities: {
    fptCanTho?: string;
    others: string[];
  };
  incomeLevels: {
    fresher: string;
    junior: string;
    senior: string;
  };
  requiredSkills: string[];
  futureTrend: {
    aiImpact: string;
    opportunity: string;
  };
}

export interface CareerComparison {
  career1: {
    title: string;
    pros: string[];
    cons: string[];
    matchScore: number;
  };
  career2: {
    title: string;
    pros: string[];
    cons: string[];
    matchScore: number;
  };
  analysis: string;
  recommendation: string;
}

export const getCareerDetails = async (careerTitle: string, profile: UserProfile): Promise<CareerDetail> => {
  try {
    const prompt = `
      Đóng vai trò chuyên gia hướng nghiệp. Hãy phân tích chi tiết nghề nghiệp "${careerTitle}" dành cho học sinh này:
      
      HỒ SƠ HỌC SINH:
      - Sở thích: ${profile.hobbies?.join(', ')}
      - Điểm mạnh: ${profile.strengths?.join(', ')}
      - Mục tiêu: ${profile.goals}
      - Holland: ${profile.topHollandTypes?.join(", ")}
  
      ${FPT_CANTHO_DATA}
  
      YÊU CẦU ĐẦU RA (JSON):
      {
        "title": "${careerTitle}",
        "overview": {
          "dailyTasks": "Mô tả công việc hàng ngày...",
          "environment": "Môi trường làm việc..."
        },
        "fitAnalysis": "Tại sao nghề này phù hợp với học sinh (dựa trên hồ sơ)...",
        "roadmap": {
          "highSchool": ["Môn cần học", "Hoạt động nên tham gia"],
          "university": ["Ngành học phù hợp", "Chuyên ngành hẹp"],
          "skills": ["Kỹ năng mềm", "Kỹ năng chuyên môn"]
        },
        "universities": {
          "fptCanTho": "Lý do nên học tại ĐH FPT Cần Thơ (nếu có ngành phù hợp, nêu rõ ngành)",
          "others": ["Trường A", "Trường B"]
        },
        "incomeLevels": {
          "fresher": "Mức lương Fresher (VNĐ)",
          "junior": "Mức lương Junior (VNĐ)",
          "senior": "Mức lương Senior (VNĐ)"
        },
        "requiredSkills": ["Kỹ năng 1", "Kỹ năng 2", "Kỹ năng 3"],
        "futureTrend": {
          "aiImpact": "Tác động của AI đối với nghề này...",
          "opportunity": "Cơ hội phát triển trong 5-10 năm tới..."
        }
      }
    `;
  
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            overview: {
              type: Type.OBJECT,
              properties: {
                dailyTasks: { type: Type.STRING },
                environment: { type: Type.STRING },
              },
            },
            fitAnalysis: { type: Type.STRING },
            roadmap: {
              type: Type.OBJECT,
              properties: {
                highSchool: { type: Type.ARRAY, items: { type: Type.STRING } },
                university: { type: Type.ARRAY, items: { type: Type.STRING } },
                skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
            universities: {
              type: Type.OBJECT,
              properties: {
                fptCanTho: { type: Type.STRING },
                others: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
            incomeLevels: {
              type: Type.OBJECT,
              properties: {
                fresher: { type: Type.STRING },
                junior: { type: Type.STRING },
                senior: { type: Type.STRING },
              },
            },
            requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            futureTrend: {
              type: Type.OBJECT,
              properties: {
                aiImpact: { type: Type.STRING },
                opportunity: { type: Type.STRING },
              },
            },
          },
        },
      },
    });
  
    const text = response.text;
    if (!text) throw new Error("No response from AI");
    const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleanText) as CareerDetail;
  } catch (error: any) {
    if (isQuotaError(error)) {
      console.warn("Quota exceeded, using fallback content.");
      return {
        title: careerTitle,
        overview: {
          dailyTasks: "Thực hiện các công việc chuyên môn, họp nhóm, báo cáo tiến độ. (Mô phỏng)",
          environment: "Văn phòng hiện đại, năng động. (Mô phỏng)"
        },
        fitAnalysis: "Bạn có tố chất phù hợp để theo đuổi ngành này. (Mô phỏng)",
        roadmap: {
          highSchool: ["Học tốt các môn tự nhiên/xã hội liên quan", "Tham gia hoạt động ngoại khóa"],
          university: ["Chọn trường uy tín", "Tham gia CLB chuyên ngành"],
          skills: ["Giao tiếp", "Tin học văn phòng", "Tiếng Anh"]
        },
        universities: {
          fptCanTho: "Môi trường học tập quốc tế, cơ sở vật chất hiện đại.",
          others: ["Đại học Quốc gia", "Đại học Kinh tế"]
        },
        incomeLevels: {
          fresher: "8 - 10 triệu VNĐ",
          junior: "12 - 18 triệu VNĐ",
          senior: "20 - 30 triệu VNĐ"
        },
        requiredSkills: ["Kỹ năng chuyên môn", "Kỹ năng mềm", "Ngoại ngữ"],
        futureTrend: {
          aiImpact: "AI sẽ hỗ trợ tăng năng suất công việc.",
          opportunity: "Nhu cầu nhân lực cao trong tương lai."
        }
      };
    }
    throw error;
  }
};

export const compareCareers = async (career1: string, career2: string, profile: UserProfile): Promise<CareerComparison> => {
  try {
    const prompt = `
      So sánh hai nghề nghiệp: "${career1}" và "${career2}" dựa trên hồ sơ học sinh:
      - Điểm mạnh: ${profile.strengths?.join(', ')}
      - Sở thích: ${profile.hobbies?.join(', ')}
      - Holland: ${profile.topHollandTypes?.join(", ")}
  
      YÊU CẦU ĐẦU RA (JSON):
      {
        "career1": {
          "title": "${career1}",
          "pros": ["Ưu điểm 1", "Ưu điểm 2"],
          "cons": ["Nhược điểm 1", "Nhược điểm 2"],
          "matchScore": 85 (Thang 100)
        },
        "career2": {
          "title": "${career2}",
          "pros": ["Ưu điểm 1", ...],
          "cons": ["Nhược điểm 1", ...],
          "matchScore": 70
        },
        "analysis": "Phân tích so sánh chi tiết, nghề nào phù hợp hơn và tại sao...",
        "recommendation": "Lời khuyên cuối cùng..."
      }
    `;
  
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            career1: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                pros: { type: Type.ARRAY, items: { type: Type.STRING } },
                cons: { type: Type.ARRAY, items: { type: Type.STRING } },
                matchScore: { type: Type.NUMBER },
              },
            },
            career2: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                pros: { type: Type.ARRAY, items: { type: Type.STRING } },
                cons: { type: Type.ARRAY, items: { type: Type.STRING } },
                matchScore: { type: Type.NUMBER },
              },
            },
            analysis: { type: Type.STRING },
            recommendation: { type: Type.STRING },
          },
        },
      },
    });
  
    const text = response.text;
    if (!text) throw new Error("No response from AI");
    const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleanText) as CareerComparison;
  } catch (error: any) {
    if (isQuotaError(error)) {
      console.warn("Quota exceeded, using fallback content.");
      return {
        career1: {
          title: career1,
          pros: ["Phù hợp sở thích", "Thu nhập tốt"],
          cons: ["Áp lực cao", "Cạnh tranh"],
          matchScore: 80
        },
        career2: {
          title: career2,
          pros: ["Ổn định", "Môi trường tốt"],
          cons: ["Thăng tiến chậm", "Lương khởi điểm thấp"],
          matchScore: 75
        },
        analysis: `Cả hai nghề ${career1} và ${career2} đều có những điểm thú vị riêng. (Mô phỏng do hệ thống bận)`,
        recommendation: "Hãy chọn nghề bạn cảm thấy hứng thú nhất và sẵn sàng gắn bó lâu dài."
      };
    }
    throw error;
  }
};

export const generateEntertainmentContent = async (type: 'numerology' | 'zodiac' | 'tarot' | 'daily', data: any) => {
  try {
    let specificInstruction = "";
    if (type === 'numerology') {
      specificInstruction = "Hãy tính toán và phân tích: Số chủ đạo, Mũi tên cá nhân (nếu có thể suy luận từ ngày sinh), Điểm mạnh, Điểm yếu. Gợi ý hướng phát triển.";
    } else if (type === 'zodiac') {
      specificInstruction = `
        Xác định cung hoàng đạo từ ngày sinh: ${data.birthDate}.
        Phân tích CÁ NHÂN HÓA:
        - Banner text: "Bạn là [Tên Cung] ♑ - [Mô tả ngắn gọn tính cách]"
        - Điểm mạnh tính cách.
        - Điểm yếu cần cải thiện.
        - Ngành nghề phù hợp nhất.
        - Vai trò công việc phù hợp.
      `;
    } else if (type === 'tarot') {
      specificInstruction = `
        Rút ngẫu nhiên 1 lá bài Tarot (ưu tiên Bộ Ẩn Chính - Major Arcana).
        
        CÂU HỎI CỦA NGƯỜI DÙNG: "${data.question || 'Tổng quan về sự nghiệp'}"

        Phân tích dựa trên hồ sơ người dùng (nếu có):
        - Sở thích: ${data.userProfile?.hobbies?.join(', ') || 'Chưa rõ'}
        - Mục tiêu: ${data.userProfile?.goals || 'Chưa rõ'}
        
        Yêu cầu phân tích:
        1. Tên lá bài (Tiếng Anh + Tiếng Việt).
        2. Ý nghĩa chung.
        3. Thông điệp cho ngày hôm nay (trả lời trực tiếp câu hỏi nếu có).
        4. Lời khuyên nghề nghiệp (liên kết ý nghĩa lá bài với tính cách/mục tiêu của người dùng).
        5. Gợi ý hành động cụ thể.
        6. Gợi ý 3 ngành nghề phù hợp với năng lượng của lá bài này.
      `;
    } else if (type === 'daily') {
      specificInstruction = "Tạo một thông điệp truyền cảm hứng ngắn gọn (1-2 câu) cho ngày mới. Tập trung vào sự tích cực, nỗ lực và niềm tin. Trả về trong trường 'lucky_message' hoặc 'content'.";
    }

    const prompt = `
      Bạn là một người bạn đồng hành vui tính, am hiểu về ${type === 'numerology' ? 'Thần số học' : type === 'zodiac' ? 'Cung hoàng đạo' : type === 'tarot' ? 'Tarot' : 'Động lực cuộc sống'}.
      Hãy tạo nội dung giải trí và định hướng phát triển bản thân cho học sinh cấp 3 dựa trên thông tin sau:
      Loại: ${type}
      Dữ liệu đầu vào: ${JSON.stringify(data)}

      YÊU CẦU CỤ THỂ:
      ${specificInstruction}

      THÔNG TIN THAM KHẢO (ĐẠI HỌC FPT CẦN THƠ):
      ${FPT_CANTHO_DATA}

      YÊU CẦU CHUNG:
      - Giọng văn: Thân thiện, teen, tích cực, dùng emoji.
      - Mục đích: Giúp khám phá bản thân, giải trí, giảm stress, không mê tín dị đoan.
      - Luôn nhắc nhở: "Kết quả chỉ mang tính tham khảo, quan trọng là nỗ lực của bạn".
      - Nếu có thể, hãy khéo léo lồng ghép gợi ý ngành nghề hoặc môi trường học tập tại Đại học FPT Cần Thơ nếu thấy phù hợp với tính cách (nhưng không spam).

      ĐẦU RA (JSON):
      {
        "title": "Tiêu đề hấp dẫn / Tên lá bài",
        "content": "Nội dung phân tích chi tiết (bao gồm các yêu cầu cụ thể ở trên)...",
        "career_suggestions": ["Gợi ý nghề vui 1", "Gợi ý nghề vui 2"],
        "advice": "Lời khuyên phát triển bản thân / Lời khuyên nghề nghiệp",
        "lucky_message": "Thông điệp may mắn/động lực / Gợi ý hành động",
        "card_name_en": "Tên lá bài tiếng Anh (chỉ dành cho Tarot, ví dụ: 'The Fool')",
        "card_meaning": "Ý nghĩa chung (chỉ dành cho Tarot)"
      }
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (error: any) {
    
    // Fallback for Rate Limit or other errors
    if (isQuotaError(error)) {
      console.warn("Quota exceeded, using fallback content.");
      return getFallbackContent(type, data);
    }
    
    console.error("AI Generation Error:", error);
    // Re-throw other errors or return a generic error message
    throw error;
  }
};

const getFallbackContent = (type: string, data: any) => {
  if (type === 'numerology') {
    return {
      title: `Thần Số Học: Số Chủ Đạo ${data.lifePathNumber || '?'}`,
      content: "Số chủ đạo của bạn cho thấy bạn là người có tiềm năng lãnh đạo và khả năng sáng tạo tuyệt vời. Bạn độc lập, tự tin và luôn muốn tiên phong trong mọi việc. Tuy nhiên, đôi khi bạn có thể hơi cứng đầu và bảo thủ. Hãy học cách lắng nghe và hợp tác với người khác để đạt được thành công lớn hơn. (Nội dung mô phỏng do hệ thống đang bận)",
      career_suggestions: ["Quản lý dự án", "Doanh nhân", "Đạo diễn", "Kiến trúc sư"],
      advice: "Hãy rèn luyện sự kiên nhẫn và khả năng làm việc nhóm. Đừng ngại thử thách bản thân với những vai trò mới.",
      lucky_message: "Hôm nay là ngày tuyệt vời để bắt đầu một dự án mới! 🚀"
    };
  } else if (type === 'zodiac') {
    return {
      title: "Cung Hoàng Đạo Bí Ẩn",
      content: "Bạn sở hữu tính cách mạnh mẽ và đầy nhiệt huyết. Sự quyết đoán giúp bạn vượt qua mọi trở ngại. Tuy nhiên, hãy chú ý đến cảm xúc của những người xung quanh. (Nội dung mô phỏng do hệ thống đang bận)",
      career_suggestions: ["Marketing", "Sales", "Truyền thông"],
      advice: "Cân bằng giữa công việc và cuộc sống là chìa khóa hạnh phúc của bạn.",
      lucky_message: "Hãy cười nhiều hơn, may mắn sẽ tự tìm đến! ✨"
    };
  } else if (type === 'tarot') {
    return {
      title: "The Magician (Nhà Ảo Thuật)",
      card_name_en: "The Magician",
      card_meaning: "Sự khởi đầu, sáng tạo, ý chí mạnh mẽ và khả năng biến ước mơ thành hiện thực.",
      content: "Lá bài này cho thấy bạn đang có đầy đủ nguồn lực và khả năng để thực hiện những dự định của mình. Đây là thời điểm vàng để hành động! Đừng chần chừ nữa. (Nội dung mô phỏng do hệ thống đang bận)",
      career_suggestions: ["Sáng tạo nội dung", "Kinh doanh tự do", "Nghệ thuật"],
      advice: "Hãy tin vào trực giác và năng lực của bản thân. Bạn có thể làm được nhiều hơn bạn nghĩ.",
      lucky_message: "Phép màu nằm trong chính đôi tay bạn! 🌟"
    };
  } else if (type === 'daily') {
    return {
      lucky_message: "Mỗi ngày là một cơ hội mới để trở nên tốt hơn. Hãy nắm bắt nó! 💪 (Mô phỏng)"
    };
  }
  return {};
};

export const chatWithCoach = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
    try {
      const chat = ai.chats.create({
          model: MODEL_NAME,
          history: history,
          config: {
              systemInstruction: "Bạn là AI Career Coach thân thiện, chuyên nghiệp. Hãy trả lời câu hỏi của học sinh ngắn gọn, súc tích, và mang tính định hướng. Giọng văn vui vẻ, emoji hợp lý."
          }
      });
  
      const result = await chat.sendMessage({ message });
      return result.text;
    } catch (error: any) {
      if (isQuotaError(error)) {
         return "Hiện tại mình đang quá tải một chút, bạn thử lại sau ít phút nhé! 😅 (Hệ thống đang bận)";
      }
      console.error("AI Chat Error:", error);
      throw error;
    }
}

export interface CareerSearchResult {
  title: string;
  description: string;
  requirements: string[];
  admissionInfo: string;
  universities: string[];
}

export const searchCareers = async (query: string): Promise<CareerSearchResult[]> => {
  try {
    const prompt = `
      Người dùng đang tìm kiếm thông tin nghề nghiệp với từ khóa: "${query}".
      Hãy đóng vai trò là một chuyên gia tư vấn hướng nghiệp tại Việt Nam.
      Tìm kiếm và trả về danh sách các ngành nghề liên quan nhất (tối đa 5 ngành).
  
      Với mỗi ngành nghề, hãy cung cấp:
      1. Tên ngành nghề (Tiếng Việt)
      2. Mô tả ngắn gọn về công việc.
      3. Yêu cầu công việc (kỹ năng, phẩm chất).
      4. Thông tin tuyển sinh (Khối thi phổ biến, điểm chuẩn tham khảo - ghi chung chung như "thường lấy điểm cao", "trung bình").
      5. Top 3-5 trường đại học/cao đẳng đào tạo tốt ngành này tại Việt Nam.
  
      YÊU CẦU ĐẦU RA (JSON):
      Trả về một mảng JSON (Array of Objects), không có markdown code block thừa.
      Schema:
      [
        {
          "title": "Tên ngành",
          "description": "Mô tả...",
          "requirements": ["Yêu cầu 1", "Yêu cầu 2"],
          "admissionInfo": "Khối A00, A01, D01...",
          "universities": ["Đại học Bách Khoa", "Đại học Kinh tế Quốc dân"]
        }
      ]
    `;
  
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
              admissionInfo: { type: Type.STRING },
              universities: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
        },
      },
    });
  
    const text = response.text;
    if (!text) throw new Error("No response from AI");
  
    // Clean up markdown code blocks if present
    const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
  
    return JSON.parse(cleanText) as CareerSearchResult[];
  } catch (error: any) {
    if (isQuotaError(error)) {
       return [
         {
           title: "Kết quả mô phỏng (Hệ thống bận)",
           description: `Hệ thống đang bận, đây là kết quả mô phỏng cho từ khóa "${query}".`,
           requirements: ["Kiên nhẫn", "Thử lại sau"],
           admissionInfo: "N/A",
           universities: ["Đại học FPT Cần Thơ"]
         }
       ];
    }
    throw error;
  }
};
