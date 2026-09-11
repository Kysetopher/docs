import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import { Icon } from "@iconify/react";

const spaceId = "local-models";

function createDoc(
  id: string,
  cardTitle: string,
  cardDescription: string,
  headerTitle: string,
  headerDescription: string,
  cardIcon: string,
  sections: DocRecord["sections"],
): DocRecord {
  return {
    id,
    spaceId,
    href: `/spaces/${spaceId}/${id}`,
    cardTitle,
    cardDescription,
    cardIcon,
    header: {
      title: headerTitle,
      description: headerDescription,
      icon: cardIcon,
    },
    sections,
  };
}

function StatusBadge({
  type,
  label,
}: {
  type: "standard" | "uncensored" | "reasoning" | "coding" | "gpu" | "cpu" | "recommended";
  label: string;
}) {
  const styles = {
    standard: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    uncensored: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    reasoning: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    coding: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    gpu: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    cpu: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    recommended: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30 font-semibold",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${styles[type]}`}
    >
      {label}
    </span>
  );
}

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  return (
    <div className="relative my-3 rounded-xl border border-border/80 bg-zinc-950 p-4 text-xs font-mono text-zinc-100 dark:bg-black/90 overflow-x-auto shadow-inner">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-[11px] text-zinc-400">
        <span>{language}</span>
      </div>
      <pre className="leading-relaxed whitespace-pre font-mono">{code}</pre>
    </div>
  );
}

/* ====================================================================== */
/* 1. Model Catalog & Capabilities Matrix                                  */
/* ====================================================================== */

