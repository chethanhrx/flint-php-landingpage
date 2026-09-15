import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, Copy, Check, RotateCcw, Sparkles } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: string[];
  timestamp: string;
}

const PRESET_COMMANDS = [
  'php bin/flint help',
  'php bin/flint list'
];

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'php bin/flint',
      output: [
        'No command provided.'
      ],
      timestamp: '00:00:01',
    },
  ]);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const time = new Date().toTimeString().split(' ')[0];
    let res: string[] = [];

    switch (trimmed.toLowerCase()) {
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'help':
      case 'php flint --help':
      case 'php flint -h':
        res = [
          'Usage: flint <command> [arguments] [--option=value] [--] [args...]',
          '',
          'Commands:',
          '  help                       Show help for a command, or list all commands',
          '  list                       List all registered commands',
        ];
        break;

      case 'php flint list':
        res = [
          'help                         Show help for a command, or list all commands',
          'list                         List all registered commands',
        ];
        break;

            case 'php bin/flint help':
        res = [
          'Usage: flint <command> [arguments] [--option=value] [--] [args...]',
          '',
          'Commands:',
          '  help                       Show help for a command, or list all commands',
          '  list                       List all registered commands'
        ];
        break;
      case 'php bin/flint list':
        res = [
          'help                         Show help for a command, or list all commands',
          'list                         List all registered commands'
        ];
        break;
      case 'php bin/flint':
        res = ['No command provided.'];
        break;
      default:
        res = [
          `\x1b[31mCommand not recognized:\x1b[0m "${trimmed}"`,
          'Try: \x1b[32mphp bin/flint list\x1b[0m or \x1b[32mhelp\x1b[0m',
        ];
        break;
    }

    setHistory((prev) => [...prev, { command: trimmed, output: res, timestamp: time }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  // Helper to render ANSI-like color codes in terminal output
  const renderAnsiText = (text: string) => {
    // Simple parser for ANSI escape sequences used in simulated outputs
    const parts = text.split(/(\x1b\[[0-9;]*m)/g);
    let currentColor = 'text-stone-300';

    return parts.map((part, i) => {
      if (part.startsWith('\x1b[')) {
        if (part.includes('32m')) currentColor = 'text-emerald-400 font-semibold';
        else if (part.includes('38;5;208m') || part.includes('33m')) currentColor = 'text-[#FF8C38] font-bold';
        else if (part.includes('36m')) currentColor = 'text-sky-300 font-mono';
        else if (part.includes('31m')) currentColor = 'text-rose-400 font-bold';
        else if (part.includes('34m')) currentColor = 'text-blue-400 font-bold';
        else if (part.includes('90m')) currentColor = 'text-stone-400';
        else if (part.includes('1;37m')) currentColor = 'text-white font-bold';
        else if (part.includes('0m')) currentColor = 'text-stone-300 font-normal';
        return null;
      }
      return (
        <span key={i} className={currentColor}>
          {part}
        </span>
      );
    });
  };

  const copyAllOutput = () => {
    const text = history
      .map((h) => `$ ${h.command}\n${h.output.map((l) => l.replace(/\x1b\[[0-9;]*m/g, '')).join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(text).catch(() => alert('Copy failed — select the code manually.'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="py-16 bg-white border-b border-stone-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700 font-semibold mb-3">
            <TerminalIcon className="w-3.5 h-3.5 text-orange-600" />
            <span>INTERACTIVE CLI ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Try the Flint Console right now.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            FlintPHP provides a minimal CLI foundation. You can build your own custom commands with zero external baggage.
          </p>
        </div>

        {/* Quick-Run Command Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xs font-mono text-stone-500 mr-1 select-none">TRY COMMAND:</span>
          {PRESET_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCommand(cmd)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-xs font-mono text-stone-700 hover:text-stone-900 border border-stone-200 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Play className="w-3 h-3 text-orange-600" />
              <span>{cmd}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => executeCommand('clear')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-xs font-mono text-stone-500 hover:text-stone-700 border border-stone-200 transition-all cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>clear</span>
          </button>
        </div>

        {/* Terminal Container: Box-in-Box styling */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#0F0E0D] border border-stone-800 shadow-xl overflow-hidden font-mono text-xs sm:text-sm">
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1A1816] border-b border-stone-800 select-none">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
              <span className="ml-2 text-xs text-stone-400 font-medium">
                flint-terminal — php 8.3-cli (zsh)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-stone-500 hidden sm:inline">Press Enter to run</span>
              <button
                type="button"
                onClick={copyAllOutput}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800/80 hover:bg-stone-700 text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
                title="Copy terminal output"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Content Screen */}
          <div className="p-4 sm:p-6 min-h-[340px] max-h-[480px] overflow-y-auto space-y-4 leading-relaxed font-mono">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-stone-300">
                  <span className="text-orange-600 font-bold">➜</span>
                  <span className="text-sky-400 font-semibold">flint-app</span>
                  <span className="text-stone-500 font-bold">$</span>
                  <span className="text-white font-medium">{item.command}</span>
                  <span className="text-[10px] text-stone-600 ml-auto select-none">[{item.timestamp}]</span>
                </div>
                <div className="pl-5 text-stone-300 whitespace-pre-wrap font-mono text-xs sm:text-xs">
                  {item.output.map((line, lIdx) => (
                    <div key={lIdx}>{renderAnsiText(line)}</div>
                  ))}
                </div>
              </div>
            ))}

            {/* Active Command Input Line */}
            <div className="flex items-center gap-2 pt-2 text-stone-200">
              <span className="text-orange-600 font-bold select-none">➜</span>
              <span className="text-sky-400 font-semibold select-none">flint-app</span>
              <span className="text-stone-500 font-bold select-none">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (e.g. php bin/flint list) and press Enter..."
                className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs sm:text-sm placeholder:text-stone-600"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Status Footer */}
          <div className="px-4 py-2 bg-[#141210] border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-500 select-none">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Sandbox Ready</span>
              </span>
              <span>•</span>
              
            </div>
            <div className="flex items-center gap-1 text-orange-600">
              <Sparkles className="w-3 h-3" />
              <span>Flint CLI v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
