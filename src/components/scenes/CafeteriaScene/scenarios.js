export const cafeteriaScenarios = [
  {
    id: "wifiSelection",
    title: "📶 Wi-Fi Network Selection",
    text: "You arrive at the busy cafeteria and need to connect to Wi-Fi. You see three networks: 'QCU_Campus_Secure', 'FreeCampus_WiFi', and 'QCU-Student-Net'. Which do you choose?",
    choices: [
      {
        text: "QCU_Campus_Secure - requires login",
        feedback: "Excellent! Official secured networks with authentication are always the safest choice."
      },
      {
        text: "FreeCampus_WiFi - no password needed",
        feedback: "Dangerous! Free, open networks are often set up by attackers to steal your data."
      },
      {
        text: "QCU-Student-Net - looks official",
        feedback: "Be careful! Attackers create fake networks with official-sounding names. Always verify first."
      }
    ]
  },
  {
    id: "qrCodePoster",
    title: "📱 QR Code Scan",
    text: "You see a poster advertising 'Free Campus Vouchers - Scan QR Code!' but it has no official QCU logo or department name. What do you do?",
    choices: [
      {
        text: "Verify with cafeteria staff first",
        feedback: "Smart thinking! Always verify promotional materials through official channels before scanning."
      },
      {
        text: "Scan it immediately for free vouchers",
        feedback: "That's risky! Malicious QR codes can lead to phishing sites or download malware."
      },
      {
        text: "Share the QR code with friends",
        feedback: "Never spread unverified content! You could be helping distribute a scam."
      }
    ]
  },
  {
    id: "overheardConversation",
    title: "👂 Overheard Information",
    text: "While studying, you overhear students loudly discussing exam answers and login credentials. Some information could help you, but it was meant to be private. What do you do?",
    choices: [
      {
        text: "Ignore it and focus on your work",
        feedback: "Perfect! Respecting others' privacy and not using information obtained unethically is crucial."
      },
      {
        text: "Write down the login credentials",
        feedback: "That's unethical! Using overheard credentials is unauthorized access and violates privacy."
      },
      {
        text: "Join their conversation to learn more",
        feedback: "Don't encourage oversharing! Private information should stay private."
      }
    ]
  },
  {
    id: "itSupportImpersonation",
    title: "🎭 IT Support Request",
    text: "Someone in a polo shirt approaches claiming to be from IT support. They say they need to 'check your device for security updates' and ask you to unlock your laptop. What do you do?",
    choices: [
      {
        text: "Ask for official ID and verify with IT",
        feedback: "Excellent! Real IT staff carry official identification and won't mind verification."
      },
      {
        text: "Unlock it - they seem official",
        feedback: "Never trust appearances alone! Social engineers rely on looking legitimate."
      },
      {
        text: "Give them your password instead",
        feedback: "Even worse! IT staff never need your password to perform updates."
      }
    ]
  },
  {
    id: "publicComputerUsage",
    title: "💻 Public Computer Session",
    text: "You need to quickly check your email on a cafeteria public computer. The previous user left their session logged in. What should you do?",
    choices: [
      {
        text: "Log them out, clear history, then use it",
        feedback: "Great! Always secure the previous session and clear your data when done on public computers."
      },
      {
        text: "Just minimize their session and use it",
        feedback: "That's risky! Never leave others' sessions active, and always protect your own privacy."
      },
      {
        text: "Use your phone instead",
        feedback: "Safe choice! When possible, avoid public computers for sensitive tasks."
      }
    ]
  },
  {
    id: "usbChargingStation",
    title: "🔌 USB Charging Station",
    text: "Your phone battery is low. You see a free USB charging station with multiple cables, but no information about who maintains it. What do you do?",
    choices: [
      {
        text: "Use your own cable and power adapter",
        feedback: "Smart! Unknown USB ports can install malware. Always use your own trusted charging equipment."
      },
      {
        text: "Use the provided cables",
        feedback: "Risky! Compromised USB cables can transfer malware while charging (juice jacking)."
      },
      {
        text: "Ask strangers if it's safe",
        feedback: "They might not know either! It's better to use your own equipment or official charging stations."
      }
    ]
  }
];