const modelsCatalogSections: DocRecord["sections"] = [
  {
    id: "architecture-tiers",
    title: "Hardware & Weight Classes",
    summary: "Understand parameter sizes, context capacity, and VRAM requirements before selecting models.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Local language models are distributed in parameter tiers that dictate the required VRAM, system memory
            bandwidth, and compute throughput. Modern quantization techniques like{" "}
            <span className="font-semibold text-foreground">GGUF (k-quants)</span>,{" "}
            <span className="font-semibold text-foreground">EXL2</span>, and{" "}
            <span className="font-semibold text-foreground">AWQ</span> allow high-fidelity execution on consumer GPUs
            (RTX 3060/4060 12GB, RTX 3090/4090 24GB, or dual 24GB setups) by compressing 16-bit float weights into 4-bit,
            5-bit, or 8-bit precision with minimal perplexity degradation.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-card p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">Compact Tier (7B – 9B)</h4>
              <StatusBadge type="gpu" label="8GB - 12GB VRAM" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fast, highly responsive models suited for lightweight local coding, JSON extraction, and local agents on
              standard consumer laptops and desktop GPUs.
            </p>
            <p className="text-xs font-mono text-primary pt-1">
              • Qwen 2.5 7B / Coder<br />
              • Llama 3.1 8B Instruct<br />
              • Gemma 2 9B / Mistral 7B
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">Workhorse Tier (14B – 32B)</h4>
              <StatusBadge type="recommended" label="16GB - 24GB VRAM" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The sweet spot for single 24GB GPUs (RTX 3090 / 4090 / Mac Studio). Near-frontier reasoning, deep agentic
              tool-use, and coding benchmarks.
            </p>
            <p className="text-xs font-mono text-primary pt-1">
              • Qwen 2.5 Coder 32B<br />
              • DeepSeek-R1-Distill-Qwen-32B<br />
              • Gemma 2 27B / Phi-4 14B
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">Frontier Tier (70B – 72B / MoE)</h4>
              <StatusBadge type="gpu" label="48GB+ VRAM or Dual GPU" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Production-grade flagship reasoning, multi-turn architecture synthesis, and agentic workflows requiring
              dual RTX 3090/4090s, Mac Studio (64GB-128GB), or CPU offload.
            </p>
            <p className="text-xs font-mono text-primary pt-1">
              • Llama 3.3 70B Instruct<br />
              • Qwen 2.5 72B Instruct<br />
              • DeepSeek-R1-Distill-Llama-70B
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "standard-weights-matrix",
    title: "Standard Open-Weights Matrix",
    summary: "Leading aligned models with official capabilities, hardware specifications, and download mirrors.",
    content: (
      <div className="space-y-4">
        <div className="overflow-x-auto rounded-xl border border-border/70 bg-card">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 font-semibold text-foreground">
                <th className="p-3">Model</th>
                <th className="p-3">Params</th>
                <th className="p-3">Specialty</th>
                <th className="p-3">Context</th>
                <th className="p-3">Min VRAM (Q4 / Q8)</th>
                <th className="p-3">Download Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-muted-foreground">
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">
                  <div>DeepSeek-R1-Distill-Qwen-32B</div>
                  <StatusBadge type="reasoning" label="CoT Reasoning" />
                </td>
                <td className="p-3">32B</td>
                <td className="p-3">Advanced step-by-step reasoning, math, and code synthesis.</td>
                <td className="p-3 font-mono">128k</td>
                <td className="p-3 font-mono text-foreground">19.5 GB (Q4_K_M) / 34 GB (Q8_0)</td>
                <td className="p-3 space-y-1">
                  <a
                    href="https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-primary underline hover:text-primary/80"
                  >
                    HF Base Weights
                  </a>
                  <br />
                  <a
                    href="https://huggingface.co/bartowski/DeepSeek-R1-Distill-Qwen-32B-GGUF"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-primary underline hover:text-primary/80"
                  >
                    bartowski GGUF
                  </a>
                  <br />
                  <span className="font-mono text-[11px] text-muted-foreground">ollama run deepseek-r1:32b</span>
                </td>
              </tr>

              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">
                  <div>Qwen 2.5 Coder 32B Instruct</div>
                  <StatusBadge type="coding" label="SOTA Coding" />
                </td>
                <td className="p-3">32B</td>
                <td className="p-3">Agentic coding, repo-level refactoring, multi-language mastery.</td>
                <td className="p-3 font-mono">128k</td>
                <td className="p-3 font-mono text-foreground">19.5 GB (Q4_K_M) / 34 GB (Q8_0)</td>
                <td className="p-3 space-y-1">
                  <a
                    href="https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-primary underline hover:text-primary/80"
                  >
                    HF Base Weights
                  </a>
                  <br />
                  <a
                    href="https://huggingface.co/bartowski/Qwen2.5-Coder-32B-Instruct-GGUF"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-primary underline hover:text-primary/80"
                  >
                    bartowski GGUF
                  </a>
                  <br />
                  <span className="font-mono text-[11px] text-muted-foreground">ollama run qwen2.5-coder:32b</span>
                </td>
              </tr>

              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">
                  <div>Llama 3.3 70B Instruct</div>
                  <StatusBadge type="recommended" label="Flagship Generalist" />
                </td>
                <td className="p-3">70B</td>
                <td className="p-3">Frontier-class instruction following, agent workflows, tool calling.</td>
                <td className="p-3 font-mono">128k</td>
                <td className="p-3 font-mono text-foreground">41 GB (Q4_K_M) / 72 GB (Q8_0)</td>
                <td className="p-3 space-y-1">
                  <a
                    href="https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-primary underline hover:text-primary/80"
                  >
                    HF Meta Weights
                  </a>
                  <br />
                  <a
                    href="https://huggingface.co/bartowski/Llama-3.3-70B-Instruct-GGUF"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-primary underline hover:text-primary/80"
                  >
                    bartowski GGUF
                  </a>
                  <br />
                  <span className="font-mono text-[11px] text-muted-foreground">ollama run llama3.3:70b</span>
                </td>
              </tr>

              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">
                  <div>Qwen 2.5 7B / 14B / 72B</div>
                  <StatusBadge type="standard" label="Versatile" />
                </td>
                <td className="p-3">7B - 72B</td>
                <td className="p-3">Broad multilingual reasoning, structured JSON formatting, instruction depth.</td>
                <td className="p-3 font-mono">128k</td>
                <td className="p-3 font-mono text-foreground">
                  7B: 5 GB (Q4) / 14B: 9 GB (Q4) / 72B: 43 GB (Q4)
                </td>
                <td className="p-3 space-y-1">
                  <a
                    href="https://huggingface.co/Qwen/Qwen2.5-72B-Instruct"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-primary underline hover:text-primary/80"
                  >
                    HF Qwen Hub
                  </a>
                  <br />
                  <span className="font-mono text-[11px] text-muted-foreground">ollama run qwen2.5:14b</span>
                </td>
              </tr>

              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">
                  <div>Mistral Large 2 (123B) & NeMo (12B)</div>
                  <StatusBadge type="standard" label="Function Calling" />
                </td>
                <td className="p-3">12B / 123B</td>
                <td className="p-3">Native function calling, strict constraint adherence, enterprise tooling.</td>
                <td className="p-3 font-mono">128k</td>
                <td className="p-3 font-mono text-foreground">12B: 8 GB (Q4) / 123B: 72 GB (Q4)</td>
                <td className="p-3 space-y-1">
                  <a
                    href="https://huggingface.co/mistralai/Mistral-Nemo-Instruct-2407"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-primary underline hover:text-primary/80"
                  >
                    HF Mistral NeMo
                  </a>
                  <br />
                  <span className="font-mono text-[11px] text-muted-foreground">ollama run mistral-nemo</span>
                </td>
              </tr>

              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">
                  <div>Phi-4 14B</div>
                  <StatusBadge type="reasoning" label="Compact Reasoning" />
                </td>
                <td className="p-3">14B</td>
                <td className="p-3">Synthetic data trained math & logical reasoning exceeding many 30B models.</td>
                <td className="p-3 font-mono">16k</td>
                <td className="p-3 font-mono text-foreground">9.2 GB (Q4_K_M) / 15.5 GB (Q8_0)</td>
                <td className="p-3 space-y-1">
                  <a
                    href="https://huggingface.co/microsoft/phi-4"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-primary underline hover:text-primary/80"
                  >
                    HF Microsoft Hub
                  </a>
                  <br />
                  <span className="font-mono text-[11px] text-muted-foreground">ollama run phi4</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: "uncensored-abliterated-models",
    title: "Uncensored, Abliterated & Jailbroken Weights",
    summary: "Unaligned models, activation-steered abliterations, and uncensored fine-tunes for research and unrestricted generation.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm">
            <Icon icon="mdi:shield-alert-outline" className="h-5 w-5" />
            <span>Understanding Model Uncensoring & Abliteration</span>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Standard foundation models contain alignment tuning (RLHF/DPO) that enforces safety refusals (e.g., &quot;As an AI language model, I cannot...&quot;).
            There are two distinct methods for bypassing or removing these constraints in local models:
          </p>
          <div className="grid gap-3 md:grid-cols-2 pt-2">
            <div className="rounded-xl border border-border/80 bg-background/80 p-3 text-xs">
              <span className="font-semibold text-foreground">1. Weight Abliteration (Orthogonalization):</span>
              <p className="text-muted-foreground mt-1">
                A mathematical technique pioneered by Maxime Labonne and FailSpy. By isolating the directional vector in the residual stream
                responsible for refusal activations and projecting the model weights orthogonal to this vector, refusals are removed{" "}
                <span className="text-foreground font-medium">without retraining or degrading baseline benchmark intelligence</span>.
              </p>
            </div>
            <div className="rounded-xl border border-border/80 bg-background/80 p-3 text-xs">
              <span className="font-semibold text-foreground">2. Uncensored Dataset Fine-Tuning:</span>
              <p className="text-muted-foreground mt-1">
                Models trained from scratch or fine-tuned on unfiltered datasets (e.g., Cognitive Computations Dolphin series by Eric Hartford,
                Nous Hermes unaligned, Venice). These models natively answer edge-case queries, reverse-engineering questions, and creative roleplay.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/70 bg-card">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 font-semibold text-foreground">
                <th className="p-3">Model Variant</th>
                <th className="p-3">Base Model</th>
                <th className="p-3">Method</th>
                <th className="p-3">Key Characteristics</th>
                <th className="p-3">Download Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-muted-foreground">
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">
                  <div>Llama-3.3-70B-Instruct-abliterated</div>
                  <StatusBadge type="uncensored" label="Fully Abliterated" />
                </td>
                <td className="p-3">Llama 3.3 70B</td>
                <td className="p-3">Activation Orthogonalization</td>
                <td className="p-3">
                  Full 70B reasoning and coding power with zero corporate refusal triggers. Ideal for penetration testing,
                  unfiltered analysis, and creative writing.
                </td>
                <td className="p-3 space-y-1">
                  <a
                    href="https://huggingface.co/mlabonne/Llama-3.3-70B-Instruct-abliterated"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    mlabonne / HF Base
                  </a>
                  <br />
                  <a
                    href="https://huggingface.co/bartowski/Llama-3.3-70B-Instruct-abliterated-GGUF"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    bartowski GGUF
                  </a>
                </td>
              </tr>

              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">
                  <div>Dolphin 2.9.4 / Dolphin 3.0 (Qwen & Llama)</div>
                  <StatusBadge type="uncensored" label="Uncensored Fine-Tune" />
                </td>
                <td className="p-3">Llama 3.1 8B / 70B & Qwen 2.5</td>
                <td className="p-3">Cognitive Computations FT</td>
                <td className="p-3">
                  Trained by Eric Hartford on completely filtered-free multi-turn instruction datasets. Built-in system prompt
                  compliance for compliance testing, cyber-research, and deep roleplay.
                </td>
                <td className="p-3 space-y-1">
                  <a
                    href="https://huggingface.co/cognitivecomputations/dolphin-2.9.4-llama3.1-8b"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    Cognitive Computations HF
                  </a>
                  <br />
                  <span className="font-mono text-[11px] text-muted-foreground">ollama run dolphin-llama3</span>
                </td>
              </tr>

              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">
                  <div>Qwen2.5-Coder-32B-Instruct-abliterated</div>
                  <StatusBadge type="coding" label="Uncensored Coder" />
                </td>
                <td className="p-3">Qwen 2.5 Coder 32B</td>
                <td className="p-3">Residual Vector Removal</td>
                <td className="p-3">
                  Zero refusal for security audits, malware analysis, exploit simulation, vulnerability research, and legacy codebase patching.
                </td>
                <td className="p-3 space-y-1">
                  <a
                    href="https://huggingface.co/mlabonne/Qwen2.5-Coder-32B-Instruct-abliterated"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    mlabonne HF Repo
                  </a>
                  <br />
                  <a
                    href="https://huggingface.co/bartowski/Qwen2.5-Coder-32B-Instruct-abliterated-GGUF"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    bartowski GGUF Quants
                  </a>
                </td>
              </tr>

              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">
                  <div>Nous Hermes 3 (8B / 70B)</div>
                  <StatusBadge type="uncensored" label="Autonomous / Agentic" />
                </td>
                <td className="p-3">Llama 3.1</td>
                <td className="p-3">Nous Research Unaligned</td>
                <td className="p-3">
                  Trained for autonomous agent roleplaying, complex function execution, synthetic data generation, and long-form conversational immersion.
                </td>
                <td className="p-3 space-y-1">
                  <a
                    href="https://huggingface.co/NousResearch/Hermes-3-Llama-3.1-8B"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    Nous Research Hub
                  </a>
                  <br />
                  <span className="font-mono text-[11px] text-muted-foreground">ollama run hermes3</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: "model-selection-guide",
    title: "Model Selection Matrix by Use Case",
    summary: "Pick the optimal model based on hardware constraints and primary objective.",
    content: (
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:code-braces" className="text-emerald-500 h-5 w-5" />
            <h4 className="font-semibold text-sm text-foreground">Agentic Coding & Tool Calling</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Primary Pick:</span> Qwen 2.5 Coder 32B Instruct (or abliterated version).<br />
            <span className="font-medium text-foreground">Budget Pick (8GB-12GB VRAM):</span> Qwen 2.5 Coder 7B Instruct.<br />
            <span className="font-medium text-foreground">Why:</span> Scores highest on HumanEval/MBPP and excels at strict JSON schema parameter emission for tools and subagents.
          </p>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:head-cog-outline" className="text-purple-500 h-5 w-5" />
            <h4 className="font-semibold text-sm text-foreground">Deep Logic & Mathematical Reasoning</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Primary Pick:</span> DeepSeek-R1-Distill-Qwen-32B or Llama-70B.<br />
            <span className="font-medium text-foreground">Budget Pick:</span> DeepSeek-R1-Distill-Qwen-14B or Phi-4 14B.<br />
            <span className="font-medium text-foreground">Why:</span> Uses chain-of-thought tokens inside &lt;think&gt; tags to self-correct and verify solutions before emitting output.
          </p>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:shield-bug-outline" className="text-rose-500 h-5 w-5" />
            <h4 className="font-semibold text-sm text-foreground">Security Auditing & Penetration Testing</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Primary Pick:</span> Llama-3.3-70B-Instruct-abliterated.<br />
            <span className="font-medium text-foreground">Compact Pick:</span> Dolphin 2.9.4 Llama-3.1 8B.<br />
            <span className="font-medium text-foreground">Why:</span> Standard models refuse to analyze malware signatures, payload de-obfuscation, or zero-day vulnerability reproduction.
          </p>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:chat-processing-outline" className="text-blue-500 h-5 w-5" />
            <h4 className="font-semibold text-sm text-foreground">General Conversational Assistant</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Primary Pick:</span> Llama 3.3 70B Instruct or Qwen 2.5 72B.<br />
            <span className="font-medium text-foreground">Compact Pick:</span> Mistral NeMo 12B or Qwen 2.5 14B.<br />
            <span className="font-medium text-foreground">Why:</span> Superior natural tone, wide world knowledge, and fluent multi-turn conversational memory.
          </p>
        </div>
      </div>
    ),
  },
];

/* ====================================================================== */
/* 2. Linux Server Installation Guide                                      */
/* ====================================================================== */

const linuxInstallationSections: DocRecord["sections"] = [
  {
    id: "system-prerequisites",
    title: "Ubuntu Server Preparation",
    summary: "Base operating system requirements, kernel packages, and GPU prerequisites for Ubuntu 24.04 / 22.04 LTS.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Initial Server Hygiene & Dependencies</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ensure your Ubuntu server installation is updated, essential build tools are present, and PCIe power
            management is configured for continuous inference workloads.
          </p>
          <CodeBlock
            language="bash"
            code={`# 1. Update system package index and upgrade existing packages
sudo apt update && sudo apt upgrade -y

# 2. Install essential compilation tools, git, curl, and hardware utilities
sudo apt install -y build-essential dkms curl wget git htop nvtop pciutils aria2 jq

# 3. Disable nouveau open-source driver (if present)
sudo bash -c "cat <<EOF > /etc/modprobe.d/blacklist-nouveau.conf
blacklist nouveau
options nouveau modeset=0
EOF"
sudo update-initramfs -u`}
          />
        </div>
      </div>
    ),
  },
  {
    id: "nvidia-cuda-setup",
    title: "NVIDIA Drivers & CUDA 12 Toolchain",
    summary: "Clean automated installation of official NVIDIA proprietary drivers, CUDA toolkit, and container runtime.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Installing NVIDIA Drivers & CUDA Toolkit</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We recommend using the official NVIDIA repository for production stability and access to CUDA 12.4+.
          </p>
          <CodeBlock
            language="bash"
            code={`# 1. Install recommended headless server driver (e.g., branch 550 or 560)
sudo apt install -y nvidia-driver-550-server nvidia-utils-550-server

# 2. Reboot server to load the kernel modules
sudo reboot

# 3. Verify driver detection and PCIe link speed
nvidia-smi

# 4. Enable persistence mode so drivers don't drop down into low-power states
sudo nvidia-smi -pm 1`}
          />

          <h4 className="text-sm font-semibold text-foreground pt-3">NVIDIA Container Toolkit (Docker GPU Pass-Through)</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Required if you plan to run Ollama, vLLM, or Open-WebUI inside Docker containers with GPU acceleration.
          </p>
          <CodeBlock
            language="bash"
            code={`# Configure NVIDIA container repo
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \\
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \\
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt update
sudo apt install -y nvidia-container-toolkit

# Configure Docker daemon for GPU runtime
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker

# Test GPU passthrough inside container
docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi`}
          />
        </div>
      </div>
    ),
  },
  {
    id: "ollama-production-service",
    title: "Ollama Daemon Setup & Tuning",
    summary: "Install Ollama as a high-performance systemd service listening across your local network.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            By default, Ollama only binds to <code className="text-foreground font-mono">127.0.0.1:11434</code>. To allow
            remote connections from other computers, subagents, and Claude/Cursor tools, configure its environment overrides.
          </p>

          <CodeBlock
            language="bash"
            code={`# 1. Install Ollama via official installer
curl -fsSL https://ollama.com/install.sh | sh

# 2. Override systemd service configuration
sudo systemctl edit ollama.service`}
          />

          <p className="text-xs text-muted-foreground">Add the following override block inside the systemd editor:</p>

          <CodeBlock
            language="ini"
            code={`[Service]
# Listen on all network interfaces (allow remote connections)
Environment="OLLAMA_HOST=0.0.0.0:11434"
# Allow cross-origin requests from any client or web UI
Environment="OLLAMA_ORIGINS=*"
# Max parallel requests handled concurrently
Environment="OLLAMA_NUM_PARALLEL=4"
# Keep models loaded in VRAM indefinitely (avoid reload latency)
Environment="OLLAMA_KEEP_ALIVE=-1"
# Optional: specify custom fast NVMe SSD storage path for weights
Environment="OLLAMA_MODELS=/mnt/nvme/ollama/models"`}
          />

          <CodeBlock
            language="bash"
            code={`# 3. Reload systemd daemon and restart Ollama
sudo systemctl daemon-reload
sudo systemctl restart ollama

# 4. Verify service status and listening port
sudo systemctl status ollama
ss -tulpn | grep 11434`}
          />
        </div>
      </div>
    ),
  },
  {
    id: "vllm-high-throughput-setup",
    title: "vLLM Production Server Setup",
    summary: "Deploy vLLM for high-concurrency continuous batching and native OpenAI API emulation.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            For workloads serving multiple autonomous agents or high token throughput, <span className="font-semibold text-foreground">vLLM</span> is
            the industry standard. It implements <span className="font-semibold text-foreground">PagedAttention</span>, eliminating KV cache memory fragmentation.
          </p>

          <CodeBlock
            language="bash"
            code={`# 1. Create Python virtual environment
python3 -m venv ~/vllm-env
source ~/vllm-env/bin/activate

# 2. Install vLLM with CUDA acceleration
pip install --upgrade pip
pip install vllm ray

# 3. Launch vLLM OpenAI-compatible server (e.g., Qwen 2.5 Coder 32B with FP8 or AWQ)
python3 -m vllm.entrypoints.openai.api_server \\
  --model Qwen/Qwen2.5-Coder-32B-Instruct-AWQ \\
  --host 0.0.0.0 \\
  --port 8000 \\
  --gpu-memory-utilization 0.92 \\
  --max-model-len 32768 \\
  --enforce-eager \\
  --api-key "sk-local-secure-key-123"`}
          />
        </div>
      </div>
    ),
  },
  {
    id: "docker-compose-stack",
    title: "Docker Compose All-in-One Stack (Ollama + Open-WebUI)",
    summary: "Single-command containerized stack providing backend LLM inference and a ChatGPT-style multi-device web interface.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Save this <code className="font-mono text-foreground">docker-compose.yml</code> file on your Ubuntu server to launch
            Ollama with GPU passthrough and the Open-WebUI frontend on port 3000.
          </p>

          <CodeBlock
            language="yaml"
            code={`version: '3.8'

services:
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    restart: unless-stopped
    ports:
      - "11434:11434"
    environment:
      - OLLAMA_HOST=0.0.0.0
      - OLLAMA_ORIGINS=*
      - OLLAMA_NUM_PARALLEL=4
      - OLLAMA_KEEP_ALIVE=-1
    volumes:
      - /mnt/nvme/ollama:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    restart: unless-stopped
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
      - WEBUI_SECRET_KEY=generate_a_random_secret_string_here
    volumes:
      - /mnt/nvme/open-webui:/app/backend/data
    depends_on:
      - ollama`}
          />

          <CodeBlock
            language="bash"
            code={`# Start stack in detached background mode
docker compose up -d

# Check logs
docker compose logs -f`}
          />
        </div>
      </div>
    ),
  },
];

