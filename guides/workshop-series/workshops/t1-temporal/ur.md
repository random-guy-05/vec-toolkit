# ٹاسک 1 ورکشاپ: بدلتی ہوئی خلیاتی آبادی کی پیش گوئی

**75 منٹ · 4–20 شرکاء · کوڈ یا Challenge کے ڈیٹا کی ضرورت نہیں**

یہ سہولت کار کے لیے تیار کردہ سیشن ایسے شرکاء کے لیے ہے جو single-cell کے بنیادی تصورات جانتے ہیں مگر زمانی gene-expression prediction میں نئے ہیں۔ اس میں فرضی خلیاتی تعداد اور خصوصیت کی قدریں استعمال ہوتی ہیں تاکہ cell-state composition کی تبدیلیوں کو ایک cell state کے اندر ہونے والی تبدیلیوں سے الگ کیا جا سکے۔ مقصد prediction target اور شواہد پر غور کرنا ہے، کسی مخصوص model کی سفارش نہیں۔

> یہ مشین کی مدد سے تیار کردہ ابتدائی ترجمہ ہے؛ مقامی زبان کے ماہرین کی اصلاحات خوش آمدید ہیں۔ [English اصل](en.md)۔

## تیاری

سرکاری [task descriptions](https://virtualembryo.ai/challenge/tasks)، [data schema](https://virtualembryo.ai/challenge/data)، اور [evaluation page](https://virtualembryo.ai/challenge/evaluation) کھولیں۔ کاغذ لائیں یا یہ رہنما شیئر کریں۔ ذیل کے اعداد فرضی ہیں اور VEC کے مشاہدات نہیں۔ hidden target کی پیمائشیں استعمال نہ کریں۔ سرکاری صفحات ہی مستند ہیں اور بدل سکتے ہیں۔

## سیشن کا خاکہ

| منٹ | سرگرمی | سہولت کار کا سوال |
|---:|---|---|
| 0–8 | prediction کی وضاحت | “کیا ہم انفرادی خلیات کی پیش گوئی کر رہے ہیں یا مستقبل کی آبادی کی؟” |
| 8–20 | موجودہ split پڑھیں | “اس وقت کون سے stages training، validation، اور hidden test ہیں؟” |
| 20–38 | شناخت کو distribution سے الگ کریں | مشق 1 استعمال کریں۔ |
| 38–52 | pseudobulk کی تبدیلی سمجھیں | مشق 2 استعمال کریں۔ |
| 52–65 | metric کے سوالات کی تشخیص | مشق 3 استعمال کریں۔ |
| 65–72 | دعوے کی حد طے کریں | ہر جوڑا ایک supported اور ایک unsupported دعویٰ لکھے۔ |
| 72–75 | اختتام | سرکاری task page اور کھلے سوالات کی طرف واپس آئیں۔ |

## مشق 1 — نئی آبادی، خلیات کی tracking نہیں

یہ تعدادیں فرضی ہیں۔ تصور کریں کہ جاری کردہ training sample میں type A کے 70 اور type B کے 30 خلیات ہیں۔ ایک فرضی بعد کے ہدف میں type A کے 40، type B کے 30، اور نئے ظاہر ہونے والے type C کے 30 خلیات ہیں۔ جوڑوں سے پوچھیں: ہدف کے کون سے خلیات training والے “وہی” خلیات ہیں؟ یہ مثال خلیاتی شناخت کی پیروی کے بجائے آبادی کی پیش گوئی کے بارے میں کیا بتاتی ہے؟

### جوابات

فرضی جدول میں stages کے درمیان cell identity کا کوئی ثبوت نہیں، اس لیے انفرادی خلیات کو match نہیں کیا جا سکتا۔ ہدف کی distribution میں ایک ایسی type ہے جو فرضی training sample میں موجود نہیں تھی، اور موجودہ types کے تناسب بھی مختلف ہیں۔ زمانی آبادی کی پیش گوئی میں یہ دیکھنا ضروری ہے کہ کون سی states ظاہر ہوتی ہیں اور کتنی عام ہیں؛ اس کا مطلب ہر مشاہدہ شدہ خلیے کو وقت میں آگے لے جانا نہیں۔ موجودہ سرکاری صفحے پر اصل split اور target definition کی تصدیق کریں۔

## مشق 2 — composition مجموعی قدر بدل سکتی ہے

ہر cell type کے اندر فرضی feature means مستقل ہیں، مگر mixture بدلتا ہے:

| Stage | Type A کا حصہ | A کا mean | Type B کا حصہ | B کا mean | Pooled mean |
|---|---:|---:|---:|---:|---:|
| پہلے | 80% | 2 | 20% | 12 | 4 |
| بعد میں | 20% | 2 | 80% | 12 | 10 |

جوڑوں سے ہر stage کا pooled mean نکلوائیں۔ کیا بدلا: ہر type کے اندر feature mean یا آبادی کا mixture؟ صرف pooled عدد ہمیں کیا نہیں بتا سکتا؟

### جوابات

پہلے کا pooled mean `0.8 × 2 + 0.2 × 12 = 4` ہے؛ بعد کا `0.2 × 2 + 0.8 × 12 = 10` ہے۔ type کے اندر means نہیں بدلے؛ mixture بدلا۔ صرف pooled shift سے cell state کے اندر response اور cell-state proportion کی تبدیلی میں فرق نہیں کیا جا سکتا۔ یہ تدریسی مثال ہے، کسی حقیقی gene یا stage کے بارے میں دعویٰ نہیں۔

## مشق 3 — scoring کے چار الگ سوالات

سرکاری Task 1 evaluation الگ الگ دیکھتا ہے: differentially expressed genes (DE) کی recovery، تبدیلی کی سمت، cell-state distribution، اور gene-gene co-variation۔ گروہوں سے کہیں کہ ہر فرضی ناکامی کو اس سوال سے ملائیں جس پر براہ راست سب سے زیادہ اثر پڑتا ہے: (a) بدلتے ہوئے بہت سے genes چھوٹ گئے؛ (b) متعلقہ genes مخالف سمت میں بدلے؛ (c) پیش گوئی کردہ cell-type proportions غلط ہیں؛ (d) gene-wise means معقول ہیں لیکن genes کے تعلقات غائب ہو گئے۔

### جوابات

(a) DE-gene recovery؛ (b) تبدیلی کی سمت؛ (c) cell-state distribution؛ (d) gene-gene co-variation۔ ایک ناکامی ایک سے زیادہ metrics کو متاثر کر سکتی ہے، اور یہ مثالیں score کے یقینی pattern نہیں بتاتیں۔ ایک metric پر اچھا نتیجہ دوسرے metrics کے اچھے ہونے کا ثبوت نہیں۔

## شرکاء کی worksheet

1. موجودہ سرکاری task page سے نظر آنے والے training stages، validation target، hidden test target، اور predicted quantity لکھیں۔
2. مشق 1 میں، مختلف stages کے دو خلیات کو ایک ہی خلیہ کہنے کے لیے کیا ثبوت درکار ہوتا؟ کیا یہ ثبوت موجود ہے؟
3. مشق 2 کا حساب دکھائیں۔ وضاحت کریں کہ دونوں اندرونی type means مستقل رہنے کے باوجود pooled mean کیسے بدلا۔
4. مشق 3 کی ہر ناکامی کو سب سے براہ راست متعلقہ سرکاری metric question سے ملائیں۔
5. ایک ایسا دعویٰ لکھیں جسے فرضی مثالیں support کرتی ہیں اور ایک حیاتیاتی دعویٰ جسے وہ support نہیں کر سکتیں۔

## سہولت کار کا اختتام

فرضی قدروں کو حقیقی biology یا model result نہ سمجھیں۔ شرکاء کو کہیں کہ analysis میں cell-state composition، state کے اندر expression، split، اور scorer evidence الگ رکھیں۔ یہ آزاد تعلیمی مواد ہے، سرکاری scoring guide یا modeling recipe نہیں۔
