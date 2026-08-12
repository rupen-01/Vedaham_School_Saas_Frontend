import React, { useEffect, useState } from "react";
import { FiFileText, FiArrowUp } from "react-icons/fi";

const SECTIONS = [
  { id: "intro", title: "Introduction" },
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "account", title: "Account & Registration" },
  { id: "use", title: "Use of the Platform" },
  { id: "subscription", title: "Subscription & Payments" },
  { id: "responsibilities", title: "User Responsibilities" },
  { id: "data", title: "Data & Privacy" },
  { id: "ip", title: "Intellectual Property" },
  { id: "availability", title: "Service Availability" },
  { id: "termination", title: "Termination" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "changes", title: "Changes to Terms" },
  { id: "contact", title: "Contact Us" },
];

const TERMS = [
  {
    id: "intro",
    title: "1. Introduction",
    content: (
      <p>
        Welcome to our School ERP SaaS platform. These Terms and Conditions
        govern your access to and use of our services, software, and website.
        By accessing or using the platform, you agree to be bound by these
        terms.
      </p>
    ),
  },
  {
    id: "acceptance",
    title: "2. Acceptance of Terms",
    content: (
      <p>
        By creating an account, subscribing to our services, or interacting
        with our platform, you explicitly agree to these Terms. If you do not
        agree with any part of these terms, you may not use our services.
      </p>
    ),
  },
  {
    id: "account",
    title: "3. Account & Registration",
    content: (
      <>
        <p className="mb-3">
          To access certain features, you must register for an account. You
          agree to:
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Provide accurate, current, and complete information.</li>
          <li>
            Maintain the security of your password and identification.
          </li>
          <li>
            Accept all responsibility for activities that occur under your
            account.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "use",
    title: "4. Use of the Platform",
    content: (
      <p>
        You agree to use the platform only for lawful educational and
        administrative purposes. You shall not use the platform to transmit
        malicious code, spam, or unlawful content.
      </p>
    ),
  },
  {
    id: "subscription",
    title: "5. Subscription & Payments",
    content: (
      <p>
        Access to premium features requires a valid subscription. Fees are
        billed in advance on a billing cycle basis (monthly or annually). All
        fees are non-refundable unless otherwise explicitly stated or required
        by law.
      </p>
    ),
  },
  {
    id: "responsibilities",
    title: "6. User Responsibilities",
    content: (
      <p>
        Schools are solely responsible for the data they upload, including
        student records. You must ensure you have the necessary rights and
        consents to process such data through our platform.
      </p>
    ),
  },
  {
    id: "data",
    title: "7. Data & Privacy",
    content: (
      <p>
        Your privacy is important to us. Our use of your personal and
        institutional data is governed by our Privacy Policy. We employ
        industry-standard security measures to protect your data.
      </p>
    ),
  },
  {
    id: "ip",
    title: "8. Intellectual Property",
    content: (
      <p>
        All intellectual property rights in the platform, including software,
        design, and branding, are owned by us. You are granted a limited,
        non-exclusive license to use the software during your subscription
        period.
      </p>
    ),
  },
  {
    id: "availability",
    title: "9. Service Availability",
    content: (
      <p>
        While we strive for 99.9% uptime, we do not guarantee uninterrupted
        access. We may temporarily suspend the service for maintenance or
        upgrades with prior notice when possible.
      </p>
    ),
  },
  {
    id: "termination",
    title: "10. Termination",
    content: (
      <p>
        We may terminate or suspend your account immediately, without prior
        notice or liability, for any breach of these Terms. Upon termination,
        your right to use the service will immediately cease.
      </p>
    ),
  },
  {
    id: "liability",
    title: "11. Limitation of Liability",
    content: (
      <p>
        In no event shall we be liable for any indirect, incidental, special,
        consequential or punitive damages, including loss of profits, data, or
        goodwill, arising out of your use of the platform.
      </p>
    ),
  },
  {
    id: "changes",
    title: "12. Changes to Terms",
    content: (
      <p>
        We reserve the right to modify these terms at any time. We will notify
        users of any material changes via email or an announcement on the
        platform.
      </p>
    ),
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: (
      <p>
        If you have any questions about these Terms, please contact our legal
        team at{" "}
        <strong className="text-gray-800">legal@schoolerp.com</strong> or raise
        a support ticket.
      </p>
    ),
  },
];

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [showTopButton, setShowTopButton] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    setActiveSection(id);

    const headerOffset = 100;
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 500);

      let currentSection = "intro";

      SECTIONS.forEach((section) => {
        const element = document.getElementById(section.id);

        if (element) {
          const top = element.getBoundingClientRect().top;

          if (top <= 140) {
            currentSection = section.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full min-w-0 p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FiFileText className="text-purple-600 shrink-0" />
            Terms & Conditions
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Review the rules and guidelines for using the School ERP platform.
          </p>
        </div>

        <div className="text-sm text-gray-500 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 w-fit">
          Last Updated:{" "}
          <strong className="text-gray-700">August 12, 2026</strong>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Table of Contents */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider">
              Contents
            </h3>

            <nav>
              <ul className="space-y-1">
                {SECTIONS.map((section) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left text-sm px-3 py-2.5 rounded-xl transition-colors ${
                        activeSection === section.id
                          ? "bg-purple-50 text-purple-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 w-full">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8">
            <div className="space-y-10">
              {TERMS.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                >
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 pb-3 border-b border-gray-100">
                    {section.title}
                  </h2>

                  <div className="text-sm text-gray-600 leading-7">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Back To Top */}
      {showTopButton && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 w-11 h-11 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 transition-colors"
        >
          <FiArrowUp size={18} />
        </button>
      )}
    </div>
  );
};

export default TermsAndConditions;