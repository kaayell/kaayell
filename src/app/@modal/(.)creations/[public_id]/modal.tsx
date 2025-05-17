"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogPanel } from "@headlessui/react";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function onDismiss() {
    router.back();
  }

  return (
    <Dialog open={true} onClose={onDismiss} className={"relative z-50"}>
      <div className="fixed inset-0 w-screen overflow-y-auto p-14 bg-black/70">
        <DialogPanel className="w-full h-full max-w-[1800px] max-h-screen space-y-4 p-4">
          {children}

          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors z-10"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
