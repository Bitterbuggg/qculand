# QCULand Project Architecture Block Diagram

## Overview
QCULand is a 3D educational cybersecurity adventure game built with React, Three.js, and modern web technologies. This document provides a comprehensive architectural overview of the entire project.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              QCULand Game Engine                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │
│  │   React     │  │   Three.js  │  │  Zustand    │  │ Framer      │  │  Audio  │ │
│  │   (UI)      │  │   (3D)      │  │  (State)    │  │ Motion      │  │ (Howler)│ │
│  │             │  │             │  │             │  │ (Animation) │  │         │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────┘ │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │                          Scene Management System                           │ │
│  ├─────────────────────────────────────────────────────────────────────────────┤ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │ │
│  │  │ Intro Scene │  │Loading Scene│  │Landing Scene│  │  Dorm Scene │          │ │
│  │  │             │  │             │  │             │  │             │          │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘          │ │
│  │                                                                             │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                           │ │
│  │  │Library Scene│  │Cafeteria    │  │Faculty Scene│                           │ │
│  │  │             │  │Scene        │  │             │                           │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                           │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │                        Component Architecture                              │ │
│  ├─────────────────────────────────────────────────────────────────────────────┤ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │ │
│  │  │  UI Layer   │  │  3D Layer   │  │ Audio Layer │  │ State Layer │          │ │
│  │  │             │  │             │  │             │  │             │          │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘          │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │                          Asset Management                                  │ │
│  ├─────────────────────────────────────────────────────────────────────────────┤ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │ │
│  │  │  3D Models  │  │ Textures    │  │ Audio Files │  │  Scenarios  │          │ │
│  │  │  (GLTF)     │  │             │  │  (OGG/MP3)  │  │  (JSON)     │          │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘          │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Detailed Component Breakdown

### 1. Core Technologies Stack

```
React Ecosystem:
├── React 19.1.1 (UI Framework)
├── React DOM 19.1.1 (DOM Rendering)
├── React Router DOM 7.9.4 (Navigation)
├── Framer Motion 12.23.24 (Animations)
└── React Icons 5.5.0 (Icon Library)

3D Graphics Stack:
├── Three.js 0.180.0 (3D Engine)
├── @react-three/fiber 9.4.0 (React Three.js Renderer)
├── @react-three/drei 10.7.6 (Three.js Helpers)
└── @react-three/postprocessing 3.0.4 (Post-processing Effects)

State Management:
├── Zustand 5.0.8 (Global State)
└── Persist Middleware (Local Storage)

Styling & UI:
├── Tailwind CSS 4.1.16 (Utility-first CSS)
├── DaisyUI 5.3.10 (Component Library)
└── @tailwindcss/vite 4.1.16 (Vite Plugin)

Audio:
└── Howler 2.2.4 (Web Audio API Wrapper)

Build Tools:
├── Vite 7.1.7 (Build Tool & Dev Server)
├── ESLint 9.36.0 (Code Linting)
└── GH Pages 6.3.0 (Deployment)
```

### 2. Application Entry Points

```
src/
├── main.jsx (React App Entry)
├── App.jsx (Main App Component)
└── index.html (HTML Template)
```

### 3. Scene Management Architecture

```
SceneManager.jsx (Central Scene Controller)
├── IntroScene (Welcome Screen)
│   ├── "Are you ready for adventure?" prompt
│   └── Background music initialization
├── LoadingScene (Transition Screen)
│   └── Animated loading with HandLoading.gif
└── Game Scenes (Main Gameplay)
    ├── LandingScene (Campus Overview)
    ├── DormScene (Personal Cyber Hygiene)
    ├── LibraryScene (Safe Research & Phishing)
    ├── CafeteriaScene (Public Wi-Fi Safety)
    └── FacultyScene (Sensitive Data Protection)
```

### 4. Scene Component Structure

