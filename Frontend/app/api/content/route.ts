import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // This is a mock implementation. In a real-world scenario, you would parse the PDFs here.
  const content = {
    introduction:
      "Artintelllms LLMs is a cutting-edge platform designed to simplify the adoption of open-source large language models (LLMs) and small language models (SLMs) for enterprises.",
    features: [
      "LLM Directory: Curated open-source models (e.g., Llama-3, Mistral, BERT).",
      "Comparison Tool: Filter by performance, industry.",
      "Fine-Tuning Studio: No-code workflows for fine-tuning models with company data.",
      "Deployment Hub: One-click cloud/on-prem/hybrid deployment.",
      "Security & Compliance: GDPR/HIPAA-ready pipelines.",
    ],
    tiers: [
      {
        name: "Free Tier",
        description: "Discover & Experiment",
        features: [
          "Access lightweight SLMs (BERT, DistilBERT).",
          "Model comparisons & downloads.",
          "Community-driven support.",
        ],
      },
      {
        name: "Pro Tier",
        description: "Build & Deploy",
        features: ["Fine-tune mid-sized LLMs (Mistral 7B).", "One-click cloud deployment.", "Real-time cost tracking."],
      },
      {
        name: "Enterprise Premium",
        description: "Innovate & Scale",
        features: [
          "Custom pipelines for Falcon 180B, Llama 70B.",
          "HIPAA/GDPR-ready hybrid deployment.",
          "Dedicated compliance & SLAs.",
        ],
      },
    ],
  }

  return NextResponse.json(content)
}

