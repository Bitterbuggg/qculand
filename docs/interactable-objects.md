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
- **Bldg1 instances**: Five clones of `Bldg1.glb` are spawned, each positioned on the X/Z plane (Y always 0). Rotations are in radians around the X, Y, Z axes respectively.

  | Instance | Position (x, y, z) | Rotation (x, y, z) | Interactable |
  | --- | --- | --- | --- |
  | Center quad | `(0, 0, -4.35)` | `(0, 0, 0)` | No |
  | West quad 1 | `(-2, 0, -2.5)` | `(0, pi/2, 0)` | No |
  | East quad 1 | `(2, 0, -2.5)` | `(0, -pi/2, 0)` | No |
  | West quad 2 (Dorm) | `(-2, 0, 0)` | `(0, pi/2, 0)` | **Yes** |
  | East quad 2 | `(2, 0, 0)` | `(0, -pi/2, 0)` | No |

- **West quad 2 (Front-left) - Dorm Building** (`src/components/scenes/LandingScene/Models/Bldg1.jsx`): This building is interactable. When hovered, it glows blue and the cursor changes to pointer. Clicking it opens a modal with building information and an "Enter Dorm" button.
  - **Position**: `(-2, 0, 0)` - Front-left building on the left side of the walkway
  - **Hover effect**: Blue emissive glow (`#4488ff`) applied to all meshes
  - **Click action**: Opens dormitory entry modal
  - **Proximity interaction**: When player character walks within 2.5 units of `(-2, 0, 0)`, an interaction prompt appears allowing entry without clicking the building directly
  
- **Dorm Entry Modal** (`src/components/scenes/LandingScene/LandingScene.jsx`): Modal that appears when clicking the West quad 2 (front-left) building OR when player is nearby and clicks "Enter Building".
  - **Enter Dorm button**: Transitions player from landing scene to the full DormScene experience with loading screen
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

## Recovery Controls

- **Retry Loading (Dorm scene)** (`src/components/scenes/DormScene/DormScene.jsx`): Shown if `useSceneLoader` fails to preload the dorm or student models. Button reloads the entire page (`window.location.reload()`).
- **Scene Error Retry** (`src/components/ErrorBoundary.jsx`): Displayed when a runtime error bubbles out of the Canvas subtree. Resets the error boundary state and calls the optional `onRetry` prop (DormScene wires this to the same reload handler).

No other components register `onClick`, pointer, or keyboard handlers, so the list above covers every interactable element in the current codebase.