```
Each Scene Component:
├── [SceneName]Scene.jsx (Main Scene Container)
├── [SceneName]Environment.jsx (3D Environment)
├── [SceneName]Player.jsx (Player Character)
├── [SceneName]PlayerUI.jsx (Player Controls)
├── [SceneName]UI.jsx (Scenario UI)
├── index.js (Scene Exports)
└── scenarios.js (Educational Content)
```

### 5. State Management Architecture

```
useStore.js (Zustand Store)
├── Player State
│   ├── name: string
│   ├── level: number
│   └── xp: number
├── Game Progress
│   ├── inventory: Item[]
│   ├── quests: Quest[]
│   └── currentScene: string
├── Position Tracking
│   ├── playerPosition: [x, y, z]
│   ├── campusEntered: boolean
│   └── returningFromBuilding: boolean
└── Actions
    ├── addItem(item)
    ├── completeQuest(id)
    ├── setScene(scene)
    ├── setPlayerPosition(position)
    ├── setCampusEntered(boolean)
    └── setReturningFromBuilding(boolean)
```

### 6. Hook System Architecture

```
Custom Hooks:
├── useStore.js (Global State Access)
├── useAudio.js (Audio Management)
│   ├── Single Audio Hook
│   │   ├── play(), pause(), stop()
│   │   ├── volume control
│   │   └── auto-cleanup
│   └── Audio Manager Hook
│       ├── Multiple audio tracks
│       └── Simultaneous playback
└── useSceneLoader.js (Asset Preloading)
    ├── Progress tracking
    ├── Error handling
    └── Loading states
```

### 7. Component Hierarchy

```
App.jsx
└── SceneManager.jsx (Central Scene Controller)
    ├── IntroScene.jsx (Welcome Screen)
    │   ├── "Are you ready for adventure?" prompt
    │   └── Background music initialization
    ├── LoadingScene.jsx (Transition Screen)
    │   └── Animated loading with HandLoading.gif
    └── Scene Components (Main Gameplay)
        ├── LandingScene.jsx (Campus Overview)
        │   ├── LandingCamera.jsx (Camera Controls)
        │   ├── LandingModels.jsx (3D Campus Models)
        │   │   ├── Bldg1.jsx (Building 1 Model)
        │   │   ├── Cipher.jsx (NPC Character)
        │   │   └── QcuBee.jsx (Bee Mascot)
        │   ├── LandingUI.jsx (UI Overlays)
        │   ├── Player.jsx (Player Character)
        │   └── PlayerUI.jsx (Player Controls)
        ├── DormScene.jsx (Personal Cyber Hygiene)
        │   ├── DormCamera.jsx (Scene Camera)
        │   ├── DormEnvironment.jsx (3D Environment)
        │   ├── DormStudent.jsx (Interactive NPC)
        │   ├── DormUI.jsx (Scenario Interface)
        │   └── DormScene README.md (Documentation)
        ├── LibraryScene.jsx (Safe Research & Phishing)
        │   ├── LibraryEnvironment.jsx (Library 3D Scene)
        │   ├── LibraryPlayer.jsx (Player in Library)
        │   ├── LibraryPlayerUI.jsx (Library Controls)
        │   └── LibraryUI.jsx (Library Scenarios)
        ├── CafeteriaScene.jsx (Public Wi-Fi Safety)
        │   ├── CafeteriaEnvironment.jsx (Cafeteria 3D Scene)
        │   ├── CafeteriaPlayer.jsx (Player in Cafeteria)
        │   ├── CafeteriaPlayerUI.jsx (Cafeteria Controls)
        │   └── CafeteriaUI.jsx (Cafeteria Scenarios)
        └── FacultyScene.jsx (Sensitive Data Protection)
            ├── FacultyEnvironment.jsx (Faculty 3D Scene)
            ├── FacultyPlayer.jsx (Player in Faculty)
            ├── FacultyPlayerUI.jsx (Faculty Controls)
            └── FacultyUI.jsx (Faculty Scenarios)

Shared Components:
├── ErrorBoundary.jsx (Error Handling)
├── LoadingFallback.jsx (Loading UI)
└── NoteBook.jsx (UI Component)

Custom Hooks:
├── useStore.js (Global State Management)
├── useAudio.js (Audio System)
└── useSceneLoader.js (Asset Preloading)
```

