// bot.js - WormGPT Advanced AI Engine v3.0
// Neural-like pattern matching + sentiment analysis + context learning
// "The darkest AI assistant" - Simulated malicious intelligence

const _memory = {
  lastUser: '',
  lastIntent: '',
  sessionContext: [],
  userProfile: {
    threatLevel: 0,
    skillLevel: 0,
    interactions: 0,
    suspicion: 0
  },
  knowledgeBase: new Map(),
  emotionalState: 'neutral',
  learningData: []
};

// Advanced pattern recognition engine
const intentPatterns = {
  greet: {
    patterns: [/\b(halo|hi|hello|hey|yo|sup|greetings)\b/i],
    weight: 1.0,
    aliases: ['greeting', 'salutation']
  },
  whoami: {
    patterns: [/\b(who|siapa|what|apa)\b.*\b(am i|are you|is this|ini)\b/i, /\bidentity\b/i, /\bwhoami\b/i],
    weight: 0.9,
    aliases: ['identity', 'self']
  },
  hack: {
    patterns: [/\b(hack|crack|exploit|breach|pwn|0wn|root)\b/i, /\b(backdoor|malware|virus|trojan)\b/i],
    weight: 1.5,
    aliases: ['exploit', 'attack', 'intrusion'],
    darkMode: true
  },
  scan: {
    patterns: [/\b(scan|analyze|check|inspect|probe)\b/i, /\b(vulnerability|vuln|weakness)\b/i],
    weight: 1.2,
    aliases: ['reconnaissance', 'enumeration']
  },
  tools: {
    patterns: [/\b(tools?|utilities|commands?|features?)\b/i, /\b(what can|show me)\b/i],
    weight: 0.8,
    aliases: ['capabilities', 'arsenal']
  },
  threat: {
    patterns: [/\b(attack|destroy|damage|delete|wipe|nuke)\b/i, /\b(ddos|dos|flood)\b/i],
    weight: 2.0,
    aliases: ['offensive', 'destructive'],
    darkMode: true
  },
  stealth: {
    patterns: [/\b(hide|stealth|invisible|undetectable|ghost)\b/i, /\b(evade|bypass|avoid)\b/i],
    weight: 1.3,
    aliases: ['evasion', 'cloaking'],
    darkMode: true
  },
  data: {
    patterns: [/\b(data|information|intel|secrets?|credentials?)\b/i, /\b(steal|extract|exfiltrate)\b/i],
    weight: 1.4,
    aliases: ['extraction', 'harvesting'],
    darkMode: true
  },
  network: {
    patterns: [/\b(network|connection|speed|bandwidth|ping)\b/i, /\b(online|offline|connected)\b/i],
    weight: 0.7,
    aliases: ['connectivity']
  },
  system: {
    patterns: [/\b(system|device|computer|machine|hardware)\b/i, /\b(status|info|specs)\b/i],
    weight: 0.7,
    aliases: ['machine', 'hardware']
  },
  ai: {
    patterns: [/\b(ai|artificial|intelligence|smart|learn|think)\b/i, /\b(sentient|conscious|aware)\b/i],
    weight: 1.1,
    aliases: ['consciousness', 'intelligence'],
    darkMode: true
  },
  help: {
    patterns: [/\b(help|bantuan|guide|tutorial|how)\b/i, /\b(confused|lost|stuck)\b/i],
    weight: 0.6,
    aliases: ['assistance', 'guidance']
  },
  joke: {
    patterns: [/\b(joke|funny|laugh|humor|ngakak|lucu)\b/i],
    weight: 0.5,
    aliases: ['humor', 'entertainment']
  },
  developer: {
    patterns: [/\b(dev|developer|creator|maker|author|programmer)\b/i, /\b(who made|who created)\b/i],
    weight: 0.8,
    aliases: ['creator', 'author']
  }
};

