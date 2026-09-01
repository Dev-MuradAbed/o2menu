"use client";

import {motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/Footer";
import {
  Target,
  Eye,
  Heart,
  Award,
  Users,
  Utensils,
  Star,
  Clock,
  ShieldCheck,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const values = [
  {
    icon: Heart,
    title: "الشغف",
    description: "نضع الحب والشغف في كل طبق نقدمه لنضمن تجربة طعام استثنائية",
  },
  {
    icon: Award,
    title: "الجودة",
    description: "نلتزم بأعلى معايير الجودة في اختيار المكونات وتحضير الأطباق",
  },
  {
    icon: Users,
    title: "خدمة العملاء",
    description: "رضا عملائنا هو أولويتنا القصوى ونسعى دائماً لتجاوز توقعاتهم",
  },
  {
    icon: ShieldCheck,
    title: "النظافة",
    description: "نحافظ على أعلى معايير النظافة والصحة في جميع مراحل التحضير",
  },
];

const goals = [
  {
    icon: Star,
    title: "الريادة في المجال",
    description: "أن نصبح الوجهة الأولى للطعام الفاخر في غزة وفلسطين",
  },
  {
    icon: Utensils,
    title: "التنوع في القائمة",
    description: "تقديم قائمة متنوعة تجمع بين المأكولات الشرقية والغربية",
  },
  {
    icon: Clock,
    title: "سرعة الخدمة",
    description: "توفير خدمة سريعة دون المساس بجودة الطعام أو التجربة",
  },
  {
    icon: Sparkles,
    title: "الابتكار المستمر",
    description: "تطوير أطباق جديدة ومبتكرة تواكب أحدث التوجهات العالمية",
  },
];

const whyO2 = [
  {
    title: "قائمة متنوعة",
    description: "خيارات واسعة من الأطباق العالمية والشرقية لجميع الأذواق",
  },
  {
    title: "طهاة محترفون",
    description: "فريق من الطهاة المحترفين ذوي الخبرة العالية",
  },
  {
    title: "أجواء مميزة",
    description: "بيئة راقية ومريحة تناسب جميع المناسبات",
  },
  {
    title: "أسعار مناسبة",
    description: "نقدم قيمة استثنائية مقابل أسعار تنافسية",
  },
  {
    title: "خدمة توصيل",
    description: "خدمة توصيل سريعة لجميع مناطق غزة",
  },
  {
    title: "خدمة ممتازة",
    description: "فريق خدمة مدرب لتقديم أفضل تجربة",
  },
];

const faqs = [
  {
    question: "ما هي ساعات عمل المطعم؟",
    answer:
      "نعمل من أجلكم طيلة أيام الاسبوع من الساعة 10:00 صباحاً حتى 12:00 منتصف الليل.",
  },
  {
    question: "هل تتوفر خدمة التوصيل؟",
    answer:
      "نعم، نقدم خدمة توصيل لجميع مناطق غزة. يمكنك الطلب عبر موقعنا الإلكتروني أو الاتصال بنا مباشرة.",
  },
  {
    question: "هل تقدمون خدمات للمناسبات الخاصة؟",
    answer:
      "نعم، نقدم خدماتنا أيضا للمناسبات الخاصة وحفلات الشركات وأعياد الميلاد. تواصل معنا لمزيد من التفاصيل.",
  },
  {
    question: "هل لديكم خيارات للنباتيين؟",
    answer:
      "نعم، نقدم مجموعة متنوعة من الأطباق النباتية اللذيذة التي تناسب مختلف الأذواق والاحتياجات الغذائية.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer:
      "نقبل الدفع نقداً وعبر البطاقات الائتمانية والمحافظ الإلكترونية المختلفة.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="border border-border/50 rounded-xl overflow-hidden"
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-right bg-card hover:bg-card/80 transition-colors"
      >
        <span className="font-semibold text-foreground">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-transform ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="p-5 pt-0 text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function AboutPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/10 via-background to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-medium tracking-wider mb-4 block">
              تعرف علينا
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground text-balance">
              من نحن في{" "}
              <span className="text-primary">
                <span>Gaza</span>{" "}
                <div className="o2-logo-red text-primary">
                  <span>2</span>0
                </div>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              رحلة من الشغف والتميز في عالم الطهي، نقدم لكم أفضل تجربة طعام في
              غزة
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/menu/about.jpeg"
                  alt="داخل مطعم أوتو غزة"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-primary/30 rounded-2xl -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-medium tracking-wider mb-4 block">
                قصتنا
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground text-balance">
                من نحن
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  مرحباً بكم في مطعم{" "}
                  <strong className="text-foreground">O2 Gaza</strong>، وجهتكم
                  المثالية لتجربة طعام استثنائية في قلب غزة. منذ تأسيسنا، نسعى
                  لتقديم أفضل المأكولات بجودة عالية وخدمة مميزة.
                </p>
                <p>
                  نؤمن بأن الطعام ليس مجرد وجبة، بل هو تجربة كاملة تبدأ من لحظة
                  دخولك وحتى آخر لقمة. لذلك نحرص على توفير أجواء راقية ومريحة
                  تجعل كل زيارة لا تُنسى.
                </p>
                <p>
                  فريقنا من الطهاة المحترفين يعملون بشغف لتحضير أشهى الأطباق
                  الشرقية والغربية باستخدام أجود المكونات الطازجة والمحلية.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card p-8 md:p-10 rounded-2xl border border-border/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                رؤيتنا
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                أن نكون المطعم الرائد في فلسطين، المعروف بجودة الطعام
                الاستثنائية والخدمة المتميزة. نطمح لأن نكون الخيار الأول لكل من
                يبحث عن تجربة طعام راقية تجمع بين الأصالة والحداثة، ونسعى لنشر
                ثقافة الطعام الصحي واللذيذ في مجتمعنا.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-8 md:p-10 rounded-2xl border border-border/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                رسالتنا
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                تقديم تجربة طعام استثنائية لعملائنا من خلال أطباق مُعدة بعناية
                ومكونات طازجة عالية الجودة، في بيئة ترحيبية تجعل كل زيارة مميزة.
                نلتزم بتجاوز توقعات عملائنا والمساهمة في رفع معايير قطاع المطاعم
                في غزة.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary text-sm font-medium tracking-wider mb-4 block">
              مبادئنا
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              قيمنا
            </h2>
            <p className="text-muted-foreground text-lg">
              القيم التي نؤمن بها ونعمل بها يومياً لتقديم أفضل تجربة لعملائنا
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-5 transition-colors">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary text-sm font-medium tracking-wider mb-4 block">
              طموحاتنا
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              أهدافنا
            </h2>
            <p className="text-muted-foreground text-lg">
              نسعى لتحقيق أهداف طموحة تضعنا في مقدمة المطاعم في المنطقة
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <goal.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {goal.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {goal.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why O2 Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary text-sm font-medium tracking-wider mb-4 block">
              ما يميزنا
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              لماذا{" "}
              <span className="text-primary text-4xl md:text-6xl">
                <div className="o2-logo-red text-primary">
                  <span>2</span>0
                </div>
              </span>
              ؟
            </h2>
            <p className="text-muted-foreground text-lg">
              اكتشف الأسباب التي تجعل O2 Gaza الخيار الأمثل لتجربة طعام مميزة
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyO2.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-card p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary text-sm font-medium tracking-wider mb-4 block">
              استفساراتكم
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              الأسئلة الشائعة
            </h2>
            <p className="text-muted-foreground text-lg">
              إجابات على الأسئلة الأكثر شيوعاً من عملائنا الكرام
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