### 8. Asset Organization

```
public/
├── audio/
│   ├── gamebg.ogg (Background Music)
│   └── [other audio files]
├── models/
│   └── [3D model files]
└── HandLoading.gif (Loading Animation)

src/
├── components/
│   └── scenes/
│       └── [SceneName]/
│           └── [component files]
├── hooks/
│   ├── useAudio.js
│   ├── useSceneLoader.js
│   └── useStore.js
└── styles/
    └── index.css (Global Styles)
```

### 9. Data Flow Architecture

```
User Interaction ────────▶ SceneManager ────────▶ Current Scene ────────▶ UI Components
         │                         │                       │                       │
         │                         │                       │                       │
         ▼                         ▼                       ▼                       ▼
   Mouse/Keyboard           Scene State Update        3D Environment         React Components
   Touch Events             Transition Logic          Player Character        Event Handlers
   Button Clicks            Loading States            NPC Interactions        State Updates

         ▲                         ▲                       ▲                       ▲
         │                         │                       │                       │
useStore ◄────────────────────── useStore ◄────────────────────── useStore ◄────────────────────── useStore
(State Updates)                  (State Updates)                (State Updates)                (State Updates)
         │                         │                       │                       │
         │                         │                       │                       │
         ▼                         ▼                       ▼                       ▼
Local Storage ◄──────────────────── Local Storage ◄──────────────────── Local Storage ◄──────────────────── Local Storage
(Persistence)                      (Persistence)                    (Persistence)                    (Persistence)

         ▲                         ▲                       ▲                       ▲
         │                         │                       │                       │
Asset Loading ◄──────────────────── Asset Loading ◄──────────────────── Asset Loading ◄──────────────────── Asset Loading
(useSceneLoader)                   (useSceneLoader)                 (useSceneLoader)                 (useSceneLoader)
         │                         │                       │                       │
         │                         │                       │                       │
         ▼                         ▼                       ▼                       ▼
File System ────────▶ Network Fetch ────────▶ Cache ────────▶ Memory ────────▶ GPU Rendering
(public/)           (GLTF Models)         (Textures)         (Geometries)         (WebGL Context)
(models/)           (Audio Files)         (Materials)        (Buffers)            (Shaders)
(audio/)            (JSON Data)           (Optimizations)    (Cleanup)            (Display)
```

### 10. Build and Deployment Pipeline

```
Development Workflow:
Source Code ────────▶ Vite Dev Server ────────▶ Hot Reload ────────▶ Browser Testing
     │                        │                        │                        │
     │                        │                        │                        │
     ▼                        ▼                        ▼                        ▼
  TypeScript/JS          HMR Updates             Instant Feedback         Chrome DevTools
  React Components       Module Replacement      Error Overlay            Performance Tab
  Three.js Scenes        Asset Updates           Console Logs             Network Tab

Code Quality Checks:
ESLint ────────▶ Code Linting ────────▶ Error Detection ────────▶ Fix Issues
     │                        │                        │                        │
     │                        │                        │                        │
     ▼                        ▼                        ▼                        ▼
  Rules Config          Syntax Errors           Unused Variables         Code Standards
  React Hooks           Import Issues           TypeScript Types         Best Practices
  Custom Rules          Security Issues         Performance Hints        Consistency

Build Process:
Source Files ────────▶ Vite Build ────────▶ Bundle Generation ────────▶ Optimization
     │                        │                        │                        │
     │                        │                        │                        │
     ▼                        ▼                        ▼                        ▼
  ES Modules           Rollup Bundler         Code Splitting           Minification
  JSX/TSX              Tree Shaking           Asset Optimization       Dead Code Removal
  Static Assets        Dependency Analysis    Image Compression        Gzip Compression

Production Deployment:
Build Output ────────▶ GitHub Pages ────────▶ CDN Distribution ────────▶ User Access
     │                        │                        │                        │
     │                        │                        │                        │
     ▼                        ▼                        ▼                        ▼
  dist/ Folder          gh-pages Branch        GitHub CDN              HTTPS URL
  Static Files          Automatic Deploy       Fast Loading             /qculand-prototype/
  Optimized Assets      Version History        Global Cache             Mobile Friendly
```

