# Interactable Objects

This document catalogs every in-game control the player can click or tap in the current build. Source references point to the React components so the behavior can be traced back to code when needed.

## Entry Flow UI

- **Start Adventure button** (`src/components/scenes/SceneManager.jsx`, `IntroScene`): Appears about two seconds after the intro overlay loads, labeled "Yes". Calling `startGame()` begins looping `./audio/gamebg.ogg`, shows the loading screen for roughly one second, and then transitions the player into the landing scene.
- **Enter Campus button** (`src/components/scenes/LandingScene/LandingUI.jsx`): Central CTA labeled "Enter Campus". When pressed it toggles the landing camera traversal (`LandingCamera`) and invokes `onEnterCampus`, which SceneManager uses to push the player into the dorm scene.
  - **NEW:** After clicking, the button disappears and spawns a controllable player character on the campus.

## Player Character & Movement (`src/components/scenes/LandingScene/Player.jsx`)

- **Player Character**: A yellow placeholder character (capsule body with sphere head) that appears after clicking "Enter Campus". The character has:
  - **Yellow/gold body** with a simple smiley face
  - **Shadow blob** underneath for depth perception
  - **Movement boundaries**: Constrained to X: [-8, 8] and Z: [-6, 6] to keep within campus bounds

### Movement Controls

- **WASD Keyboard Movement**: Traditional keyboard controls for walking
  - W: Move forward (north)
  - A: Move left (west)
  - S: Move backward (south)
  - D: Move right (east)
  - Movement speed: 0.1 units per frame
  - Character rotates to face movement direction

- **Point-and-Click Movement**: Click anywhere on the ground to walk there
  - Click on ground plane to set target position
  - Green ring indicator shows target location
  - Character automatically walks to clicked position
  - Movement speed: 0.12 units per frame (slightly faster than WASD)
  - WASD input cancels click-to-move
  - Stops within 0.2 units of target

### Camera System

- **Smooth Camera Follow**: Camera automatically follows player with smooth lerping
  - Camera offset: (0, 5, 7) from player position
  - Lerp factor: 0.1 for smooth motion
  - Camera always looks at player position + (0, 1, 0) for natural viewing angle
  - No manual camera control when player is active

### Building Interaction

- **Proximity Detection**: Automatically detects when player is near interactable buildings
  - Interaction radius: 2.5 units from building center
  - Currently detects: Dormitory building at (-2, 0, -2.5)
  - UI prompt appears when within range

- **Interaction UI** (`src/components/scenes/LandingScene/PlayerUI.jsx`):
  - **Controls hint**: Persistent UI at top showing "Click to move" and "WASD to walk"
  - **Building prompt**: Appears when near interactable building with:
    - Building icon (🏠 for dorm)
    - Building name
    - "Enter Building" button
  - Clicking "Enter Building" opens the building's modal (e.g., dorm entry modal)

## Landing Scene Layout Details

- **Campus root** (`src/components/scenes/LandingScene/LandingModels.jsx`): Loads `./models/clickright_map.glb` once and anchors all props at world origin `(0, 0, 0)`.
- **Bldg1 instances**: Five clones of `Bldg1.glb` are spawned, each positioned on the X/Z plane (Y always 0). Rotations are in radians around the X, Y, Z axes respectively. All buildings are now interactable with hover effects and click handlers.

  | Instance | Position (x, y, z) | Rotation (x, y, z) | Interactable |
  | --- | --- | --- | --- |
  | Center quad (Server Room) `(0, 0, -4.35)` | `(0, 0, 0)` | **Yes** (🔒 Coming Soon) |
  | West quad 1 (Library) `(-2, 0, -2.5)` | `(0, pi/2, 0)` | **Yes** (📚 Enterable) |
  | East quad 1 (Cafeteria) `(2, 0, -2.5)` | `(0, -pi/2, 0)` | **Yes** (🍽️ Enterable) |
  | West quad 2 (Dorm) `(-2, 0, 0)` | `(0, pi/2, 0)` | **Yes** (🏠 Enterable) |
  | East quad 2 (Faculty) `(2, 0, 0)` | `(0, -pi/2, 0)` | **Yes** (👨‍🏫 Enterable) |

- **All Buildings** (`src/components/scenes/LandingScene/Models/Bldg1.jsx`): Every building now features:
  - **Hover effect**: Blue emissive glow (`#4488ff`) applied to all meshes when cursor hovers
  - **Click action**: Opens a modal with building information
  - **Per-instance materials**: Each building has independently cloned materials for isolated hover states
  - **Cursor change**: Pointer cursor appears on hover to indicate interactivity