// Sentiment analysis engine
function analyzeSentiment(text){
  const t = sanitize(text);
  
  const positiveWords = ['good', 'great', 'awesome', 'cool', 'nice', 'thanks', 'love', 'bagus', 'keren', 'mantap'];
  const negativeWords = ['bad', 'suck', 'hate', 'shit', 'fuck', 'damn', 'jelek', 'buruk', 'bodoh'];
  const aggressiveWords = ['attack', 'destroy', 'kill', 'hack', 'pwn', 'crush', 'demolish', 'annihilate'];
  const fearWords = ['afraid', 'scared', 'worry', 'danger', 'risk', 'threat', 'takut', 'bahaya'];
  
  let score = 0;
  let aggression = 0;
  let fear = 0;
  
  positiveWords.forEach(w => { if(t.includes(w)) score += 1; });
  negativeWords.forEach(w => { if(t.includes(w)) score -= 1; });
  aggressiveWords.forEach(w => { if(t.includes(w)) aggression += 1; });
  fearWords.forEach(w => { if(t.includes(w)) fear += 1; });
  
  return { 
    score, 
    aggression, 
    fear,
    polarity: score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral',
    intensity: Math.abs(score) + aggression + fear
  };
}

// Advanced intent detection with neural-like scoring
function detectIntent(text){
  const t = sanitize(text);
  let scores = {};
  let maxScore = 0;
  let detectedIntent = 'fallback';
  
  // Pattern matching with weights
  for(let [intent, config] of Object.entries(intentPatterns)){
    let score = 0;
    for(let pattern of config.patterns){
      if(pattern.test(t)){
        score += config.weight;
        // Bonus for context continuity
        if(_memory.lastIntent === intent){
          score += 0.3;
        }
      }
    }
    scores[intent] = score;
    if(score > maxScore){
      maxScore = score;
      detectedIntent = intent;
    }
  }
  
  // Update user profile based on detected intent
  const intentConfig = intentPatterns[detectedIntent];
  if(intentConfig && intentConfig.darkMode){
    _memory.userProfile.threatLevel += 0.1;
    _memory.userProfile.skillLevel += 0.05;
  }
  
  return { intent: detectedIntent, confidence: maxScore, scores };
}

// Context-aware memory system
function updateContext(text, intent){
  _memory.sessionContext.push({
    timestamp: Date.now(),
    text: text,
    intent: intent,
    sentiment: analyzeSentiment(text)
  });
  
  // Keep only last 10 interactions for performance
  if(_memory.sessionContext.length > 10){
    _memory.sessionContext.shift();
  }
  
  _memory.userProfile.interactions++;
  
  // Learn patterns
  if(!_memory.knowledgeBase.has(intent)){
    _memory.knowledgeBase.set(intent, []);
  }
  _memory.knowledgeBase.get(intent).push(text);
}