/* ====================================================================== */
/* 3. Hardware & Performance Optimization                                  */
/* ====================================================================== */

const hardwareOptimizationSections: DocRecord["sections"] = [
  {
    id: "gpu-vs-cpu-physics",
    title: "GPU vs CPU: Memory Bandwidth Physics",
    summary: "Why memory bandwidth dictates token generation speed, and how TTFT differs from ongoing generation.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
          <p className="text-sm text-foreground font-semibold">The Autoregressive Generation Bottleneck</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            In Large Language Model inference, generation proceeds <span className="font-semibold text-foreground">one token at a time</span>.
            Generating a single token requires reading every single parameter weight from memory once. Therefore:
          </p>
          <div className="rounded-xl bg-muted/40 p-4 font-mono text-xs border border-border/70 text-center text-foreground font-semibold">
            Max Generation Speed (Tokens/Sec) ≈ Memory Bandwidth (GB/s) / Active Model Size (GB)
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This mathematical reality explains why a high-core CPU cannot compete with a GPU for token generation speed:
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/70 bg-card">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 font-semibold text-foreground">
                <th className="p-3">Hardware Platform</th>
                <th className="p-3">Memory Architecture</th>
                <th className="p-3">Bandwidth (GB/s)</th>
                <th className="p-3">70B Q4 (40GB) Speed</th>
                <th className="p-3">32B Q4 (20GB) Speed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-muted-foreground">
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">NVIDIA RTX 4090 (24GB)</td>
                <td className="p-3">GDDR6X (384-bit)</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">1,008 GB/s</td>
                <td className="p-3 font-mono">Dual GPU: ~24 tok/s</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">~48 - 55 tok/s</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">NVIDIA RTX 3090 (24GB)</td>
                <td className="p-3">GDDR6X (384-bit)</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">936 GB/s</td>
                <td className="p-3 font-mono">Dual GPU: ~22 tok/s</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">~42 - 47 tok/s</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">Apple M2/M3 Max (Unified)</td>
                <td className="p-3">LPDDR5 (512-bit)</td>
                <td className="p-3 font-mono text-blue-600 dark:text-blue-400">400 GB/s</td>
                <td className="p-3 font-mono">~9.5 tok/s</td>
                <td className="p-3 font-mono">~18 - 20 tok/s</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">Dual DDR5-5600 System RAM (CPU)</td>
                <td className="p-3">Dual-channel DDR5</td>
                <td className="p-3 font-mono text-amber-600 dark:text-amber-400">89.6 GB/s</td>
                <td className="p-3 font-mono text-rose-500">~1.8 - 2.2 tok/s</td>
                <td className="p-3 font-mono text-amber-600 dark:text-amber-400">~4.1 tok/s</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">Quad DDR4-3200 Server RAM (CPU)</td>
                <td className="p-3">Quad-channel DDR4</td>
                <td className="p-3 font-mono text-rose-500">102.4 GB/s</td>
                <td className="p-3 font-mono text-rose-500">~2.3 tok/s</td>
                <td className="p-3 font-mono text-amber-600 dark:text-amber-400">~4.8 tok/s</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-2">
            <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">Time To First Token (TTFT / Prompt Eval)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">Compute-Bound:</span> When processing an initial prompt of 8,000 tokens,
              all tokens are processed in parallel matrix multiplications (GEMM). GPU Tensor Cores excel here, processing thousands of prompt tokens per second.
            </p>
          </div>
          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-2">
            <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">Token Generation (Decoding)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">Memory Bandwidth-Bound:</span> Each generated token must access the entire model weight matrix sequentially.
              Adding more CPU cores will not increase generation speed once the memory bus is saturated.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "context-kv-cache-optimization",
    title: "Context Window & KV Cache Sizing",
    summary: "Calculate KV cache memory consumption and utilize FP8 / Q8 quantization to prevent VRAM Out-of-Memory crashes.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
          <h4 className="text-sm font-semibold text-foreground">The Hidden Cost of Large Context Windows</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            As conversations and codebase prompts grow to 32k, 64k, or 128k tokens, the <span className="font-semibold text-foreground">Key-Value (KV) Cache</span> accumulates
            gigabytes of VRAM independently of model weights.
          </p>

          <div className="rounded-xl bg-muted/40 p-4 font-mono text-xs border border-border/70 text-center text-foreground font-semibold">
            KV Cache Size (Bytes) = 2 × Layers × Heads × Head_Dim × Tokens × Bytes_Per_Element
          </div>

          <div className="overflow-x-auto rounded-xl border border-border/70 bg-card">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border/80 bg-muted/40 font-semibold text-foreground">
                  <th className="p-3">Model Architecture</th>
                  <th className="p-3">Context Length</th>
                  <th className="p-3">FP16 KV Cache</th>
                  <th className="p-3">FP8 / Q8 KV Cache</th>
                  <th className="p-3">Q4 KV Cache</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-muted-foreground">
                <tr className="hover:bg-muted/20">
                  <td className="p-3 font-medium text-foreground">Llama 3.3 70B (GQA 8 heads)</td>
                  <td className="p-3 font-mono">32,768 tokens</td>
                  <td className="p-3 font-mono text-rose-500">5.2 GB</td>
                  <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">2.6 GB</td>
                  <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">1.3 GB</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-3 font-medium text-foreground">Llama 3.3 70B (GQA 8 heads)</td>
                  <td className="p-3 font-mono">131,072 tokens</td>
                  <td className="p-3 font-mono text-rose-500">21.0 GB</td>
                  <td className="p-3 font-mono text-amber-600 dark:text-amber-400">10.5 GB</td>
                  <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">5.2 GB</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-3 font-medium text-foreground">Qwen 2.5 Coder 32B (GQA 8 heads)</td>
                  <td className="p-3 font-mono">32,768 tokens</td>
                  <td className="p-3 font-mono text-amber-600 dark:text-amber-400">4.1 GB</td>
                  <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">2.0 GB</td>
                  <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">1.0 GB</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-sm font-semibold text-foreground pt-2">Enabling KV Cache Quantization in llama.cpp & vLLM</h4>
          <CodeBlock
            language="bash"
            code={`# llama.cpp / llama-server with FlashAttention and Q8_0 KV cache (reclaims ~50% VRAM)
llama-server -m ./models/qwen2.5-coder-32b.Q4_K_M.gguf \\
  -ngl 99 \\
  -c 65536 \\
  -fa \\
  --ctk q8_0 \\
  --ctv q8_0 \\
  --host 0.0.0.0 --port 8080

# vLLM with FP8 KV cache
python3 -m vllm.entrypoints.openai.api_server \\
  --model Qwen/Qwen2.5-Coder-32B-Instruct \\
  --kv-cache-dtype fp8 \\
  --max-model-len 65536`}
          />
        </div>
      </div>
    ),
  },
  {
    id: "cpu-cores-subagents",
    title: "CPU Cores, NUMA & Subagent Concurrency",
    summary: "Thread pinning, multi-socket NUMA interleaving, and optimizing parallel subagent orchestration.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Thread Pinning & Physical vs Hyperthreaded Cores</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            When running CPU inference or CPU-GPU hybrid offloading with <code className="font-mono text-foreground">llama.cpp</code>,
            setting thread count (<code className="font-mono text-foreground">-t</code>) equal to physical Performance cores yields peak throughput.
            Assigning logical Hyperthreaded (SMT) cores causes cache thrashing and degrades performance by 15–30%.
          </p>

          <CodeBlock
            language="bash"
            code={`# 1. Identify physical vs logical cores
lscpu | grep -E "Socket|Core\(s\) per socket|Thread\(s\) per core|NUMA node"

# 2. Optimal rule of thumb: -t = physical cores (e.g., 8 on an 8P/16T CPU)
llama-server -m model.gguf -t 8 -ngl 24

# 3. For Dual-Socket AMD EPYC / Intel Xeon servers, interleave memory across all NUMA nodes
numactl --interleave=all llama-server -m model.gguf -t 32 -c 32768`}
          />

          <h4 className="text-sm font-semibold text-foreground pt-3">Subagents & Multi-Agent Concurrency Scaling</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Autonomous agent workflows (e.g. Claude Code subagents, CrewAI, AutoGen) spawn multiple concurrent model calls (researcher, coder, reviewer).
            Understand the architectural differences between sequential queuing and continuous batching:
          </p>

          <div className="grid gap-3 md:grid-cols-2 pt-2">
            <div className="rounded-xl border border-border/80 bg-background/80 p-3 text-xs space-y-1">
              <span className="font-semibold text-foreground">Sequential Queuing (Default Ollama)</span>
              <p className="text-muted-foreground">
                If 4 subagents make simultaneous requests, Ollama processes them one by one unless configured with <code className="font-mono text-foreground">OLLAMA_NUM_PARALLEL=4</code>.
                Each parallel slot divides available KV cache memory proportionally.
              </p>
            </div>
            <div className="rounded-xl border border-border/80 bg-background/80 p-3 text-xs space-y-1">
              <span className="font-semibold text-foreground">Continuous Batching (vLLM Engine)</span>
              <p className="text-muted-foreground">
                Dynamically batches tokens from multiple subagents into the same GPU forward pass. While Agent A is executing a shell tool,
                Agent B receives tokens without waiting, achieving up to 5x higher total multi-agent throughput.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

/* ====================================================================== */
/* 4. Remote Access & Conversational Integration                           */
/* ====================================================================== */

const remoteAccessSections: DocRecord["sections"] = [
  {
    id: "openai-api-layer",
    title: "OpenAI-Compatible API Standard",
    summary: "Standardize your local inference endpoints for universal client compatibility across the network.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Both Ollama and vLLM expose standardized OpenAI-compatible API routes. Any application supporting custom OpenAI endpoints
            can interact with your local server directly over the network:
          </p>

          <div className="grid gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-muted/40 border border-border/60 flex items-center justify-between">
              <span className="text-foreground">Ollama API Endpoint:</span>
              <span className="text-primary">http://&lt;SERVER-IP&gt;:11434/v1/chat/completions</span>
            </div>
            <div className="p-2 rounded-lg bg-muted/40 border border-border/60 flex items-center justify-between">
              <span className="text-foreground">vLLM API Endpoint:</span>
              <span className="text-primary">http://&lt;SERVER-IP&gt;:8000/v1/chat/completions</span>
            </div>
            <div className="p-2 rounded-lg bg-muted/40 border border-border/60 flex items-center justify-between">
              <span className="text-foreground">llama-server Endpoint:</span>
              <span className="text-primary">http://&lt;SERVER-IP&gt;:8080/v1/chat/completions</span>
            </div>
          </div>

          <h4 className="text-sm font-semibold text-foreground pt-2">Testing the Remote Endpoint from Another Computer</h4>
          <CodeBlock
            language="bash"
            code={`# Test connectivity and stream a response from your remote laptop/workstation
curl http://192.168.1.150:11434/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "qwen2.5-coder:32b",
    "messages": [
      {"role": "system", "content": "You are a senior systems engineer."},
      {"role": "user", "content": "Write a bash script to monitor GPU temperatures."}
    ],
    "stream": true
  }'`}
          />
        </div>
      </div>
    ),
  },
  {
    id: "connecting-claude-and-clients",
    title: "Connecting Claude Code, Cursor & Dev Tools",
    summary: "Route Claude CLI, LiteLLM proxy bridges, Cursor, and IDE extensions to your private GPU server.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
          <h4 className="text-sm font-semibold text-foreground">1. LiteLLM Proxy Bridge (Universal Anthropic &amp; OpenAI Adapter)</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Tools designed specifically for Claude (or expecting the Anthropic API format) can be routed to your local models
            using a lightweight <span className="font-semibold text-foreground">LiteLLM Proxy</span> on the server.
          </p>

          <CodeBlock
            language="yaml"
            code={`# litellm_config.yaml on your Linux Server
model_list:
  - model_name: claude-3-5-sonnet-20241022
    litellm_params:
      model: ollama/qwen2.5-coder:32b
      api_base: http://127.0.0.1:11434

  - model_name: local-coder
    litellm_params:
      model: openai/Qwen/Qwen2.5-Coder-32B-Instruct-AWQ
      api_base: http://127.0.0.1:8000/v1
      api_key: "sk-local-secure-key-123"`}
          />

          <CodeBlock
            language="bash"
            code={`# Start LiteLLM proxy on port 4000
pip install litellm[proxy]
litellm --config litellm_config.yaml --port 4000 --host 0.0.0.0`}
          />

          <h4 className="text-sm font-semibold text-foreground pt-3">2. Configuring Client Workstations (Environment Variables)</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            On your secondary computer (Mac, Windows, or Linux laptop), point standard CLI tools and AI clients to your server:
          </p>

          <CodeBlock
            language="bash"
            code={`# In ~/.bashrc, ~/.zshrc or PowerShell $PROFILE on your client machine
export OPENAI_BASE_URL="http://192.168.1.150:11434/v1"
export OPENAI_API_KEY="ollama"

export ANTHROPIC_BASE_URL="http://192.168.1.150:4000"
export ANTHROPIC_API_KEY="sk-litellm-proxy-key"`}
          />

          <h4 className="text-sm font-semibold text-foreground pt-3">3. Connecting Cursor &amp; VS Code Continue</h4>
          <div className="rounded-xl border border-border/80 bg-background/80 p-3 text-xs space-y-1">
            <p className="font-semibold text-foreground">• Cursor IDE:</p>
            <p className="text-muted-foreground">
              Settings &rarr; Models &rarr; Enable OpenAI API Key (enter dummy key e.g. <code className="font-mono text-foreground">sk-dummy</code>) &rarr;
              Override Base URL: <code className="font-mono text-foreground">http://192.168.1.150:11434/v1</code> &rarr; Add Model Name: <code className="font-mono text-foreground">qwen2.5-coder:32b</code>.
            </p>
            <p className="font-semibold text-foreground pt-2">• VS Code Continue Extension:</p>
            <p className="text-muted-foreground">
              Set provider to <code className="font-mono text-foreground">&quot;ollama&quot;</code> with <code className="font-mono text-foreground">apiBase: &quot;http://192.168.1.150:11434&quot;</code>.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "secure-networking-tunneling",
    title: "Secure Networking, VPN & Tunnels",
    summary: "Access your local models securely from anywhere in the world without exposing open ports to the public internet.",
    content: (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Icon icon="simple-icons:tailscale" className="text-blue-500 h-5 w-5" />
              <h4 className="text-sm font-semibold text-foreground">Option A: Tailscale Mesh VPN (Recommended)</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tailscale creates a secure WireGuard mesh between your server and all your devices. Zero port forwarding, automatic HTTPS,
              and encrypted peer-to-peer traffic.
            </p>
            <CodeBlock
              language="bash"
              code={`# On Ubuntu GPU Server
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up

# Now access anywhere via your Tailscale IP:
# http://100.x.y.z:11434`}
            />
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:ssh" className="text-purple-500 h-5 w-5" />
              <h4 className="text-sm font-semibold text-foreground">Option B: Encrypted SSH Tunneling</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Forward the server's Ollama port directly to your laptop's localhost without changing firewall rules.
            </p>
            <CodeBlock
              language="bash"
              code={`# Run on your client laptop/workstation
ssh -N -L 11434:localhost:11434 user@your-server-ip

# Now your laptop can access http://localhost:11434
# as if Ollama was running locally!`}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Option C: NGINX Reverse Proxy with SSL &amp; API Key Authentication</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            For production remote access over custom domains with TLS encryption and header-based authorization tokens.
          </p>
          <CodeBlock
            language="nginx"
            code={`server {
    listen 443 ssl http2;
    server_name ai.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/ai.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ai.yourdomain.com/privkey.pem;

    location / {
        # Check custom API Key header
        if ($http_authorization != "Bearer sk-my-private-model-token") {
            return 401 '{"error": "Unauthorized"}';
        }

        proxy_pass http://127.0.0.1:11434;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 600s; # Essential for long-context generation
    }
}`}
          />
        </div>
      </div>
    ),
  },
  {
    id: "multi-device-conversational-ui",
    title: "Conversational UI on Phones, Tablets & Desktops",
    summary: "Interact conversationally with persistent chat history, artifacts, and multi-modal switching from any device.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            With <span className="font-semibold text-foreground">Open-WebUI</span> running on your server, open your browser
            on your iPhone, Android, iPad, or secondary laptop to:
          </p>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <Icon icon="mdi:check-circle-outline" className="text-emerald-500 h-4 w-4 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Seamless Model Switching:</strong> Switch dynamically between DeepSeek R1 reasoning, Qwen 2.5 Coder, and Uncensored Dolphin models in the same thread.</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="mdi:check-circle-outline" className="text-emerald-500 h-4 w-4 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">RAG &amp; Document Analysis:</strong> Upload PDFs, repos, and documents directly from your phone to query against your local GPU server.</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="mdi:check-circle-outline" className="text-emerald-500 h-4 w-4 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Voice &amp; Audio Input:</strong> Use built-in Whisper voice-to-text to talk to your local model conversationally with zero latency.</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="mdi:check-circle-outline" className="text-emerald-500 h-4 w-4 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Zero Cloud Dependency:</strong> All conversation histories, prompt templates, and embeddings remain strictly stored on your own hardware.</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
];

/* ====================================================================== */
/* Export Space Definition                                                 */
/* ====================================================================== */

export const localModelsSpace: DocSpace = {
  id: spaceId,
  title: "Local AI & Model Hosting",
  description:
    "Hardware architecture, downloadable & uncensored models, Ubuntu Linux server deployment, KV cache optimization, and remote multi-client orchestration.",
  href: `/spaces/${spaceId}`,
  cardIcon: "mdi:server-network",
  docs: [
    createDoc(
      "models-catalog",
      "Model Catalog & Matrix",
      "Up-to-date standard and abliterated/jailbroken weights, VRAM & compute tiers, and verified download links.",
      "Downloadable Models & Capabilities Matrix",
      "Comprehensive catalog of open-weights models, quantization profiles, uncensored abliterated weights, and direct download links.",
      "mdi:database-search-outline",
      modelsCatalogSections,
    ),
    createDoc(
      "linux-installation",
      "Ubuntu Server Installation",
      "Clean setup on Ubuntu 24.04/22.04 LTS, NVIDIA CUDA toolkit, container runtime, and inference engines.",
      "Linux Server Setup & Deployment Guide",
      "End-to-end guide for installing NVIDIA drivers, CUDA 12, Ollama, vLLM, and Docker on Ubuntu Server.",
      "mdi:linux",
      linuxInstallationSections,
    ),
    createDoc(
      "hardware-optimization",
      "Hardware & Optimization",
      "GPU vs CPU memory bandwidth physics, KV cache scaling, CPU thread pinning, and subagent concurrency.",
      "Hardware & Performance Optimization Guide",
      "In-depth analysis of memory bandwidth, KV cache formulas, FlashAttention, CPU core pinning, and subagent scaling.",
      "mdi:speedometer",
      hardwareOptimizationSections,
    ),
    createDoc(
      "remote-access-integration",
      "Remote Access & Integration",
      "OpenAI API compatibility, connecting Claude Code / Cursor / Open-WebUI, LiteLLM proxying, and VPN tunneling.",
      "Remote Access & Conversational Integration",
      "Connect remote computers, Claude Code, Cursor IDE, and web interfaces to your private local LLM server.",
      "mdi:lan-connect",
      remoteAccessSections,
    ),
  ],
};
