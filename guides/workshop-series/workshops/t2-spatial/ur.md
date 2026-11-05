# ٹاسک 2 ورکشاپ: جگہ اور وقت کے ساتھ استدلال

**75 منٹ · 4–20 شرکاء · کوڈ یا Challenge کے ڈیٹا کی ضرورت نہیں**

یہ سہولت کار کے لیے تیار کردہ سیشن ان شرکاء کے لیے ہے جو single-cell کے بنیادی تصورات جانتے ہیں مگر 3D spatial-temporal prediction میں نئے ہیں۔ اس میں ایک فرضی model comparison استعمال کیا جاتا ہے۔ مقصد task contract اور شواہد پر استدلال کرنا ہے، غیر تصدیق شدہ modeling recipe سکھانا نہیں۔

> یہ مشین کی مدد سے تیار کردہ ابتدائی ترجمہ ہے؛ مقامی زبان کے ماہرین کی اصلاحات خوش آمدید ہیں۔ [English اصل](en.md)۔

## تیاری

سرکاری [task descriptions](https://virtualembryo.ai/challenge/tasks)، [data schema](https://virtualembryo.ai/challenge/data)، اور [evaluation page](https://virtualembryo.ai/challenge/evaluation) کھولیں۔ کاغذ لائیں یا یہ رہنما شیئر کریں۔ شرکاء سے کہیں کہ hidden targets استعمال نہ کریں یا نجی model results شیئر نہ کریں۔ سیشن سے پہلے سرکاری صفحات دوبارہ دیکھیں؛ وہی مستند ہیں۔

## سیشن کا خاکہ

| منٹ | سرگرمی | سہولت کار کا سوال |
|---:|---|---|
| 0–8 | سوال طے کریں | “prediction میں بالکل کیا شامل ہونا چاہیے؟” |
| 8–20 | split کا نقشہ بنائیں | “یہ interpolation ہے یا extrapolation؟ حقیقتاً کون سے stages نظر آتے ہیں؟” |
| 20–38 | صورتحال پر کام کریں | ذیل کی مشق 1 استعمال کریں۔ |
| 38–52 | score سمجھیں | ذیل کی مشق 2 استعمال کریں۔ |
| 52–65 | coordinates کا audit کریں | ذیل کی مشق 3 استعمال کریں۔ |
| 65–72 | دعوے کی حد لکھیں | ہر جوڑا ایک supported اور ایک unsupported دعویٰ لکھے۔ |
| 72–75 | اختتام | موجودہ سرکاری صفحات دکھائیں اور کھلے سوالات لیں۔ |

## مشق 1 — ایک task، مختلف settings

فرضی ٹیم “Small Atlas” یہ سمجھتی ہے کہ Task 2 کے تمام boards تازہ ترین training stage سے آگے کی پیش گوئی مانگتے ہیں۔ جوڑوں سے کہیں کہ سرکاری split table دیکھ کر اس مفروضے کی اصلاح کریں۔ انہیں whole-embryo setting کے held-out interpolation کی نشاندہی کرنی چاہیے، پھر اسے heart setting کے interpolation اور extrapolation سوالات سے ملانا چاہیے۔ پوچھیں کہ کیا مشترک اور کیا مختلف ہے: دونوں میں expression اور 3D coordinates کی prediction ہے، مگر setting اور stage split اہم ہیں۔

### جوابات

Task 2 کی دو settings ہیں۔ Whole-embryo test interpolation ہے: held-out stage جاری کردہ stages کے درمیان آتا ہے۔ Heart setting میں held-out validation سوالوں میں سے ایک interpolation ہے، جبکہ بعد کے stages جاری کردہ training range سے آگے extrapolation آزماتے ہیں۔ درست stage names اور board IDs موجودہ سرکاری صفحات سے verify کریں، یادداشت پر بھروسہ نہ کریں۔

## مشق 2 — برابر وزن کے چار سوالات

فرضی Model A expression changes کو تقریباً درست بتاتا ہے مگر یکساں cell cloud کی prediction کرتا ہے۔ Model B کی shape اور local neighborhoods معقول ہیں مگر expression changes کمزور ہیں۔ کسی کو سرکاری score نہیں ملا۔ ہر جوڑے سے پوچھیں: کون سا ثبوت molecular، cellular، tissue، اور local-organization performance میں فرق کرے گا؟ مقامی pseudo-split کیا قائم کر سکتا ہے اور hidden board کے بارے میں کیا نہیں؟

### جوابات

سرکاری T2 score چاروں dimensions کو ایک چوتھائی وزن دیتا ہے: expression change، cell-state distribution، tissue shape/growth scale، اور local spatial organization۔ ایک dimension میں مضبوط نتیجہ دوسرے dimensions کو ثابت نہیں کرتا۔ مقامی comparison صرف منتخب data، split، اور scorer کے بارے میں بتاتا ہے؛ یہ hidden-test result نہیں۔

## مشق 3 — coordinate frame کی جانچ

دو فرضی stages کے لیے ایک ایک 3D point cloud ہے۔ ایک teammate stages کے درمیان ایک جیسے عددی `(x,y,z)` values والے cells کو match کر کے انہیں وہی cells کہتا ہے۔ پوچھیں: شناخت کے اس دعوے کو درست ثابت کرنے کے لیے کیا ثبوت چاہیے؟

### جوابات

صرف coordinate values سے ایسا کوئی ثبوت نہیں ملتا۔ سرکاری data page کہتا ہے کہ coordinates ہر embryo کے لیے الگ local frame استعمال کرتے ہیں اور time points کے درمیان register نہیں ہیں۔ صرف مماثل نمبروں سے cross-stage cell correspondence یا مشترک coordinate frame اخذ نہ کریں۔ analysis میں registration فرض کرنے سے پہلے سرکاری schema پڑھیں۔

## شرکاء کی worksheet

1. منتخب board کے visible training stages، held-out سوال، اور predicted channels درج کریں۔ موجودہ سرکاری صفحہ cite کریں۔
2. رپورٹ شدہ score کے لیے split، scorer version، اور T2 کی چار dimensions میں سے پیمائش شدہ dimension نوٹ کریں۔
3. مختلف stages کے دو coordinates کو ایک ہی biological location یا cell کہنے سے پہلے کون سا اضافی ثبوت چاہیے؟
4. ایک محدود دعویٰ لکھیں جسے آپ کے شواہد support کرتے ہیں اور ایک وسیع دعویٰ جو وہ support نہیں کرتے۔

## سہولت کار کا اختتام

فرضی comparison کو نتیجہ نہ بنائیں اور کوئی winning model recommend نہ کریں۔ شرکاء کو board contract verify کرنے، community tool کی حدود دیکھنے، اور اپنا split اور assumptions دستاویز کرنے کی ترغیب دیں۔ یہ آزاد تعلیمی مواد ہے؛ سرکاری scoring guide نہیں۔
