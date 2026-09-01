"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Phone,
    User,
    Star,
    CheckCircle2,
    Frown,
    Meh,
    Smile,
    Loader2,
    Share2,
    UtensilsCrossed,
    ThumbsUp,
    MessageSquare,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { BRANCHES } from "../lib/branch-context";
import { submitRating, type RatingFormState } from "../app/actions/ratings";

const RATING_OPTIONS = [
    { label: "سيئة جداً", value: 1, icon: Frown, color: "text-red-500", activeBg: "bg-red-500" },
    { label: "سيئة", value: 2, icon: Frown, color: "text-orange-500", activeBg: "bg-orange-500" },
    { label: "متوسطة", value: 3, icon: Meh, color: "text-yellow-500", activeBg: "bg-yellow-500" },
    { label: "جيدة", value: 4, icon: Smile, color: "text-lime-500", activeBg: "bg-lime-500" },
    { label: "ممتازة", value: 5, icon: Star, color: "text-green-500", activeBg: "bg-green-500" },
];

const ASPECTS = [
    { name: "foodQuality", label: "جودة الطعام" },
    { name: "variety", label: "تنوع الأصناف" },
    { name: "prices", label: "الأسعار" },
    { name: "service", label: "الخدمة والموظفين" },
    { name: "cleanliness", label: "النظافة" },
    { name: "atmosphere", label: "الأجواء والمكان" },
];

// Increasing-size scale: small = worst, large = excellent
const SCALE_SIZES = ["w-6 h-6", "w-7 h-7", "w-8 h-8", "w-9 h-9", "w-10 h-10"];

function AspectRating({
    name,
    label,
    value,
    onChange,
}: {
    name: string;
    label: string;
    value: number;
    onChange: (v: number) => void;
}) {
    return (
        <div className="rounded-xl border border-border p-4">
            <div className="mb-3 font-bold text-foreground">{label}</div>
            <div className="flex items-end justify-between gap-2">
                <span className="text-xs text-muted-foreground shrink-0">سيء</span>
                <div className="flex items-end gap-1.5">
                    {[1, 2, 3, 4, 5].map((v) => {
                        const active = value >= v;
                        return (
                            <button
                                type="button"
                                key={v}
                                onClick={() => onChange(v)}
                                aria-label={`${label}: ${v} من 5`}
                                aria-pressed={value === v}
                                className={`${SCALE_SIZES[v - 1]} rounded-full border-2 transition-all duration-200 ${active
                                    ? "border-primary bg-primary"
                                    : "border-border bg-transparent hover:border-primary/50"
                                    }`}
                            />
                        );
                    })}
                </div>
                <span className="text-xs text-muted-foreground shrink-0">ممتاز</span>
            </div>
            <input type="hidden" name={name} value={value || ""} />
        </div>
    );
}

function SubmitButton({ disabled }: { disabled: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={pending || disabled}
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-bold"
        >
            {pending ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جارٍ الإرسال...
                </>
            ) : (
                "إرسال التقييم"
            )}
        </Button>
    );
}

