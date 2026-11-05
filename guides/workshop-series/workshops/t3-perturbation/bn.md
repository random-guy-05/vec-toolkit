# Task 3 কর্মশালা: perturbation প্রতিক্রিয়ার পূর্বাভাস

**৭৫ মিনিট · ৪–২০ জন অংশগ্রহণকারী · কোড বা Challenge-এর তথ্য প্রয়োজন নেই**

এই সেশনটি conditional-knockout prediction Task নিয়ে যুক্তি করতে সাহায্য করে। মূল শেখার লক্ষ্য হলো perturbation-এর প্রভাবকে wild-type background থেকে আলাদা করা। এখানে কোনো জীববৈজ্ঞানিক প্রক্রিয়া বা modeling recipe প্রস্তাব করা হয় না।

> এটি মেশিন-সহায়তায় তৈরি প্রথম অনুবাদ; মাতৃভাষীদের সংশোধন স্বাগত। [ইংরেজি মূল](en.md)।

## প্রস্তুতি

সরকারি [Task বিবরণ](https://virtualembryo.ai/challenge/tasks), [তথ্য-স্কিমা](https://virtualembryo.ai/challenge/data), এবং বর্তমান [নিয়ম](https://virtualembryo.ai/challenge/rules) খুলুন। কাগজ আনুন বা এই নির্দেশিকা ভাগ করুন। অনুশীলনে কাল্পনিক সংখ্যা ও সাধারণ বৈশিষ্ট্যের নাম ব্যবহার করা হয়েছে। hidden-target পরিমাপ ব্যবহার করবেন না। সরকারি পৃষ্ঠাই প্রামাণ্য এবং পরিবর্তিত হতে পারে।

## সেশনের সময়সূচি

| মিনিট | কার্যক্রম | পরিচালকের প্রশ্ন |
|---:|---|---|
| ০–৮ | prediction নির্ধারণ | “Challenge মডেলকে ঠিক কী বদলাতে বলছে?” |
| ৮–২০ | condition ও split মানচিত্রে দেখানো | “কোন knockout training, validation, বা hidden test?” |
| ২০–৩৮ | wild type-এর সঙ্গে তুলনা | অনুশীলন ১ ব্যবহার করুন। |
| ৩৮–৫২ | response metric পড়া | অনুশীলন ২ ব্যবহার করুন। |
| ৫২–৬৫ | বাইরের উৎস যাচাই | অনুশীলন ৩ ব্যবহার করুন। |
| ৬৫–৭২ | অনিশ্চয়তা বলা | response-সম্পর্কিত একটি দাবি ও একটি সীমাবদ্ধতা লিখুন। |
| ৭২–৭৫ | সমাপ্তি | বর্তমান সরকারি পৃষ্ঠা ও অমীমাংসিত প্রশ্নে ফিরে যান। |

## অনুশীলন ১ — background বনাম response

নিচের মানগুলো একটি সাধারণ বৈশিষ্ট্যের জন্য কাল্পনিক, normalized toy value; এগুলো VEC পর্যবেক্ষণ নয়।

| অবস্থা | কাল্পনিক মান |
|---|---:|
| matched wild type | ১০.০ |
| perturbation, Model A | ১০.১ |
| perturbation, Model B | ৭.০ |

জুটিকে জিজ্ঞাসা করুন, কোন model wild-type মান ধরে রেখেছে এবং কোনটি বড় পরিবর্তন পূর্বাভাস দিয়েছে। এরপর জিজ্ঞাসা করুন, শুধু absolute expression তুলনা করলে কেন এমন model এগিয়ে যেতে পারে, যা কেবল wild type-ই অনুলিপি করে।

### উত্তর-সূচি

Model A wild-type মানের কাছাকাছি, তাই এর পূর্বাভাসিত পরিবর্তন প্রায় শূন্য। Model B বড় হ্রাস পূর্বাভাস দেয়। কোন দিকটি জীববিজ্ঞানে সঠিক—এই toy example তা বলে না; পর্যবেক্ষিত perturbation response-ই সেটি নির্ধারণ করবে। Challenge-এ wild type-এর তুলনায় response মূল্যায়ন করা হয়, তাই অভিন্ন background মেলানো যথেষ্ট নয়।

## অনুশীলন ২ — response-এর চারটি প্রশ্ন

সরকারি T3 metric-এ response-gene recovery, response direction, response magnitude, এবং cell-state distribution দেখা হয়। প্রতিটি কাল্পনিক ব্যর্থতাকে metric-এর সঙ্গে মেলান: (a) সঠিক gene বদলেছে কিন্তু দিক উল্টো; (b) দিক ঠিক, প্রভাব খুব ছোট; (c) ভুল gene-এ বড় পরিবর্তন; (d) cell-state অনুপাত ভেঙে পড়েছে।

### উত্তর-সূচি

(a) response direction; (b) response magnitude; (c) response-gene recovery; (d) cell-state distribution। প্রতিটি metric আলাদা প্রমাণ। একটিতে ভালো মান অন্যগুলোর ভালো ফল প্রমাণ করে না।

## অনুশীলন ৩ — বাইরের data ব্যবহারের যাচাই

একজন সহকর্মী কাছাকাছি stage-এ সম্পর্কিত gene-এর knockout-সহ একটি public dataset ব্যবহারের প্রস্তাব দেন। ব্যবহারের আগে দলকে পরীক্ষা করতে বলুন: সঠিক gene/allele ও genotype, stage, উৎস ও release, license, Task-এর সঙ্গে প্রাসঙ্গিকতা, বর্তমান held-out rule, এবং disclosure requirement। কোন অমীমাংসিত তথ্য ব্যবহারে বিরতি ঘটাবে?

### উত্তর-সূচি

বর্তমান নিয়মের বিপরীতে সঠিক উৎস, perturbation, ও stage যাচাই না হওয়া পর্যন্ত বিরতি দেওয়া উচিত। সম্পর্কিত allele বা phenocopy কোনো সুরক্ষিত held-out condition-এর মধ্যে পড়তে পারে; public URL থাকলেই eligibility প্রমাণ হয় না। নিয়মের স্পষ্ট সীমা অনুসরণ করুন এবং মিলটি অস্পষ্ট হলে আগে organizer-দের জিজ্ঞাসা করুন।

## অংশগ্রহণকারীর worksheet

1. বর্তমান সরকারি Task পৃষ্ঠা থেকে প্রকাশিত Task 3 perturbation training example, validation target, এবং hidden test target লিখুন।
2. কাল্পনিক বৈশিষ্ট্যের জন্য প্রতিটি model-এ `perturbation − matched wild type` হিসাব করুন। absolute মান যা আড়াল করেছিল, difference কী দেখাল?
3. অনুশীলন ২-এর প্রতিটি ব্যর্থতাকে metric-এর সঙ্গে মিলিয়ে দিন।
4. বাইরের perturbation dataset যোগ্য ও প্রকাশযোগ্য—এ দাবি করার আগে কী প্রমাণ দরকার লিখুন।
5. toy example সমর্থন করে এমন একটি দাবি এবং অসমর্থিত একটি জীববৈজ্ঞানিক দাবি লিখুন।

## পরিচালকের সমাপ্তি

কাল্পনিক মান থেকে বাস্তব জীববিজ্ঞান অনুমান করবেন না। যেকোনো বিশ্লেষণে perturbation contrast, matched control, genotype, stage, এবং source provenance স্পষ্ট রাখতে বলুন। এটি স্বাধীন শিক্ষামূলক উপাদান; সরকারি evaluation guide নয়।
