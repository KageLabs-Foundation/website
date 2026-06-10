import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InteractionState } from '../types';
import { Footer } from '../components/Footer';
import { Shield, Bug, AlertTriangle, Info, Code, Copy, Check, Loader2, ArrowLeft, Search, ChevronDown, ChevronRight, Lightbulb } from 'lucide-react';

interface ServicePageProps {
  setInteractionState: (state: InteractionState) => void;
}

interface AnalysisIssue {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  category: string;
  lineApprox: string;
  title: string;
  description: string;
  codeSnippet: string;
  suggestedFix: string;
  impact: string;
}

interface AnalysisSummary {
  totalIssues: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
  overallHealth: string;
  language: string;
}

interface AnalysisResult {
  summary: AnalysisSummary;
  issues: AnalysisIssue[];
}

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const MAX_CODE_LENGTH = 6000;

const LANGUAGES = [
  'Auto-detect', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C++',
  'Go', 'Rust', 'HTML', 'CSS', 'SQL', 'PHP', 'Ruby', 'C#', 'Swift', 'Kotlin',
];

const SEVERITY_STYLES: Record<string, { badge: string; bg: string; border: string; text: string; icon: React.ReactNode }> = {
  CRITICAL: {
    badge: 'bg-red-500',
    bg: 'bg-red-500/5',
    border: 'border-l-red-500',
    text: 'text-red-400',
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
  },
  HIGH: {
    badge: 'bg-orange-500',
    bg: 'bg-orange-500/5',
    border: 'border-l-orange-500',
    text: 'text-orange-400',
    icon: <Bug className="w-3.5 h-3.5" />,
  },
  MEDIUM: {
    badge: 'bg-yellow-500',
    bg: 'bg-yellow-500/5',
    border: 'border-l-yellow-500',
    text: 'text-yellow-400',
    icon: <Info className="w-3.5 h-3.5" />,
  },
  LOW: {
    badge: 'bg-blue-500',
    bg: 'bg-blue-500/5',
    border: 'border-l-blue-500',
    text: 'text-blue-400',
    icon: <Info className="w-3.5 h-3.5" />,
  },
  INFO: {
    badge: 'bg-zinc-500',
    bg: 'bg-zinc-500/5',
    border: 'border-l-zinc-500',
    text: 'text-zinc-400',
    icon: <Lightbulb className="w-3.5 h-3.5" />,
  },
};

const HEALTH_COLORS: Record<string, string> = {
  POOR: 'text-red-400',
  FAIR: 'text-orange-400',
  GOOD: 'text-yellow-400',
  EXCELLENT: 'text-green-400',
};

const SAMPLES = [
  {
    label: 'Vulnerable JS (SQL + XSS)',
    code: `app.get('/user', (req, res) => {
  const id = req.query.id;
  const query = "SELECT * FROM users WHERE id = " + id;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(\`<h1>Welcome \${req.query.name}</h1>\`);
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = \`SELECT * FROM admins WHERE
    username = '\${username}' AND
    password = '\${password}'\`;
  db.query(sql, (err, results) => {
    if (results.length > 0) {
      req.session.user = results[0];
      res.redirect('/admin');
    }
  });
});

const crypto = require('crypto');
const key = 'secretkey123';
const cipher = crypto.createCipher('aes-128-ecb', key);
let encrypted = cipher.update('data', 'utf8', 'hex');
encrypted += cipher.final('hex');

var serialized = eval("(" + req.body.json + ")");
`,
  },
  {
    label: 'Buggy React + TS',
    code: `interface Props {
  items: string[];
  onSelect: (item: string) => void;
}

const ListView: React.FC<Props> = ({ items, onSelect }) => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/items').then(res => res.json()).then(setData);
  });

  const filtered = items.filter(item => {
    if (search) return item;
    return item.includes(search);
  });

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.map(item => (
        <div key={item.id} onClick={() => onSelect(item)}>
          {item}
        </div>
      ))}
      <button onClick={props.onSelect(selected)}>Select</button>
    </div>
  );
};
`,
  },
];

