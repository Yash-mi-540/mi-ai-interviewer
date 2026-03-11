import { Check } from "lucide-react";

const STEPS = [
  { label: "Tech Stack", short: "Tech" },
  { label: "Experience", short: "Exp" },
  { label: "Interview", short: "Q&A" },
];

export default function ProgressSteps({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const n = i + 1;
        const isComplete = n < currentStep;
        const isCurrent = n === currentStep;
        const isUpcoming = n > currentStep;

        return (
          <div key={step.label} className="flex items-center">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${isCurrent ? "bg-indigo-50 border border-indigo-300 text-[#3538cd]" : ""}
              ${isComplete ? "text-[#3538cd]" : ""}
              ${isUpcoming ? "text-gray-400" : ""}
            `}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all
                ${isCurrent ? "bg-[#3538cd] text-white shadow-md shadow-indigo-300" : ""}
                ${isComplete ? "bg-indigo-100 text-[#3538cd]" : ""}
                ${isUpcoming ? "bg-gray-100 text-gray-400 border border-gray-200" : ""}
              `}
              >
                {isComplete ? <Check className="w-3 h-3" /> : n}
              </div>
              <span className="hidden sm:block">{step.label}</span>
              <span className="sm:hidden">{step.short}</span>
            </div>

            {i < STEPS.length - 1 && (
              <div className="flex items-center mx-1">
                <div
                  className={`h-px w-8 md:w-12 transition-all duration-500
                  ${n < currentStep ? "bg-[#3538cd]/40" : "bg-gray-200"}
                `}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
