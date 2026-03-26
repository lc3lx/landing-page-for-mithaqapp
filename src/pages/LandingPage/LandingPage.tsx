import React, { useEffect, useState } from "react";

import { appConfig } from "../../config";

import styles from "./landingPage.module.css";

const IconDownload = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path
      d="M12 3v12m0 0l4-4m-4 4L8 11"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" />
  </svg>
);

const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M3 20.5v-17c0-.83.89-1.34 1.58-.92l14 8.5a1.07 1.07 0 010 1.84l-14 8.5A1 1 0 013 20.5z" />
  </svg>
);

const IconApple = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.05 18.86c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 12.74 3.51 4.53 9.05 4.1c1.35.11 2.25.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.49-1.31 2.99-2.54 4.09l.01-.01zM12.03 4.08c-.05-2.36 1.83-4.3 4.02-4.36.37 2.67-2.35 4.67-4.02 4.36z" />
  </svg>
);

const DownloadButtons = ({ apkUrl }: { apkUrl: string }) => {
  return (
    <div className={styles.downloadRow} role="group" aria-label="روابط التحميل">
      <a className={`${styles.storeBtn} btn btnPrimary`} href={apkUrl} download>
        <span className={styles.storeIcon}>
          <IconDownload />
        </span>
        تحميل APK
      </a>

      <span
        className={`${styles.storeBtn} btn btnGhost ${styles.storeBtnSoon}`}
        role="status"
        aria-label="Google Play قريباً"
      >
        <span className={styles.storeIcon}>
          <IconPlay />
        </span>

        <span className={styles.storeBtnLabel}>
          Google Play
          <span className={styles.soonTag}>قريباً</span>
        </span>
      </span>

      <span
        className={`${styles.storeBtn} btn btnGhost ${styles.storeBtnSoon}`}
        role="status"
        aria-label="App Store قريباً"
      >
        <span className={styles.storeIcon}>
          <IconApple />
        </span>

        <span className={styles.storeBtnLabel}>
          App Store
          <span className={styles.soonTag}>قريباً</span>
        </span>
      </span>
    </div>
  );
};