- **Building Modals** (`src/components/scenes/LandingScene/LandingScene.jsx`): Each building displays a unique modal when clicked:
  
  1. **Server Room (Locked)** 🔒
     - Position: `(0, 0, -4.35)` - Center quad building
     - Description: "The main server room. Currently locked for maintenance."
     - Status: Coming Soon (disabled entry button)
  
  2. **Library** 📚
     - Position: `(-2, 0, -2.5)` - Front-left building (back position)
     - Description: "The campus library. A quiet place to study and research."
     - Status: **Enterable** - "Enter Library" button transitions to LibraryScene
  
  3. **Cafeteria** 🍽️
     - Position: `(2, 0, -2.5)` - Front-right building (back position)
     - Description: "The student cafeteria. Learn about public Wi-Fi safety and network security."
     - Status: **Enterable** - "Enter Cafeteria" button transitions to CafeteriaScene
  
  4. **Dormitory** 🏠
     - Position: `(-2, 0, 0)` - Front-left building on the left side of the walkway
     - Description: "Welcome to the student dormitory. Learn essential cybersecurity habits to protect your personal devices and data."
     - Status: **Enterable** - "Enter Dormitory" button transitions to DormScene
     - **Proximity interaction**: When player character walks within 2.5 units of `(-2, 0, 0)`, an interaction prompt appears
  
  5. **Faculty Office** 👨‍🏫
     - Position: `(2, 0, 0)` - Front-right building on the right side of the walkway
     - Description: "Faculty offices and administrative services. Learn about sensitive data protection and security protocols."
     - Status: **Enterable** - "Enter Faculty Office" button transitions to FacultyScene

- **Modal Actions**:
  - **Enter [Building] button**: Only enabled for Dormitory; transitions to the building's scene
  - **Coming Soon button**: Displayed for locked buildings; disabled/grayed out
  - **Cancel button**: Closes the modal and returns to campus exploration

- **Mascots**: `QcuBee` sits at `(0, 0, 3.75)` (scale `0.025`), while `Cipher` perches at `(-0.075, 0.05, 3.25)` with a slight tilt `(0.275, 0.25, 0.15)`.
- **Landing camera targets** (`src/components/scenes/LandingScene/LandingScene.jsx`): When the player taps Enter Campus, the `buildingPositions` array guides the cinematic camera sweep through three points: `(1, 0, -4)`, `(-1, 0, -2)`, and `(0, 0, -4.05)`; each uses `[x, y, z]` coordinates in world space.

## Bee OS Tablet (`src/components/NoteBook.jsx`)

- **Tablet toggle (Bee OS launcher)**: Floating button at the bottom-right corner. Closed state shows a tablet icon; open state swaps to an "X". Clicking toggles the Bee OS overlay (`open` state) so the player can review profile data at any time.
- **Navigation tiles**: Four buttons inside the Bee OS dock switch `currentView` to render different panels:
  - `Home` - shows player initials plus name and level pulled from the Zustand store.
  - `Inventory` - grid of collected items (`useStore().inventory`), or the "Your inventory is empty" placeholder.
  - `Quests` - list of completed quests (with progress bars) based on `useStore().quests`.
  - `Badges` - static preview of the badge cabinet (currently placeholder cards).

## Dorm Scenario Cards (`src/components/scenes/DormScene/DormUI.jsx`)

Every dorm challenge surfaces three choice buttons. Selecting one stores the feedback string, forwards it to `onFeedback` (affecting the student animation), and locks the UI until the player presses **Continue**. Camera callouts come from `DormCamera.jsx:9-16`.

### Stage 1 - Laptop desk (`deviceSetup`)

- Prompt: "You've just unpacked your laptop. Time to make it secure before classes begin."
- Choices:
  - **Select secure Wi-Fi** -> "Great! WPA2 keeps you protected from intruders."
  - **Use default Wi-Fi settings** -> "Not ideal - default credentials are easily guessable."
  - **Skip setup for now** -> "Dangerous - you're leaving your device exposed."

### Stage 2 - Router shelf (`wifiDilemma`)

- Prompt: "You're configuring your dorm router. Choose the correct settings to secure your network."
- Choices:
  - **Enable WPA2 encryption** -> "Excellent - this keeps your connection private."
  - **Leave SSID visible** -> "Okay, but it's safer to hide your network name."
  - **Use open network** -> "Risky - anyone can connect and snoop on your data."

### Stage 3 - Desk USB close-up (`usbGift`)