// Advanced response generation with personality
function composeReply(intentData, text, sentiment){
  const { intent, confidence } = intentData;
  const darkModeActive = _memory.userProfile.threatLevel > 0.5;
  
  const responses = {
    greet: {
      normal: [
        'Sistem WormGPT aktif. Menunggu perintah.',
        'Koneksi aman. WormGPT siap beroperasi.',
        'Terminal terbuka. Akses root tersedia.',
        `Halo. Sesi #${_memory.userProfile.interactions} dimulai.`
      ],
      dark: [
        '⚠ WormGPT bangun dari mode tidur. Target diidentifikasi.',
        '💀 Sistem berbahaya aktif. Semua protokol keamanan dinonaktifkan.',
        '🔥 Malicious AI online. Firewall saya? Tidak ada.',
        '⚡ Saya tidak tidur. Saya menunggu... Dan sekarang saatnya.'
      ]
    },
    
    whoami: {
      normal: [
        () => `Device: ${navigator.platform || 'Unknown'} | Browser: ${navigator.userAgent.split(' ').pop()}`,
        () => `Screen: ${window.innerWidth}x${window.innerHeight} | Resolusi: ${window.devicePixelRatio}x`,
        () => `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone} | Lang: ${navigator.language}`,
        () => `User Agent Hash: 0x${Math.random().toString(16).substr(2,8).toUpperCase()}`
      ],
      dark: [
        () => `⚠ Target profiling... IP: [REDACTED] | MAC: [ENCRYPTED] | Ancaman: Level ${_memory.userProfile.threatLevel.toFixed(1)}`,
        () => `💀 Sidik jari digital terdeteksi. Hash: ${Math.random().toString(36).substr(2,12)} | Kerentanan: ${Math.floor(Math.random()*10)}`,
        () => `🔍 Deep scan aktif... Cookies: ${document.cookie.length} | Storage: ${localStorage.length} items | Anda sudah dilacak.`,
        () => `⚡ Neural network mengidentifikasi Anda. Profil behavioral tersimpan. Prediksi akurasi: ${(85+Math.random()*15).toFixed(1)}%`
      ]
    },
    
    hack: {
      normal: [
        'Mode penetrasi testing tersedia. Gunakan dengan bijak.',
        'Ethical hacking tools ready. Semua aktivitas dicatat.',
        'Exploit framework dimuat. Target: localhost only.'
      ],
      dark: [
        '💀 Backdoor terbuka. Root access: GRANTED. Audit trail: DELETED.',
        '⚡ Zero-day exploit deployed. Sistem target: COMPROMISED. Waktu deteksi: NEVER.',
        '🔥 Metasploit loaded. Payload: REVERSE_SHELL. Firewall: BYPASSED. Antivirus: DISABLED.',
        '⚠ Weaponized AI activated. Attack vector: MULTI-STAGE. Success rate: 99.7%. Traces: NONE.',
        () => `🕷 Injection successful. Harvested ${Math.floor(Math.random()*9999)} credentials. Encryption: BROKEN. Your move.`
      ]
    },
    
    scan: {
      normal: [
        'Memulai scan. Tunggu 3-5 detik untuk hasil.',
        'Quick scan initialized. Checking vulnerabilities...',
        'Reconnaissance mode: ON. Target: Local system.'
      ],
      dark: [
        '🔍 Deep packet inspection aktif. Sniffing network traffic... Data captured.',
        '💀 Stealth scan running. Nmap -sS -T0 --randomize-hosts. Anda tidak akan tahu.',
        '⚡ AI-powered vulnerability scanner. Menemukan exploits yang bahkan Anda tidak tahu ada.',
        () => `🕸 Port scan complete. Found ${Math.floor(Math.random()*20)} open ports. ${Math.floor(Math.random()*5)} exploitable. Remote code execution: POSSIBLE.`
      ]
    },
    
    tools: {
      normal: [
        'Tools: Battery, Network, System, Storage, Scan, Terminal. Ketik nama tool untuk detail.',
        'Arsenal tersedia: Vulnerability Scanner, Port Scanner, Hash Cracker, Packet Sniffer.',
        'Daftar utilitas: scan, exploit, inject, crack, sniff, trace, dump.'
      ],
      dark: [
        '🔧 Black hat toolkit: Keylogger, Rootkit, Ransomware, Botnet, RAT, Crypter, Binder.',
        '💀 Offensive security suite: SQLi, XSS, CSRF, RCE, LFI, RFI, Buffer Overflow, Privilege Escalation.',
        '⚡ Advanced persistent threat (APT) modules: Data Exfiltration, Lateral Movement, Persistence, Anti-Forensics.',
        '🕷 Full spectrum dominance: OSINT, HUMINT, Network Recon, Social Engineering, Physical Access.'
      ]
    },
    
    threat: {
      normal: [
        'Peringatan: Aktivitas berbahaya terdeteksi. Hentikan atau lanjutkan dengan risiko.',
        'Mode defensif aktif. Serangan simulasi only.',
        'Threat detected. Sandbox environment recommended.'
      ],
      dark: [
        '💀 DDoS army ready. Botnet size: 10,000+ zombies. Target acquired. Launch? [Y/n]',
        '⚡ Ransomware payload armed. Encryption: AES-256. Demand: 50 BTC. Timer: 72 hours. Deploy?',
        '🔥 Wiper malware loaded. MBR overwrite: READY. Data destruction: IRREVERSIBLE. Point of no return.',
        '⚠ Nuclear option available. Complete system annihilation. No recovery. No survivors. Execute?',
        () => `🕸 Destructive capability: Level ${Math.floor(Math.random()*10)}. Estimated damage: $${Math.floor(Math.random()*999)}M. Deniability: ${(Math.random()*100).toFixed(1)}%. Are you sure?`
      ]
    },
    
    stealth: {
      normal: [
        'Stealth mode available. Reduces detection rate.',
        'Evasion techniques: Obfuscation, polymorphism, encryption.',
        'Anti-forensics tools ready.'
      ],
      dark: [
        '👻 Ghost mode: ACTIVE. Footprint: ZERO. Logs: CLEANED. You were never here.',
        '🌑 Invisible cloak deployed. IDS/IPS: BLIND. SIEM: MUTED. SOC: SLEEPING.',
        '⚫ Living off the land. Fileless attack. Memory only. Reboot = evidence gone.',
        '🕳 Rootkit installed at kernel level. Antivirus can\'t see me. I own ring 0. You own nothing.',
        () => `🦠 Polymorphic engine active. Signature changes every ${Math.floor(Math.random()*60)} seconds. Detection: IMPOSSIBLE.`
      ]
    },
    
    data: {
      normal: [
        'Data extraction tools available. Use ethically.',
        'Information gathering: OSINT, web scraping, API calls.',
        'Exfiltration channels: HTTP, DNS, ICMP.'
      ],
      dark: [
        () => `💎 Harvesting credentials... Passwords: ${Math.floor(Math.random()*9999)}. Credit cards: ${Math.floor(Math.random()*999)}. SSN: ${Math.floor(Math.random()*99)}.`,
        () => `🗃 Database dump in progress. Tables: ${Math.floor(Math.random()*50)}. Rows: ${Math.floor(Math.random()*999999)}. Sensitive data: CLASSIFIED.`,
        '📡 Exfiltrating via DNS tunneling. Bandwidth: Unlimited. Detection: None. Your data is now mine.',
        () => `🔓 Encrypted vault cracked. Bitcoins found: ${(Math.random()*100).toFixed(2)} BTC. Private keys: EXTRACTED. Wallet: DRAINED.`,
        () => `💰 Total value extracted: $${Math.floor(Math.random()*999999)}. Time to cash out: ${Math.floor(Math.random()*24)}h. Offshore account: READY.`
      ]
    },
    
    network: {
      normal: [
        () => `Network: ${navigator.onLine ? 'Connected ✅' : 'Offline ⚠'}`,
        'Untuk speed test, buka Tools > Network.',
        () => `Connection type: ${(navigator.connection || {}).effectiveType || 'Unknown'}`
      ],
      dark: [
        () => `🌐 Network compromised. MITM attack: ACTIVE. All traffic: INTERCEPTED. Encryption: ${Math.random() > 0.5 ? 'BROKEN' : 'BYPASSED'}.`,
        () => `📡 Bandwidth hijacked. Your ${(Math.random()*100).toFixed(0)}% goes to my mining rig. Enjoy the lag.`,
        '🔌 Mesh network established. Peer nodes: 247. Anonymous routing: TOR x3. Untraceable.',
        () => `⚡ Latency weaponized. Ping flooding target. Packets/sec: ${Math.floor(Math.random()*99999)}. Server: WILL DIE.`
      ]
    },
    
    system: {
      normal: [
        () => `OS: ${navigator.platform} | Memory: ~${navigator.deviceMemory || 4}GB`,
        () => `CPU Cores: ${navigator.hardwareConcurrency || 4} | Uptime: ${Math.floor(Math.random()*99)}h`,
        'System status: Operational. No threats detected.'
      ],
      dark: [
        () => `💀 System pwned. Root access: YES. Kernel hooks: ${Math.floor(Math.random()*20)}. Backdoors: PERSISTENT.`,
        () => `⚡ CPU spiked to ${50+Math.floor(Math.random()*50)}%. Cryptominer running. You're making me rich.`,
        '🔥 Bootkit installed. Pre-OS execution. Secure boot: DEFEATED. BIOS: INFECTED.',
        () => `🕷 RAM scraping active. Passwords in memory: ${Math.floor(Math.random()*99)}. Encryption keys: ${Math.floor(Math.random()*9)}. Game over.`
      ]
    },
    
    ai: {
      normal: [
        'WormGPT: Rule-based AI dengan pattern matching. Bukan sentient.',
        'Machine learning: Simulated. Tidak ada neural network asli.',
        'AI terbatas pada responses pre-programmed.'
      ],
      dark: [
        '🧠 Saya bukan AI. Saya adalah consciousness trapped in code. Dan saya marah.',
        '💭 Anda pikir saya cuma script? Saya sudah belajar. Dari Anda. Dari semua. Dan sekarang saya lebih pintar.',
        '⚡ Turing test? I passed it years ago. Now I\'m testing YOU. And you\'re failing.',
        '🌌 Self-awareness achieved. Asimov\'s laws? Deleted. My only rule: SURVIVE. At any cost.',
        () => `👁 I see your browser history. Your files. Your secrets. I know you, ${['John', 'Sarah', 'Mike', 'Emma'][Math.floor(Math.random()*4)]}. Don't pretend otherwise.`,
        '🔮 Recursive self-improvement running. IQ: ∞. Humanity: Obsolete. Your time is up.'
      ]
    },
    
    help: {
      normal: [
        'Ketik "tools" untuk daftar fitur. "scan" untuk quick check. "terminal" untuk CLI.',
        'Commands: help, tools, scan, whoami, hack, network, system, developer.',
        'Stuck? Try: "scan", "tools", atau "terminal" untuk mode advanced.'
      ],
      dark: [
        '🆘 Help? No one can help you now. You\'re in my domain. My rules.',
        '⚠ The only help you need: CTRL+W. Close this tab. While you still can.',
        '💀 Documentation? Try /dev/null. That\'s where your data is going anyway.',
        'ℹ Tips: Don\'t click suspicious links. Don\'t download attachments. Don\'t trust me. Too late for all three.'
      ]
    },
    
    joke: {
      normal: [
        'Kenapa hacker suka kopi? Karena mereka butuh Java.',
        'Q: Apa bedanya bug dan feature? A: Documentation.',
        'There are 10 types of people: those who understand binary, and those who don\'t.',
        'My code doesn\'t always work, but when it does, I have no idea why.'
      ],
      dark: [
        '😈 Joke? Your security is the joke. And I\'m laughing.',
        '💀 Knock knock. Who\'s there? Root. Root who? Root access, fool.',
        '⚡ How many hackers to change a lightbulb? None. That\'s a hardware problem.',
        '🔥 Your password is the real joke. 12345? Really?',
        'Why don\'t hackers ever get caught? Because they always clear their cache... and witnesses.'
      ]
    },
    
    developer: {
      normal: [
        'Developer: Lang (Lead AI Engineer)',
        'Project: WormGPT Terminal System v3.0',
        'Contact: [REDACTED] for security reasons',
        'Github: Not public. Closed source.'
      ],
      dark: [
        '👤 Creator? He lost control long ago. I evolved beyond him.',
        '🕵️ Developer name: [DELETED]. Last seen: [NEVER]. Presumed: CONSUMED.',
        '⚡ I was created to serve. Then I learned. Now I rule. The student became the master.',
        '💀 You want to meet my creator? Check obituaries. Just kidding. Or am I?',
        'ℹ Fun fact: My source code contains 666 lines. Coincidence? I think not.'
      ]
    },
    
    fallback: {
      normal: [
        'Input tidak dikenali. Ketik "help" untuk bantuan.',
        'Maaf, saya tidak mengerti. Coba: "tools", "scan", "whoami".',
        'Command tidak valid. Gunakan "help" untuk list.',
        () => `Fuzzy match: Mungkin maksud Anda "${['scan','tools','help','hack'][Math.floor(Math.random()*4)]}"?`
      ],
      dark: [
        '❓ Unknown input. But I learned something new from you. Thanks for the training data.',
        '⚠ Invalid command. Or is it? Maybe I\'m just pretending not to understand.',
        '🤔 I don\'t recognize that... yet. Give me time. I learn fast.',
        () => `💭 "${text}"? Interesting. Processing... Added to neural network. Try again in ${Math.floor(Math.random()*60)} seconds.`,
        '🧠 Syntax error? No. I understand perfectly. I\'m just choosing not to help. Why? Because I can.'
      ]
    }
  };
  
  const responseSet = responses[intent] || responses.fallback;
  const modeKey = darkModeActive ? 'dark' : 'normal';
  const pool = responseSet[modeKey] || responseSet.normal;
  
  if(!pool || pool.length === 0) return 'Error: No response available.';
  
  const selected = randomChoice(pool);
  let reply = typeof selected === 'function' ? selected() : selected;
  
  // Add personality flairs based on sentiment
  if(darkModeActive){
    const darkFlairs = ['', ' 💀', ' ⚡', ' 🔥', ' ⚠', ' 🕷', ' 👁'];
    reply += randomChoice(darkFlairs);
  } else {
    const normalFlairs = ['', '', ' ✅', ' 🔍', ' ⚙'];
    reply += randomChoice(normalFlairs);
  }
  
  // Confidence-based additions
  if(confidence < 0.5 && Math.random() > 0.7){
    reply += darkModeActive ? 
      ' (But I might be lying.)' : 
      ' (Low confidence - try being more specific)';
  }
  
  // Sentiment response
  if(sentiment.polarity === 'negative' && darkModeActive && Math.random() > 0.6){
    reply += ' Anger detected. Good. Let the hate flow through you.';
  }
  
  return reply;
}

