
import type { Metadata } from "next";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/Footer";
import { RatingForm } from "../../components/rating-form";

export const metadata: Metadata = {
    title: "قيّم تجربتك | O2 Gaza Restaurant",
    description: "شاركنا رأيك في خدمة مطعم O2 - غزة والوسطى. قيّم الأداء العام لتساعدنا على التطور.",
};

export default function RatePage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-24 md:pt-32 pb-20 md:pb-28">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-primary text-sm font-medium tracking-wider mb-4 block">
                            رأيك يهمنا
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                            قيّم أداء المطعم
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                            اختر الفرع وشاركنا اسمك ورقم جوالك وتقييمك العام لتجربتك معنا
                        </p>
                    </div>

                    <div className="max-w-xl mx-auto">
                        <RatingForm />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
