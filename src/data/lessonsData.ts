import { Lesson } from '../types';

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: 'Bài 1: Bạo lực học đường là gì?',
    category: 'bullying',
    duration: '10 phút',
    desc: 'Nhận biết khái niệm, biểu hiện và các dạng bạo lực học đường thường gặp.',
    objectives: [
      'Hiểu rõ định nghĩa chính xác và bản chất của bạo lực học đường.',
      'Phân biệt được hành vi trêu chọc vui vẻ lành mạnh và hành vi bạo lực gây tổn thương.',
      'Nâng cao ý thức bảo vệ bản thân và tôn trọng danh dự của bạn bè.'
    ],
    content: [
      'Bạo lực học đường là hành vi cố ý, mang tính lặp đi lặp lại hoặc có tính chất đe dọa, gây tổn hại về thể chất, tinh thần, tình cảm hoặc tài sản diễn ra trong hoặc ngoài khuôn viên nhà trường.',
      'Bạo lực học đường bao gồm 4 nhóm chính: Thể chất (đánh đập, xô đẩy), Lời nói (lăng mạ, miệt thị), Tinh thần (cô lập, tẩy chay, đồn thổi) và Không gian mạng (Cyberbullying).'
    ],
    game: {
      question: 'Hành vi nào dưới đây được coi là bạo lực học đường?',
      options: [
        'A. Bạn bè cùng nhau tranh luận về một bài toán khó trong giờ ra chơi.',
        'B. Cố tình đặt biệt danh xấu, miệt thị ngoại hình và rủ cả lớp tẩy chay một bạn.',
        'C. Nhắc nhở bạn trong lớp giữ trật tự và tập trung nghe giảng.'
      ],
      correct: 1,
      explanation: 'Chính xác! Cố tình đặt biệt danh miệt thị ngoại hình và vận động cô lập, tẩy chay bạn là hành vi bạo lực tinh thần và ngôn từ rất nghiêm trọng.',
      questions: [
        {
          id: 'q1_1',
          type: 'single_choice',
          question: 'Hành vi nào dưới đây là biểu hiện của bạo lực học đường?',
          options: [
            'A. Bạn bè cùng nhau tranh luận bài tập trong giờ ra chơi.',
            'B. Cố tình đặt biệt danh xấu, miệt thị ngoại hình và rủ cả lớp tẩy chay bạn.',
            'C. Nhắc nhở bạn trong lớp giữ trật tự khi Thầy Cô đang giảng bài.',
            'D. Mượn bút của bạn và gửi trả lại nguyên vẹn.'
          ],
          correct: 1,
          explanation: 'Chính xác! Cố tình đặt biệt danh miệt thị và vận động cô lập bạn là hành vi bạo lực tinh thần và ngôn từ nghiêm trọng.'
        },
        {
          id: 'q1_2',
          type: 'true_false',
          question: 'Đánh giá tính Đúng / Sai của nhận định sau:',
          statement: 'Bạo lực học đường chỉ xảy ra khi có xô xát, đánh đập gây thương tích trên cơ thể.',
          isTrue: false,
          explanation: 'Đúng vậy! Đây là nhận định SAI. Bạo lực học đường còn bao gồm bạo lực tinh thần (cô lập, tẩy chay), bạo lực lời nói (lăng mạ) và bắt nạt trên không gian mạng.'
        },
        {
          id: 'q1_3',
          type: 'matching',
          question: 'Ghép nối dạng bạo lực ở cột bên trái với biểu hiện tương ứng ở cột bên phải:',
          explanation: 'Rất tốt! Em đã phân biệt chính xác 4 dạng bạo lực học đường cơ bản.',
          pairs: [
            { id: 'p1', left: 'Bạo lực thể chất', right: 'Đánh đập, xô đẩy, giật đồ dùng' },
            { id: 'p1_2', left: 'Bạo lực lời nói', right: 'Chửi bới, miệt thị ngoại hình, chế giễu' },
            { id: 'p1_3', left: 'Bạo lực tinh thần', right: 'Tẩy chay, cô lập, đồn thổi tin đồn xấu' },
            { id: 'p1_4', left: 'Bạo lực mạng', right: 'Đăng bài bôi nhọ, lập nhóm chửi bới trên Zalo' }
          ]
        },
        {
          id: 'q1_4',
          type: 'fill_blank',
          question: 'Điền từ còn thiếu vào chỗ trống để hoàn thành định nghĩa:',
          sentenceBefore: 'Bạo lực học đường là hành vi cố ý, mang tính',
          sentenceAfter: 'hoặc đe dọa, gây tổn hại về thể chất và tinh thần.',
          correctWord: 'lặp đi lặp lại',
          wordBank: ['lặp đi lặp lại', 'vui đùa', 'ngẫu nhiên', 'thân thiện'],
          explanation: 'Chính xác! Tính chất "lặp đi lặp lại" và "cố ý" là đặc trưng cốt lõi của hành vi bạo lực học đường.'
        }
      ]
    },
    summary: [
      'Bạo lực học đường không chỉ là xô xát, đánh nhau mà còn bao gồm xúc phạm danh dự và tẩy chay.',
      'Mọi hành vi gây tổn thương tâm lý, thể xác cho người khác đều là vi phạm nội quy học đường và đạo đức.'
    ],
    message: '🌟 "Mỗi lời nói hòa nhã là một hạt mầm tình bạn. Hãy cùng nhau xây dựng môi trường học tập an toàn, nói KHÔNG với bạo lực!"',
    material: {
      type: 'file',
      name: 'Tai_Lieu_Bai_1_Bao_Luc_Hoc_Duong_La_Gi.pdf',
      url: 'data:text/plain;charset=utf-8,Tai%20Lieu%20Hoc%20Tap%20Bai%201%3A%20Bao%20luc%20hoc%20duong%20la%20gi%3F%20-%20THCS%20Tran%20Quy%20Cap',
      uploadDate: '15/08/2026',
      size: '1.2 MB'
    }
  },
  {
    id: 'l2',
    title: 'Bài 2: Nhận diện hành vi bạo lực học đường',
    category: 'bullying',
    duration: '12 phút',
    desc: 'Phân biệt bạo lực thể chất, tinh thần, lời nói, trên mạng và các dấu hiệu cảnh báo.',
    objectives: [
      'Nhận diện rõ 4 nhóm hành vi bạo lực học đường trong đời sống thực tế.',
      'Phát hiện sớm các dấu hiệu bắt nạt lặp đi lặp lại để can thiệp kịp thời.'
    ],
    content: [
      '1. Bạo lực thể chất: Đánh đập, xô đẩy, giật đồ, phá hỏng đồ dùng học tập.',
      '2. Bạo lực lời nói: Chửi bới, miệt thị ngoại hình, dọa nạt, tung tin đồn thất thiệt.',
      '3. Bạo lực tinh thần: Cô lập, ép buộc làm việc xấu, đe dọa ánh mắt, tạo nhóm tẩy chay.',
      '4. Bắt nạt trên mạng (Cyberbullying): Đăng ảnh dìm hàng, bôi nhọ trên mạng xã hội, nhắn tin đe dọa qua Zalo/Facebook.'
    ],
    game: {
      question: 'Khi thấy bạn trong lớp bị nhóm khác ép đưa tiền ăn sáng mỗi ngày, em nên làm gì?',
      options: [
        'A. Đứng xem và quay video lại đăng lên mạng xã hội.',
        'B. Đi tìm Thầy Cô chủ nhiệm, Ban Giám Hiệu hoặc Bảo vệ trường báo cáo ngay lập tức.',
        'C. Lao vào đánh nhau trực tiếp với nhóm bắt nạt.'
      ],
      correct: 1,
      explanation: 'Rất đúng! Báo ngay cho Thầy Cô hoặc người lớn phụ trách là giải pháp an toàn, thông minh và hiệu quả nhất.',
      questions: [
        {
          id: 'q2_1',
          type: 'single_choice',
          question: 'Khi thấy bạn cùng lớp bị nhóm khác ép nộp tiền ăn sáng mỗi ngày, hành động đúng nhất của em là:',
          options: [
            'A. Đứng xem và quay video đăng lên mạng xã hội.',
            'B. Đi tìm Thầy Cô chủ nhiệm, Ban Giám Hiệu hoặc Bảo vệ trường báo cáo ngay.',
            'C. Lao vào đánh nhau trực tiếp với nhóm bắt nạt.',
            'D. Giả vờ không biết để không bị liên lụy.'
          ],
          correct: 1,
          explanation: 'Rất đúng! Báo ngay cho Thầy Cô hoặc người lớn phụ trách là giải pháp an toàn, thông minh và hiệu quả nhất.'
        },
        {
          id: 'q2_2',
          type: 'true_false',
          question: 'Đánh giá tính Đúng / Sai của nhận định sau:',
          statement: 'Tạo nhóm chat kín trên mạng xã hội để tung tin đồn bịa đặt và nói xấu bạn cùng lớp không bị coi là bạo lực.',
          isTrue: false,
          explanation: 'Nhận định SAI! Đây là hành vi bạo lực không gian mạng và bạo lực tinh thần rất nguy hiểm, có thể bị xử lý kỷ luật nghiêm khắc.'
        },
        {
          id: 'q2_3',
          type: 'matching',
          question: 'Nối hành vi với mức độ và cách xử lý tương ứng:',
          explanation: 'Chính xác! Em đã nắm vững cách xử lý cho từng tình huống cụ thể.',
          pairs: [
            { id: 'p2_1', left: 'Bị bạn giấu sách vở trêu đùa', right: 'Nhắc nhở thẳng thắn yêu cầu bạn trả lại' },
            { id: 'p2_2', left: 'Bị đe dọa tống tiền, đánh đập', right: 'Bấm SOS và báo ngay Ban Giám Hiệu / Phụ huynh' },
            { id: 'p2_3', left: 'Bị bôi nhọ trên mạng xã hội', right: 'Chụp ảnh màn hình làm bằng chứng và báo Thầy Cô' }
          ]
        },
        {
          id: 'q2_4',
          type: 'fill_blank',
          question: 'Hoàn thành nguyên tắc nhận diện:',
          sentenceBefore: 'Dấu hiệu nhận biết học sinh bị bắt nạt là thường xuyên có tâm trạng lo sợ, thu mình và sợ',
          sentenceAfter: 'mỗi sáng.',
          correctWord: 'đến trường',
          wordBank: ['đến trường', 'ăn cơm', 'ngủ', 'chơi game'],
          explanation: 'Chính xác! Sợ đến trường và ngại giao tiếp là dấu hiệu cảnh báo tâm lý điển hình của nạn nhân bạo lực.'
        }
      ]
    },
    summary: [
      'Nhận diện chính xác hành vi bạo lực giúp chúng ta có căn cứ bảo vệ bản thân và cung cấp minh chứng cho nhà trường.'
    ],
    message: '🛡️ "Sự dũng cảm lên tiếng của em có thể cứu giúp một người bạn khỏi sự ám ảnh bắt nạt!"',
    material: null
  },
  {
    id: 'l3',
    title: 'Bài 3: Khi nào trò đùa trở thành bạo lực?',
    category: 'skills',
    duration: '10 phút',
    desc: 'Nhận biết ranh giới giữa vui đùa, trêu chọc và hành vi gây tổn thương người khác.',
    objectives: [
      'Hiểu được sự khác biệt giữa trò đùa vui vẻ và trêu ghẹo độc hại.',
      'Biết cách thiết lập ranh giới cá nhân và tôn trọng ranh giới của người khác.'
    ],
    content: [
      'Trò đùa lành mạnh: CẢ HAI BÊN đều cảm thấy vui vẻ, thoải mái và có thể dừng lại bất cứ lúc nào.',
      'Trò đùa trở thành bạo lực khi: Một bên cảm thấy xấu hổ, sợ hãi, tổn thương hoặc đã lên tiếng yêu cầu dừng lại nhưng bên kia vẫn tiếp tục cười cợt.'
    ],
    game: {
      question: 'Bạn A xin dừng việc trêu chọc nhưng các bạn trong nhóm vẫn tiếp tục cười cợt và giấu cặp sách của bạn. Đây là gì?',
      options: [
        'A. Trò đùa bình thường của tuổi học trò, không sao cả.',
        'B. Hành vi trêu chọc gây tổn thương và là biểu hiện của bạo lực học đường.',
        'C. Biểu hiện của sự thân thiết quá mức.'
      ],
      correct: 1,
      explanation: 'Chính xác! Khi đối phương đã yêu cầu dừng lại nhưng vẫn cố tình tiếp tục thì đó là hành vi xâm phạm và bạo lực.',
      questions: [
        {
          id: 'q3_1',
          type: 'single_choice',
          question: 'Bạn A xin dừng việc trêu chọc nhưng nhóm bạn vẫn tiếp tục cười cợt và giấu cặp sách. Đây là gì?',
          options: [
            'A. Trò đùa bình thường vui vẻ của tuổi học trò.',
            'B. Hành vi quấy rối gây tổn thương và là biểu hiện của bạo lực học đường.',
            'C. Cách thể hiện tình cảm thân thiết giữa bạn bè.',
            'D. Thử thách tính kiên nhẫn của bạn A.'
          ],
          correct: 1,
          explanation: 'Chính xác! Khi đối phương đã yêu cầu dừng lại nhưng vẫn cố tình tiếp tục thì đó là hành vi bạo lực học đường.'
        },
        {
          id: 'q3_2',
          type: 'true_false',
          question: 'Đánh giá tính Đúng / Sai của nhận định sau:',
          statement: 'Một trò đùa chỉ thực sự vui khi TẤT CẢ các bên liên quan đều cảm thấy thoải mái và vui vẻ.',
          isTrue: true,
          explanation: 'Đúng! Nếu một người cười nhưng người kia khó chịu, xấu hổ hay đau đớn thì đó không phải là trò đùa mà là sự xúc phạm.'
        },
        {
          id: 'q3_3',
          type: 'matching',
          question: 'Ghép cặp khái niệm với ranh giới tương ứng:',
          explanation: 'Tuyệt vời! Em đã phân biệt rất rõ ràng giữa trêu đùa và quấy rối.',
          pairs: [
            { id: 'p3_1', left: 'Trò đùa vui lành mạnh', right: 'Cả hai cùng bật cười và dừng lại ngay khi bạn muốn' },
            { id: 'p3_2', left: 'Trêu ghẹo vượt giới hạn', right: 'Một bên khó chịu, người trêu vẫn tiếp tục cười cợt' },
            { id: 'p3_3', left: 'Ranh giới tôn trọng', right: 'Lắng nghe và dừng ngay khi bạn nói "Đừng làm vậy nữa"' }
          ]
        },
        {
          id: 'q3_4',
          type: 'fill_blank',
          question: 'Điền từ thích hợp vào thông điệp:',
          sentenceBefore: 'Trò đùa chỉ thật sự vui khi',
          sentenceAfter: 'cùng cười, không phải lấy sự xấu hổ của bạn làm niềm vui.',
          correctWord: 'tất cả mọi người',
          wordBank: ['tất cả mọi người', 'người trêu', 'khán giả', 'người chiến thắng'],
          explanation: 'Chính xác! Trò đùa lành mạnh đòi hỏi sự đồng thuận và vui vẻ từ tất cả mọi người.'
        }
      ]
    },
    summary: [
      'Luôn lắng nghe phản ứng của bạn bè. Tôn trọng ranh giới "Dừng lại" là biểu hiện của người có văn hóa.'
    ],
    message: '❤️ "Trò đùa chỉ thật sự vui khi tất cả mọi người cùng cười!"',
    material: null
  },
  {
    id: 'l4',
    title: 'Bài 4: Bạo lực học đường trên không gian mạng',
    category: 'cyber',
    duration: '15 phút',
    desc: 'Nhận diện bắt nạt trực tuyến, xúc phạm, lan truyền hình ảnh và thông tin gây tổn thương.',
    objectives: [
      'Trang bị kỹ năng an toàn số và ứng phó văn minh với Cyberbullying.',
      'Biết cách thu thập và lưu giữ minh chứng vi phạm trên mạng xã hội.'
    ],
    content: [
      'Bắt nạt trên mạng (Cyberbullying) diễn ra qua tin nhắn, mạng xã hội (Facebook, TikTok, Zalo), diễn đàn hoặc game online.',
      'Quy tắc ứng phó 3 BƯỚC VÀNG: 1. CHỤP MÀN HÌNH lưu bằng chứng -> 2. CHẶN (Block) & BÁO CÁO (Report) tài khoản quấy rối -> 3. CHIA SẺ ngay với Thầy Cô và Cha Mẹ.'
    ],
    game: {
      question: 'Bước đầu tiên quan trọng nhất khi nhận được tin nhắn đe doạ hoặc xúc phạm trên mạng là gì?',
      options: [
        'A. Nhắn tin chửi lại và thách thức đối phương.',
        'B. Chụp ảnh màn hình lưu bằng chứng rõ ràng (tin nhắn, tài khoản) và chặn đối phương.',
        'C. Xóa ngay tài khoản mạng xã hội để trốn tránh.'
      ],
      correct: 1,
      explanation: 'Chính xác! Chụp màn hình giúp giữ nguyên chứng cứ để Thầy Cô, gia đình và cơ quan chức năng xử lý theo đúng quy định pháp luật.',
      questions: [
        {
          id: 'q4_1',
          type: 'single_choice',
          question: 'Bước đầu tiên quan trọng nhất khi nhận được tin nhắn đe dọa hoặc bôi nhọ trên mạng là gì?',
          options: [
            'A. Nhắn tin chửi lại và thách thức đối phương.',
            'B. Chụp ảnh màn hình lưu bằng chứng rõ ràng (nội dung, tên tài khoản, thời gian).',
            'C. Xóa ngay tài khoản mạng xã hội của mình.',
            'D. Rủ bạn bè vào tấn công lại trang cá nhân của đối phương.'
          ],
          correct: 1,
          explanation: 'Chính xác! Chụp màn hình giúp lưu giữ chứng cứ nguyên vẹn để gửi cho Thầy Cô và cơ quan chức năng xử lý.'
        },
        {
          id: 'q4_2',
          type: 'true_false',
          question: 'Đánh giá tính Đúng / Sai của nhận định sau:',
          statement: 'Dùng tài khoản ẩn danh (nick ảo) trên Facebook/TikTok để xúc phạm người khác thì cơ quan công an không thể tìm ra danh tính.',
          isTrue: false,
          explanation: 'Nhận định SAI! Địa chỉ IP, thiết bị và dấu vết kỹ thuật số luôn được nhà mạng và an ninh mạng truy vết chính xác theo Luật An ninh mạng.'
        },
        {
          id: 'q4_3',
          type: 'matching',
          question: 'Ghép 3 bước vàng ứng phó bạo lực mạng với hành động tương ứng:',
          explanation: 'Xuất sắc! Quy tắc 3 Bước Vàng: Chụp bằng chứng -> Chặn & Báo cáo -> Chia sẻ với người lớn.',
          pairs: [
            { id: 'p4_1', left: 'Bước 1: Lưu minh chứng', right: 'Chụp ảnh màn hình tin nhắn, bài viết và đường link' },
            { id: 'p4_2', left: 'Bước 2: Ngăn chặn quấy rối', right: 'Chặn (Block) tài khoản và báo cáo vi phạm lên nền tảng' },
            { id: 'p4_3', left: 'Bước 3: Tìm trợ giúp', right: 'Báo cáo ngay với Thầy Cô chủ nhiệm và Cha Mẹ' }
          ]
        },
        {
          id: 'q4_4',
          type: 'fill_blank',
          question: 'Điền từ còn thiếu vào nguyên tắc ứng xử mạng xã hội:',
          sentenceBefore: 'Khi bị tấn công bằng ngôn từ trên mạng, tuyệt đối không',
          sentenceAfter: 'vì sẽ làm sự việc bùng phát nghiêm trọng hơn.',
          correctWord: 'đáp trả bằng bạo lực',
          wordBank: ['đáp trả bằng bạo lực', 'báo cáo Thầy Cô', 'chụp màn hình', 'chặn nick xấu'],
          explanation: 'Chính xác! Không bao giờ dùng ngôn từ bạo lực để trả đũa trên mạng.'
        }
      ]
    },
    summary: [
      'Không bao giờ trả đũa bằng ngôn từ bạo lực trên mạng. Luôn lưu giữ minh chứng số và tìm kiếm sự hỗ trợ kịp thời.'
    ],
    message: '💻 "Ứng xử văn minh trên mạng xã hội – Bảo vệ bản thân và tôn trọng cộng đồng số!"',
    material: null
  },
  {
    id: 'l5',
    title: 'Bài 5: Vì sao bạo lực học đường xảy ra?',
    category: 'bullying',
    duration: '10 phút',
    desc: 'Tìm hiểu nguyên nhân từ cá nhân, bạn bè, gia đình, nhà trường và môi trường mạng.',
    objectives: [
      'Phân tích các nguyên nhân sâu xa dẫn đến hành vi bạo lực học đường.',
      'Nhận diện các yếu tố tâm lý để chủ động phòng tránh xung đột.'
    ],
    content: [
      'Nguyên nhân cá nhân: Thiếu kỹ năng kiềm chế cảm xúc, hiếu thắng, bốc đồng, muốn chứng tỏ bản thân.',
      'Nguyên nhân môi trường: Bị rủ rê bởi nhóm bạn xấu, bắt chước phim ảnh bạo lực, thiếu sự quan tâm và lắng nghe từ gia đình/nhà trường.'
    ],
    game: {
      question: 'Yếu tố cá nhân nào dễ dẫn đến mâu thuẫn và xô xát nhất?',
      options: [
        'A. Biết lắng nghe và tôn trọng ý kiến khác biệt của bạn.',
        'B. Nóng tính, thiếu khả năng kiềm chế cảm xúc khi gặp chuyện bực mình.',
        'C. Chủ động nói lời xin lỗi khi bản thân làm sai.'
      ],
      correct: 1,
      explanation: 'Đúng! Việc thiếu kiềm chế cảm xúc trong lúc tức giận là nguyên nhân hàng đầu dẫn đến các vụ ẩu đả đáng tiếc.',
      questions: [
        {
          id: 'q5_1',
          type: 'single_choice',
          question: 'Yếu tố tâm lý cá nhân nào dễ dẫn đến hành vi bạo lực học đường nhất?',
          options: [
            'A. Biết lắng nghe và tôn trọng sự khác biệt của bạn.',
            'B. Tính hiếu thắng, nóng nảy, thiếu kỹ năng kiềm chế cảm xúc khi tức giận.',
            'C. Chủ động tìm Thầy Cô hòa giải khi có hiểu lầm.',
            'D. Thường xuyên tham gia các hoạt động thể thao lành mạnh.'
          ],
          correct: 1,
          explanation: 'Chính xác! Thiếu kiềm chế cảm xúc và tính bốc đồng là nguyên nhân cá nhân hàng đầu dẫn đến xô xát.'
        },
        {
          id: 'q5_2',
          type: 'true_false',
          question: 'Đánh giá tính Đúng / Sai của nhận định sau:',
          statement: 'Bắt chước các hành vi đánh nhau, chửi bới trong phim ảnh bạo lực hoặc game giang hồ có thể làm tăng nguy cơ bạo lực học đường.',
          isTrue: true,
          explanation: 'Đúng! Tiếp xúc thường xuyên với nội dung bạo lực trên mạng mà không có sự chọn lọc sẽ làm giảm sự thấu cảm và dễ dẫn đến hành vi sai trái.'
        },
        {
          id: 'q5_3',
          type: 'matching',
          question: 'Ghép nguyên nhân với giải pháp khắc phục tương ứng:',
          explanation: 'Rất chính xác! Nhận diện đúng nguyên nhân giúp tìm ra giải pháp tự rèn luyện hiệu quả.',
          pairs: [
            { id: 'p5_1', left: 'Dễ nổi giận mất kiểm soát', right: 'Thực hành bài tập thở 4-7-8 và đếm chậm 1 đến 10' },
            { id: 'p5_2', left: 'Bị rủ rê tham gia đánh nhau', right: 'Kiên quyết từ chối và báo Thầy Cô/Cha Mẹ' },
            { id: 'p5_3', left: 'Bất đồng ý kiến trong nhóm', right: 'Ngồi lại bình tĩnh đối thoại và lắng nghe bạn' }
          ]
        },
        {
          id: 'q5_4',
          type: 'fill_blank',
          question: 'Điền từ còn thiếu vào nhận định:',
          sentenceBefore: 'Học cách',
          sentenceAfter: 'là bước đầu tiên để ngăn ngừa mọi mâu thuẫn trở thành bạo lực.',
          correctWord: 'làm chủ cảm xúc',
          wordBank: ['làm chủ cảm xúc', 'dùng nắm đấm', 'im lặng chịu đựng', 'khoe khoang'],
          explanation: 'Chính xác! Làm chủ cảm xúc bản thân là chìa khóa vàng của người văn minh.'
        }
      ]
    },
    summary: [
      'Hiểu rõ nguyên nhân giúp chúng ta rèn luyện khả năng tự kiểm soát và phòng ngừa mâu thuẫn từ sớm.'
    ],
    message: '🌱 "Hiểu rõ bản thân là bước đầu tiên để làm chủ cơn giận và nuôi dưỡng tình bạn bền chặt!"',
    material: null
  },
  {
    id: 'l6',
    title: 'Bài 6: Hậu quả của bạo lực học đường',
    category: 'bullying',
    duration: '12 phút',
    desc: 'Hiểu những ảnh hưởng đối với nạn nhân, người gây bạo lực, người chứng kiến và tập thể.',
    objectives: [
      'Nhận thức sâu sắc về tác hại toàn diện và lâu dài của bạo lực học đường.',
      'Thấu cảm với nỗi đau của người bị hại để có hành động can ngăn đúng đắn.'
    ],
    content: [
      'Đối với nạn nhân: Tổn hại sức khỏe, sang chấn tâm lý, trầm cảm, sợ đến trường, sa sút học tập.',
      'Đối với người gây bạo lực: Bị kỷ luật, hạ hạnh kiểm, bị bạn bè xa lánh, thậm chí đối mặt với trách nhiệm pháp lý khi đủ tuổi.',
      'Đối với tập thể: Môi trường lớp học trở nên căng thẳng, mất đi sự an toàn và niềm vui học tập.'
    ],
    game: {
      question: 'Bạo lực học đường để lại hậu quả gì nghiêm trọng nhất cho người bị bắt nạt?',
      options: [
        'A. Giúp bạn mạnh mẽ hơn mà không để lại vết thương nào.',
        'B. Gây tổn thương thể xác, lo âu, sợ hãi kéo dài và ảnh hưởng nặng nề đến tương lai.',
        'C. Không gây ảnh hưởng đáng kể đến cuộc sống.'
      ],
      correct: 1,
      explanation: 'Chính xác! Những vết sẹo tâm lý do bạo lực gây ra có thể kéo dài suốt cuộc đời nếu không được can thiệp kịp thời.',
      questions: [
        {
          id: 'q6_1',
          type: 'single_choice',
          question: 'Người có hành vi bạo lực học đường sẽ phải đối mặt với hậu quả gì?',
          options: [
            'A. Được bạn bè nể sợ và tôn vinh làm thủ lĩnh.',
            'B. Bị xử lý kỷ luật, hạ hạnh kiểm, bị bạn bè xa lánh và chịu trách nhiệm pháp lý.',
            'C. Không phải chịu bất kỳ hình thức kỷ luật nào từ nhà trường.',
            'D. Được khen thưởng vì sự dũng cảm.'
          ],
          correct: 1,
          explanation: 'Chính xác! Người gây bạo lực sẽ bị xử lý kỷ luật nghiêm khắc, hạ hạnh kiểm và đối mặt trách nhiệm pháp luật.'
        },
        {
          id: 'q6_2',
          type: 'true_false',
          question: 'Đánh giá tính Đúng / Sai của nhận định sau:',
          statement: 'Tổn thương tâm lý do bị bạo lực tinh thần có thể kéo dài nhiều năm và nguy hiểm không kém thương tích thể xác.',
          isTrue: true,
          explanation: 'Đúng! Sang chấn tâm lý, trầm cảm và mặc cảm lo âu có thể ảnh hưởng nặng nề đến cuộc sống và tương lai của nạn nhân.'
        },
        {
          id: 'q6_3',
          type: 'matching',
          question: 'Ghép đối tượng chịu ảnh hưởng với hậu quả tương ứng:',
          explanation: 'Chính xác! Bạo lực học đường gây tổn hại cho tất cả các đối tượng trong môi trường học đường.',
          pairs: [
            { id: 'p6_1', left: 'Đối với nạn nhân', right: 'Tổn hại sức khỏe, sợ hãi, sa sút học tập và tâm lý' },
            { id: 'p6_2', left: 'Đối với người gây bạo lực', right: 'Hạ hạnh kiểm, bị đình chỉ học, mang vết đen học bạ' },
            { id: 'p6_3', left: 'Đối với tập thể lớp học', right: 'Môi trường căng thẳng, mất an toàn và tình đoàn kết' }
          ]
        },
        {
          id: 'q6_4',
          type: 'fill_blank',
          question: 'Điền từ thích hợp vào bài học:',
          sentenceBefore: 'Bạo lực học đường không có người chiến thắng, chỉ để lại',
          sentenceAfter: 'và sự hối hận cho tất cả những người trong cuộc.',
          correctWord: 'nỗi đau',
          wordBank: ['nỗi đau', 'vinh quang', 'tiếng cười', 'chiến thắng'],
          explanation: 'Chính xác! Bạo lực chỉ để lại nỗi đau và sự hối hận khôn nguôi.'
        }
      ]
    },
    summary: [
      'Bạo lực học đường chỉ đem lại nỗi đau và sự hối hận cho tất cả các bên tham gia.'
    ],
    message: '🤝 "Không có bất kỳ lý do nào có thể bào chữa cho hành vi bạo lực. Hãy cùng chung tay bảo vệ nhau!"',
    material: null
  },
  {
    id: 'l7',
    title: 'Bài 7: Kỹ năng tự bảo vệ khi bị bạo lực',
    category: 'skills',
    duration: '15 phút',
    desc: 'Biết cách bình tĩnh, tránh nguy hiểm, tìm kiếm sự giúp đỡ và bảo vệ bản thân đúng cách.',
    objectives: [
      'Nắm vững quy trình 3 bước tự vệ an toàn khi đối mặt với tình huống nguy hiểm.',
      'Sử dụng thành thạo các kênh báo động khẩn cấp và đường dây nóng.'
    ],
    content: [
      'Bước 1: BÌNH TĨNH - Hít thở sâu, không thách thức, giữ khoảng cách an toàn.',
      'Bước 2: THOÁT HIỂM - Nhanh chóng di chuyển về phía có đông người, phòng Bảo vệ hoặc phòng Hội đồng Giáo viên.',
      'Bước 3: BÁO CÁO - Bấm nút SOS trên app An Toàn Học Đường, gọi Tổng đài 111 hoặc nhờ người lớn can thiệp.'
    ],
    game: {
      question: 'Địa điểm nào là an toàn nhất để em chạy đến khi bị kẻ xấu chặn đường đe dọa tại trường?',
      options: [
        'A. Chạy trốn vào góc khuất sau nhà xe.',
        'B. Chạy thẳng về phía phòng Bảo vệ, phòng Giáo viên hoặc khu vực sân trường đang có đông người.',
        'C. Đứng yên tại chỗ chịu đòn.'
      ],
      correct: 1,
      explanation: 'Rất chính xác! Luôn hướng về khu vực có sự hiện diện của Thầy Cô và người lớn để nhận sự bảo vệ ngay lập tức.',
      questions: [
        {
          id: 'q7_1',
          type: 'single_choice',
          question: 'Địa điểm nào an toàn nhất để chạy đến khi bị đối tượng xấu chặn đường đe dọa trong khuôn viên trường?',
          options: [
            'A. Chạy trốn vào góc tối sau nhà xe vắng vẻ.',
            'B. Chạy thẳng về phía phòng Bảo vệ, phòng Giáo viên hoặc khu vực sân trường đông người.',
            'C. Đứng yên chịu đòn và không dám nói với ai.',
            'D. Chạy vào nhà vệ sinh khóa trái cửa một mình.'
          ],
          correct: 1,
          explanation: 'Rất chính xác! Luôn di chuyển về phía có người lớn và Thầy Cô để được bảo vệ kịp thời.'
        },
        {
          id: 'q7_2',
          type: 'true_false',
          question: 'Đánh giá tính Đúng / Sai của nhận định sau:',
          statement: 'Khi bị kẻ xấu đe dọa, việc thách thức và dùng lời lẽ khiêu khích sẽ giúp kẻ xấu sợ hãi và bỏ đi.',
          isTrue: false,
          explanation: 'Nhận định SAI! Khiêu khích sẽ kích động đối phương ra tay bạo lực mạnh hơn. Cần giữ bình tĩnh, tìm cơ hội thoát hiểm và kêu cứu.'
        },
        {
          id: 'q7_3',
          type: 'matching',
          question: 'Ghép kênh hỗ trợ khẩn cấp với số điện thoại / tính năng tương ứng:',
          explanation: 'Tuyệt vời! Hãy luôn ghi nhớ số 111 và nút SOS trên ứng dụng của trường.',
          pairs: [
            { id: 'p7_1', left: 'Tổng đài Quốc gia Bảo vệ Trẻ em', right: '111 (Miễn phí 24/7)' },
            { id: 'p7_2', left: 'Cảnh sát phản ứng nhanh', right: '113' },
            { id: 'p7_3', left: 'Báo động nguy cấp trên App', right: 'Nút SOS nhấp nháy đỏ trên màn hình' }
          ]
        },
        {
          id: 'q7_4',
          type: 'fill_blank',
          question: 'Điền vào công thức 3 bước tự bảo vệ an toàn:',
          sentenceBefore: 'Quy tắc vàng khi gặp nguy hiểm gồm 3 bước: 1. Bình tĩnh -> 2.',
          sentenceAfter: '-> 3. Báo cáo ngay cho người lớn.',
          correctWord: 'Thoát hiểm',
          wordBank: ['Thoát hiểm', 'Đánh trả', 'Quay phim', 'Im lặng'],
          explanation: 'Chính xác! "Bình tĩnh - Thoát hiểm - Báo cáo" là nguyên tắc vàng bảo vệ an toàn tính mạng.'
        }
      ]
    },
    summary: [
      'Quy tắc vàng tự bảo vệ: Bình tĩnh - Thoát hiểm - Báo cáo kịp thời.'
    ],
    message: '🚨 "An toàn và tính mạng của em là trên hết! Đừng ngần ngại kêu gọi sự trợ giúp khẩn cấp!"',
    material: null
  },
  {
    id: 'l8',
    title: 'Bài 8: Khi chứng kiến bạn bị bắt nạt – Em sẽ làm gì?',
    category: 'skills',
    duration: '12 phút',
    desc: 'Học cách hỗ trợ bạn an toàn, báo cho người lớn và không cổ vũ hoặc quay phim hành vi bạo lực.',
    objectives: [
      'Trở thành người hỗ trợ tích cực, không làm khán giả vô cảm hay tiếp tay cho bạo lực.',
      'Biết cách báo tin bí mật và an toàn cho nhà trường.'
    ],
    content: [
      'Nói KHÔNG với việc đứng cổ vũ, reo hò hoặc dùng điện thoại quay clip để câu view.',
      'Hành động đúng đắn: Kín đáo đi gọi Thầy Cô, bấm nút Báo Cáo Sự Cố Ẩn Danh trên ứng dụng, và động viên, an ủi bạn sau sự việc.'
    ],
    game: {
      question: 'Hành động đúng đắn và dũng cảm nhất khi thấy bạn cùng trường bị bắt nạt là gì?',
      options: [
        'A. Đứng reo hò cổ vũ và quay video đăng lên mạng xã hội.',
        'B. Nhanh chóng đi báo Thầy Cô/Bảo vệ và sau đó động viên, đồng hành cùng bạn.',
        'C. Quay lưng bỏ đi coi như không thấy.'
      ],
      correct: 1,
      explanation: 'Chính xác! Lên tiếng báo cho người có thẩm quyền xử lý và an ủi nạn nhân là hành động văn minh và nhân ái.',
      questions: [
        {
          id: 'q8_1',
          type: 'single_choice',
          question: 'Hành động nào của người chứng kiến bị coi là TIẾP TAY cho hành vi bạo lực?',
          options: [
            'A. Đứng reo hò, cổ vũ và dùng điện thoại quay clip đăng mạng xã hội.',
            'B. Chạy đi gọi Thầy Cô giáo đến can thiệp.',
            'C. Lên tiếng nhắc nhở các bạn dừng tay lại.',
            'D. Bấm gửi báo cáo sự cố ẩn danh trên ứng dụng nhà trường.'
          ],
          correct: 0,
          explanation: 'Chính xác! Đứng reo hò, quay clip câu view là hành vi cổ súy và tiếp tay cho bạo lực rất đáng lên án.'
        },
        {
          id: 'q8_2',
          type: 'true_false',
          question: 'Đánh giá tính Đúng / Sai của nhận định sau:',
          statement: 'Báo cho Thầy Cô khi thấy bạn bị bắt nạt là hành động "mách lẻo xấu tính".',
          isTrue: false,
          explanation: 'Nhận định SAI! Báo cáo sự việc để bảo vệ bạn bè là hành động dũng cảm, nhân văn và có trách nhiệm của người học sinh tốt.'
        },
        {
          id: 'q8_3',
          type: 'matching',
          question: 'Ghép hành vi chứng kiến với bản chất tương ứng:',
          explanation: 'Rất đúng! Hãy luôn chọn làm Người hỗ trợ dũng cảm, không vô cảm.',
          pairs: [
            { id: 'p8_1', left: 'Đứng xem, cổ vũ, quay clip', right: 'Khán giả tiêu cực, tiếp tay bạo lực' },
            { id: 'p8_2', left: 'Kín đáo đi báo Thầy Cô can thiệp', right: 'Người bảo vệ tích cực và dũng cảm' },
            { id: 'p8_3', left: 'Hỏi thăm, lắng nghe và an ủi bạn', right: 'Người bạn chân thành và thấu cảm' }
          ]
        },
        {
          id: 'q8_4',
          type: 'fill_blank',
          question: 'Điền từ còn thiếu vào châm ngôn:',
          sentenceBefore: 'Sự',
          sentenceAfter: 'của người chứng kiến chính là mảnh đất màu mỡ cho kẻ bắt nạt tiếp tục lộng hành.',
          correctWord: 'im lặng vô cảm',
          wordBank: ['im lặng vô cảm', 'dũng cảm', 'lên tiếng', 'yêu thương'],
          explanation: 'Chính xác! Lên tiếng bảo vệ lẽ phải là trách nhiệm của mỗi chúng ta.'
        }
      ]
    },
    summary: [
      'Sự im lặng của người chứng kiến là mảnh đất màu mỡ cho bạo lực phát triển. Hãy lên tiếng bảo vệ lẽ phải.'
    ],
    message: '🤝 "Một hành động báo cáo kịp thời của em có thể cứu giúp cả một cuộc đời của người bạn!"',
    material: null
  },
  {
    id: 'l9',
    title: 'Bài 9: Nói không với bạo lực',
    category: 'skills',
    duration: '10 phút',
    desc: 'Rèn luyện kỹ năng kiểm soát cảm xúc, giải quyết mâu thuẫn và từ chối tham gia bạo lực.',
    objectives: [
      'Rèn luyện bản lĩnh kiên quyết từ chối khi bị rủ rê tham gia đánh nhau hoặc bắt nạt.',
      'Áp dụng các kỹ thuật giải tỏa căng thẳng lành mạnh.'
    ],
    content: [
      'Kỹ năng từ chối: Kiên định nói lời từ chối và giải thích hậu quả nguy hiểm của bạo lực.',
      'Giải tỏa năng lượng tiêu cực qua thể thao, âm nhạc, viết nhật ký hoặc thực hành bài tập thở 4-7-8.'
    ],
    game: {
      question: 'Khi một người bạn rủ em tham gia đánh nhau để "dằn mặt" một bạn lớp bên, em nên phản ứng thế nào?',
      options: [
        'A. "Tớ không tham gia đâu, bạo lực sẽ chỉ khiến chúng mình bị kỷ luật và làm mọi chuyện tệ hơn. Cậu cũng dừng lại đi!"',
        'B. Đồng ý đi ngay vì sợ bị bạn coi thường.',
        'C. Im lặng đi theo đứng xem để ủng hộ.'
      ],
      correct: 0,
      explanation: 'Tuyệt vời! Kiên quyết từ chối và khuyên can bạn bè dừng lại là biểu hiện của người có bản lĩnh và trách nhiệm.',
      questions: [
        {
          id: 'q9_1',
          type: 'single_choice',
          question: 'Khi bị bạn bè rủ rê đi đánh nhau để "giải quyết mâu thuẫn", câu trả lời nào thể hiện bản lĩnh vững vàng nhất?',
          options: [
            'A. "Tớ không tham gia. Đánh nhau chỉ làm bị kỷ luật và hỏng tương lai, cậu cũng nên dừng lại đi!"',
            'B. "Sợ quá, cho tớ đi theo đứng xem thôi nhé."',
            'C. "Được rồi, tớ sẽ mang gậy đi giúp cậu."',
            'D. "Đánh xong nhớ chia tiền cho tớ nhé."'
          ],
          correct: 0,
          explanation: 'Tuyệt vời! Kiên quyết từ chối và khuyên can bạn dừng lại là biểu hiện của người có bản lĩnh và trí tuệ.'
        },
        {
          id: 'q9_2',
          type: 'true_false',
          question: 'Đánh giá tính Đúng / Sai của nhận định sau:',
          statement: 'Phương pháp hít thở sâu 4-7-8 và tập thể thao là cách hiệu quả để xoa dịu cơn giận và lấy lại bình tĩnh.',
          isTrue: true,
          explanation: 'Đúng! Khoa học chứng minh hít thở sâu kích hoạt hệ thần kinh phó giao cảm giúp nhịp tim ổn định và giảm stress tức thì.'
        },
        {
          id: 'q9_3',
          type: 'matching',
          question: 'Ghép tình huống với cách từ chối khéo léo và an toàn:',
          explanation: 'Chính xác! Luôn kiên định với giá trị an toàn và không bị thao túng tâm lý.',
          pairs: [
            { id: 'p9_1', left: 'Bị rủ tham gia nhóm tẩy chay', right: '"Tớ thấy bạn ấy không có lỗi gì, tớ không tham gia tẩy chay đâu"' },
            { id: 'p9_2', left: 'Bị ép hút thuốc / đánh nhau', right: '"Tớ muốn bảo vệ sức khỏe và không muốn bị đuổi học, tớ từ chối"' },
            { id: 'p9_3', left: 'Bị rủ lập nick bêu xấu bạn', right: '"Vi phạm pháp luật an ninh mạng đấy, tớ không làm đâu"' }
          ]
        },
        {
          id: 'q9_4',
          type: 'fill_blank',
          question: 'Điền từ thích hợp vào nhận định:',
          sentenceBefore: 'Bản lĩnh thực sự của tuổi trẻ nằm ở sự',
          sentenceAfter: 'và lòng nhân ái, không bao giờ nằm ở bạo lực và nắm đấm.',
          correctWord: 'kiềm chế',
          wordBank: ['kiềm chế', 'hiếu thắng', 'đe dọa', 'áp bức'],
          explanation: 'Chính xác! Biết kiềm chế cơn giận là đỉnh cao của sự trưởng thành.'
        }
      ]
    },
    summary: [
      'Dũng cảm từ chối hành vi sai trái và kiểm soát cảm xúc là chìa khóa để trưởng thành an toàn.'
    ],
    message: '✨ "Sức mạnh thực sự nằm ở sự kiềm chế và tình yêu thương, không bao giờ nằm ở nắm đấm!"',
    material: null
  },
  {
    id: 'l10',
    title: 'Bài 10: Giải quyết mâu thuẫn không dùng bạo lực',
    category: 'skills',
    duration: '15 phút',
    desc: 'Thực hành lắng nghe, giao tiếp tích cực, xin lỗi, thỏa thuận và tìm người hỗ trợ khi cần.',
    objectives: [
      'Nắm vững quy trình 4 bước hòa giải mâu thuẫn học đường một cách văn minh.',
      'Sử dụng ngôn ngữ giao tiếp không bạo lực (Nonviolent Communication).'
    ],
    content: [
      'Bước 1: Lắng nghe đối phương trình bày mà không ngắt lời.',
      'Bước 2: Bày tỏ cảm xúc bằng mẫu câu "Tớ cảm thấy... khi..." thay vì chỉ trích, đổ lỗi.',
      'Bước 3: Cùng thảo luận tìm giải pháp công bằng cho cả hai.',
      'Bước 4: Nhờ Thầy Cô chủ nhiệm hoặc phòng Tham vấn học đường hỗ trợ khi bất đồng kéo dài.'
    ],
    game: {
      question: 'Cách bày tỏ nào dưới đây giúp xoa dịu mâu thuẫn hiệu quả nhất?',
      options: [
        'A. "Tại cậu mà mọi chuyện mới hỏng bét đấy!"',
        'B. "Tớ cảm thấy buồn khi chúng mình hiểu lầm nhau. Chúng mình cùng ngồi lại nói chuyện nhé."',
        'C. "Cậu không biết gì cả, đừng có nói nữa!"'
      ],
      correct: 1,
      explanation: 'Chính xác! Bày tỏ cảm xúc chân thành và tinh thần xây dựng giúp bạn bè cởi mở và dễ dàng thông cảm cho nhau hơn.',
      questions: [
        {
          id: 'q10_1',
          type: 'single_choice',
          question: 'Cách diễn đạt nào dưới đây thể hiện kỹ năng Giao tiếp không bạo lực (NVC)?',
          options: [
            'A. "Cậu là đồ ích kỷ, lúc nào cũng làm hỏng việc của người khác!"',
            'B. "Tớ cảm thấy rất buồn khi đồ của tớ bị lấy mà chưa hỏi ý kiến. Lần sau cậu hỏi tớ trước nhé."',
            'C. "Tại cậu mà nhóm mình bị điểm kém, cậu phải chịu trách nhiệm!"',
            'D. "Tớ không muốn nhìn mặt cậu nữa."'
          ],
          correct: 1,
          explanation: 'Chính xác! Diễn đạt cảm xúc chân thành và nêu mong muốn cụ thể giúp đối phương tiếp nhận thiện chí.'
        },
        {
          id: 'q10_2',
          type: 'true_false',
          question: 'Đánh giá tính Đúng / Sai của nhận định sau:',
          statement: 'Nói lời xin lỗi chân thành khi mình có lỗi là biểu hiện của sự yếu đuối và nhượng bộ.',
          isTrue: false,
          explanation: 'Nhận định SAI! Biết nhận lỗi và chân thành xin lỗi là biểu hiện của người văn minh, dũng cảm và có lòng tự trọng cao.'
        },
        {
          id: 'q10_3',
          type: 'matching',
          question: 'Ghép 4 bước hòa giải mâu thuẫn với nội dung thực hiện tương ứng:',
          explanation: 'Rất tốt! Nắm chắc quy trình 4 bước giúp giải quyết mọi bất đồng êm đẹp.',
          pairs: [
            { id: 'p10_1', left: 'Bước 1: Lắng nghe', right: 'Để đối phương trình bày hết quan điểm mà không ngắt lời' },
            { id: 'p10_2', left: 'Bước 2: Bày tỏ cảm xúc', right: 'Dùng mẫu câu "Tớ cảm thấy..." thay vì đổ lỗi' },
            { id: 'p10_3', left: 'Bước 3: Tìm giải pháp', right: 'Thương lượng phương án mà cả hai bên đều đồng ý' },
            { id: 'p10_4', left: 'Bước 4: Nhờ hòa giải', right: 'Tìm Thầy Cô / Chuyên gia tâm lý khi bất đồng bế tắc' }
          ]
        },
        {
          id: 'q10_4',
          type: 'fill_blank',
          question: 'Điền từ còn thiếu vào bài học giao tiếp:',
          sentenceBefore: 'Một lời xin lỗi chân thành và một thái độ',
          sentenceAfter: 'có thể dập tắt ngọn lửa giận dữ lớn nhất.',
          correctWord: 'biết lắng nghe',
          wordBank: ['biết lắng nghe', 'thách thức', 'thờ ơ', 'trả đũa'],
          explanation: 'Chính xác! Lắng nghe chân thành là chiếc cầu nối hàn gắn mọi tình bạn.'
        }
      ]
    },
    summary: [
      'Lắng nghe - Thấu hiểu - Thương lượng hòa bình - Nhờ tư vấn khi cần thiết.'
    ],
    message: '🕊️ "Mọi mâu thuẫn đều có thể được tháo gỡ bằng sự chân thành, tôn trọng và đối thoại thiện chí!"',
    material: null
  },
  {
    id: 'l11',
    title: 'Bài 11: Báo cáo bạo lực học đường đúng cách',
    category: 'bullying',
    duration: '12 phút',
    desc: 'Biết khi nào cần báo cáo, báo cáo với ai, cung cấp thông tin gì và cách giữ an toàn cho người báo cáo.',
    objectives: [
      'Sử dụng thành thạo tính năng Báo Cáo Sự Cố Ẩn Danh và khẩn cấp trên ứng dụng.',
      'Cung cấp thông tin và minh chứng chính xác, có giá trị cho nhà trường.'
    ],
    content: [
      'Chế độ Báo Cáo Ẩn Danh: Cam kết bảo mật 100% danh tính học sinh, chỉ Ban Giám Hiệu và Thầy Cô phụ trách tiếp nhận.',
      'Nội dung cần có trong báo cáo: Thời gian, địa điểm cụ thể, mô tả sự việc, mức độ khẩn cấp và minh chứng đính kèm (hình ảnh, video, ghi âm, tài liệu).'
    ],
    game: {
      question: 'Khi sử dụng tính năng Báo Cáo Ẩn Danh trên ứng dụng, danh tính của em sẽ được bảo vệ thế nào?',
      options: [
        'A. Bị công khai tên tuổi cho cả trường biết.',
        'B. Được bảo mật tuyệt đối, thông tin chỉ được gửi trực tiếp đến Ban Giám Hiệu để kịp thời xử lý và bảo vệ học sinh.',
        'C. Bị lưu lại để phạt em.'
      ],
      correct: 1,
      explanation: 'Rất đúng! Hệ thống an toàn học đường cam kết bảo mật danh tính tuyệt đối cho người báo cáo để các em hoàn toàn yên tâm chia sẻ.',
      questions: [
        {
          id: 'q11_1',
          type: 'single_choice',
          question: 'Khi gửi Báo Cáo Sự Cố Ẩn Danh trên ứng dụng trường THCS Lê Quý Đôn, thông tin của em được xử lý ra sao?',
          options: [
            'A. Bị công khai tên tuổi cho toàn trường.',
            'B. Được bảo mật tuyệt đối, thông tin mã hóa chỉ chuyển đến Ban Giám Hiệu xử lý.',
            'C. Bị gửi cho người gây bạo lực để đối chất.',
            'D. Bị lưu trữ để đánh giá hạ điểm rèn luyện.'
          ],
          correct: 1,
          explanation: 'Rất đúng! Chế độ ẩn danh bảo mật 100% danh tính học sinh để các em luôn yên tâm và an toàn.'
        },
        {
          id: 'q11_2',
          type: 'true_false',
          question: 'Đánh giá tính Đúng / Sai của nhận định sau:',
          statement: 'Đính kèm hình ảnh, video hoặc ghi âm minh chứng khi báo cáo sự cố sẽ giúp nhà trường xác minh và can thiệp nhanh chóng, chính xác hơn.',
          isTrue: true,
          explanation: 'Đúng! Minh chứng xác thực giúp Ban Giám Hiệu nắm bắt sự thật khách quan và bảo vệ nạn nhân kịp thời.'
        },
        {
          id: 'q11_3',
          type: 'matching',
          question: 'Ghép mức độ khẩn cấp của báo cáo với tình huống phù hợp:',
          explanation: 'Chính xác! Phân loại đúng mức độ giúp nhà trường ưu tiên lực lượng ứng phó.',
          pairs: [
            { id: 'p11_1', left: 'Mức 🚨 SOS Nguy cấp', right: 'Đang có đánh nhau bằng hung khí, nguy hiểm tính mạng' },
            { id: 'p11_2', left: 'Mức 🟠 Cảnh báo cao', right: 'Đang bị dọa nạt, tống tiền, bôi nhọ trên mạng xã hội' },
            { id: 'p11_3', left: 'Mức 🟡 Cần hỗ trợ', right: 'Bất đồng bạn bè cần Thầy Cô hòa giải tâm lý' }
          ]
        },
        {
          id: 'q11_4',
          type: 'fill_blank',
          question: 'Điền từ còn thiếu vào nguyên tắc bảo vệ:',
          sentenceBefore: 'Nhà trường cam kết bảo vệ',
          sentenceAfter: 'cho tất cả học sinh dũng cảm lên tiếng báo cáo sự cố.',
          correctWord: 'an toàn tuyệt đối',
          wordBank: ['an toàn tuyệt đối', 'thông tin một phần', 'phần thưởng vật chất', 'điểm số cao'],
          explanation: 'Chính xác! Sự an toàn của học sinh luôn là ưu tiên hàng đầu của nhà trường.'
        }
      ]
    },
    summary: [
      'Báo cáo an toàn - Bảo mật thông tin - Kịp thời ngăn chặn rủi ro bạo lực học đường.'
    ],
    message: '📞 "Hãy tin tưởng vào Thầy Cô và Nhà trường. Chúng tôi luôn ở đây để lắng nghe và bảo vệ em!"',
    material: null
  },
  {
    id: 'l12',
    title: 'Bài 12: Xây dựng trường học an toàn – không bạo lực',
    category: 'skills',
    duration: '15 phút',
    desc: 'Cùng xây dựng môi trường học đường thân thiện, tôn trọng, yêu thương và bảo vệ lẫn nhau.',
    objectives: [
      'Trở thành Sứ giả An Toàn Học Đường, lan tỏa lối sống văn minh và tích cực.',
      'Chủ động tham gia xây dựng lớp học hạnh phúc và đoàn kết.'
    ],
    content: [
      'Tích cực tham gia các hoạt động Đội, câu lạc bộ và phong trào thi đua tình bạn đẹp.',
      'Lan tỏa những lời nói hay, cử chỉ đẹp, chủ động kết nối và hỗ trợ các bạn còn rụt rè trong lớp.'
    ],
    game: {
      question: 'Mỗi học sinh chúng ta có thể làm gì để trường THCS Lê Quý Đôn trở nên an toàn và hạnh phúc hơn?',
      options: [
        'A. Thắt chặt tình bạn, tôn trọng sự khác biệt, yêu thương và giúp đỡ bạn bè cùng tiến bộ.',
        'B. Chỉ chơi với những bạn học giỏi, xa lánh những bạn có hoàn cảnh khó khăn.',
        'C. Lập hội nhóm riêng để cạnh tranh và gây áp lực cho các lớp khác.'
      ],
      correct: 0,
      explanation: 'Tuyệt vời! Sự tôn trọng, sẻ chia và tình yêu thương chân thành chính là nền tảng vững chắc nhất cho một ngôi trường hạnh phúc.',
      questions: [
        {
          id: 'q12_1',
          type: 'single_choice',
          question: 'Hành động nào của mỗi học sinh góp phần trực tiếp xây dựng Trường THCS Lê Quý Đôn hạnh phúc?',
          options: [
            'A. Tôn trọng sự khác biệt, giúp đỡ bạn bè và lan tỏa năng lượng tích cực.',
            'B. Lập hội nhóm riêng để gây áp lực với các bạn rụt rè.',
            'C. Chỉ chơi với những bạn giàu có, coi thường bạn nghèo.',
            'D. Thờ ơ với các hoạt động đoàn thể của trường.'
          ],
          correct: 0,
          explanation: 'Tuyệt vời! Tình yêu thương, tôn trọng và sẻ chia là nền tảng xây dựng ngôi trường hạnh phúc.'
        },
        {
          id: 'q12_2',
          type: 'true_false',
          question: 'Đánh giá tính Đúng / Sai của nhận định sau:',
          statement: 'Xây dựng trường học an toàn không bạo lực là trách nhiệm của riêng Thầy Cô và Bác Bảo vệ.',
          isTrue: false,
          explanation: 'Nhận định SAI! Mỗi học sinh, phụ huynh và giáo viên đều là một mắt xích quan trọng cùng chung tay kiến tạo môi trường học đường an toàn.'
        },
        {
          id: 'q12_3',
          type: 'matching',
          question: 'Ghép thông điệp 4 Tốt của học sinh trường Lê Quý Đôn:',
          explanation: 'Xuất sắc! Hãy ghi nhớ và thực hiện 4 Tốt mỗi ngày!',
          pairs: [
            { id: 'p12_1', left: 'Lời nói tốt', right: 'Dùng từ ngữ hòa nhã, lịch sự, tôn trọng bạn bè' },
            { id: 'p12_2', left: 'Hành động tốt', right: 'Giúp đỡ bạn cùng tiến, bảo vệ bạn khi bị bắt nạt' },
            { id: 'p12_3', left: 'Ứng xử mạng tốt', right: 'Không chia sẻ tin xấu độc, lan tỏa thông tin tích cực' }
          ]
        },
        {
          id: 'q12_4',
          type: 'fill_blank',
          question: 'Điền từ còn thiếu vào khẩu hiệu hành động:',
          sentenceBefore: 'Trường THCS Lê Quý Đôn: Nói KHÔNG với bạo lực - Cùng nhau xây dựng',
          sentenceAfter: 'và hạnh phúc!',
          correctWord: 'trường học an toàn',
          wordBank: ['trường học an toàn', 'thành tích cao', 'sân chơi lớn', 'câu lạc bộ'],
          explanation: 'Chính xác! Trường học an toàn và hạnh phúc là mục tiêu cao nhất của tất cả chúng ta.'
        }
      ]
    },
    summary: [
      'Mỗi học sinh là một hạt nhân quan trọng cùng vun đắp nên ngôi trường an toàn, thân thiện và hạnh phúc.'
    ],
    message: '🏫 "Trường học an toàn – Lớp học hạnh phúc – Nơi mỗi ngày đến trường là một ngày vui trọn vẹn!"',
    material: null
  }
];