function ShareButton() {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = typeof window !== "undefined" ? window.location.href : "";
        const shareData = {
            title: "قيّم تجربتك في مطعم O2",
            text: "شاركنا رأيك في تجربتك بمطعم O2 من خلال هذا الرابط:",
            url,
        };
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch {
                // user cancelled or unsupported, fall through to copy
            }
        }
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // ignore
        }
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <Button
                type="button"
                onClick={handleShare}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base font-bold"
            >
                <Share2 className="w-5 h-5" />
                شارك صفحة التقييم
            </Button>
            <AnimatePresence>
                {copied && (
                    <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-medium text-primary"
                    >
                        تم نسخ الرابط!
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
}

export function RatingForm() {
    const branchList = Object.values(BRANCHES);
    const [selectedBranch, setSelectedBranch] = useState<string>("");
    const [selectedRating, setSelectedRating] = useState<string>("");
    const [aspects, setAspects] = useState<Record<string, number>>({});

    const [state, formAction] = useActionState<RatingFormState, FormData>(submitRating, null);

    const setAspect = (name: string, v: number) => setAspects((prev) => ({ ...prev, [name]: v }));

    if (state?.success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-card border-2 border-primary/30 p-10 text-center"
            >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{state.message}</h2>
                <p className="text-muted-foreground mb-8">رأيك يساعدنا على تقديم خدمة أفضل دائماً.</p>
                <ShareButton />
            </motion.div>
        );
    }

    return (
        <form action={formAction} className="rounded-2xl bg-card border-2 border-border p-6 md:p-8">
            {/* Branch selection */}
            <fieldset className="mb-8">
                <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    اختر الفرع
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {branchList.map((branch) => {
                        const active = selectedBranch === branch.id;
                        return (
                            <button
                                type="button"
                                key={branch.id}
                                onClick={() => setSelectedBranch(branch.id)}
                                className={`text-right rounded-xl border-2 p-4 transition-all duration-200 ${active
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                    }`}
                                aria-pressed={active}
                            >
                                <span className="block font-bold text-foreground">{branch.name}</span>
                                <span className="block text-sm text-muted-foreground">{branch.region}</span>
                            </button>
                        );
                    })}
                </div>
                <input type="hidden" name="branch" value={selectedBranch} />
            </fieldset>

            {/* Name */}
            <div className="mb-6">
                <label htmlFor="customerName" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <User className="w-4 h-4 text-primary" />
                    الاسم
                </label>
                <Input
                    id="customerName"
                    name="customerName"
                    type="text"
                    required
                    placeholder="أدخل اسمك"
                    className="h-11"
                />
            </div>

            {/* Phone */}
            <div className="mb-8">
                <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <Phone className="w-4 h-4 text-primary" />
                    رقم الجوال
                </label>
                <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    required
                    dir="ltr"
                    placeholder="059xxxxxxx"
                    className="h-11 text-right"
                />
            </div>

            {/* Overall rating */}
            <fieldset className="mb-8">
                <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                    <Star className="w-5 h-5 text-primary" />
                    التقييم العام
                </legend>
                <div className="grid grid-cols-5 gap-2">
                    {RATING_OPTIONS.map((option) => {
                        const active = selectedRating === option.label;
                        const Icon = option.icon;
                        return (
                            <button
                                type="button"
                                key={option.label}
                                onClick={() => setSelectedRating(option.label)}
                                aria-pressed={active}
                                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all duration-200 ${active
                                    ? `${option.activeBg} border-transparent text-white`
                                    : "border-border hover:border-primary/50"
                                    }`}
                            >
                                <Icon className={`w-6 h-6 ${active ? "text-white" : option.color}`} />
                                <span className={`text-[11px] md:text-xs font-medium text-center leading-tight ${active ? "text-white" : "text-foreground"}`}>
                                    {option.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
                <input type="hidden" name="rating" value={selectedRating} />
            </fieldset>

            {/* Aspect ratings */}
            <fieldset className="mb-8">
                <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                    <UtensilsCrossed className="w-5 h-5 text-primary" />
                    تقييم الجوانب
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ASPECTS.map((aspect) => (
                        <AspectRating
                            key={aspect.name}
                            name={aspect.name}
                            label={aspect.label}
                            value={aspects[aspect.name] || 0}
                            onChange={(v) => setAspect(aspect.name, v)}
                        />
                    ))}
                </div>
            </fieldset>

            {/* Liked most */}
            <div className="mb-6">
                <label htmlFor="likedMost" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <ThumbsUp className="w-4 h-4 text-primary" />
                    أكثر ما أعجبك
                </label>
                <Textarea
                    id="likedMost"
                    name="likedMost"
                    rows={3}
                    placeholder="أخبرنا بأكثر ما أعجبك في تجربتك..."
                    className="resize-none"
                />
            </div>

            {/* Notes */}
            <div className="mb-8">
                <label htmlFor="notes" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    ملاحظات أو اقتراحات
                </label>
                <Textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="شاركنا ملاحظاتك أو اقتراحاتك لتحسين الخدمة..."
                    className="resize-none"
                />
            </div>

            <AnimatePresence>
                {state && !state.success && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive text-center"
                    >
                        {state.message}
                    </motion.p>
                )}
            </AnimatePresence>

            <SubmitButton disabled={!selectedBranch || !selectedRating} />
        </form>
    );
}