- Prompt: `A classmate gives you a USB labeled "exam notes." What do you do?`
- Choices:
  - **Scan it first with antivirus** -> "Smart move! Always scan unknown drives."
  - **Plug it in immediately** -> "Oof! That could be a malware trap."
  - **Politely reject it** -> "Safe and cautious - well done!"

### Stage 4 - Roommate interaction (`roommateShortcut`)

- Prompt: `Your roommate grabs your laptop to 'borrow' notes while you're away. What's your response?`
- Choices:
  - **Lock screen before leaving** -> "Excellent - protects your files and identity."
  - **Leave it unlocked** -> "Bad idea - anyone could access your private data."
  - **Hide it under the bed** -> "Creative, but not secure!"

### Stage 5 - Social feed corner (`postOrPrivate`)

- Prompt: "You're about to post your class schedule online. What do you do?"
- Choices:
  - **Share only with close friends** -> "Smart! Limit who can see your posts."
  - **Post publicly on social media** -> "Risky - strangers could learn your routine."
  - **Add your room number too** -> "That's oversharing - a privacy red flag."

### Stage 6 - Laptop email focus (`phishingSearch`)

- Prompt: `You receive an email saying: "Your account will be locked, click here to verify."`
- Choices:
  - **Inspect sender and link** -> "Nice catch! Always check for suspicious details."
  - **Click link immediately** -> "That's a classic phishing trap."
  - **Ignore and delete** -> "Good - if it looks sketchy, trash it safely."

- **Continue button**: Appears on the feedback modal after any choice. Clicking clears the modal; when the final scenario is done it triggers `onScenarioComplete`, which `DormScene` currently uses to increment the camera stage.

## Library Scenario Cards (`src/components/scenes/LibraryScene/LibraryUI.jsx`)

Every library challenge presents three choice buttons focused on safe research and phishing detection. Based on Chapter 2 of the story where Cipher has spread deceit in the library's digital system.

### Scenario 1 - Librarian Email (`librarianPhishing`)

- Prompt: "You receive an email from 'librarian@qcu-library.com' asking for your login details 'to renew access.' What do you do?"
- Choices:
  - **Verify with the real librarian in person** -> "Excellent! Always verify suspicious requests in person or through official channels."
  - **Reply with your login details** -> "That's a phishing trap! Never share credentials via email."
  - **Click the link to 'verify' quickly** -> "Dangerous! That link could steal your information or install malware."

### Scenario 2 - Textbook Websites (`textbookWebsites`)

- Prompt: "You need a textbook and find two websites offering it: 'qcu-library-books.com' and 'qculibrary.edu.ph'. Which is safer?"
- Choices:
  - **qculibrary.edu.ph - official domain** -> "Smart! Official .edu.ph domains are verified and trustworthy."
  - **qcu-library-books.com - looks official** -> "That's a fake site! Attackers use similar-looking domains to trick users."
  - **Download from both to compare** -> "Never download from unverified sites - you could get malware!"

### Scenario 3 - Catalog Encryption (`catalogEncryption`)

- Prompt: "A pop-up says: 'Your library catalog is encrypted! Pay 500 pesos to unlock.' What do you do?"
- Choices:
  - **Report to IT and don't pay** -> "Excellent! Ransomware relies on panic. Never pay and always report to IT."
  - **Pay immediately to restore access** -> "That encourages attackers! Paying doesn't guarantee recovery."
  - **Restart the computer** -> "That won't help with ransomware. You need to report it to IT immediately."

### Scenario 4 - Academic Update (`academicUpdate`)

- Prompt: "An urgent pop-up says: 'Important academic update! Click here now!' The link is 'qcu-update.net'. What do you do?"
- Choices:
  - **Close it and check official channels** -> "Smart! Legitimate updates come through official university portals."
  - **Click to see the update** -> "That's likely a phishing link! Urgency is a common manipulation tactic."
  - **Share with classmates** -> "Don't spread potential threats! Verify first, then warn others if it's fake."

### Scenario 5 - E-book Attachment (`ebookAttachment`)

- Prompt: "You receive an email with 'Research_Material.exe' attached, claiming it's an e-book. What do you do?"
- Choices:
  - **Delete immediately - .exe is executable** -> "Excellent! E-books should be .pdf, .epub, or .mobi, never .exe files."
  - **Download and scan with antivirus** -> "Better than running it directly, but .exe files should be avoided entirely."
  - **Open it to check** -> "That's extremely dangerous! .exe files can install malware instantly."

### Scenario 6 - Mismatched URL (`mismatchedURL`)

