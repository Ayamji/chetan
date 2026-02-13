# Chapter Music - Quick Reference

## 📝 Quick Steps

1. **Get 4 songs** in MP3 format
2. **Rename them**:
   - `chapter1.mp3`
   - `chapter2.mp3`
   - `chapter3.mp3`
   - `chapter4.mp3`
3. **Place in** `valentine/songs/` folder
4. **Open website** and click the ♪ button
5. **Scroll through chapters** - music changes automatically!

## 🎵 Customize Song Names

Edit `script.js` around line 310:
```javascript
const songNames = {
    1: "Your Song Title Here",
    2: "Another Song Title",
    3: "Third Song",
    4: "Fourth Song"
};
```

## 🔊 Adjust Volume

Edit `script.js` around line 330:
```javascript
chapterAudios[chapter].volume = 0.4;  // Change 0.4 to 0.0-1.0
```
