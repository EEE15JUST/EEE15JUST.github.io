/**
 * ====================================================================
 * EEE-15 BATCH WEBSITE - CENTRALIZED CONFIGURATION (BACKUP REFERENCE)
 * ====================================================================
 * 
 * নোট: সহজ এডিটের সুবিধার্থে এই একই কনফিগারেশন সরাসরি `index.html` 
 * ফাইলের শুরুতেও (লাইন ১৮-৯৮) দেওয়া আছে। আপনি `index.html`-এ পরিবর্তন 
 * করলেই পুরো ওয়েবসাইট স্বয়ংক্রিয়ভাবে আপডেট হয়ে যাবে!
 * ====================================================================
 */

const SITE_CONFIG = {
  batchName: "EEE-15",
  department: "Department of Electrical and Electronic Engineering",
  departmentShort: "Dept. of EEE",
  university: "Jashore University of Science and Technology (JUST)",
  universityShort: "JUST, Bangladesh",
  session: "2025-26",
  totalMembers: 37,
  facebookPageUrl: "", // যখন ফেসবুক পেজ বা গ্রুপ খোলা হবে তখন লিংক দিন
  developerName: "Md Mejbahul Haq",
  developerUrl: "https://mejbahul19.github.io/",
  heroTagline: "Classroom Days & Campus Memories",
  heroDescription: "Welcome to the official memory archive of EEE-15. From lively classroom discussions and circuit labs to everyday campus adda — here is our journey preserved together.",
  
  categories: [
    { id: "all", label: "All Photos", labelBangla: "সকল ছবি" },
    { id: "classroom", label: "Classroom & Labs", labelBangla: "ক্লাসরুম ও ল্যাব" },
    { id: "campus", label: "Campus Hangouts", labelBangla: "ক্যাম্পাস আড্ডা" },
    { id: "casual", label: "Everyday Memories", labelBangla: "ক্যাম্পাস স্মৃতি" }
    // ভবিষ্যতে পিকনিক বা ট্যুর হলে নিচের কমেন্টগুলো তুলে দিন:
    // ,{ id: "picnic", label: "Picnic", labelBangla: "পিকনিক" }
    // ,{ id: "study-tour", label: "Study Tour", labelBangla: "স্টাডি ট্যুর" }
    // ,{ id: "sports", label: "Sports", labelBangla: "খেলাধুলা" }
    // ,{ id: "cultural", label: "Cultural Night", labelBangla: "সাংস্কৃতিক অনুষ্ঠান" }
  ],

  gallery: [
    {
      id: "photo-01",
      src: "assets/images/classroom/classroom-01.svg",
      title: "Classroom & Lecture Hall Moments",
      banglaTitle: "ক্লাসরুম ও লেকচার হলের মুহূর্ত",
      category: "classroom",
      inSlideshow: true,
      date: "2025"
    },
    {
      id: "photo-02",
      src: "assets/images/campus/hangout-01.svg",
      title: "Campus Adda & Tea Break",
      banglaTitle: "ক্যাম্পাস আড্ডা ও চায়ের বিরতি",
      category: "campus",
      inSlideshow: true,
      date: "2025"
    },
    {
      id: "photo-03",
      src: "assets/images/classroom/lab-01.svg",
      title: "Electrical Circuits & Lab Days",
      banglaTitle: "ইলেকট্রিক্যাল সার্কিট ল্যাব ক্লাস",
      category: "classroom",
      inSlideshow: true,
      date: "2025"
    },
    {
      id: "photo-04",
      src: "assets/images/campus/group-01.svg",
      title: "Everyday Campus Moments",
      banglaTitle: "ক্যাম্পাসের নিত্যদিনের স্মৃতি",
      category: "casual",
      inSlideshow: true,
      date: "2025"
    }
  ]
};

if (typeof window !== "undefined") {
  window.SITE_CONFIG = window.SITE_CONFIG || SITE_CONFIG;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_CONFIG;
}
