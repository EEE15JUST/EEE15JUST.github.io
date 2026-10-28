# EEE-15 ব্যাচ ওয়েবসাইট (High-Performance Dark Version)

**Department of Electrical and Electronic Engineering (EEE)**  
**যশোর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (যবিপ্রবি / JUST), বাংলাদেশ**  
একাডেমিক সেশন: **2025-26** | মোট ব্যাচ মেম্বার: **৩৭ জন**

---

## 🚀 নতুন যা যা যুক্ত ও সমাধান করা হয়েছে (What's Fixed & Added):

1. **সব লেখা এডিটিং ফর্মে স্থানান্তর:**
   - ওয়েবসাইটের প্রতিটি টাইটেল, সাবটাইটেল, বাঁকা ইটালিক লেখা, বাটন, ব্যাজ ও ডেসক্রিপশন এখন সরাসরি **[index.html](file:///e:/EEE15/index.html)**-এর শুরুতেই থাকা ফর্মে রাখা হয়েছে।
   - এখন "EVERYDAY MEMORIES", "Classroom to Campus:", "Memories & Photo Gallery" সহ যেকোনো লেখা ওই ফর্ম থেকেই এক ক্লিকে পরিবর্তন করা যায়!

2. **২য় ছবির বাগ ফিক্স (No Developer Jargon):**
   - ওয়েবসাইটে কোনো ক্যাটাগরিতে ছবি না থাকলে পূর্বে যে কোডিংয়ের ইন্টারনাল লেখা ("place them in the corresponding folder and add their path in index.html") আসতো, তা **পুরোপুরি রিমুভ** করে দেওয়া হয়েছে।
   - এখন কোনো ক্যাটাগরি ফাঁকা থাকলে কোনো টেকনিক্যাল কোড আসবে না, শুধুমাত্র ক্লিন মেসেজ ("No memories added to this category yet. New photos coming soon!") দেখাবে।

3. **স্লাইডশো ইফেক্ট (Cinematic Slideshow Effect):**
   - **সিনেমাটিক জুম ও ফেড (Ken Burns Effect):** স্লাইড চলাকালীন ছবিগুলো স্মুথ স্কেলিং ও হালকা ট্রানজিশন নিয়ে ঘুরবে।
   - **অ্যানিমেটেড প্রগ্রেস বার:** স্লাইডের একদম উপরে একটি লাইভ প্রগ্রেস বার রয়েছে যা প্রতি ৪.৮ সেকেন্ডে সুন্দরভাবে ফিল আপ হয় (কার্সর রাখলে বা টাচ করলে অটোমেটিক পজ হয়ে যায়)।
   - **স্মুথ বাটন ও সোয়াইপ:** মোবাইলে আঙুল দিয়ে বামে-ডানে সোয়াইপ (Swipe) করে ছবি বদলানো যায়।

4. **১০০+ ছবির জন্য সুপার ফাস্ট পারফরম্যান্স:**
   - একসাথে ১০০টি বা ২০০টি হাই-রেজ্যুলিউশনের ভারী ছবি রাখলেও সাইট হ্যাং বা ল্যাগ করবে না।
   - **চাঙ্কড লোডিং (Load More Engine):** শুরুতে দ্রুতগতিতে প্রথম ১২টি ছবি লোড হবে। নিচে একটি সুন্দর **"Load More Memories (+X more)"** বাটন থাকবে, যা চাপলে বাকি ছবিগুলো এক পলকে সামনে চলে আসবে।
   - **নেটিভ লেজি লোডিং (`loading="lazy"` + `decoding="async"`):** স্ক্রিনে না আসা পর্যন্ত কোনো ছবির ডেটা মেমোরি খরচ করবে না।
   - **স্মার্ট লাইটবক্স:** লাইটবক্সে ক্লিক করলে সব ১০০টি ছবির মধ্যে অ্যারো কি বা সোয়াইপ দিয়ে ঘুরে আসা যাবে (`Photo 1 of 100`)।

5. **১০০% মোবাইল ফ্রেন্ডলি ডিজাইন:**
   - মোবাইল স্ক্রিনে ফিল্টার বাটনগুলো ভাঙবে না; অ্যাপসের মতো আঙুল দিয়ে ডানে-বামে স্মুথ স্ক্রল (Horizontal Touch Scroll) করা যাবে।
   - মোবাইল ড্রয়ার মেন্যু, সিঙ্গেল কলাম রেসপনসিভ গ্রিড এবং ফুলস্ক্রিন লাইটবক্স।

---

## ⚡ যেভাবে `index.html`-এর শুরু থেকে সব তথ্য এডিট করবেন:

**[index.html](file:///e:/EEE15/index.html)** ফাইল খুললেই **লাইন ১৯ থেকে ১১৪** পর্যন্ত নিচের মতো অপশন পাবেন:

```javascript
window.SITE_CONFIG = {
  // ১. ব্যাচ ও বিশ্ববিদ্যালয়ের নাম
  batchName: "EEE-15",
  department: "Department of Electrical and Electronic Engineering",
  departmentShort: "Dept. of EEE",
  university: "Jashore University of Science and Technology (JUST)",
  universityShort: "JUST, Bangladesh",
  session: "2025-26",
  totalMembers: 37,

  // ২. ফেসবুক পেজ বা গ্রুপ লিংক (খোলা হলে এখানে দিন)
  facebookPageUrl: "",

  // ৩. ডেভেলপার তথ্য
  developerName: "Md Mejbahul Haq",
  developerUrl: "https://mejbahul19.github.io/",

  // ৪. হিরো সেকশনের সকল লেখা (যেকোনো লেখা ইচ্ছেমতো বদলাতে পারবেন)
  heroBadgeText: "Official Batch Archive",
  heroTitleItalic: "Classroom to Campus:",       // হিরো টাইটেলের রঙিন বাঁকা লেখা
  heroTitleSub: "Our Lifelong Story",            // টাইটেলের নিচের লাইন
  heroDescription: "Welcome to the official memory archive of EEE-15...",
  heroBtnGalleryText: "Browse Memories",
  heroBtnAboutText: "Batch Overview",

  // ৫. গ্যালারি সেকশনের সকল লেখা
  galleryBadgeText: "Visual Archive",
  galleryTitle: "Memories & Photo Gallery",
  gallerySubtitle: "Classroom lectures, lab experiments, campus hangouts, picnics, and tours.",
  emptyCategoryMessage: "No memories added to this category yet. New photos coming soon!",

  // ৬. ক্যাটাগরি তালিকা (নাম যেকোনো কিছু পরিবর্তন করতে পারবেন)
  categories: [
    { id: "all", label: "All Photos" },
    { id: "campus", label: "Campus Life & Adda" },
    { id: "picnic", label: "Batch Picnic" },
    { id: "classroom", label: "Classroom & Labs" },
    { id: "sports", label: "Sports & Tour" }
  ],

  // ৭. ফটো গ্যালারি ও স্লাইডশো তালিকা (১০০+ ছবি যোগ করলেও সাইট ফাস্ট থাকবে)
  gallery: [
    {
      id: "photo-01",
      src: "assets/images/campus/grouppic.png",
      title: "Batch Group Picture at Campus",
      category: "campus",
      inSlideshow: true,
      date: "2026"
    },
    {
      id: "photo-02",
      src: "assets/images/picnic/picnic1.jpeg",
      title: "First Batch Picnic Gathering",
      category: "picnic",
      inSlideshow: true,
      date: "2026"
    },
    {
      id: "photo-03",
      src: "assets/images/picnic/picnic2.jpeg",
      title: "Picnic Moments & Friendship",
      category: "picnic",
      inSlideshow: true,
      date: "2026"
    }
    // নতুন ছবি যুক্ত করতে চাইলে নিচে একইভাবে অবজেক্ট যোগ করুন
  ]
};
```

---

## 🖥️ তাৎক্ষণিক প্রিভিউ দেখতে:
ফাইল এক্সপ্লোরার থেকে [index.html](file:///e:/EEE15/index.html) ফাইলে ডাবল-ক্লিক করলেই ব্রাউজারে সাইটটি রিলোড হয়ে নতুন সব আপডেট সহ চালু হয়ে যাবে!