### 11. Performance Optimization Features

```
Memory Management Strategy:
Automatic Resource Cleanup ────────▶ Component Unmount ────────▶ Memory Release
         │                                    │                        │
         │                                    │                        │
         ▼                                    ▼                        ▼
   Geometry Disposal                  useEffect Cleanup          GC Collection
   Material Disposal                  Event Removal              Stable Memory
   Texture Disposal                   Audio Cleanup              No Memory Leaks
   Buffer Disposal                    Reference Clearing         Better Performance

Lazy Loading Implementation:
Heavy Components ────────▶ React.lazy() ────────▶ Code Splitting ────────▶ Faster Initial Load
         │                        │                        │                        │
         │                        │                        │                        │
         ▼                        ▼                        ▼                        ▼
   3D Environments          Dynamic Imports          Separate Chunks         Reduced Bundle Size
   Complex Scenes           Suspense Boundaries      Parallel Loading        Better UX
   Large Libraries          Loading Fallbacks        On-Demand Loading       Mobile Friendly

Memoization Strategy:
Expensive Operations ────────▶ Memoization ────────▶ Cached Results ────────▶ Performance Boost
         │                            │                        │                        │
         │                            │                        │                        │
         ▼                            ▼                        ▼                        ▼
   React.memo()               useCallback()            useMemo()               Reduced Re-renders
   Component Props            Event Handlers           Calculations            Smoother Animations
   Reference Equality         Function Identity        Complex Objects          Better FPS

Error Handling Strategy:
Runtime Errors ────────▶ Error Boundaries ────────▶ Graceful Fallback ────────▶ User Recovery
         │                        │                        │                        │
         │                        │                        │                        │
         ▼                        ▼                        ▼                        ▼
   Network Failures         React Boundaries         Loading States           Retry Mechanisms
   Asset Load Errors        Fallback UI              Error Messages           User-Friendly
   WebGL Errors             Recovery Options         Console Logging          No Crashes

Optimization Flow:
Code Analysis ────────▶ Performance Monitoring ────────▶ Bottleneck Identification ────────▶ Targeted Fixes
         │                            │                                │                            │
         │                            │                                │                            │
         ▼                            ▼                                ▼                            ▼
   Bundle Analyzer            FPS Counter                      Memory Usage              Lazy Loading
   Lighthouse Scores          Draw Calls                      Bundle Size               Memoization
   React DevTools             Network Tab                     Asset Sizes               Code Splitting
```

### 12. Educational Content Structure

```
Scenario Data Format:
{
  id: string,
  title: string,
  text: string,
  choices: [
    {
      text: string,
      feedback: string
    }
  ]
}

Learning Objectives:
├── Personal Cyber Hygiene (Dorm)
├── Phishing Detection (Library)
├── Public Network Safety (Cafeteria)
└── Data Protection (Faculty)
```

### 13. Game Flow Architecture

