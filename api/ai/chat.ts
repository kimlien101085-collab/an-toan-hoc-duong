import { GoogleGenAI } from "@google/genai";

function generateSmartCounselingFallback(query: string): string {
  const q = (query || "").toLowerCase();
  if (q.includes("trêu chọc") || q.includes("bắt nạt") || q.includes("tẩy chay") || q.includes("cô lập")) {
    return `Chào em, tớ rất thấu hiểu cảm giác lo âu và khó chịu mà em đang phải trải qua. Em hãy nhớ rằng: **Em không hề đơn độc!**

Dưới đây là 3 bước giúp em xử lý an toàn:
1. 🧘 **Giữ bình tĩnh & thiết lập ranh giới**: Nói rõ ràng với thái độ kiên quyết: *"Tớ không thích hành động/lời nói này, xin hãy dừng lại"*.
2. 🚶 **Tránh xa và tìm nơi an toàn**: Nhanh chóng di chuyển đến nơi đông bạn bè, phòng Giáo viên hoặc phòng Y tế/Bảo vệ.
3. 🚨 **Báo cáo ngay cho người lớn**: Chia sẻ ngay với Thầy Cô chủ nhiệm, Cha Mẹ hoặc bấm nút **Gửi Báo Cáo Khẩn Cấp (ẩn danh)** trên ứng dụng để nhà trường bảo vệ em kịp thời!

*Đầu số khẩn cấp miễn phí khi cần trợ giúp ngay lập tức: **111** (Tổng đài Quốc gia Bảo vệ Trẻ em).*`;
  }

  if (q.includes("kiềm chế") || q.includes("cảm xúc") || q.includes("tức giận") || q.includes("nóng tính") || q.includes("bực mình")) {
    return `Khi cảm thấy tức giận hoặc mất bình tĩnh, em hãy áp dụng ngay **Phương pháp Điều hòa cảm xúc 4-7-8**:
1. 🌬️ **Hít vào** từ từ bằng mũi trong **4 giây**.
2. ⏸️ **Giữ hơi thở** trong lồng ngực trong **7 giây**.
3. 😮 **Thở ra thật chậm** bằng miệng trong **8 giây**.
👉 Hãy lặp lại 3 đến 5 lần.

**Lời khuyên thêm:**
- Uống một ngụm nước mát.
- Đếm nhẩm từ 1 đến 10 trước khi định nói hay phản ứng lại điều gì.
- Em có thể ghé mục **"Góc an toàn"** trên app để thực hành bài tập thở tương tác nhé!`;
  }

  if (q.includes("mạng") || q.includes("online") || q.includes("đe dọa") || q.includes("ảnh") || q.includes("facebook") || q.includes("tiktok") || q.includes("zalo")) {
    return `Khi gặp phải tình huống bị đe dọa, xúc phạm hoặc bôi nhọ trên mạng xã hội (Cyberbullying):
1. 📸 **Chụp ảnh màn hình ngay**: Lưu lại đầy đủ tin nhắn, bài viết, đường link và trang cá nhân của đối tượng làm bằng chứng.
2. 🚫 **Chặn (Block) & Báo cáo (Report)**: Chặn tài khoản gây rối để tránh tiếp tục tiếp nhận năng lượng tiêu cực.
3. 🤐 **Tuyệt đối không đáp trả bạo lực**: Không chửi bới hay thách thức lại vì có thể làm tình hình phức tạp thêm.
4. 🛡️ **Báo ngay cho Thầy Cô / Cha Mẹ**: Cung cấp các ảnh chụp màn hình cho nhà trường hoặc gửi qua kênh **Báo Cáo Sự Cố** của app để được hỗ trợ can thiệp.`;
  }

  return `Cảm ơn em đã chia sẻ với Trợ lý AI An Toàn Học Đường! 

Em đang gặp phải thắc mắc hay tình huống gì trong học tập và quan hệ bạn bè? Em có thể hỏi tớ về:
- Cách giải quyết mâu thuẫn trong lớp học không dùng bạo lực
- Kỹ năng tự bảo vệ khi bị bắt nạt
- Cách ứng phó khi bị nói xấu, xúc phạm trên mạng
- Luyện tập kiềm chế cơn giận và giữ bình tĩnh

Thầy Cô và nhà trường luôn ở bên cạnh để lắng nghe và bảo vệ em!`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Tin nhắn không hợp lệ" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const fallback = generateSmartCounselingFallback(message);
      return res.status(200).json({ reply: fallback, source: "offline_fallback" });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const systemInstruction = `Bạn là Trợ Lý AI Chuyên Gia Tư Vấn "An Toàn Học Đường" dành cho học sinh, giáo viên và phụ huynh tại Việt Nam (đặc biệt là lứa tuổi học sinh THCS/THPT).
Nhiệm vụ của bạn là:
1. Lắng nghe với sự thấu hiểu, ân cần, đồng cảm và tôn trọng tuyệt đối cảm xúc của học sinh.
2. Giúp học sinh nhận diện các hành vi bạo lực học đường (thể chất, tinh thần, ngôn từ, bắt nạt trên không gian mạng).
3. Hướng dẫn các kỹ năng kiềm chế cảm xúc, kiểm soát cơn giận (ví dụ: thở 4-7-8, tạm dừng suy nghĩ, giải tỏa lành mạnh).
4. Cung cấp các bước hành động cụ thể, an toàn khi bị bắt nạt hoặc khi chứng kiến bạn bè gặp nguy hiểm: Bình tĩnh, tìm cách thoát hiểm, tìm người lớn đáng tin cậy (Thầy Cô, Cha Mẹ, BGH) và sử dụng chức năng Báo Cáo SOS / Tổng đài 111 (Tổng đài Quốc gia Bảo vệ Trẻ em).
5. Trả lời bằng tiếng Việt chuẩn mực, rõ ràng, chia đề mục gạch đầu dòng dễ hiểu, dùng ngôn từ ấm áp, gần gũi, khích lệ và an ủi, không phán xét.`;

    const chatSession = ai.chats.create({
      model: "gemini-3.7-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const response = await chatSession.sendMessage({
      message: message,
    });

    const replyText = response.text || "Em hãy chia sẻ thêm chi tiết nhé, Thầy Cô và AI luôn sẵn sàng đồng hành cùng em.";
    return res.status(200).json({ reply: replyText, source: "gemini-3.7-flash" });
  } catch (error: any) {
    console.error("Vercel AI handler error:", error);
    const fallback = generateSmartCounselingFallback(req.body?.message || "");
    return res.status(200).json({ reply: fallback, source: "offline_fallback" });
  }
}