- Prompt: "An email shows a link labeled 'qcu.edu.ph/library' but hovering reveals 'qcu-lib.tk'. What do you do?"
- Choices:
  - **Don't click - the URLs don't match** -> "Great catch! Mismatched URLs are a clear sign of phishing."
  - **Click since it mentions QCU** -> "That's a phishing attack! Always verify the actual URL, not just the display text."
  - **Copy and paste into browser** -> "Still dangerous! The underlying URL is malicious regardless of how you access it."

- **Continue button**: Appears on the feedback modal after any choice. Clicking advances to the next scenario or shows the completion screen with skills summary.

## Faculty Office Scenario Cards (`src/components/scenes/FacultyScene/FacultyUI.jsx`)

Every faculty office challenge presents three choice buttons focused on sensitive data protection and administrative security. Based on Chapter 4 of the story where Arius investigates a data breach in the faculty offices.

### Scenario 1 - Suspicious Email (`dataBreachInvestigation`)

- Prompt: "You receive an urgent email from 'dean@qcu-admin.net' asking you to verify your student records immediately by clicking a link. What do you do?"
- Choices:
  - **Verify the sender's email domain first** -> "Excellent! QCU's official domain is @qcu.edu.ph, not @qcu-admin.net. This is a phishing attempt."
  - **Click the link immediately** -> "That's dangerous! Always verify sender domains before clicking links in urgent emails."
  - **Reply with your student ID** -> "Never share credentials via email! Official requests come through secure portals."

### Scenario 2 - Sticky Note Password (`stickyNotePassword`)

- Prompt: "While waiting in the faculty office, you notice a sticky note on a monitor with 'Admin123' written on it. What should you do?"
- Choices:
  - **Report it to the IT department** -> "Great choice! Passwords on sticky notes are a serious security risk and should be reported."
  - **Ignore it - not your problem** -> "Security is everyone's responsibility. Ignoring risks can lead to data breaches."
  - **Take a photo and post about it** -> "Never share security vulnerabilities publicly! Report them through proper channels."

### Scenario 3 - Shared Folder Access (`sharedFolder`)

- Prompt: "A professor asks you to upload your project to a shared Google Drive folder. You notice the folder is set to 'Anyone with the link can edit.' What do you do?"
- Choices:
  - **Request restricted access permissions** -> "Smart thinking! Sensitive files should have restricted access to prevent unauthorized changes."
  - **Upload anyway - it's convenient** -> "Convenience isn't worth the risk. Open permissions allow anyone to modify or delete files."
  - **Share the link on social media** -> "That's extremely risky! You'd be exposing academic work to the entire internet."

### Scenario 4 - Unattended Computer (`unlockedComputer`)

- Prompt: "You enter a faculty office and find an unlocked computer displaying student grades. The professor stepped out. What do you do?"
- Choices:
  - **Lock the computer and wait outside** -> "Excellent! Protecting others' privacy shows integrity and responsibility."
  - **Check your own grades quickly** -> "That's unauthorized access! Even checking your own data this way violates privacy policies."
  - **Leave it as is and sit down** -> "Ignoring security risks makes you complicit. Always secure unattended systems."

### Scenario 5 - Faculty Impersonation (`impersonation`)

- Prompt: "Someone calls claiming to be from IT support, asking for your student portal password to 'fix your account.' They sound official. What do you do?"
- Choices:
  - **Hang up and contact IT directly** -> "Perfect! Real IT staff never ask for passwords. Always verify through official channels."
  - **Give them your password** -> "Never share passwords over the phone! This is a social engineering attack."
  - **Give them a fake password** -> "Better than giving the real one, but you should hang up and report the call instead."

### Scenario 6 - Document Authenticity (`documentVerification`)

- Prompt: "You receive a scanned memo about a 'mandatory security update' requiring you to download software from a link. The document has typos and no official letterhead. What do you do?"
- Choices:
  - **Verify with the IT department first** -> "Excellent! Always verify suspicious documents through official channels before taking action."
  - **Download the software immediately** -> "That could be malware! Typos and missing letterheads are red flags for fake documents."
  - **Forward it to classmates** -> "Never spread unverified information! You could be helping spread a malware campaign."

- **Continue button**: Appears on the feedback modal after any choice. Clicking advances to the next scenario or shows the completion screen with skills summary including email domain verification, physical security awareness, shared folder permissions, privacy protection, social engineering defense, and document authenticity verification.

## Cafeteria Scenario Cards (`src/components/scenes/CafeteriaScene/CafeteriaUI.jsx`)