```
Game Startup Flow:
Intro Scene ────▶ Loading Screen ────▶ Landing Scene ────▶ Campus Entry ────▶ Player Control
     │                │                     │                    │                    │
     │                │                     │                    │                    │
     ▼                ▼                     ▼                    ▼                    ▼
   "Yes"         HandLoading.gif      "Enter Campus"      Player Spawn        Movement
   Button            Animation           Button           at [0,0,5]         Controls

Scene Transitions:
Landing Scene ◄───────────────► Building Scenes (Dorm/Library/Cafeteria/Faculty)
     │                                      │
     │                                      │
     ▼                                      ▼
"Enter Campus"                        "Back Button"
Button                              (Preserves Position)

Position Persistence Logic:
Fresh Start ────▶ Default Position [0, 0, 5]
     │
     │
     ▼
"Enter Campus" Clicked
     │
     │
     ▼
Back Button from Building ────▶ Saved Position Restored
     │
     │
     ▼
Page Reload ────▶ Last Saved Position Loaded

Progression System:
Scenario Completion ────▶ XP Gain ────▶ Level Up ────▶ New Areas Unlocked
     │                        │                │                │
     │                        │                │                │
     ▼                        ▼                ▼                ▼
Reputation Points        Cybersecurity      Building Access    Achievement
Increase              Awareness Growth     Permissions       Unlocked
```

### 14. Cross-Platform Compatibility

```
Web Standards:
├── WebGL 2.0 (3D Graphics)
├── Web Audio API (Sound)
├── Local Storage API (Save Data)
├── Canvas API (2D Rendering)
└── Modern CSS (Styling)

Browser Support:
├── Chrome 90+
├── Firefox 88+
├── Safari 14+
├── Edge 90+
└── Mobile Browsers (iOS Safari, Chrome Mobile)

Device Optimization:
├── Desktop (60 FPS Target)
├── Tablet (45 FPS Target)
├── Mobile (30 FPS Target)
└── Low-end Devices (Adaptive Quality)
```

### 15. Development Workflow

```
Code Organization:
├── Feature-based Structure
├── Component Composition
├── Custom Hooks Pattern
├── Utility Functions
└── Configuration Files

Quality Assurance:
├── ESLint Rules
├── TypeScript Types (Future)
├── Component Testing (Future)
├── Performance Monitoring
└── Cross-browser Testing

Version Control:
├── Git Flow
├── Feature Branches
├── Pull Requests
└── GitHub Pages Deployment
```

## Component Interaction Diagram

```
┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│   User Input    │─────────▶│  SceneManager   │─────────▶│   Current Scene │
│                 │          │                 │          │                 │
│ • Mouse Clicks  │          │ • Scene State   │          │ • 3D Environment│
│ • Keyboard      │          │ • Transitions   │          │ • UI Components │
│ • Touch Events  │          │ • Loading       │          │ • Audio         │
└─────────────────┘          └─────────────────┘          └─────────────────┘
         │                              │                              │
         │                              │                              │
         ▼                              ▼                              ▼
┌─────────────────┐ ◄─────────┐ ┌─────────────────┐ ◄─────────┐ ┌─────────────────┐
│   useStore      │           │ │  useSceneLoader │           │ │    useAudio     │
│                 │           │ │                 │           │ │                 │
│ • Global State  │           │ │ • Asset Loading │           │ │ • Sound System  │
│ • Persistence   │           │ │ • Progress      │           │ │ • Music/SFX     │
│ • Game Progress │           │ │ • Error Handling│           │ │ • Volume Control│
└─────────────────┘ ─────────▶ └─────────────────┘ ─────────▶ └─────────────────┘
         ▲                              ▲                              ▲
         │                              │                              │
         │                              │                              │
┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│   LocalStorage  │◄─────────┤     Assets      │◄─────────┤   Web Audio     │
│                 │          │                 │          │                 │
│ • Save Data     │          │ • 3D Models     │          │ • Audio Files   │
│ • Player Pos    │          │ • Textures      │          │ • Playback      │
│ • Game State    │          │ • Audio         │          │ • Effects       │
└─────────────────┘          └─────────────────┘          └─────────────────┘
```

## Data Flow Patterns