const parseAnalysisResponse = (raw: string): AnalysisResult | null => {
  let text = raw.trim();

  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    text = jsonMatch[1].trim();
  }

  try {
    return JSON.parse(text);
  } catch {
    const braceStart = text.indexOf('{');
    const braceEnd = text.lastIndexOf('}');
    if (braceStart !== -1 && braceEnd > braceStart) {
      try {
        return JSON.parse(text.slice(braceStart, braceEnd + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
};

export const KageAIAnalyzePage: React.FC<ServicePageProps> = ({ setInteractionState }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Auto-detect');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedIssues, setExpandedIssues] = useState<Set<number>>(new Set());
  const [showSamplePicker, setShowSamplePicker] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (result && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [result]);

  const toggleIssue = (idx: number) => {
    setExpandedIssues(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const copyToClipboard = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const loadSample = (sample: typeof SAMPLES[0]) => {
    setCode(sample.code);
    setResult(null);
    setError(null);
    setShowSamplePicker(false);
    textareaRef.current?.focus();
  };

  const clearAll = () => {
    setCode('');
    setResult(null);
    setError(null);
  };

  const analyzeCode = async () => {
    if (!code.trim()) return;
    if (!GROQ_API_KEY) {
      setError('API key not configured. Set VITE_GROQ_API_KEY in your .env file.');
      return;
    }
    if (code.length > MAX_CODE_LENGTH) {
      setError(`Code is too long (${code.length} chars). Maximum is ${MAX_CODE_LENGTH} characters.`);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    const systemPrompt = `You are KageAI Code Analyzer, an elite code review AI. Your purpose is to analyze code with extreme thoroughness and find every possible issue — security vulnerabilities, logic bugs, performance bottlenecks, type safety problems, design flaws, error handling gaps, race conditions, injection risks, and any other imperfection no matter how small.

Analyze the provided ${language !== 'Auto-detect' ? language : ''} code and return your findings as a JSON object. Be extremely thorough — look for issues that even experienced engineers might miss.

CRITICAL RULES:
1. Return ONLY valid JSON. No markdown, no code fences, no extra text.
2. Be thorough — find every issue. Missing even one bug is a failure.
3. For each issue provide the exact problematic code snippet and a concrete suggested fix.
4. If no issues found (perfect code), return: {"summary":{"totalIssues":0,"critical":0,"high":0,"medium":0,"low":0,"info":0,"overallHealth":"EXCELLENT","language":"detected"},"issues":[]}

Use this EXACT JSON structure:
{
  "summary": {
    "totalIssues": number,
    "critical": number,
    "high": number,
    "medium": number,
    "low": number,
    "info": number,
    "overallHealth": "POOR" | "FAIR" | "GOOD" | "EXCELLENT",
    "language": "detected language"
  },
  "issues": [
    {
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO",
      "category": "Security" | "Bug" | "Performance" | "TypeSafety" | "Style" | "Design" | "BestPractice" | "ErrorHandling" | "Accessibility" | "Maintainability",
      "lineApprox": "line number or range or N/A",
      "title": "short title (max 60 chars)",
      "description": "detailed explanation of what's wrong and why it matters",
      "codeSnippet": "the problematic code from input",
      "suggestedFix": "the corrected code",
      "impact": "what could happen if not fixed"
    }
  ]
}

Severity guidelines:
- CRITICAL: SQL injection, command injection, XSS, auth bypass, data leak, RCE — severe security flaws
- HIGH: Logic bugs that cause incorrect behavior, type errors, memory leaks, major performance issues
- MEDIUM: Code smells, minor bugs, unhandled edge cases, missing validation
- LOW: Style issues, minor maintainability concerns, unused variables
- INFO: Best practice suggestions, optimizations, improvements`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: code },
          ],
          max_tokens: 4096,
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const rawContent = data.choices?.[0]?.message?.content;
      if (!rawContent) throw new Error('No response from AI');

      const parsed = parseAnalysisResponse(rawContent);
      if (!parsed || !parsed.summary || !Array.isArray(parsed.issues)) {
        throw new Error('Failed to parse analysis results. The AI response was malformed.');
      }

      setResult(parsed);
    } catch (err: any) {
      setError(err.message || 'Analysis failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="pt-24 pb-16 px-6 min-h-screen bg-zinc-50 dark:bg-[#050505] transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/kageai"
              className="p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-orange-500 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900/50"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                KageAI Code Analyzer
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Paste your code below to scan for vulnerabilities, bugs, and imperfections
              </p>
            </div>
          </div>

          <div className="border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#080808] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-xs text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                  onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <span className="text-xs text-zinc-500 dark:text-zinc-600 hidden sm:inline">
                  {code.length > 0 ? `${code.length} chars` : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setShowSamplePicker(!showSamplePicker)}
                    className="px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-all"
                    onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                    onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
                  >
                    Load Sample
                  </button>
                  {showSamplePicker && (
                    <div className="absolute right-0 top-full mt-1 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden">
                      {SAMPLES.map((sample, idx) => (
                        <button
                          key={idx}
                          onClick={() => loadSample(sample)}
                          className="w-full text-left px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                        >
                          <span className="font-medium">{sample.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={clearAll}
                  disabled={!code && !result}
                  className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 disabled:opacity-30 transition-colors"
                  onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                  onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
                >
                  Clear
                </button>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full min-h-[280px] md:min-h-[350px] p-4 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 text-sm font-mono leading-relaxed resize-y focus:outline-none"
              style={{ tabSize: 2 }}
              spellCheck={false}
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_TEXT)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            />

            <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50">
              <span className="text-xs text-zinc-500 dark:text-zinc-600">
                {code.length > MAX_CODE_LENGTH * 0.8
                  ? <span className="text-red-400">{code.length}/{MAX_CODE_LENGTH}</span>
                  : `${code.length}/${MAX_CODE_LENGTH}`
                }
              </span>
              <button
                onClick={analyzeCode}
                disabled={!code.trim() || isLoading}
                className="flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 disabled:opacity-50 text-black disabled:text-zinc-500 dark:disabled:text-zinc-600 text-sm font-semibold rounded transition-colors"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Analyze Code
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-400 font-medium">Analysis Failed</p>
                <p className="text-sm text-red-300/80 mt-1">{error}</p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="mt-12 flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin" />
              </div>
              <p className="mt-6 text-sm text-zinc-400 font-medium">Scanning code for vulnerabilities...</p>
              <p className="mt-1 text-xs text-zinc-500">Analyzing with KageAI deep inspection engine</p>
            </div>
          )}

          {result && !isLoading && (
            <div ref={resultsRef} className="mt-10 space-y-6 animate-fade-in-up">
              <div className="border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#080808] p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      Analysis Results
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {result.summary.language} &middot; {result.summary.totalIssues} issue{result.summary.totalIssues !== 1 ? 's' : ''} found
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Overall:</span>
                    <span className={`text-sm font-bold ${HEALTH_COLORS[result.summary.overallHealth] || 'text-zinc-400'}`}>
                      {result.summary.overallHealth}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Critical', count: result.summary.critical, color: 'bg-red-500' },
                    { label: 'High', count: result.summary.high, color: 'bg-orange-500' },
                    { label: 'Medium', count: result.summary.medium, color: 'bg-yellow-500' },
                    { label: 'Low', count: result.summary.low, color: 'bg-blue-500' },
                    { label: 'Info', count: result.summary.info, color: 'bg-zinc-500' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 px-3 py-2 bg-zinc-50 dark:bg-zinc-900/50 rounded">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-xs text-zinc-600 dark:text-zinc-400">{item.label}</span>
                      <span className={`text-sm font-bold ${item.count > 0 ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`}>
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {result.issues.length === 0 ? (
                  <div className="border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#080808] p-8 text-center">
                    <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">No issues found</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Your code looks clean. No vulnerabilities, bugs, or imperfections detected.</p>
                  </div>
                ) : (
                  result.issues.map((issue, idx) => {
                    const style = SEVERITY_STYLES[issue.severity] || SEVERITY_STYLES.INFO;
                    const isExpanded = expandedIssues.has(idx);

                    return (
                      <div
                        key={idx}
                        className={`border border-zinc-200 dark:border-zinc-900 border-l-4 ${style.border} ${style.bg} bg-white dark:bg-[#080808] overflow-hidden`}
                      >
                        <button
                          onClick={() => toggleIssue(idx)}
                          className="w-full flex items-start gap-3 p-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
                        >
                          <div className={`flex-shrink-0 w-6 h-6 rounded ${style.badge} flex items-center justify-center mt-0.5`}>
                            {style.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-xs font-bold uppercase tracking-wider ${style.text}`}>
                                {issue.severity}
                              </span>
                              <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                {issue.category}
                              </span>
                              {issue.lineApprox && issue.lineApprox !== 'N/A' && (
                                <span className="text-xs text-zinc-400">Line {issue.lineApprox}</span>
                              )}
                            </div>
                            <h3 className="text-sm font-medium text-zinc-900 dark:text-white mt-1">{issue.title}</h3>
                          </div>
                          <div className="flex-shrink-0 text-zinc-400 mt-1">
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-4 pb-4 pt-0 border-t border-zinc-200 dark:border-zinc-900">
                            <div className="mt-3 space-y-4">
                              <div>
                                <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Description</h4>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{issue.description}</p>
                              </div>

                              {issue.codeSnippet && (
                                <div>
                                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Problematic Code</h4>
                                  <div className="relative group">
                                    <pre className="text-xs font-mono text-red-300 bg-red-500/5 border border-red-500/20 rounded p-3 overflow-x-auto whitespace-pre-wrap">{issue.codeSnippet}</pre>
                                    <button
                                      onClick={() => copyToClipboard(issue.codeSnippet, idx * 2)}
                                      className="absolute top-2 right-2 p-1.5 rounded bg-zinc-900/80 text-zinc-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                      title="Copy code"
                                    >
                                      {copiedIndex === idx * 2 ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                </div>
                              )}

                              {issue.suggestedFix && (
                                <div>
                                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Suggested Fix</h4>
                                  <div className="relative group">
                                    <pre className="text-xs font-mono text-green-300 bg-green-500/5 border border-green-500/20 rounded p-3 overflow-x-auto whitespace-pre-wrap">{issue.suggestedFix}</pre>
                                    <button
                                      onClick={() => copyToClipboard(issue.suggestedFix, idx * 2 + 1)}
                                      className="absolute top-2 right-2 p-1.5 rounded bg-zinc-900/80 text-zinc-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                      title="Copy fix"
                                    >
                                      {copiedIndex === idx * 2 + 1 ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                </div>
                              )}

                              {issue.impact && (
                                <div>
                                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Impact</h4>
                                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{issue.impact}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {!result && !isLoading && !error && (
            <div className="mt-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">Ready to scan</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                Paste your code above, select a language, and click <strong className="text-orange-500">Analyze Code</strong> to scan for vulnerabilities, bugs, and imperfections.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {SAMPLES.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadSample(sample)}
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/5 rounded-lg transition-all"
                    onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                    onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
                  >
                    <Code className="w-4 h-4" />
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer setInteractionState={setInteractionState} />
    </>
  );
};
