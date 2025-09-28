# 🎵 Phonics Learning App 🎵

A child-focused interactive web application for learning phonics through speech recognition. Children learn letter sounds by speaking into their microphone and get rewarded with sparkles and fireworks when they pronounce letters correctly!

![Phonics App Screenshot](https://github.com/user-attachments/assets/64080d70-060a-4ab0-b3cd-8a86d9cc04ea)

## Features

- **Interactive Letter Learning**: Shows each letter A-Z with corresponding emoji images
- **Speech Recognition**: Uses Web Speech API to listen for correct letter pronunciation
- **Celebration Animations**: Sparkles and fireworks when children succeed
- **Child-Friendly Design**: Colorful gradients, large buttons, and fun emojis
- **Progress Tracking**: Visual progress bar showing current letter position
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How to Use

1. Open the application in a web browser that supports speech recognition (Chrome, Safari, Edge)
2. Click "🎤 Start Learning!" to begin
3. Allow microphone permissions when prompted
4. Say the sound for the displayed letter (e.g., "ay" for A, "buh" for B)
5. Enjoy the celebration when you get it right!
6. Click "Next Letter ➡️" to progress through the alphabet

## Example Letter Sounds

- A - "ay" (as in Apple 🍎)
- B - "buh" (as in Boat 🚤)
- C - "kuh" (as in Cat 🐱)
- D - "duh" (as in Dog 🐶)
- And so on through Z!

## Technical Requirements

- Modern web browser with Web Speech API support
- Microphone access
- Internet connection (for speech recognition service)

## Running the App

### Option 1: Simple HTTP Server (Recommended)
```bash
# Using Python 3
python3 -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Then open http://localhost:8080 in your browser
```

### Option 2: Direct File Access
Simply open `index.html` in your web browser (note: some browsers may restrict microphone access for file:// URLs)

## Browser Compatibility

- ✅ Chrome (full support)
- ✅ Safari (full support)
- ✅ Edge (full support)
- ❌ Firefox (limited speech recognition support)

## Files Structure

- `index.html` - Main application structure
- `styles.css` - Child-friendly styling and animations
- `script.js` - Speech recognition and game logic
- `images/` - Placeholder directory (app uses emojis instead)

## Celebration Features

When children correctly pronounce a letter sound, they see:
- ✨ Animated sparkles
- 🎆 Fireworks effects
- 🎉 Success message overlay
- Automatic progression to next letter

![Celebration Screenshot](https://github.com/user-attachments/assets/b94bc3e4-0610-42eb-83da-7b4f1ae90c68)

## Educational Design

The app follows phonics teaching principles:
- Focuses on letter sounds rather than letter names
- Uses familiar objects that start with each letter sound
- Provides immediate positive feedback
- Encourages repeated practice through engaging animations
- Progresses systematically through the alphabet

Perfect for preschool and early elementary children learning to read!