### State Management Flow:
```
User Action ────────▶ Component ────────▶ useStore Action ────────▶ State Update ────────▶ Re-render ────────▶ UI Update
     │                       │                        │                        │                      │
     ▼                       ▼                        ▼                        ▼                      ▼
  Click/Tap           Event Handler           setState() Call         Zustand Store          Virtual DOM          Browser DOM
  Keyboard            State Change            Persistence             Update                   Diff                 Render
  Touch               Prop Update             LocalStorage            Re-render               Patch                Display
```

### Scene Transition Flow:
```
Scene Change Request ────────▶ SceneManager ────────▶ Loading Screen ────────▶ New Scene ────────▶ Asset Loading ────────▶ Scene Ready
          │                            │                        │                      │                      │
          │                            │                        │                      │                      │
          ▼                            ▼                        ▼                      ▼                      ▼
    Navigation Event            State Update            HandLoading.gif         Component Mount         GLTF Models         Interactive
    Building Entry               currentScene            Animation               Props Passed            Textures            Controls
    Back Button                  Transition              Progress Bar            useSceneLoader          Audio Files         User Input
```

### Audio Flow:
```
Scene Load ────────▶ useAudio Hook ────────▶ Audio File ────────▶ Web Audio API ────────▶ Speaker Output
     │                      │                        │                      │
     │                      │                        │                      │
     ▼                      ▼                        ▼                      ▼
Component Mount         Howler Instance          OGG/MP3 File           Audio Context         Sound Playback
useEffect Hook          Audio Buffer             Network Fetch           Gain Node            Volume Control
Cleanup Setup           Playback Controls        Cache Management        Filters              Spatial Audio
```

### Asset Loading Flow:
```
Scene Mount ────────▶ useSceneLoader ────────▶ Asset URLs ────────▶ Fetch ────────▶ Progress Update ────────▶ Scene Render
     │                        │                        │              │                      │
     │                        │                        │              │                      │
     ▼                        ▼                        ▼              ▼                      ▼
React Component        Preload Hook            GLTF Paths         Network Request        Loading UI           3D Environment
useEffect              Progress State          Texture URLs       Error Handling         Spinner             Interactive Scene
Memory Cleanup         Error Recovery          Audio URLs         Cache Headers          Percentage          Game Ready
```

### Memory Management Flow:
```
Component Mount ────────▶ Resource Allocation ────────▶ Usage ────────▶ Component Unmount ────────▶ Cleanup
        │                          │                        │                        │
        │                          │                        │                        │
        ▼                          ▼                        ▼                        ▼
   useEffect()               Geometry Creation         Rendering Loop          useEffect Cleanup      dispose()
   Event Listeners           Material Setup            Animation Frames        Event Removal          null assignment
   Audio Context             Texture Loading           User Interaction        Memory Release         GC Collection
```

## Error Handling Architecture

```
Error Sources:
├── Network Errors (Asset Loading)
├── WebGL Errors (3D Rendering)
├── Audio Errors (Playback)
└── JavaScript Errors (Runtime)

Error Recovery:
├── Error Boundaries (UI Fallback)
├── Retry Mechanisms (Auto-retry)
├── Loading Fallbacks (Progress UI)
└── Graceful Degradation (Reduced Quality)
```

## Performance Monitoring Points

```
Key Metrics:
├── Frame Rate (60 FPS Target)
├── Memory Usage (< 200MB)
├── Load Time (< 3 seconds)
├── Bundle Size (< 1MB)
└── Draw Calls (< 50)

Monitoring Tools:
├── React DevTools (Component Tree)
├── Three.js Inspector (3D Scene)
├── Browser DevTools (Performance)
├── Lighthouse (Web Vitals)
└── Custom Hooks (State Tracking)
```

This architecture provides a solid foundation for an educational 3D game with proper separation of concerns, performance optimizations, and maintainable code structure.</content>
<parameter name="filePath">c:\Users\asphy\Desktop\2nd version\qculand\docs\architecture-block-diagram.md