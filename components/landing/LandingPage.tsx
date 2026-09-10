import Link from "next/link";

export function LandingPage() {
  return (
    <main className="min-h-dvh flex flex-col justify-center px-7 sm:px-12 py-20 max-w-xl mx-auto bg-[#FAF7F2] text-[#1C1917] antialiased selection:bg-[#E7E2DA] selection:text-[#1C1917]">
      <div className="space-y-7 sm:space-y-8 text-lg sm:text-xl font-normal leading-relaxed text-[#1C1917]">
        <p className="animate-letter [animation-delay:150ms]">
          Hello world, mình là Khiêm.
        </p>

        <p className="animate-letter [animation-delay:700ms]">
          Mình làm{" "}
          <Link
            href="/dev"
            className="underline underline-offset-[5px] decoration-[#C9C2B5] hover:decoration-[#1C1917] transition-colors font-medium text-[#1C1917]"
          >
            developer
          </Link>{" "}
          với mình hay đi cắm trại.
        </p>

        <p className="animate-letter [animation-delay:1250ms]">
          Mình dạy IELTS và tiếng Anh giao tiếp cho công việc.
        </p>

        <p className="animate-letter [animation-delay:1800ms] text-[#383430]">
          Nếu bạn muốn học hoặc có câu hỏi gì, bạn có thể nhắn mình qua{" "}
          <a
            href="https://zalo.me/0886606705"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-[5px] decoration-[#C9C2B5] hover:decoration-[#1C1917] transition-colors font-medium text-[#1C1917]"
          >
            Zalo
          </a>{" "}
          (0886 606 705),{" "}
          <a
            href="https://tiktok.com/@secondkhiem"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-[5px] decoration-[#C9C2B5] hover:decoration-[#1C1917] transition-colors font-medium text-[#1C1917]"
          >
            TikTok
          </a>
          ,{" "}
          <a
            href="https://instagram.com/secondkhiem"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-[5px] decoration-[#C9C2B5] hover:decoration-[#1C1917] transition-colors font-medium text-[#1C1917]"
          >
            Instagram
          </a>
          , hoặc{" "}
          <a
            href="mailto:khiem@sukaseven.com"
            className="underline underline-offset-[5px] decoration-[#C9C2B5] hover:decoration-[#1C1917] transition-colors font-medium text-[#1C1917]"
          >
            Email
          </a>{" "}
          (khiem@sukaseven.com).
        </p>
      </div>
    </main>
  );
}

