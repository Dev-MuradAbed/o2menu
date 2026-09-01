"use server";

import { db } from "../../lib/db";
import { restaurantRatings } from "../../lib/db/schema";

const VALID_BRANCHES = ["gaza", "middle"] as const;

const RATING_MAP: Record<string, number> = {
  "سيئة جداً": 1,
  سيئة: 2,
  متوسطة: 3,
  جيدة: 4,
  ممتازة: 5,
};

export type RatingFormState = {
  success: boolean;
  message: string;
} | null;

export async function submitRating(
  _prevState: RatingFormState,
  formData: FormData,
): Promise<RatingFormState> {
  const branch = String(formData.get("branch") || "").trim();
  const customerName = String(formData.get("customerName") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const rating = String(formData.get("rating") || "").trim();

  if (!VALID_BRANCHES.includes(branch as (typeof VALID_BRANCHES)[number])) {
    return { success: false, message: "الرجاء اختيار الفرع." };
  }
  if (customerName.length < 2) {
    return { success: false, message: "الرجاء إدخال الاسم بشكل صحيح." };
  }
  // Palestinian mobile numbers: allow digits, +, spaces, dashes; require 7-15 digits
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) {
    return { success: false, message: "الرجاء إدخال رقم جوال صحيح." };
  }
  const ratingValue = RATING_MAP[rating];
  if (!ratingValue) {
    return { success: false, message: "الرجاء اختيار التقييم العام." };
  }

  // Aspect ratings are optional 1-5 scales
  const parseAspect = (key: string): number | null => {
    const raw = String(formData.get(key) || "").trim();
    if (!raw) return null;
    const num = Number.parseInt(raw, 10);
    if (Number.isNaN(num) || num < 1 || num > 5) return null;
    return num;
  };

  const likedMost = String(formData.get("likedMost") || "").trim() || null;
  const notes = String(formData.get("notes") || "").trim() || null;

  try {
    await db.insert(restaurantRatings).values({
      branch,
      customerName,
      phone,
      rating,
      ratingValue,
      foodQuality: parseAspect("foodQuality"),
      variety: parseAspect("variety"),
      prices: parseAspect("prices"),
      service: parseAspect("service"),
      cleanliness: parseAspect("cleanliness"),
      atmosphere: parseAspect("atmosphere"),
      likedMost,
      notes,
    });
    return { success: true, message: "شكراً لك! تم استلام تقييمك بنجاح." };
  } catch (error) {
    console.log("[v0] submitRating error:", error);
    return {
      success: false,
      message: "حدث خطأ أثناء حفظ التقييم. حاول مرة أخرى.",
    };
  }
}