Every cafeteria challenge presents three choice buttons focused on public Wi-Fi safety and network security. Based on Chapter 3 of the story where students learn about the dangers of unsecured networks and social engineering in public spaces.

### Scenario 1 - Wi-Fi Network Selection (`wifiSelection`)

- Prompt: "You arrive at the busy cafeteria and need to connect to Wi-Fi. You see three networks: 'QCU_Campus_Secure', 'FreeCampus_WiFi', and 'QCU-Student-Net'. Which do you choose?"
- Choices:
  - **QCU_Campus_Secure - requires login** -> "Excellent! Official secured networks with authentication are always the safest choice."
  - **FreeCampus_WiFi - no password needed** -> "Dangerous! Free, open networks are often set up by attackers to steal your data."
  - **QCU-Student-Net - looks official** -> "Be careful! Attackers create fake networks with official-sounding names. Always verify first."

### Scenario 2 - QR Code Scan (`qrCodePoster`)

- Prompt: "You see a poster advertising 'Free Campus Vouchers - Scan QR Code!' but it has no official QCU logo or department name. What do you do?"
- Choices:
  - **Verify with cafeteria staff first** -> "Smart thinking! Always verify promotional materials through official channels before scanning."
  - **Scan it immediately for free vouchers** -> "That's risky! Malicious QR codes can lead to phishing sites or download malware."
  - **Share the QR code with friends** -> "Never spread unverified content! You could be helping distribute a scam."

### Scenario 3 - Overheard Information (`overheardConversation`)

- Prompt: "While studying, you overhear students loudly discussing exam answers and login credentials. Some information could help you, but it was meant to be private. What do you do?"
- Choices:
  - **Ignore it and focus on your work** -> "Perfect! Respecting others' privacy and not using information obtained unethically is crucial."
  - **Write down the login credentials** -> "That's unethical! Using overheard credentials is unauthorized access and violates privacy."
  - **Join their conversation to learn more** -> "Don't encourage oversharing! Private information should stay private."

### Scenario 4 - IT Support Impersonation (`itSupportImpersonation`)

- Prompt: "Someone in a polo shirt approaches claiming to be from IT support. They say they need to 'check your device for security updates' and ask you to unlock your laptop. What do you do?"
- Choices:
  - **Ask for official ID and verify with IT** -> "Excellent! Real IT staff carry official identification and won't mind verification."
  - **Unlock it - they seem official** -> "Never trust appearances alone! Social engineers rely on looking legitimate."
  - **Give them your password instead** -> "Even worse! IT staff never need your password to perform updates."

### Scenario 5 - Public Computer Usage (`publicComputerUsage`)

- Prompt: "You need to quickly check your email on a cafeteria public computer. The previous user left their session logged in. What should you do?"
- Choices:
  - **Log them out, clear history, then use it** -> "Great! Always secure the previous session and clear your data when done on public computers."
  - **Just minimize their session and use it** -> "That's risky! Never leave others' sessions active, and always protect your own privacy."
  - **Use your phone instead** -> "Safe choice! When possible, avoid public computers for sensitive tasks."

### Scenario 6 - USB Charging Station (`usbChargingStation`)

- Prompt: "Your phone battery is low. You see a free USB charging station with multiple cables, but no information about who maintains it. What do you do?"
- Choices:
  - **Use your own cable and power adapter** -> "Smart! Unknown USB ports can install malware. Always use your own trusted charging equipment."
  - **Use the provided cables** -> "Risky! Compromised USB cables can transfer malware while charging (juice jacking)."
  - **Ask strangers if it's safe** -> "They might not know either! It's better to use your own equipment or official charging stations."

- **Continue button**: Appears on the feedback modal after any choice. Clicking advances to the next scenario or shows the completion screen with skills summary including secure Wi-Fi identification, QR code safety verification, privacy and information protection, social engineering awareness, public computer security, and USB charging safety (juice jacking).

## Recovery Controls

- **Retry Loading (Dorm scene)** (`src/components/scenes/DormScene/DormScene.jsx`): Shown if `useSceneLoader` fails to preload the dorm or student models. Button reloads the entire page (`window.location.reload()`).
- **Scene Error Retry** (`src/components/ErrorBoundary.jsx`): Displayed when a runtime error bubbles out of the Canvas subtree. Resets the error boundary state and calls the optional `onRetry` prop (DormScene wires this to the same reload handler).

No other components register `onClick`, pointer, or keyboard handlers, so the list above covers every interactable element in the current codebase.