export default function LandingPage() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const nodes = document.querySelectorAll("[data-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute("data-section");

          if (id) {
            setRevealed((prev) => ({ ...prev, [id]: true }));

            observer.unobserve(entry.target);
          }
        });
      },

      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    nodes.forEach((n) => observer.observe(n));

    return () => observer.disconnect();
  }, []);

  const revealClass = (id: string) =>
    `${styles.reveal} ${revealed[id] ? styles.revealVisible : ""}`;

  const handleHeroCardMove: React.MouseEventHandler<HTMLDivElement> = (
    event,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width;
    const offsetY = (event.clientY - bounds.top) / bounds.height;
    const tiltY = (offsetX - 0.5) * 10;
    const tiltX = (0.5 - offsetY) * 8;
    setHeroTilt({ x: tiltX, y: tiltY });
  };

  const resetHeroTilt = () => setHeroTilt({ x: 0, y: 0 });

  return (
    <div className={styles.page} dir="rtl">
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <div className={styles.brand}>
            <img
              src="/logo.png"
              alt="Mithaq"
              className={styles.brandLogo}
              width={48}
              height={48}
              decoding="async"
            />

            <div>
              <div className={styles.brandName}>
                <span lang="en" className={styles.brandNameLatin}>
                  {appConfig.appName}
                </span>
              </div>

              <div className={styles.brandTagline}>{appConfig.tagline}</div>
            </div>
          </div>

          <nav className={styles.headerLinks} aria-label="روابط الصفحة">
            <a href="#about" className={styles.headerLink}>
              عن التطبيق
            </a>

            <a href="#features" className={styles.headerLink}>
              المميزات
            </a>

            <a href="#download" className={styles.headerLink}>
              التحميل
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero} aria-label="المقدمة">
          <div className={styles.bgOrbs} aria-hidden="true">
            <div className={`${styles.orb} ${styles.orb1}`} />

            <div className={`${styles.orb} ${styles.orb2}`} />

            <div className={`${styles.orb} ${styles.orb3}`} />
          </div>

          <div className="container heroGrid">
            <div className={styles.heroLeft}>
              <div className={`badge ${styles.heroAnimate} ${styles.d1}`}>
                <span aria-hidden="true">حلال</span>

                <span className={styles.badgeSep} aria-hidden="true">
                  •
                </span>

                <span>زواج ضمن الضوابط</span>
              </div>

              <h1
                className={`${styles.heroTitle} ${styles.heroAnimate} ${styles.d2}`}
              >
                بداية جادة نحو زواج مبارك
                <span className={styles.heroTitleAccent}> وفق الدين والعرف</span>
              </h1>

              <p
                className={`${styles.heroSubtitle} ${styles.heroAnimate} ${styles.d3}`}
              >
                {`منصة "ميثاق" صُممت لمساعدة الجادّين على التعارف للزواج ضمن إطار شرعي وأخلاقي، يراعي خصوصية الأسرة العربية ويضع الاحترام والوضوح في كل خطوة.`}
              </p>

              <div
                className={`${styles.heroDisclaimer} ${styles.heroAnimate} ${styles.d4}`}
              >
                <div className={styles.disclaimerDot} aria-hidden="true" />

                <span>{`سياسة واضحة: لا تبادل وسائل تواصل خارجية، لا تحويل أموال، ولا أي محتوى يخالف قيم الدين والأدب العام.`}</span>
              </div>

              <div className={`${styles.heroAnimate} ${styles.d5}`}>
                <DownloadButtons apkUrl={appConfig.apkUrl} />
              </div>

              <div
                className={`${styles.socialProofRow} ${styles.heroAnimate} ${styles.d6}`}
              >
                <div className={styles.socialProofItem}>
                  <strong>+12k</strong>
                  <span>تحميل من مستخدمين جادّين</span>
                </div>
                <div className={styles.socialProofItem}>
                  <strong>94%</strong>
                  <span>انطباع إيجابي عن جودة التجربة</span>
                </div>
                <div className={styles.socialProofItem}>
                  <strong>24/7</strong>
                  <span>متابعة مستمرة للالتزام والأمان</span>
                </div>
              </div>
            </div>

            <div
              className={`${styles.heroRight} ${styles.heroAnimate} ${styles.d3}`}
            >
              <div
                className={styles.heroCard}
                onMouseMove={handleHeroCardMove}
                onMouseLeave={resetHeroTilt}
                style={{
                  transform: `perspective(1100px) rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)`,
                }}
              >
                <div className={styles.heroCardInner}>
                  <div className={styles.heroCardTop}>
                    <div className={styles.heroCardBadge}>خصوصية</div>

                    <div className={styles.heroCardBadge2}>دعم رسمي</div>
                  </div>

                  <div className={styles.heroPreview}>
                    <div className={styles.previewRow} />

                    <div className={styles.previewRow2} />

                    <div className={styles.previewGrid}>
                      <div className={styles.previewTile} />

                      <div className={styles.previewTile} />

                      <div className={styles.previewTile} />

                      <div className={styles.previewTile} />
                    </div>

                    <div className={styles.previewFooter} />
                  </div>
                </div>
              </div>

              <div className={styles.floatingCallout}>
                <div className={styles.calloutIcon} aria-hidden="true" />

                <div>
                  <div className={styles.calloutTitle}>مناسب للأعراف</div>

                  <div className={styles.calloutDesc}>
                    بيئة عربية محترمة تحترم الدين والعائلة.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          data-section="about"
          className={`section ${revealClass("about")}`}
        >
          <div className="container">
            <div
              className={styles.marketingStrip}
              role="status"
              aria-label="رسائل تسويقية"
            >
              <span>تواصل بضوابط شرعية</span>
              <span>احترام العادات والتقاليد</span>
              <span>نية واضحة نحو الزواج</span>
            </div>

            <div className={styles.sectionHeader}>
              <div className={styles.sectionKicker}>عن التطبيق</div>

              <h2 className={styles.sectionTitle}>
                كيف نخدمك في طريق الزواج؟
              </h2>

              <p className={`${styles.sectionSubtitle} muted`}>
                التعارف المنظّم يخفف الفوضى ويجعل الحوار واضحاً ومحترماً، مع
                مساحة أكبر للجدّية والنية الصادقة.
              </p>
            </div>

            <div className={styles.visionCard}>
              <h3>طموحنا</h3>
              <p>
                نطمح أن نكون المنصة العربية الأولى في التعارف للزواج الجاد،
                بمنهج يوازن بين التقنية الحديثة والتوجيه الأخلاقي، ويعيد الثقة
                لفكرة التعارف المنضبط الذي يُكرم الطرفين ويحفظ كرامة العائلات.
              </p>
            </div>

            <div className={styles.stepsGrid}>
              <div className={`${styles.stepCard} card`}>
                <div className={styles.stepIndex}>1</div>

                <div className={styles.stepTitle}>ملف تعريف محترم</div>

                <p className={styles.stepText}>
                  بيانات واضحة ومختصرة تُظهر الجدية والنية، بدون مبالغة أو
                  استعراض، وبما يحفظ الخصوصية.
                </p>
              </div>

              <div className={`${styles.stepCard} card`}>
                <div className={styles.stepIndex}>2</div>

                <div className={styles.stepTitle}>تواصل منظّم</div>

                <p className={styles.stepText}>
                  محادثة داخل المنصة بضوابط سلوكية واضحة، لتبقى العلاقة في مسار
                  محترم بعيداً عن العشوائية.
                </p>
              </div>

              <div className={`${styles.stepCard} card`}>
                <div className={styles.stepIndex}>3</div>

                <div className={styles.stepTitle}>خطوة رسمية</div>

                <p className={styles.stepText}>
                  عندما يظهر التوافق، يكون الانتقال للخطوة الرسمية عبر الأهل
                  بشكل يليق بعاداتنا العربية.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          data-section="features"
          className={`section ${revealClass("features")}`}
          style={{ paddingTop: 28 }}
        >
          <div className="container">
            <div className={styles.featureGrid}>
              <div className={styles.featureLeft}>
                <div className={styles.sectionKicker}>مميزات</div>

                <h2 className={styles.sectionTitle}>
                  لماذا "ميثاق" خيار أنسب للجادّين؟
                </h2>

                <p className={`${styles.sectionSubtitle} muted`}>
                  لأننا نبني تجربة متزنة: التزام شرعي، انضباط سلوكي، وتقنيات
                  أمان تقلل الحسابات غير الجادة.
                </p>

                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon} aria-hidden="true" />

                    <div>
                      <div className={styles.featureItemTitle}>
                        تعارف بنظام محترم
                      </div>

                      <div className={styles.featureItemDesc}>
                        آلية تواصل تعزز الجدية وتمنع التجاوزات المخالفة للدين
                        والأخلاق.
                      </div>
                    </div>
                  </div>

                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon2} aria-hidden="true" />

                    <div>
                      <div className={styles.featureItemTitle}>
                        تحقق وملفات موثوقة
                      </div>

                      <div className={styles.featureItemDesc}>
                        مراجعات دورية تساعد في تقليل الحسابات الوهمية ورفع جودة
                        المجتمع.
                      </div>
                    </div>
                  </div>

                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon3} aria-hidden="true" />

                    <div>
                      <div className={styles.featureItemTitle}>
                        خصوصية وقيود واضحة
                      </div>

                      <div className={styles.featureItemDesc}>
                        حدود واضحة تحمي المستخدمين وتضمن تجربة آمنة ومطمئنة
                        للطرفين.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.featureRight}>
                <div className={`${styles.bigQuote} card`}>
                  <div className={styles.bigQuoteTop}>
                    <span className={styles.quoteMark} aria-hidden="true">
                      “
                    </span>

                    <span className={styles.quoteTag}>رسالة</span>
                  </div>

                  <div className={styles.bigQuoteText}>
                    {`نؤمن أن التقنية يجب أن تخدم القيم، لا أن تستبدلها.`}

                    <br />

                    <span className={styles.bigQuoteAccent}>
                      هدفنا: تعارف راقٍ ينتهي بخطوة رسمية مباركة.
                    </span>
                  </div>

                  <div className={styles.bigQuoteBottom}>
                    <div className={styles.bigQuoteDot} aria-hidden="true" />

                    <div className={styles.bigQuoteMeta}>
                      تجربة مبنية على الدين والاحترام
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="download"
          data-section="download"
          className={`${styles.downloadSection} section ${revealClass("download")}`}
        >
          <div className="container">
            <div className={styles.sectionHeader}>
              <div className={styles.sectionKicker}>التحميل</div>

              <h2 className={styles.sectionTitle}>ابدأ الآن</h2>

              <p className={`${styles.sectionSubtitle} muted`}>
                {`ابدأ رحلتك بنية صادقة وخطوات واضحة. التحميل متاح عبر APK حالياً، وGoogle Play وApp Store قريباً.`}
              </p>
            </div>

            <div className={`${styles.downloadCard} card`}>
              <div className={styles.downloadCardInner}>
                <DownloadButtons apkUrl={appConfig.apkUrl} />
              </div>
            </div>
          </div>
        </section>

        <footer
          data-section="footer"
          className={`${styles.footer} ${revealClass("footer")}`}
        >
          <div className="container">
            <div className={styles.footerRow}>
              <div className={styles.footerLeft}>
                <div className={styles.footerBrand}>{appConfig.appName}</div>

                <div className={`${styles.footerText} muted`}>
                  {`ميثاق مساحة عربية أخلاقية للتعارف للزواج، تراعي الشريعة وتُقدّر العائلة وتحفظ الكرامة.`}
                </div>
              </div>

              <div className={styles.footerRight}>
                <div
                  className={styles.footerRule}
                >{`لا مشاركة وسائل تواصل خارجية. `}</div>

                <div className={styles.footerRule}>{`لا تحويل أي أموال.`}</div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
