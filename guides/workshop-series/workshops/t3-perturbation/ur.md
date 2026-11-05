# ٹاسک 3 ورکشاپ: perturbation کے ردِعمل کی پیش گوئی

**75 منٹ · 4–20 شرکاء · کوڈ یا Challenge کے ڈیٹا کی ضرورت نہیں**

یہ سیشن conditional-knockout prediction task پر غور کرنے میں مدد دیتا ہے۔ بنیادی تعلیمی مقصد perturbation کے اثر کو wild-type background سے الگ کرنا ہے۔ یہ کسی biological mechanism یا modeling recipe کی تجویز نہیں دیتا۔

> یہ مشین کی مدد سے تیار کردہ ابتدائی ترجمہ ہے؛ مقامی زبان کے ماہرین کی اصلاحات خوش آمدید ہیں۔ [English اصل](en.md)۔

## تیاری

سرکاری [task descriptions](https://virtualembryo.ai/challenge/tasks)، [data schema](https://virtualembryo.ai/challenge/data)، اور موجودہ [rules](https://virtualembryo.ai/challenge/rules) کھولیں۔ کاغذ لائیں یا یہ رہنما شیئر کریں۔ مشقوں میں فرضی اعداد اور generic feature names استعمال کیے گئے ہیں۔ hidden-target measurements استعمال نہ کریں۔ سرکاری صفحات مستند ہیں اور بدل سکتے ہیں۔

## سیشن کا خاکہ

| منٹ | سرگرمی | سہولت کار کا سوال |
|---:|---|---|
| 0–8 | prediction واضح کریں | “Challenge model سے کیا بدلنے کو کہتا ہے؟” |
| 8–20 | conditions اور split کا نقشہ بنائیں | “کون سا knockout training، validation، یا hidden test میں ہے؟” |
| 20–38 | wild type سے موازنہ | مشق 1 استعمال کریں۔ |
| 38–52 | response metrics پڑھیں | مشق 2 استعمال کریں۔ |
| 52–65 | بیرونی source کا audit | مشق 3 استعمال کریں۔ |
| 65–72 | غیر یقینی بیان کریں | response کا ایک دعویٰ اور ایک حد لکھیں۔ |
| 72–75 | اختتام | موجودہ سرکاری صفحات اور کھلے سوالات پر واپس جائیں۔ |

## مشق 1 — background بمقابلہ response

درج ذیل ایک generic feature کے فرضی normalized toy values ہیں۔ یہ VEC کے حقیقی observations نہیں۔

| Condition | فرضی قدر |
|---|---:|
| matched wild type | 10.0 |
| perturbation, Model A | 10.1 |
| perturbation, Model B | 7.0 |

جوڑوں سے پوچھیں کہ کون سا model wild-type background کو reproduce کرتا ہے اور کون سا بڑا change predict کرتا ہے۔ پھر پوچھیں کہ صرف absolute-expression comparison اس model کو کیوں ترجیح دے سکتا ہے جو محض wild type کی نقل کرتا ہے۔

### جوابات

Model A wild-type value کے قریب رہتا ہے، اس لیے اس کا predicted change تقریباً صفر ہے۔ Model B بڑی کمی predict کرتا ہے۔ یہ toy example یہ نہیں بتاتا کہ حیاتیاتی طور پر کون سی سمت درست ہے؛ مشاہدہ شدہ perturbation response اسے متعین کرتا ہے۔ Challenge response کو wild type کے مقابلے میں جانچتا ہے، اس لیے مشترک background کا match کافی نہیں۔

## مشق 2 — response کے چار سوالات

سرکاری T3 metrics میں response-gene recovery، response direction، response magnitude، اور cell-state distribution شامل ہیں۔ ہر فرضی ناکامی کو metric سے ملائیں: (a) درست genes غلط سمت میں بدلتے ہیں؛ (b) سمت درست ہے مگر effect بہت چھوٹا؛ (c) بڑے changes غلط genes میں ہیں؛ (d) cell-state proportions collapse ہو جاتے ہیں۔

### جوابات

(a) response direction؛ (b) response magnitude؛ (c) response-gene recovery؛ (d) cell-state distribution۔ ہر metric الگ ثبوت دیتا ہے۔ ایک کا اچھا value دوسروں کے اچھے ہونے کا ثبوت نہیں۔

## مشق 3 — بیرونی data کا جائزہ

ایک ساتھی قریب کے stage کا public dataset تجویز کرتا ہے جس میں متعلقہ gene کا knockout ہے۔ استعمال سے پہلے گروپ کو یہ چیزیں جانچنی چاہئیں: عین gene/allele اور genotype، stage، source اور release، license، task سے تعلق، موجودہ held-out rules، اور disclosure requirements۔ کون سا غیر حل شدہ fact استعمال روک دے؟

### جوابات

گروپ کو اس وقت تک رکنا چاہیے جب تک عین source، perturbation، اور stage کو موجودہ rules کے مطابق verify نہ کر لے۔ متعلقہ allele یا phenocopy کسی محفوظ held-out condition میں آ سکتا ہے؛ public URL eligibility ثابت نہیں کرتا۔ rules کی واضح حد پر عمل کریں اور اگر matching مبہم ہو تو organizers سے پہلے پوچھیں۔

## شرکاء کی worksheet

1. موجودہ سرکاری Task 3 page پر جاری کردہ perturbation training example، validation target، اور hidden test target لکھیں۔
2. ہر model کے لیے `perturbation − matched wild type` calculate کریں۔ difference نے کیا دکھایا جو absolute values سے پوشیدہ تھا؟
3. مشق 2 کی ہر ناکامی کو metric سے ملائیں۔
4. بیرونی perturbation dataset کو eligible اور disclosed سمجھنے سے پہلے درکار شواہد لکھیں۔
5. toy example سے support ہونے والا ایک دعویٰ اور unsupported biological claim لکھیں۔

## سہولت کار کا اختتام

فرضی قدروں سے حقیقی biology اخذ نہ کریں۔ شرکاء کو ہر analysis میں perturbation contrast، matched control، genotype، stage، اور source provenance واضح رکھنے کی ترغیب دیں۔ یہ آزاد تعلیمی مواد ہے، سرکاری evaluation guidance نہیں۔
