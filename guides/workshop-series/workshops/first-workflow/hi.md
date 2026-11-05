# सहकर्मी कार्यशाला: दोहराने योग्य कार्यप्रवाह की शुरुआत

**75 मिनट · 4–20 प्रतिभागी · कोड या Challenge डेटा की आवश्यकता नहीं**

Virtual Embryo Challenge के नए प्रतिभागियों, विद्यार्थियों और सहयोगियों के लिए facilitator guide। सभी अभ्यास काल्पनिक हैं। यह पहला अनुवाद सहायता-उपकरणों से बनाया गया है; हिंदी बोलने वाले पाठकों के सुधार आमंत्रित हैं।

## तैयारी और समय-सारणी

पहले आधिकारिक [Challenge](https://virtualembryo.ai/challenge), [नियम](https://virtualembryo.ai/challenge/rules) और [community resources](https://virtualembryo.ai/challenge/resources) देखें। वही निर्णायक स्रोत हैं और बदल सकते हैं। प्रतिभागियों से निजी डेटा, credentials, अप्रकाशित परिणाम या hidden evaluation files साझा न करने को कहें।

| समय | गतिविधि |
|---:|---|
| 0–8 मिनट | एक task चुनें और उसका prediction target बताएं। |
| 8–20 मिनट | उपयोगी resource खोजें; prerequisites और सीमाएं देखें। |
| 20–38 मिनट | file-format validation, local evaluation और official evaluation में अंतर करें। |
| 38–53 मिनट | बाहरी डेटा के काल्पनिक प्रस्ताव की जांच करें। |
| 53–66 मिनट | run को दोहराने के लिए जरूरी रिकॉर्ड लिखें। |
| 66–75 मिनट | अगला छोटा कदम और submission से पहले की एक जांच तय करें। |

## प्रतिभागी अभ्यास

1. एक खास जरूरत के लिए resource खोजें। वह किस प्रश्न का उत्तर देता है? उसकी बताई सीमा क्या है?
2. Validator `PASS` दिखाता है और एक pseudo-split पर Model A आगे है। क्या इससे normalization, external data की eligibility या hidden test पर बेहतर rank साबित होती है? कौन-सा प्रमाण चाहिए?
3. Public dataset उपयोग करने से पहले source/version, license, stage और tissue, task relevance, लागू official rule, और रखने योग्य provenance लिखें।
4. Reproducible run के लिए code revision, environment, configuration, random seed, command, अनुमत inputs और scored file दर्ज करें।

## उत्तर-संकेत

`PASS` केवल लागू किए गए checks को दर्शाता है। Local comparison उसी split और protocol का परिणाम है; यह hidden leaderboard की भविष्यवाणी नहीं। Public होना eligibility सिद्ध नहीं करता। Rule या license अस्पष्ट हो तो उपयोग रोकें। Logs, hashes और transcripts audit में मदद करते हैं, लेकिन अकेले पूर्ण compliance साबित नहीं करते।

**समापन:** हर व्यक्ति एक छोटा कदम, एक आधिकारिक पृष्ठ और submission से पहले सुलझाई जाने वाली अनिश्चितता लिखे। यह स्वतंत्र community सामग्री है, आधिकारिक कार्यक्रम या रणनीति सलाह नहीं।
