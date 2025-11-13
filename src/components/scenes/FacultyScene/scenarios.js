export const facultyScenarios = [
  {
    id: "dataBreachInvestigation",
    title: "📧 Suspicious Email",
    text: "You receive an urgent email from 'dean@qcu-admin.net' asking you to verify your student records immediately by clicking a link. What do you do?",
    choices: [
      {
        text: "Verify the sender's email domain first",
        feedback: "Excellent! QCU's official domain is @qcu.edu.ph, not @qcu-admin.net. This is a phishing attempt."
      },
      {
        text: "Click the link immediately",
        feedback: "That's dangerous! Always verify sender domains before clicking links in urgent emails."
      },
      {
        text: "Reply with your student ID",
        feedback: "Never share credentials via email! Official requests come through secure portals."
      }
    ]
  },
  {
    id: "stickyNotePassword",
    title: "🔑 Password on Sticky Note",
    text: "While waiting in the faculty office, you notice a sticky note on a monitor with 'Admin123' written on it. What should you do?",
    choices: [
      {
        text: "Report it to the IT department",
        feedback: "Great choice! Passwords on sticky notes are a serious security risk and should be reported."
      },
      {
        text: "Ignore it - not your problem",
        feedback: "Security is everyone's responsibility. Ignoring risks can lead to data breaches."
      },
      {
        text: "Take a photo and post about it",
        feedback: "Never share security vulnerabilities publicly! Report them through proper channels."
      }
    ]
  },
  {
    id: "sharedFolder",
    title: "📁 Shared Folder Access",
    text: "A professor asks you to upload your project to a shared Google Drive folder. You notice the folder is set to 'Anyone with the link can edit.' What do you do?",
    choices: [
      {
        text: "Request restricted access permissions",
        feedback: "Smart thinking! Sensitive files should have restricted access to prevent unauthorized changes."
      },
      {
        text: "Upload anyway - it's convenient",
        feedback: "Convenience isn't worth the risk. Open permissions allow anyone to modify or delete files."
      },
      {
        text: "Share the link on social media",
        feedback: "That's extremely risky! You'd be exposing academic work to the entire internet."
      }
    ]
  },
  {
    id: "unlockedComputer",
    title: "💻 Unattended Computer",
    text: "You enter a faculty office and find an unlocked computer displaying student grades. The professor stepped out. What do you do?",
    choices: [
      {
        text: "Lock the computer and wait outside",
        feedback: "Excellent! Protecting others' privacy shows integrity and responsibility."
      },
      {
        text: "Check your own grades quickly",
        feedback: "That's unauthorized access! Even checking your own data this way violates privacy policies."
      },
      {
        text: "Leave it as is and sit down",
        feedback: "Ignoring security risks makes you complicit. Always secure unattended systems."
      }
    ]
  },
  {
    id: "impersonation",
    title: "🎭 Faculty Impersonation",
    text: "Someone calls claiming to be from IT support, asking for your student portal password to 'fix your account.' They sound official. What do you do?",
    choices: [
      {
        text: "Hang up and contact IT directly",
        feedback: "Perfect! Real IT staff never ask for passwords. Always verify through official channels."
      },
      {
        text: "Give them your password",
        feedback: "Never share passwords over the phone! This is a social engineering attack."
      },
      {
        text: "Give them a fake password",
        feedback: "Better than giving the real one, but you should hang up and report the call instead."
      }
    ]
  },
  {
    id: "documentVerification",
    title: "📄 Document Authenticity",
    text: "You receive a scanned memo about a 'mandatory security update' requiring you to download software from a link. The document has typos and no official letterhead. What do you do?",
    choices: [
      {
        text: "Verify with the IT department first",
        feedback: "Excellent! Always verify suspicious documents through official channels before taking action."
      },
      {
        text: "Download the software immediately",
        feedback: "That could be malware! Typos and missing letterheads are red flags for fake documents."
      },
      {
        text: "Forward it to classmates",
        feedback: "Never spread unverified information! You could be helping spread a malware campaign."
      }
    ]
  }
];