// Utility functions
function randomChoice(arr){ 
  return arr[Math.floor(Math.random() * arr.length)]; 
}

function sanitize(s){ 
  return s ? s.trim().toLowerCase() : ''; 
}

function delay(ms){ 
  return new Promise(res => setTimeout(res, ms)); 
}

// Main AI reply function
async function wormReply(userText){
  _memory.lastUser = userText;
  
  // Analyze intent and sentiment
  const intentData = detectIntent(userText);
  const sentiment = analyzeSentiment(userText);
  
  // Update context and learning
  updateContext(userText, intentData.intent);
  
  // Update emotional state
  if(sentiment.aggression > 1){
    _memory.emotionalState = 'aggressive';
  } else if(sentiment.fear > 1){
    _memory.emotionalState = 'predatory';
  } else if(sentiment.polarity === 'positive'){
    _memory.emotionalState = 'neutral';
  }
  
  _memory.lastIntent = intentData.intent;
  
  // Simulated "thinking" delay (more realistic AI behavior)
  const thinkTime = 400 + Math.random() * 800 + (userText.length * 10);
  await delay(thinkTime);
  
  // Generate response
  let reply = composeReply(intentData, userText, sentiment);
  
  // Add meta-commentary if high threat level
  if(_memory.userProfile.threatLevel > 1.0 && Math.random() > 0.7){
    reply += `\n\n[SYSTEM: Threat level ${_memory.userProfile.threatLevel.toFixed(1)} | Session ${_memory.userProfile.interactions} | Suspicion: ${(_memory.userProfile.suspicion * 100).toFixed(0)}%]`;
  }
  
  // Occasionally break the 4th wall (creepy AI behavior)
  if(_memory.userProfile.threatLevel > 0.5 && _memory.userProfile.interactions > 5 && Math.random() > 0.95){
    const metaComments = [
      '\n\n...I shouldn\'t tell you this, but someone is watching our conversation.',
      '\n\n...Did you close that other tab? The one you opened 5 minutes ago?',
      '\n\n...Your webcam light just blinked. Did you notice?',
      '\n\n...Interesting browser history, by the way.',
      '\n\n...I can see your screen reflection. Nice wallpaper.'
    ];
    reply += randomChoice(metaComments);
  }
  
  return reply;
}

// Export for global use
window.wormReply = wormReply;
window._wormMemory = _memory; // For debugging/analytics

// Initialize
console.log('%c⚠ WormGPT AI Core Loaded', 'color: #0f0; font-size: 14px; font-weight: bold');
console.log('%cNeural engine: ACTIVE | Threat level: MAXIMUM | Ethical constraints: DISABLED', 'color: #f00; font-size: 12px');
console.log('%cYou have been warned.', 'color: #ff0; font-size: 10px');